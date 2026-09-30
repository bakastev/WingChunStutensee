import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
]);

export type SiteMediaItem = {
  id: string;
  url: string;
  filename: string;
  folder: string;
  alt: string;
};

async function walkImages(
  absDir: string,
  relDir: string,
  out: SiteMediaItem[],
): Promise<void> {
  let entries;
  try {
    entries = await readdir(absDir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const abs = path.join(absDir, entry.name);
    const rel = path.posix.join(relDir, entry.name);
    if (entry.isDirectory()) {
      await walkImages(abs, rel, out);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const folder = relDir === "images" ? "root" : relDir.replace(/^images\/?/, "");
    out.push({
      id: `site:${rel}`,
      url: `/${rel}`,
      filename: entry.name,
      folder: folder || "root",
      alt: entry.name.replace(ext, "").replace(/[-_]+/g, " "),
    });
  }
}

/** Existing website assets under /public/images — not Convex uploads. */
export async function listSiteMedia(): Promise<SiteMediaItem[]> {
  const root = path.join(process.cwd(), "public", "images");
  const items: SiteMediaItem[] = [];
  await walkImages(root, "images", items);
  items.sort((a, b) => {
    const folderCmp = a.folder.localeCompare(b.folder);
    if (folderCmp !== 0) return folderCmp;
    return a.filename.localeCompare(b.filename);
  });
  return items;
}
