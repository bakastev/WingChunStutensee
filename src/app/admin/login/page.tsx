import Link from "next/link";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/shadcn-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/admin/ui";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next && params.next.startsWith("/admin") ? params.next : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin-Login</CardTitle>
          <CardDescription>
            Inhalte, Aktuelles und Galerien von Wing Chun Stutensee verwalten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            {params.error ? (
              <p className="text-sm text-red-600">Passwort ungültig.</p>
            ) : null}
            <Button type="submit" variant="accent" className="w-full">
              Anmelden
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-zinc-500">
            <Link href="/" className="underline">
              Zurück zur Website
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
