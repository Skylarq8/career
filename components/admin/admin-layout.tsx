import {
  ClipboardList,
  FlaskConical,
  LayoutDashboard,
  Radar,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/logout-button";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Тойм" },
  { href: "/admin/bookings", icon: ClipboardList, label: "Цагийн хүсэлт" },
  { href: "/admin/test-results", icon: FlaskConical, label: "Тестийн үр дүн" },
  { href: "/admin/riasec-results", icon: Radar, label: "RIASEC үр дүн" },
  { href: "/admin/settings", icon: Settings2, label: "Тохиргоо" },
] as const;

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <div className="site-shell grid gap-5 py-5 lg:grid-cols-[15rem_1fr]">
        <aside className="rounded-[1.5rem] border border-line bg-night p-4 text-white lg:sticky lg:top-5 lg:h-[calc(100svh-2.5rem)]">
          <Link className="heading-font block px-3 py-3 text-xl font-extrabold" href="/admin">
            Миний Чиглэл
          </Link>
          <p className="px-3 text-sm text-white/58">Admin dashboard</p>
          <nav className="mt-6 grid gap-1">
            {links.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 font-semibold text-white/76 transition hover:bg-white/10 hover:text-white"
                href={href}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 border-t border-white/10 pt-4 lg:absolute lg:inset-x-4 lg:bottom-4">
            <LogoutButton />
          </div>
        </aside>
        <section className="min-w-0 rounded-[1.75rem] border border-line bg-soft-white/66 p-4 sm:p-6">
          {children}
        </section>
      </div>
    </div>
  );
}
