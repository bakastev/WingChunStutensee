import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Admin · Wing Chun Stutensee",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-admin-theme="light"
      className="admin-theme min-h-screen bg-zinc-100 font-sans text-zinc-950 antialiased"
    >
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
