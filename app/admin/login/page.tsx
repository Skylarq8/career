import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin login",
};

const errorMessages: Record<string, string> = {
  config: "ADMIN_PASSWORD тохируулаагүй байна.",
  invalid: "Нууц үг буруу байна.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="hero-gradient grid min-h-screen place-items-center px-4 py-10">
      <AdminLoginForm error={params.error ? errorMessages[params.error] : undefined} />
    </main>
  );
}
