"use client";

import { Compass, GraduationCap, Lightbulb, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { PointerEvent } from "react";

const floatingCards = [
  {
    className: "left-1 top-[22%] sm:-left-2",
    icon: Compass,
    label: "1:1 зөвлөгөө",
  },
  {
    className: "right-1 top-[14%] sm:-right-1",
    icon: GraduationCap,
    label: "RIASEC тест",
  },
] as const;

export function HeroVisual({
  portraitAlt = "Миний Чиглэл зөвлөхийн хөрөг",
  portraitSrc,
}: {
  portraitAlt?: string;
  portraitSrc?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!frameRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-portrait-stage]",
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, duration: 0.82, ease: "power3.out", y: 0 },
      );
      gsap.fromTo(
        "[data-hero-float]",
        { autoAlpha: 0, scale: 0.94, y: 20 },
        {
          autoAlpha: 1,
          duration: 0.62,
          ease: "power3.out",
          scale: 1,
          stagger: 0.1,
          y: 0,
        },
      );
      gsap.to("[data-hero-float]", {
        duration: 4.8,
        ease: "sine.inOut",
        repeat: -1,
        stagger: 0.34,
        y: -9,
        yoyo: true,
      });
      gsap.to("[data-hero-ring]", {
        duration: 30,
        ease: "none",
        repeat: -1,
        rotate: 360,
        transformOrigin: "50% 50%",
      });
      gsap.to("[data-hero-spark]", {
        autoAlpha: 0.35,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        stagger: 0.26,
        y: -8,
        yoyo: true,
      });
    }, frameRef);

    return () => context.revert();
  }, []);

  function movePortrait(event: PointerEvent<HTMLDivElement>) {
    if (!frameRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = frameRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;

    gsap.to("[data-portrait-stage]", {
      duration: 0.7,
      ease: "power2.out",
      rotateX: -y * 0.18,
      rotateY: x * 0.18,
      x,
      y,
    });
  }

  function resetPortrait() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to("[data-portrait-stage]", {
      duration: 0.7,
      ease: "power2.out",
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
    });
  }

  return (
    <div
      ref={frameRef}
      aria-label="Миний Чиглэл зөвлөхийн хөрөг зураг байрлах hero visual"
      className="relative isolate mx-auto h-[32rem] w-full max-w-[31rem] sm:h-[39rem] lg:h-[43rem]"
      onPointerLeave={resetPortrait}
      onPointerMove={movePortrait}
      role="img"
    >
      <div className="absolute inset-x-[8%] top-[8%] h-[76%] rounded-full border border-gold/25 bg-soft-white/35" />
      <div
        data-hero-ring
        className="absolute inset-x-[3%] top-[3%] h-[84%] rounded-full border border-dashed border-emerald/28"
      />
      <div className="absolute inset-x-[16%] top-[15%] h-[62%] rounded-full border border-navy/10" />
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-emerald/24"
        fill="none"
        viewBox="0 0 500 680"
      >
        <path
          d="M66 472C104 394 164 432 188 336C218 215 309 194 421 230"
          stroke="currentColor"
          strokeDasharray="3 11"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M90 560C153 508 230 548 271 474C307 409 351 392 421 411"
          stroke="#D6A84F"
          strokeDasharray="2 10"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>

      <span
        data-hero-spark
        className="absolute left-[18%] top-[11%] inline-grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-soft-white/82 text-gold shadow-[0_12px_30px_rgba(16,42,67,0.12)]"
      >
        <Lightbulb size={17} />
      </span>
      <span
        data-hero-spark
        className="absolute right-[18%] top-[5%] inline-grid h-8 w-8 place-items-center rounded-full border border-white/60 bg-soft-white/78 text-emerald shadow-[0_12px_30px_rgba(16,42,67,0.1)]"
      >
        <Compass size={15} />
      </span>
      <span
        data-hero-spark
        className="absolute bottom-[25%] left-[8%] inline-grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-soft-white/80 text-navy shadow-[0_12px_30px_rgba(16,42,67,0.1)]"
      >
        <TrendingUp size={16} />
      </span>

      <div
        data-portrait-stage
        className="absolute inset-x-[11%] bottom-0 top-[11%] rounded-t-[11rem] rounded-b-[2rem] border border-white/75 bg-soft-white/70 p-3 shadow-[0_2rem_5rem_rgba(16,42,67,0.18)] [transform-style:preserve-3d]"
      >
        <div className="relative h-full overflow-hidden rounded-t-[10rem] rounded-b-[1.5rem] border border-line bg-[linear-gradient(180deg,#FFFDF8_0%,#EEF7F3_48%,#E7D9C4_100%)]">
          {portraitSrc ? (
            <Image
              alt={portraitAlt}
              className="object-cover object-[50%_18%]"
              fill
              priority
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 420px, 470px"
              src={portraitSrc}
            />
          ) : (
            <PortraitFallback />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent_0%,rgba(16,42,67,0.22)_46%,rgba(16,42,67,0.46)_100%)]" />
          <div className="absolute inset-x-[5%] lg:inset-x-[14%] lg:bottom-[9%] bottom-[5%] rounded-[1.35rem] border border-white/34 bg-white/18 px-4 py-3 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white/84">Миний Чиглэл</p>
            <p className="heading-font mt-1 text-lg font-extrabold text-white">
              Хүүхдийн сонголтыг тайван чиглүүлнэ
            </p>
          </div>
        </div>
      </div>

      {floatingCards.map(({ className, icon: Icon, label }) => (
        <div
          key={label}
          data-hero-float
          className={`absolute ${className} z-10 flex items-center gap-3 rounded-[1.2rem] border border-white/72 bg-soft-white/78 px-3 py-3 text-sm font-bold text-navy shadow-[0_1rem_2.5rem_rgba(16,42,67,0.13)] backdrop-blur-md sm:px-4`}
        >
          <span className="inline-grid h-9 w-9 place-items-center rounded-2xl bg-emerald text-white">
            <Icon size={17} />
          </span>
          {label}
        </div>
      ))}
    </div>
  );
}

function PortraitFallback() {
  return (
    <>
      <div className="absolute inset-x-[12%] top-[10%] h-[38%] rounded-full border border-white/55 bg-white/32" />
      <div className="absolute left-1/2 top-[12%] h-36 w-36 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_38%,#F4D7C5_0%,#EBC4AB_45%,#C88A6A_100%)] shadow-[0_1rem_2rem_rgba(16,42,67,0.12)] sm:h-44 sm:w-44" />
      <div className="absolute left-1/2 top-[6%] h-44 w-44 -translate-x-1/2 rounded-t-full rounded-b-[3.5rem] bg-[#463229] [clip-path:polygon(16%_44%,24%_18%,47%_5%,72%_10%,86%_34%,82%_73%,68%_48%,50%_40%,28%_48%,21%_78%)] sm:h-56 sm:w-56" />
      <div className="absolute left-1/2 top-[42%] h-[58%] w-[118%] -translate-x-1/2 rounded-t-[8rem] bg-[linear-gradient(135deg,#102A43_0%,#245A68_54%,#2F9E7E_100%)] shadow-[0_-1rem_3rem_rgba(255,253,248,0.18)_inset]" />
      <div className="absolute left-1/2 top-[37%] h-[19%] w-[36%] -translate-x-1/2 rounded-b-[3rem] bg-[#E9BEA4]" />
    </>
  );
}
