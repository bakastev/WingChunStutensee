import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const galleryImage = v.object({
  src: v.string(),
  alt: v.string(),
  storageId: v.optional(v.id("_storage")),
});

export default defineSchema({
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    topic: v.string(),
    message: v.string(),
    consent: v.boolean(),
    status: v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("archived"),
    ),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),

  news: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    /** HTML from TipTap WYSIWYG */
    body: v.string(),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    publishedAt: v.number(),
    published: v.boolean(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published", "publishedAt"]),

  /** Editable site copy keyed by stable id (e.g. home.hero.lead). */
  contentEntries: defineTable({
    key: v.string(),
    group: v.string(),
    label: v.string(),
    /** plain | html | markdown */
    format: v.union(
      v.literal("plain"),
      v.literal("html"),
      v.literal("markdown"),
    ),
    value: v.string(),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"])
    .index("by_group", ["group"]),

  /** Gallery albums / events with ordered images. */
  galleryAlbums: defineTable({
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
  })
    .index("by_slug", ["slug"])
    .index("by_published_order", ["published", "sortOrder"]),

  mediaAssets: defineTable({
    storageId: v.id("_storage"),
    url: v.string(),
    alt: v.string(),
    filename: v.string(),
    contentType: v.string(),
    bytes: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),
});
