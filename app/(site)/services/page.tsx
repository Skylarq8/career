import type { Metadata } from "next";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ServiceCard } from "@/components/site/service-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Үйлчилгээ",
};

export default function ServicesPage() {
  return (
    <>
      <section className="hero-gradient border-b border-line py-16 sm:py-20">
        <div className="site-shell">
          <SectionHeader
            description="Хүүхдийн эргэлзээ, гэр бүлийн яриа, үнэлгээтэй төлөвлөгөөний түвшнээс хамаарч уулзалтын хүрээг сонгоно."
            eyebrow="Үйлчилгээ"
            title="Мэргэжил сонголтыг бодит алхам болгох багцууд"
          />
        </div>
      </section>
      <AnimatedSection className="site-shell py-16 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection className="site-shell pb-20">
        <div className="rounded-[1.75rem] border border-line bg-soft-white p-6 premium-shadow sm:p-8">
          <h2 className="heading-font text-3xl font-extrabold text-navy">
            Аль багц тохирохоо мэдэхгүй байна уу?
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-muted">
            Хүсэлт дээр хүүхдийн анги, гол асуултаа бичихэд зөвлөх эхний
            холболтоор тохирох уулзалтын хүрээг санал болгоно.
          </p>
          <ButtonLink className="mt-6" href="/booking">
            Цаг хүсэх
          </ButtonLink>
        </div>
      </AnimatedSection>
    </>
  );
}
