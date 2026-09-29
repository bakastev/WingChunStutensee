/* eslint-disable */
/**
 * Minimal Convex API stubs for local build without `convex codegen`.
 * Replaced when you run `npx convex dev`.
 */

export const api = {
  contacts: {
    submit: "contacts:submit",
    listRecent: "contacts:listRecent",
  },
  news: {
    listPublished: "news:listPublished",
    getBySlug: "news:getBySlug",
    seedPublic: "news:seedPublic",
  },
} as const;

export const internal = {
  news: {
    seed: "news:seed",
  },
} as const;
