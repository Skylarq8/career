import Link from "next/link";
import { ClipboardCheck, FlaskConical, PhoneCall, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminBookings, getDashboardStats } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const [stats, latestBookings] = await Promise.all([
    getDashboardStats(),
    getAdminBookings({}),
  ]);

  const cards = [
    { icon: Sparkles, label: "Шинэ хүсэлт", value: stats.newBookings },
    { icon: PhoneCall, label: "Холбогдсон", value: stats.contactedBookings },
    { icon: ClipboardCheck, label: "Баталгаажсан", value: stats.confirmedBookings },
    { icon: FlaskConical, label: "Тестийн үр дүн", value: stats.testResults },
  ] as const;

  return (
    <>
      <div>
        <p className="font-semibold text-emerald">Admin</p>
        <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
          Зөвлөгөөний урсгал
        </h1>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ icon: Icon, label, value }) => (
          <article key={label} className="rounded-[1.5rem] border border-line bg-soft-white p-5">
            <Icon className="text-emerald" size={22} />
            <p className="mt-4 text-sm font-semibold text-muted">{label}</p>
            <p className="heading-font mt-2 text-4xl font-extrabold text-navy">{value}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-[1.5rem] border border-line bg-soft-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="heading-font text-2xl font-extrabold text-navy">
            Сүүлийн хүсэлтүүд
          </h2>
          <Link className="font-semibold text-emerald hover:text-navy" href="/admin/bookings">
            Бүгдийг харах
          </Link>
        </div>
        <div className="mt-5 grid gap-3">
          {latestBookings.slice(0, 5).map((booking) => (
            <Link
              key={booking.id}
              className="grid gap-3 rounded-[1.25rem] border border-line bg-cream/45 p-4 transition hover:border-emerald sm:grid-cols-[1fr_auto] sm:items-center"
              href={`/admin/bookings/${booking.id}`}
            >
              <span>
                <span className="block font-bold text-navy">{booking.parentName}</span>
                <span className="mt-1 block text-sm text-muted">
                  {booking.studentName} · {booking.phone}
                </span>
              </span>
              <StatusBadge status={booking.status} />
            </Link>
          ))}
          {latestBookings.length === 0 ? (
            <p className="rounded-[1.25rem] border border-dashed border-line p-5 text-muted">
              Одоогоор цагийн хүсэлт алга.
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
