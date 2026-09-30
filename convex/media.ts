import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { assertAdmin } from "./lib/admin";

const mediaDoc = v.object({
  _id: v.id("mediaAssets"),
  _creationTime: v.number(),
  storageId: v.id("_storage"),
  url: v.string(),
  alt: v.string(),
  filename: v.string(),
  contentType: v.string(),
  bytes: v.optional(v.number()),
  createdAt: v.number(),
});

export const adminGenerateUploadUrl = mutation({
  args: { adminSecret: v.string() },
  returns: v.string(),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    return await ctx.storage.generateUploadUrl();
  },
});

export const adminSave = mutation({
  args: {
    adminSecret: v.string(),
    storageId: v.id("_storage"),
    alt: v.string(),
    filename: v.string(),
    contentType: v.string(),
    bytes: v.optional(v.number()),
  },
  returns: mediaDoc,
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Upload fehlgeschlagen");
    const id = await ctx.db.insert("mediaAssets", {
      storageId: args.storageId,
      url,
      alt: args.alt,
      filename: args.filename,
      contentType: args.contentType,
      bytes: args.bytes,
      createdAt: Date.now(),
    });
    const doc = await ctx.db.get(id);
    if (!doc) throw new Error("Medien-Eintrag fehlt");
    return doc;
  },
});

export const adminList = query({
  args: { adminSecret: v.string() },
  returns: v.array(mediaDoc),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    return await ctx.db
      .query("mediaAssets")
      .withIndex("by_created")
      .order("desc")
      .take(200);
  },
});

export const adminRemove = mutation({
  args: { adminSecret: v.string(), id: v.id("mediaAssets") },
  returns: v.null(),
  handler: async (ctx, args) => {
    assertAdmin(args.adminSecret);
    const doc = await ctx.db.get(args.id);
    if (!doc) return null;
    await ctx.storage.delete(doc.storageId);
    await ctx.db.delete(args.id);
    return null;
  },
});
