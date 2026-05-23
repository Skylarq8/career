"use client";

import { ArrowRight, BadgeCheck } from "lucide-react";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { HeroTitle } from "@/components/site/hero-title";
import { ButtonLink } from "@/components/ui/button";

export function HeroCopy() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-copy]",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          duration: 0.62,
          ease: "power3.out",
          stagger: 0.09,
          y: 0,
        },
      );
    }, ref);

    return () => context.revert();
  }, []);

  return (
    <div ref={ref}>
      <p
        data-hero-copy
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-soft-white/70 px-4 py-2 text-sm font-semibold text-navy"
      >
        <BadgeCheck className="text-emerald" size={18} />
        Хүүхэд ба гэр бүлд зориулсан мэргэжил сонголтын зөвлөгөө
      </p>
      <HeroTitle />
      <p data-hero-copy className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-xl">
        Сонирхол, чадвар, зан төлөв, суралцах арга барилд тулгуурлан хүүхэд
        бүрт тохирсон мэргэжлийн чиглэл гаргахад тусална.
      </p>
      <p data-hero-copy className="mt-4 max-w-xl text-base font-semibold leading-7 text-navy">
        Хүүхдийн ирээдүйг таамгаар биш, ойлголт дээр тулгуурлан төлөвлөе.
      </p>
      <div data-hero-copy className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/booking">Цаг хүсэх</ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          Үйлчилгээ харах
          <ArrowRight size={18} />
        </ButtonLink>
      </div>
    </div>
  );
}
