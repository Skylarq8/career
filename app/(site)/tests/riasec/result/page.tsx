import type { Metadata } from "next";
import { RiasecResultView } from "@/components/tests/riasec-result-view";

export const metadata: Metadata = {
  title: "RIASEC үр дүн",
};

export default function RiasecResultPage() {
  return (
    <section className="hero-gradient py-12 sm:py-16">
      <div className="site-shell">
        <RiasecResultView />
      </div>
    </section>
  );
}
