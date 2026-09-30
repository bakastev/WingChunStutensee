/** Shared admin gate for Convex mutations — secret never leaves the server. */
export function assertAdmin(secret: string | undefined) {
  const expected = process.env.ADMIN_SECRET;
  if (!expected || !secret || secret !== expected) {
    throw new Error("Nicht autorisiert");
  }
}
