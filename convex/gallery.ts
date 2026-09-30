import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { assertAdmin } from "./lib/admin";

const galleryImage = v.object({
  src: v.string(),
  alt: v.string(),
  storageId: v.optional(v.id("_storage")),
});

const albumDoc = v.object({
  _id: v.id("galleryAlbums"),
  _creationTime: v.number(),
  slug: v.string(),
  title: v.string(),
  eyebrow: v.optional(v.string()),
  description: v.optional(v.string()),
  location: v.optional(v.string()),
  year: v.optional(v.number()),
  sortOrder: v.number(),
  published: v.boolean(),
  images: v.array(galleryImage),
  updatedAt: v.number(),
});

export const listPublished = query({
  args: {},
  returns: v.array(albumDoc),
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("galleryAlbums")
      .withIndex("by_published_order", (q) => q.eq("published", true))
      .order("asc")
      .take(100);
    return rows;
  },
});

export const adminList = query({
  args: { adminSecret: v.string() },
  returns: v.array(albumDoc),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const rows = await ctx.db.query("galleryAlbums").take(200);
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const adminGet = query({
  args: { adminSecret: v.string(), id: v.id("galleryAlbums") },
  returns: v.union(albumDoc, v.null()),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    return await ctx.db.get(args.id);
  },
});

export const adminCreate = mutation({
  args: {
    adminSecret: v.string(),
    slug: v.string(),
    title: v.string(),
    eyebrow: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    year: v.optional(v.number()),
    sortOrder: v.number(),
    published: v.boolean(),
    images: v.array(galleryImage),
  },
  returns: v.id("galleryAlbums"),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const { adminSecret: _, ...data } = args;
    const existing = await ctx.db
      .query("galleryAlbums")
      .withIndex("by_slug", (q) => q.eq("slug", data.slug))
      .unique();
    if (existing) throw new Error("Slug bereits vergeben");
    return await ctx.db.insert("galleryAlbums", {
      ...data,
      updatedAt: Date.now(),
    });
  },
});

export const adminUpdate = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("galleryAlbums"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    eyebrow: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    year: v.optional(v.number()),
    sortOrder: v.optional(v.number()),
    published: v.optional(v.boolean()),
    images: v.optional(v.array(galleryImage)),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const { adminSecret: _, id, ...patch } = args;
    const clean = Object.fromEntries(
      Object.entries(patch).filter(([, value]) => value !== undefined),
    );
    if (clean.slug) {
      const clash = await ctx.db
        .query("galleryAlbums")
        .withIndex("by_slug", (q) => q.eq("slug", clean.slug as string))
        .unique();
      if (clash && clash._id !== id) throw new Error("Slug bereits vergeben");
    }
    await ctx.db.patch(id, { ...clean, updatedAt: Date.now() });
    return null;
  },
});

export const adminRemove = mutation({
  args: { adminSecret: v.string(), id: v.id("galleryAlbums") },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const adminSeed = mutation({
  args: {
    adminSecret: v.string(),
    items: v.array(
      v.object({
        slug: v.string(),
        title: v.string(),
        eyebrow: v.optional(v.string()),
        description: v.optional(v.string()),
        location: v.optional(v.string()),
        year: v.optional(v.number()),
        sortOrder: v.number(),
        published: v.boolean(),
        images: v.array(galleryImage),
      }),
    ),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    let count = 0;
    for (const item of args.items) {
      const existing = await ctx.db
        .query("galleryAlbums")
        .withIndex("by_slug", (q) => q.eq("slug", item.slug))
        .unique();
      const payload = { ...item, updatedAt: Date.now() };
      if (existing) {
        await ctx.db.patch(existing._id, payload);
      } else {
        await ctx.db.insert("galleryAlbums", payload);
      }
      count += 1;
    }
    return count;
  },
});
