"use client";

import type { BookingStatus } from "@prisma/client";
import { LoaderCircle, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const statuses: BookingStatus[] = [
  "NEW",
  "CONTACTED",
  "CONFIRMED",
  "CANCELLED",
  "DONE",
];

const statusLabels: Record<BookingStatus, string> = {
  CANCELLED: "Цуцалсан",
  CONFIRMED: "Баталгаажсан",
  CONTACTED: "Холбогдсон",
  DONE: "Дууссан",
  NEW: "Шинэ",
};

export function BookingControls({
  bookingId,
  initialNote,
  initialStatus,
}: {
  bookingId: string;
  initialNote?: string | null;
  initialStatus: BookingStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [adminNote, setAdminNote] = useState(initialNote ?? "");
  const [pending, setPending] = useState<"status" | "note" | null>(null);
  const [message, setMessage] = useState("");

  async function patch(path: string, body: unknown, key: "status" | "note") {
    setPending(key);
    setMessage("");

    const response = await fetch(path, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    if (!response.ok) {
      setMessage("Шинэчлэл хадгалагдсангүй.");
      setPending(null);
      return;
    }

    setMessage("Шинэчлэл хадгалагдлаа.");
    setPending(null);
    router.refresh();
  }

  return (
    <div className="grid gap-5">
      <div className="rounded-[1.5rem] border border-line bg-cream/55 p-5">
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Төлөв
          <select
            className="field"
            onChange={(event) => setStatus(event.target.value as BookingStatus)}
            value={status}
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {statusLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <Button
          className="mt-4"
          disabled={pending === "status"}
          onClick={() => patch(`/api/bookings/${bookingId}/status`, { status }, "status")}
          type="button"
        >
          {pending === "status" ? <LoaderCircle className="animate-spin" size={18} /> : null}
          Төлөв хадгалах
        </Button>
      </div>
      <div className="rounded-[1.5rem] border border-line bg-cream/55 p-5">
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Admin тэмдэглэл
          <textarea
            className="field min-h-40 resize-y"
            onChange={(event) => setAdminNote(event.target.value)}
            value={adminNote}
          />
        </label>
        <Button
          className="mt-4"
          disabled={pending === "note"}
          onClick={() =>
            patch(`/api/bookings/${bookingId}/notes`, { adminNote }, "note")
          }
          type="button"
        >
          {pending === "note" ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
          Тэмдэглэл хадгалах
        </Button>
      </div>
      {message ? (
        <p aria-live="polite" className="rounded-2xl border border-line bg-soft-white p-4 text-sm text-navy">
          {message}
        </p>
      ) : null}
    </div>
  );
}
