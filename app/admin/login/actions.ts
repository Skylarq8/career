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

export async function loginAdmin(
  _state: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || !isValidAdminPassword(password)) {
    return {
      error: "Нууц үг буруу байна.",
    };
  }

  const sessionValue = getAdminSessionValue();

  if (!sessionValue) {
    return {
      error: "ADMIN_PASSWORD тохируулаагүй байна.",
    };
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
