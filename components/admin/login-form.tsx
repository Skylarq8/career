"use client";

import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function login(formData: FormData) {
    setPending(true);
    setError("");

    const response = await fetch("/api/admin/session", {
      body: JSON.stringify({
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? "Нэвтрэх боломжгүй байна.");
      setPending(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      action={login}
      className="w-full max-w-md rounded-[1.75rem] border border-line bg-soft-white p-6 premium-shadow sm:p-8"
    >
      <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-emerald/12 text-emerald">
        <LockKeyhole size={22} />
      </span>
      <h1 className="heading-font mt-5 text-3xl font-extrabold text-navy">
        Admin нэвтрэх
      </h1>
      <p className="mt-3 leading-7 text-muted">
        MVP хувилбарын admin password session.
      </p>
      <label className="mt-6 grid gap-2 text-sm font-semibold text-navy">
        Нууц үг
        <input autoFocus className="field" name="password" required type="password" />
      </label>
      {error ? (
        <p aria-live="polite" className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <Button className="mt-6 w-full" disabled={pending} type="submit">
        {pending ? <LoaderCircle className="animate-spin" size={18} /> : null}
        Нэвтрэх
      </Button>
    </form>
  );
}
