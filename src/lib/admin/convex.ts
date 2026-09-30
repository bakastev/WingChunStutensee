import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import { getAdminSecret } from "@/lib/admin/auth";

export function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL fehlt — Convex ist nicht konfiguriert.");
  return new ConvexHttpClient(url);
}

export function adminArgs<T extends Record<string, unknown>>(extra: T) {
  return { adminSecret: getAdminSecret(), ...extra };
}

export { api };
