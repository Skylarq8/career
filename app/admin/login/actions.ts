"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  getAdminSessionValue,
  isValidAdminPassword,
} from "@/lib/admin-auth";

export type AdminLoginState = {
  error?: string;
};

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || !isValidAdminPassword(password)) {
    redirect("/admin/login?error=invalid");
  }

  const sessionValue = getAdminSessionValue();

  if (!sessionValue) {
    redirect("/admin/login?error=config");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
