"use client";

import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function FAQAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const panels = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    panels.current.forEach((panel, index) => {
      if (!panel) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        panel.style.height = index === openIndex ? "auto" : "0";
        panel.style.opacity = index === openIndex ? "1" : "0";
        return;
      }

      gsap.to(panel, {
        autoAlpha: index === openIndex ? 1 : 0,
        duration: 0.34,
        ease: "power2.out",
        height: index === openIndex ? "auto" : 0,
      });
    });
  }, [openIndex]);

  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div
          key={item.question}
          className="overflow-hidden rounded-[1.25rem] border border-line bg-soft-white"
        >
          <h3>
            <button
              aria-expanded={openIndex === index}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-navy"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              type="button"
            >
              {item.question}
              <ChevronDown
                className={[
                  "shrink-0 text-emerald transition",
                  openIndex === index ? "rotate-180" : "",
                ].join(" ")}
                size={20}
              />
            </button>
          </h3>
          <div
            ref={(node) => {
              panels.current[index] = node;
            }}
            className={index === 0 ? "overflow-hidden" : "h-0 overflow-hidden opacity-0"}
          >
            <p className="px-5 pb-5 leading-7 text-muted">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
