import type { Metadata } from "next";
import { RiasecTestFlow } from "@/components/tests/riasec-test-flow";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "RIASEC тест",
};

export default function RiasecTestPage() {
  return (
    <>
      <section className="hero-gradient border-b border-line py-14 sm:py-18">
        <div className="site-shell">
          <SectionHeader
            description="Holland Code-ийн 6 сонирхлын чиглэлийг 36 богино өгүүлбэрээр ажиглах career exploration хэрэгсэл."
            eyebrow="RIASEC тест"
            title="Мэргэжлийн сонирхлын илүү давамгай чиглэлээ харъя"
          />
          <p className="mt-6 max-w-3xl rounded-[1.25rem] border border-gold/30 bg-soft-white/78 p-5 leading-8 text-navy">
            Энэхүү тест нь мэргэжил сонголтын ерөнхий чиглэл өгөх зорилготой
            бөгөөд оношилгоо биш. Илүү нарийвчилсан зөвлөгөө авах бол мэргэжлийн
            зөвлөхтэй уулзахыг санал болгож байна.
          </p>
        </div>
      </section>
      <section className="site-shell py-12 sm:py-16">
        <RiasecTestFlow />
      </section>
    </>
  );
}
