"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { DataTable } from "@/components/admin/data-table";
import { AdminLoading } from "@/components/admin/admin-dashboard-client";
import { StatusBadge } from "@/components/admin/status-badge";
import { api } from "@/convex/_generated/api";
import { bookingStatusLabels, bookingStatuses } from "@/lib/admin-types";
import type { BookingStatus } from "@/lib/admin-types";

const filters = [
  { label: "Бүгд", value: "" },
  ...bookingStatuses.map((status) => ({
    label: bookingStatusLabels[status],
    value: status,
  })),
] as const;

export function AdminBookingsClient({
  search,
  status,
}: {
  search?: string;
  status?: BookingStatus;
}) {
  const bookings = useQuery(api.bookings.listBookings, {
    search,
    status,
  });

  if (!bookings) {
    return <AdminLoading label="Цагийн хүсэлтүүд уншиж байна..." />;
  }

  return (
    <>
      <div>
        <p className="font-semibold text-emerald">Bookings</p>
        <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy">
          Цагийн хүсэлтүүд
        </h1>
      </div>
      <form className="mt-6 grid gap-3 rounded-[1.5rem] border border-line bg-soft-white p-4 md:grid-cols-[1fr_14rem_auto]">
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Нэр эсвэл утас
          <input className="field" defaultValue={search} name="search" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Төлөв
          <select className="field" defaultValue={status ?? ""} name="status">
            {filters.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button className="min-h-12 self-end rounded-full bg-navy px-5 font-semibold text-white transition hover:bg-emerald">
          Шүүх
        </button>
      </form>
      <div className="mt-6">
        <DataTable
          headers={["Эцэг эх", "Хүүхэд", "Үйлчилгээ", "Хүссэн цаг", "Төлөв", "Үүссэн"]}
        >
          {bookings.map((booking) => (
            <tr key={booking._id} className="align-top text-navy">
              <td className="px-4 py-4">
                <Link className="font-bold hover:text-emerald" href={`/admin/bookings/${booking._id}`}>
                  {booking.parentName}
                </Link>
                <span className="mt-1 block text-muted">{booking.phone}</span>
              </td>
              <td className="px-4 py-4">
                {booking.studentName}
                <span className="mt-1 block text-muted">{booking.grade}</span>
              </td>
              <td className="min-w-48 px-4 py-4">{booking.serviceType}</td>
              <td className="whitespace-nowrap px-4 py-4">
                {formatDate(booking.preferredDate)}
                <span className="mt-1 block text-muted">{booking.preferredTime}</span>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={booking.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-muted">
                {formatDateTime(booking.createdAt)}
              </td>
            </tr>
          ))}
        </DataTable>
        {bookings.length === 0 ? (
          <p className="mt-4 rounded-[1.25rem] border border-dashed border-line p-5 text-muted">
            Энэ шүүлтүүрт тохирох хүсэлт алга.
          </p>
        ) : null}
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
