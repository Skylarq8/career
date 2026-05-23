"use client";

import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/site-content";
import { ButtonLink } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      menuRef.current.style.height = open ? "auto" : "0";
      menuRef.current.style.opacity = open ? "1" : "0";
      return;
    }

    gsap.to(menuRef.current, {
      autoAlpha: open ? 1 : 0,
      duration: 0.34,
      ease: "power2.out",
      height: open ? "auto" : 0,
      y: open ? 0 : -10,
    });
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/88 backdrop-blur-xl">
      <nav className="site-shell flex min-h-20 items-center justify-between gap-4">
        <Link className="heading-font text-xl font-extrabold text-navy" href="/">
          Миний Чиглэл
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navigation.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-soft-white",
                pathname === item.href ? "text-emerald" : "text-navy",
              ].join(" ")}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block">
          <ButtonLink href="/booking">Цаг хүсэх</ButtonLink>
        </div>
        <button
          aria-expanded={open}
          aria-label={open ? "Цэс хаах" : "Цэс нээх"}
          className="inline-grid h-12 w-12 place-items-center border-line text-navy transition hover:border-emerald lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <div
        ref={menuRef}
        className={[
          "h-0 overflow-hidden border-t border-line/70 bg-soft-white/92 opacity-0 lg:hidden",
          open ? "" : "pointer-events-none",
        ].join(" ")}
      >
        <div className="site-shell grid gap-2 py-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className="rounded-2xl px-4 py-3 font-semibold text-navy transition hover:bg-skywash"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
