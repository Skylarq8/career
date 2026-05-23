"use client";

import { useQuery } from "convex/react";
import { BookingControls } from "@/components/admin/booking-controls";
import { AdminLoading } from "@/components/admin/admin-dashboard-client";
import { StatusBadge } from "@/components/admin/status-badge";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export function AdminBookingDetailClient({ id }: { id: string }) {
  const bookingId = id as Id<"bookings">;
  const booking = useQuery(api.bookings.getBooking, { id: bookingId });

  if (booking === undefined) {
    return <AdminLoading label="Цагийн хүсэлтийн дэлгэрэнгүй уншиж байна..." />;
  }

  if (!booking) {
    return (
      <div className="rounded-[1.5rem] border border-line bg-soft-white p-5 text-muted">
        Цагийн хүсэлт олдсонгүй.
      </div>
    );
  }

  const details = [
    { label: "Эцэг эх", value: booking.parentName },
    { label: "Хүүхэд", value: booking.studentName },
    { label: "Утас", value: booking.phone },
    { label: "Имэйл", value: booking.email || "Оруулаагүй" },
    { label: "Анги", value: booking.grade },
    { label: "Зөвлөгөө", value: booking.serviceType },
    { label: "Хүссэн өдөр", value: formatDate(booking.preferredDate) },
    { label: "Хүссэн цаг", value: booking.preferredTime },
    { label: "Хэлбэр", value: booking.mode === "ONLINE" ? "Онлайн" : "Биечлэн" },
    { label: "Үүссэн", value: formatDateTime(booking.createdAt) },
  ] as const;

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-emerald">Booking detail</p>
          <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy">
            {booking.parentName}
          </h1>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <div className="mt-7 grid gap-5 xl:grid-cols-[1fr_0.78fr]">
        <div className="grid gap-5">
          <div className="grid gap-3 rounded-[1.5rem] border border-line bg-soft-white p-5 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-[1.25rem] bg-cream/55 p-4">
                <p className="text-sm font-semibold text-muted">{detail.label}</p>
                <p className="mt-2 break-words font-bold leading-7 text-navy">{detail.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[1.5rem] border border-line bg-soft-white p-5">
            <p className="text-sm font-semibold text-muted">Гол санаа зовнил / мессеж</p>
            <p className="mt-3 whitespace-pre-wrap leading-8 text-navy">
              {booking.message || "Мессеж оруулаагүй."}
            </p>
          </div>
        </div>
        <BookingControls
          bookingId={booking._id}
          initialNote={booking.adminNote}
          initialStatus={booking.status}
        />
      </div>
    </>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("mn-MN", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

function formatDateTime(timestamp: number) {
  return new Intl.DateTimeFormat("mn-MN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}
