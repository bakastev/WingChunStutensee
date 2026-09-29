import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
    body: v.string(),
    image: v.optional(v.string()),
    publishedAt: v.number(),
    published: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published", "publishedAt"]),
});
