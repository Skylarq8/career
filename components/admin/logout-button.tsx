"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch("/api/admin/session", {
      method: "DELETE",
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 font-semibold text-white/76 transition hover:bg-white/10 hover:text-white disabled:opacity-60"
      disabled={pending}
      onClick={logout}
      type="button"
    >
      <LogOut size={18} />
      Гарах
    </button>
  );
}
