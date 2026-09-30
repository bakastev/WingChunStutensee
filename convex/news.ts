import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { assertAdmin } from "./lib/admin";

const newsDoc = v.object({
  _id: v.id("news"),
  _creationTime: v.number(),
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  body: v.string(),
  image: v.optional(v.string()),
  imageStorageId: v.optional(v.id("_storage")),
  publishedAt: v.number(),
  published: v.boolean(),
  updatedAt: v.optional(v.number()),
});

const newsInput = {
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  body: v.string(),
  image: v.optional(v.string()),
  imageStorageId: v.optional(v.id("_storage")),
  publishedAt: v.number(),
  published: v.boolean(),
};

export const listPublished = query({
  args: {},
  returns: v.array(newsDoc),
  handler: async (ctx) => {
    return await ctx.db
      .query("news")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .take(50);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(newsDoc, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const adminList = query({
  args: { adminSecret: v.string() },
  returns: v.array(newsDoc),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const rows = await ctx.db.query("news").order("desc").take(200);
    return rows;
  },
});

export const adminGet = query({
  args: { adminSecret: v.string(), id: v.id("news") },
  returns: v.union(newsDoc, v.null()),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    return await ctx.db.get(args.id);
  },
});

export const adminCreate = mutation({
  args: { adminSecret: v.string(), ...newsInput },
  returns: v.id("news"),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const { adminSecret: _, ...data } = args;
    const existing = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", data.slug))
      .unique();
    if (existing) throw new Error("Slug bereits vergeben");
    return await ctx.db.insert("news", { ...data, updatedAt: Date.now() });
  },
});

export const adminUpdate = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("news"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    body: v.optional(v.string()),
    image: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    publishedAt: v.optional(v.number()),
    published: v.optional(v.boolean()),
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
        .query("news")
        .withIndex("by_slug", (q) => q.eq("slug", clean.slug as string))
        .unique();
      if (clash && clash._id !== id) throw new Error("Slug bereits vergeben");
    }
    await ctx.db.patch(id, { ...clean, updatedAt: Date.now() });
    return null;
  },
});

export const adminRemove = mutation({
  args: { adminSecret: v.string(), id: v.id("news") },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    await ctx.db.delete(args.id);
    return null;
  },
});

export const seedPublic = mutation({
  args: {
    items: v.array(
      v.object({
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        body: v.string(),
        image: v.optional(v.string()),
        publishedAt: v.number(),
        published: v.boolean(),
      }),
    ),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    let count = 0;
    for (const item of args.items) {
      const existing = await ctx.db
        .query("news")
        .withIndex("by_slug", (q) => q.eq("slug", item.slug))
        .unique();
      if (existing) {
        await ctx.db.patch(existing._id, { ...item, updatedAt: Date.now() });
      } else {
        await ctx.db.insert("news", { ...item, updatedAt: Date.now() });
      }
      count += 1;
    }
    return count;
  },
});
