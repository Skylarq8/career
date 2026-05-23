import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { DatabaseSetupNotice } from "@/components/admin/database-setup-notice";
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

  if (!process.env.DATABASE_URL) {
    return (
      <AdminLayout>
        <DatabaseSetupNotice />
      </AdminLayout>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}
