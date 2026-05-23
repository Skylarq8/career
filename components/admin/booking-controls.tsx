"use client";

import { useMutation } from "convex/react";
import { LoaderCircle, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { bookingStatusLabels, bookingStatuses } from "@/lib/admin-types";
import type { BookingStatus } from "@/lib/admin-types";

export function BookingControls({
  bookingId,
  initialNote,
  initialStatus,
}: {
  bookingId: Id<"bookings">;
  initialNote?: string | null;
  initialStatus: BookingStatus;
}) {
  const router = useRouter();
  const updateStatus = useMutation(api.bookings.updateBookingStatus);
  const updateNote = useMutation(api.bookings.updateBookingNote);
  const [status, setStatus] = useState(initialStatus);
  const [adminNote, setAdminNote] = useState(initialNote ?? "");
  const [pending, setPending] = useState<"status" | "note" | null>(null);
  const [message, setMessage] = useState("");

  async function saveStatus() {
    setPending("status");
    setMessage("");

    try {
      await updateStatus({ id: bookingId, status });
      setMessage("Төлөв хадгалагдлаа.");
      router.refresh();
    } catch {
      setMessage("Төлөв хадгалагдсангүй.");
    } finally {
      setPending(null);
    }
  }

  async function saveNote() {
    setPending("note");
    setMessage("");

    try {
      await updateNote({ adminNote, id: bookingId });
      setMessage("Тэмдэглэл хадгалагдлаа.");
      router.refresh();
    } catch {
      setMessage("Тэмдэглэл хадгалагдсангүй.");
    } finally {
      setPending(null);
    }
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
            {bookingStatuses.map((item) => (
              <option key={item} value={item}>
                {bookingStatusLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <Button
          className="mt-4"
          disabled={pending === "status"}
          onClick={saveStatus}
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
          onClick={saveNote}
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
