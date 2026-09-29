import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

const newsDoc = v.object({
  _id: v.id("news"),
  _creationTime: v.number(),
  title: v.string(),
  slug: v.string(),
  excerpt: v.string(),
  body: v.string(),
  image: v.optional(v.string()),
  publishedAt: v.number(),
  published: v.boolean(),
});

export const listPublished = query({
  args: {},
  returns: v.array(newsDoc),
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("news")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .take(50);
    return rows;
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

export const seed = internalMutation({
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
        await ctx.db.patch(existing._id, item);
      } else {
        await ctx.db.insert("news", item);
      }
      count += 1;
    }
    return count;
  },
});

/** Public seed for local/dev bootstrap when CONVEX_DEPLOY_KEY not available. */
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
        await ctx.db.patch(existing._id, item);
      } else {
        await ctx.db.insert("news", item);
      }
      count += 1;
    }
    return count;
  },
});
