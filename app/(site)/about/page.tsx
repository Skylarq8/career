import type { Metadata } from "next";
import { Award, GraduationCap, HandHeart, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Зөвлөхийн тухай",
};

const trustPoints = [
  {
    icon: HandHeart,
    title: "Хүүхдийн дуу хоолойг сонсоно",
    text: "Сонголтыг зөвхөн оноо, нэр хүндээр хэмжихгүй. Хүүхдийн мэдрэмж, орчныг хамтад нь харна.",
  },
  {
    icon: ShieldCheck,
    title: "Эцэг эхэд ойлгомжтой",
    text: "Санаа зовнилыг шүүмжлэхгүйгээр бодит асуулт, дараагийн алхам болгон буулгана.",
  },
  {
    icon: Award,
    title: "Мэргэжлийн хүрээ тодорхой",
    text: "Зөвлөгөө, үнэлгээ, төлөвлөгөөний хүрээ болон хязгаарыг ил тод тайлбарлана.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="hero-gradient border-b border-line py-16 sm:py-20">
        <div className="site-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <SectionHeader
            description="Миний Чиглэл нь хүүхдийн сонирхол, чадвар, зан төлөв, суралцах дадал, гэр бүлийн хүлээлтийг нэг ярианд холбох зөвлөгөөний орон зай."
            eyebrow="Зөвлөхийн тухай"
            title="Шийдвэрийг тулгахгүй, чиглэлийг тодруулна"
          />
          <div className="rounded-[1.75rem] border border-line bg-soft-white/82 p-6 premium-shadow">
            <p className="text-sm font-semibold text-emerald">Consultant profile placeholder</p>
            <h2 className="heading-font mt-4 text-3xl font-extrabold text-navy">
              Нэр, туршлага, мэргэжлийн түүхээ энд оруулна
            </h2>
            <p className="mt-4 leading-8 text-muted">
              Сурагч, эцэг эхтэй ажилласан туршлага, боловсролын зөвлөгөөний
              арга барил, сертификат, чиглэлийн мэдээллийг бодит профайлаар
              солиход бэлэн бүтэц.
            </p>
          </div>
        </div>
      </section>
      <AnimatedSection className="site-shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeader
              description="Хүүхэд өөрийгөө илүү ойлгож, эцэг эх шийдвэрт илүү тайван оролцох нөхцөлийг бүтээнэ."
              eyebrow="Ажлын философи"
              title="Сонирхол, чадвар, бодит боломжийг зэрэг харна"
            />
            <ButtonLink className="mt-7" href="/booking">
              Цаг хүсэх
            </ButtonLink>
          </div>
          <div className="grid gap-4">
            {[
              "Туршлага: сурагчийн ярилцлага, эцэг эхийн хамтарсан хэлэлцүүлэг, мэргэжлийн чиглэл тодруулах зөвлөгөө.",
              "Боловсрол: зөвлөхийн боловсрол, сургалт, сертификатын placeholder мэдээлэл.",
              "Дүгнэлт: тестийн ерөнхий үр дүнг ярилцлага, ажиглалт, гэр бүлийн зорилготой холбох арга.",
            ].map((item) => (
              <p
                key={item}
                className="rounded-[1.5rem] border border-line bg-soft-white p-5 leading-8 text-muted"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="border-y border-line bg-soft-white/55 py-16 sm:py-20">
        <div className="site-shell">
          <SectionHeader
            description="Дулаан өнгө аястай ч шийдвэрийн чанарыг хамгаалсан ажиллах зарчим."
            eyebrow="Итгэл"
            title="Эцэг эх яагаад энэ үйлчилгээнд итгэх вэ"
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {trustPoints.map(({ icon: Icon, text, title }) => (
              <article key={title} className="rounded-[1.5rem] border border-line bg-cream p-6">
                <Icon className="text-emerald" size={24} />
                <h3 className="heading-font mt-5 text-2xl font-extrabold text-navy">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="site-shell py-16 sm:py-20">
        <div className="rounded-[1.75rem] border border-line bg-soft-white p-6 premium-shadow sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 font-semibold text-emerald">
                <GraduationCap size={20} />
                Хөтөлбөр, мэргэжил, ирээдүйн орчныг хамт судална
              </p>
              <h2 className="heading-font mt-4 text-3xl font-extrabold text-navy">
                Эхний уулзалтаар гол асуултаа тодруулъя
              </h2>
            </div>
            <ButtonLink href="/booking">Зөвлөгөө хүсэх</ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
