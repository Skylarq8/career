import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin login",
};

export default function AdminLoginPage() {
  return (
    <main className="hero-gradient grid min-h-screen place-items-center px-4 py-10">
      <AdminLoginForm />
    </main>
  );
}
