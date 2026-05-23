import type { BookingStatus } from "@prisma/client";

const labels: Record<BookingStatus, string> = {
  CANCELLED: "Цуцалсан",
  CONFIRMED: "Баталгаажсан",
  CONTACTED: "Холбогдсон",
  DONE: "Дууссан",
  NEW: "Шинэ",
};

const tones: Record<BookingStatus, string> = {
  CANCELLED: "border-red-200 bg-red-50 text-red-700",
  CONFIRMED: "border-emerald/25 bg-emerald/12 text-navy",
  CONTACTED: "border-gold/35 bg-gold/12 text-navy",
  DONE: "border-navy/15 bg-navy/8 text-navy",
  NEW: "border-sky-200 bg-sky-50 text-sky-800",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={[
        "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
        tones[status],
      ].join(" ")}
    >
      {labels[status]}
    </span>
  );
}
