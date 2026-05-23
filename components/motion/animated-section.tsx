"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            start: "top 84%",
            trigger: ref.current,
          },
          y: 0,
        },
      );
    }, ref);

    return () => context.revert();
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
