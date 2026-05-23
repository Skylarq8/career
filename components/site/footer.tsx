import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { navigation } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[1.25fr_0.8fr_0.9fr]">
        <div>
          <p className="heading-font text-2xl font-extrabold">Миний Чиглэл</p>
          <p className="mt-4 max-w-md leading-7 text-white/68">
            Хүүхдийн сонирхол, чадвар, зан төлөв, гэр бүлийн хүлээлтийг
            ойлгож мэргэжил сонголтын дараагийн алхмыг тодруулах зөвлөгөө.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/72">
            <span className="rounded-full border border-white/12 px-4 py-2">
              Facebook
            </span>
            <span className="rounded-full border border-white/12 px-4 py-2">
              Instagram
            </span>
            <span className="rounded-full border border-white/12 px-4 py-2">
              Telegram
            </span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gold">Холбоос</p>
          <div className="mt-4 grid gap-3">
            {navigation.slice(0, -1).map((item) => (
              <Link
                key={item.href}
                className="text-white/72 transition hover:text-white"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link className="text-white/72 transition hover:text-white" href="/booking">
              Цаг хүсэх
            </Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gold">Холбоо барих</p>
          <div className="mt-4 grid gap-4 text-white/72">
            <p className="flex gap-3">
              <Phone className="mt-1 shrink-0" size={18} />
              <span>+976 0000 0000</span>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 shrink-0" size={18} />
              <span>hello@miniichiglel.mn</span>
            </p>
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0" size={18} />
              <span>Улаанбаатар, Монгол Улс</span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell py-5 text-sm text-white/52">
          © {new Date().getFullYear()} Миний Чиглэл. Бүх эрх хуулиар хамгаалагдсан.
        </div>
      </div>
    </footer>
  );
}
