import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { assertAdmin } from "./lib/admin";

const entryDoc = v.object({
  _id: v.id("contentEntries"),
  _creationTime: v.number(),
  key: v.string(),
  group: v.string(),
  label: v.string(),
  format: v.union(
    v.literal("plain"),
    v.literal("html"),
    v.literal("markdown"),
  ),
  value: v.string(),
  updatedAt: v.number(),
});

export const listByGroup = query({
  args: { group: v.string() },
  returns: v.array(entryDoc),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contentEntries")
      .withIndex("by_group", (q) => q.eq("group", args.group))
      .collect();
  },
});

export const getByKey = query({
  args: { key: v.string() },
  returns: v.union(entryDoc, v.null()),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contentEntries")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();
  },
});

export const mapAll = query({
  args: {},
  returns: v.record(v.string(), v.string()),
  handler: async (ctx) => {
    const rows = await ctx.db.query("contentEntries").take(500);
    const map: Record<string, string> = {};
    for (const row of rows) map[row.key] = row.value;
    return map;
  },
});

export const adminList = query({
  args: { adminSecret: v.string(), group: v.optional(v.string()) },
  returns: v.array(entryDoc),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    if (args.group) {
      return await ctx.db
        .query("contentEntries")
        .withIndex("by_group", (q) => q.eq("group", args.group!))
        .collect();
    }
    return await ctx.db.query("contentEntries").take(500);
  },
});

export const adminUpsert = mutation({
  args: {
    adminSecret: v.string(),
    key: v.string(),
    group: v.string(),
    label: v.string(),
    format: v.union(
      v.literal("plain"),
      v.literal("html"),
      v.literal("markdown"),
    ),
    value: v.string(),
  },
  returns: v.id("contentEntries"),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const existing = await ctx.db
      .query("contentEntries")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();
    const payload = {
      key: args.key,
      group: args.group,
      label: args.label,
      format: args.format,
      value: args.value,
      updatedAt: Date.now(),
    };
    if (existing) {
      await ctx.db.patch(existing._id, payload);
      return existing._id;
    }
    return await ctx.db.insert("contentEntries", payload);
  },
});

export const adminSeed = mutation({
  args: {
    adminSecret: v.string(),
    items: v.array(
      v.object({
        key: v.string(),
        group: v.string(),
        label: v.string(),
        format: v.union(
          v.literal("plain"),
          v.literal("html"),
          v.literal("markdown"),
        ),
        value: v.string(),
      }),
    ),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    let count = 0;
    for (const item of args.items) {
      const existing = await ctx.db
        .query("contentEntries")
        .withIndex("by_key", (q) => q.eq("key", item.key))
        .unique();
      const payload = { ...item, updatedAt: Date.now() };
      if (existing) {
        await ctx.db.patch(existing._id, payload);
      } else {
        await ctx.db.insert("contentEntries", payload);
      }
      count += 1;
    }
    return count;
  },
});
