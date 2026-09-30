"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Images,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

const nav: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: "/admin", label: "Übersicht", icon: LayoutDashboard, exact: true },
  { href: "/admin/inhalte", label: "Texte", icon: FileText },
  { href: "/admin/aktuelles", label: "Aktuelles", icon: Newspaper },
  { href: "/admin/galerie", label: "Galerien", icon: Images },
  { href: "/admin/medien", label: "Medien", icon: ImageIcon },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-zinc-950">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-[260px] shrink-0 flex-col border-r border-zinc-200/80 bg-[#111113] text-zinc-100 md:flex">
          <div className="border-b border-white/10 px-5 py-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#FACF48]">
              Content Studio
            </p>
            <p className="mt-2 text-[0.95rem] font-semibold tracking-tight text-white">
              Wing Chun Stutensee
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-1 p-3">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9rem] font-medium transition-colors",
                    active
                      ? "bg-[#FACF48] text-zinc-950"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      active ? "text-zinc-950" : "text-zinc-500 group-hover:text-zinc-300",
                    )}
                    strokeWidth={1.75}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 border-t border-white/10 p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.875rem] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ExternalLink className="h-[18px] w-[18px]" strokeWidth={1.75} />
              Website öffnen
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.875rem] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
                Abmelden
              </button>
            </form>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 md:hidden">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-600">
                CMS
              </p>
              <p className="font-semibold text-zinc-950">Admin</p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100"
              >
                Logout
              </button>
            </form>
          </header>

          <nav className="flex gap-1.5 overflow-x-auto border-b border-zinc-200 bg-white px-3 py-2 md:hidden">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold",
                    active
                      ? "bg-[#FACF48] text-zinc-950"
                      : "bg-zinc-100 text-zinc-600",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
