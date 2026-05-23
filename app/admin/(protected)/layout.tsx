import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ADMIN_COOKIE_NAME, isAdminSessionValue } from "@/lib/admin-auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();

  if (!isAdminSessionValue(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin/login");
  }

  return <AdminLayout>{children}</AdminLayout>;
}
