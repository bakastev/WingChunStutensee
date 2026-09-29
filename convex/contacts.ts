import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    topic: v.string(),
    message: v.string(),
    consent: v.boolean(),
  },
  returns: v.id("contacts"),
  handler: async (ctx, args) => {
    if (!args.consent) {
      throw new Error("Einwilligung erforderlich");
    }
    return await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      topic: args.topic,
      message: args.message,
      consent: args.consent,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(
    v.object({
      _id: v.id("contacts"),
      _creationTime: v.number(),
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
    }),
  ),
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("contacts")
      .withIndex("by_created")
      .order("desc")
      .take(limit);
  },
});
