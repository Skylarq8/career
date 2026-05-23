import type { Metadata } from "next";
import { AnimatedSection } from "@/components/motion/animated-section";
import { TestExperience } from "@/components/tests/test-experience";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Тест",
};

export default function TestsPage() {
  return (
    <>
      <section className="hero-gradient border-b border-line py-16 sm:py-20">
        <div className="site-shell">
          <SectionHeader
            description="Өөрийгөө ажиглах богино тестүүд. Нэг асуултад нэг сонголт хийж, ерөнхий чиглэлээ харна."
            eyebrow="Career exploration"
            title="Сонирхол, суралцах хэв маяг, хүчтэй талаа ажиглах"
          />
          <p className="mt-7 max-w-3xl rounded-[1.25rem] border border-gold/30 bg-soft-white/75 p-5 leading-8 text-navy">
            Энэхүү тест нь ерөнхий чиглэл өгөх зорилготой бөгөөд мэргэжлийн
            оношилгоо биш. Илүү нарийвчилсан дүгнэлт авах бол зөвлөхтэй
            уулзахыг санал болгож байна.
          </p>
        </div>
      </section>
      <AnimatedSection className="site-shell pt-12">
        <div className="grid gap-6 rounded-[1.75rem] border border-line bg-soft-white p-6 premium-shadow lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
          <div>
            <p className="font-semibold text-emerald">RIASEC / Holland Code</p>
            <h2 className="heading-font mt-3 text-3xl font-extrabold text-navy">
              36 асуулттай мэргэжлийн сонирхлын дэлгэрэнгүй тест
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-muted">
              Бодит, судлаач, бүтээлч, нийгмийн, манлайлагч, системтэй гэсэн 6
              чиглэлээс топ 3 сонирхлын кодоо харна. Ойролцоогоор 5-7 минут.
            </p>
          </div>
          <ButtonLink href="/tests/riasec">RIASEC тест эхлэх</ButtonLink>
        </div>
      </AnimatedSection>
      <AnimatedSection className="site-shell py-16 sm:py-20">
        <TestExperience />
      </AnimatedSection>
    </>
  );
}
