"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

const title =
  "Хүүхдийн ирээдүйн мэргэжлийг зөв чиглүүлэх хувийн зөвлөгөө";

export function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const words = ref.current.querySelectorAll("[data-word]");
    const context = gsap.context(() => {
      gsap.fromTo(
        words,
        { autoAlpha: 0, filter: "blur(10px)", y: 28 },
        {
          autoAlpha: 1,
          duration: 0.72,
          ease: "power3.out",
          filter: "blur(0px)",
          stagger: 0.055,
          y: 0,
        },
      );
    }, ref);

    return () => context.revert();
  }, []);

  return (
    <h1
      ref={ref}
      className="heading-font max-w-5xl text-4xl font-extrabold leading-[1.12] text-navy sm:text-5xl lg:text-7xl"
    >
      {title.split(" ").map((word) => (
        <span key={word} className="mr-[0.32em] inline-block" data-word>
          {word}
        </span>
      ))}
    </h1>
  );
}
