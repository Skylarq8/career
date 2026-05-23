"use client";

import { gsap } from "gsap";
import { ArrowUpRight, Clock3, UsersRound } from "lucide-react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button";

export function ServiceCard({
  service,
}: {
  service: {
    slug: string;
    title: string;
    duration: string;
    audience: string;
    description: string;
    includes: readonly string[];
  };
}) {
  const ref = useRef<HTMLElement>(null);

  function hover(active: boolean) {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to(ref.current, {
      borderColor: active ? "#2f9e7e" : "#e6ded2",
      boxShadow: active
        ? "0 26px 72px rgba(16, 42, 67, 0.16)"
        : "0 18px 52px rgba(16, 42, 67, 0.1)",
      duration: 0.28,
      ease: "power2.out",
      y: active ? -6 : 0,
    });
  }

  return (
    <article
      ref={ref}
      className="flex h-full flex-col rounded-[1.5rem] border border-line bg-soft-white p-6 shadow-[0_18px_52px_rgba(16,42,67,0.1)]"
      onPointerEnter={() => hover(true)}
      onPointerLeave={() => hover(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="heading-font text-2xl font-extrabold text-navy">
          {service.title}
        </h3>
        <ArrowUpRight className="mt-1 shrink-0 text-emerald" size={22} />
      </div>
      <p className="mt-4 leading-7 text-muted">{service.description}</p>
      <div className="mt-5 grid gap-3 text-sm text-navy">
        <p className="flex gap-2">
          <Clock3 className="mt-0.5 shrink-0 text-gold" size={18} />
          {service.duration}
        </p>
        <p className="flex gap-2">
          <UsersRound className="mt-0.5 shrink-0 text-emerald" size={18} />
          {service.audience}
        </p>
      </div>
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted">
        {service.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 rounded-2xl bg-skywash px-4 py-3 text-sm leading-6 text-navy">
        Төлбөрийн мэдээллийг зөвлөхтэй холбогдсоны дараа авна.
      </p>
      <div className="mt-auto pt-6">
        <ButtonLink href={`/booking?service=${service.slug}`}>
          Цаг хүсэх
        </ButtonLink>
      </div>
    </article>
  );
}
