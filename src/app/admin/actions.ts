"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  createAdminSessionToken,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/admin/auth";
import { adminArgs, api, getConvexClient } from "@/lib/admin/convex";
import type { Id } from "../../../convex/_generated/dataModel";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  if (!verifyAdminPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }
  const token = await createAdminSessionToken();
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Nicht autorisiert");
  }
}

export async function saveContentEntryAction(input: {
  key: string;
  group: string;
  label: string;
  format: "plain" | "html" | "markdown";
  value: string;
}) {
  await requireAdmin();
  const client = getConvexClient();
  return await client.mutation(api.content.adminUpsert, adminArgs(input));
}

export async function saveNewsAction(input: {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  image?: string;
  publishedAt: number;
  published: boolean;
}) {
  await requireAdmin();
  const client = getConvexClient();
  if (input.id) {
    await client.mutation(
      api.news.adminUpdate,
      adminArgs({
        id: input.id as Id<"news">,
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        body: input.body,
        image: input.image,
        publishedAt: input.publishedAt,
        published: input.published,
      }),
    );
    return input.id;
  }
  return await client.mutation(
    api.news.adminCreate,
    adminArgs({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      body: input.body,
      image: input.image,
      publishedAt: input.publishedAt,
      published: input.published,
    }),
  );
}

export async function deleteNewsAction(id: string) {
  await requireAdmin();
  const client = getConvexClient();
  await client.mutation(
    api.news.adminRemove,
    adminArgs({ id: id as Id<"news"> }),
  );
}

export async function saveGalleryAlbumAction(input: {
  id?: string;
  slug: string;
  title: string;
  eyebrow?: string;
  description?: string;
  location?: string;
  year?: number;
  sortOrder: number;
  published: boolean;
  images: { src: string; alt: string; storageId?: Id<"_storage"> }[];
}) {
  await requireAdmin();
  const client = getConvexClient();
  if (input.id) {
    await client.mutation(
      api.gallery.adminUpdate,
      adminArgs({
        id: input.id as Id<"galleryAlbums">,
        slug: input.slug,
        title: input.title,
        eyebrow: input.eyebrow,
        description: input.description,
        location: input.location,
        year: input.year,
        sortOrder: input.sortOrder,
        published: input.published,
        images: input.images,
      }),
    );
    return input.id;
  }
  return await client.mutation(
    api.gallery.adminCreate,
    adminArgs({
      slug: input.slug,
      title: input.title,
      eyebrow: input.eyebrow,
      description: input.description,
      location: input.location,
      year: input.year,
      sortOrder: input.sortOrder,
      published: input.published,
      images: input.images,
    }),
  );
}

export async function deleteGalleryAlbumAction(id: string) {
  await requireAdmin();
  const client = getConvexClient();
  await client.mutation(
    api.gallery.adminRemove,
    adminArgs({ id: id as Id<"galleryAlbums"> }),
  );
}

export async function getUploadUrlAction() {
  await requireAdmin();
  const client = getConvexClient();
  return await client.mutation(
    api.media.adminGenerateUploadUrl,
    adminArgs({}),
  );
}

export async function saveMediaAction(input: {
  storageId: string;
  alt: string;
  filename: string;
  contentType: string;
  bytes?: number;
}) {
  await requireAdmin();
  const client = getConvexClient();
  return await client.mutation(
    api.media.adminSave,
    adminArgs({
      storageId: input.storageId as Id<"_storage">,
      alt: input.alt,
      filename: input.filename,
      contentType: input.contentType,
      bytes: input.bytes,
    }),
  );
}

export async function listMediaLibraryAction(): Promise<{
  site: {
    id: string;
    url: string;
    filename: string;
    folder: string;
    alt: string;
  }[];
  uploads: {
    id: string;
    url: string;
    filename: string;
    folder: string;
    alt: string;
  }[];
}> {
  await requireAdmin();
  const { listSiteMedia } = await import("@/lib/admin/site-media");
  const site = await listSiteMedia();

  let uploads: {
    id: string;
    url: string;
    filename: string;
    folder: string;
    alt: string;
  }[] = [];
  try {
    const client = getConvexClient();
    const rows = await client.query(api.media.adminList, adminArgs({}));
    uploads = rows.map((row) => ({
      id: row._id,
      url: row.url,
      filename: row.filename,
      folder: "uploads",
      alt: row.alt,
    }));
  } catch {
    uploads = [];
  }

  return { site, uploads };
}
