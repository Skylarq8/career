"use client";

import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/admin/login/actions";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 font-semibold text-white/76 transition hover:bg-white/10 hover:text-white disabled:opacity-60"
        type="submit"
      >
        <LogOut size={18} />
        Гарах
      </button>
    </form>
  );
}
