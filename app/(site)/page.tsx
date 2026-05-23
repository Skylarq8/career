import { MessageCircleMore, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { HeroCopy } from "@/components/site/hero-copy";
import { HeroVisual } from "@/components/site/hero-visual";
import { ServiceCard } from "@/components/site/service-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import {
  faqs,
  services,
  testimonials,
  values,
  whyCards,
  workSteps,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <section className="hero-gradient overflow-hidden">
        <div className="site-shell grid min-h-[calc(88svh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div className="order-2 lg:order-1">
            <HeroCopy />
          </div>
          <div className="order-1 lg:order-2">
            <HeroVisual portraitSrc="/images/image.jpg" />
          </div>
        </div>
      </section>

      <section className="site-shell py-20">
        <SectionHeader
          description="Мэргэжил сонголт бол зөвхөн их сургууль сонгох тухай биш. Энэ нь хүүхдийн сонирхол, чадвар, зан төлөв, амьдралын хэв маягтай тохирох чиглэлийг хамтдаа тодорхойлох үйл явц юм."
          eyebrow="Яагаад хэрэгтэй вэ"
          title="Сонголтын цаана хүүхдийг бүхлээр нь харах хэрэгтэй"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {whyCards.map(({ icon: Icon, text, title }) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-line bg-soft-white p-6 premium-shadow"
            >
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-emerald/12 text-emerald">
                <Icon size={22} />
              </span>
              <h3 className="heading-font mt-5 text-2xl font-extrabold text-navy">
                {title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <AnimatedSection className="border-y border-line bg-soft-white/55 py-20">
        <div className="site-shell">
          <SectionHeader
            description="Нэг уулзалтаар эргэлзээг тайлах, гэр бүлийн яриаг чиглүүлэх, үнэлгээтэй төлөвлөгөө болгох хүртэл шаталсан багцууд."
            eyebrow="Үйлчилгээ"
            title="Гэр бүлийн хэрэгцээнд тохирох зөвлөгөө"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="site-shell py-20">
        <SectionHeader
          description="Хүсэлт ирсний дараа зөвлөх гараар холбогдож уулзалтыг баталгаажуулна. Хүүхдийн сонголтод яаралгүй, ойлгомжтой алхмаар орно."
          eyebrow="Яаж ажилладаг вэ"
          title="Хүсэлтээс дараагийн төлөвлөгөө хүртэл"
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {workSteps.map((step, index) => (
            <li key={step.title} className="relative rounded-[1.5rem] border border-line bg-cream p-6">
              <span className="inline-grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="heading-font mt-5 text-xl font-extrabold text-navy">
                {step.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </AnimatedSection>

      <AnimatedSection className="site-shell pb-20">
        <div className="grid gap-7 rounded-[1.75rem] border border-line bg-soft-white p-6 premium-shadow lg:grid-cols-[1fr_0.92fr] lg:p-10">
          <SectionHeader
            description="Сонирхол, суралцах хэв маяг, хүчтэй талын мини тестээр хүүхэд өөрийгөө ажиглаж эхэлнэ. Үр дүн нь онош биш, зөв ярилцлагын эхлэл."
            eyebrow="Тестийн урьдчилсан туршлага"
            title="Өөрийгөө таних жижиг алхмаас эхэл"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Сонирхлын 10 асуулт",
              "Суралцах хэв маягийн 8 асуулт",
              "Хүчтэй талын 10 асуулт",
              "Үр дүнгийн дараах зөвлөгөөний CTA",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[1.25rem] border border-line bg-cream/65 p-4 font-semibold text-navy"
              >
                <ShieldCheck className="shrink-0 text-emerald" size={20} />
                {item}
              </div>
            ))}
            <ButtonLink className="sm:col-span-2" href="/tests">
              Тест эхлэх
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-night py-20 text-white">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeader
            description="Сонголтод хүүхдийн сониуч зан, суралцах дадал, гэр бүлийн бодит нөхцөл зэрэгцэн ордог. Зөвлөхийн ажил нь эдгээрийг нэг хэл дээр буулгах."
            eyebrow="Зөвлөхийн хандлага"
            inverted
            title="Итгэл төрүүлэхүйц тайван, хүүхдэд нээлттэй яриа"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, text, title }) => (
              <article key={title} className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5">
                <Icon className="text-gold" size={22} />
                <h3 className="heading-font mt-4 text-xl font-extrabold">{title}</h3>
                <p className="mt-3 leading-7 text-white/68">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="site-shell py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            description="Эндэх сэтгэгдлүүд нь үйлчилгээний өнгө аясыг харуулах жишээ placeholder контент."
            eyebrow="Сэтгэгдэл"
            title="Эцэг эх, сурагчдад мэдрэгдэх өөрчлөлт"
          />
          <ButtonLink href="/about" variant="secondary">
            Зөвлөхийн тухай
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.name} className="rounded-[1.5rem] border border-line bg-soft-white p-6">
              <MessageCircleMore className="text-emerald" size={24} />
              <blockquote className="mt-5 text-lg leading-8 text-navy">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="site-shell pb-20">
        <div id="faq" className="grid scroll-mt-28 gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <SectionHeader
            description="Цаг хүсэх, тестийн хүрээ, гэр бүлийн оролцооны талаар түгээмэл асуултууд."
            eyebrow="FAQ"
            title="Эхлэхийн өмнө мэдэх зүйлс"
          />
          <FAQAccordion items={faqs} />
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-20">
        <div className="site-shell dark-cta-gradient overflow-hidden rounded-[1.75rem] px-6 py-12 text-white premium-shadow sm:px-10 lg:px-14">
          <div className="max-w-3xl">
            <p className="font-semibold text-gold">Дараагийн алхам</p>
            <h2 className="heading-font mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
              Хүүхдийн чиглэлийг илүү ойлгомжтой болгох уулзалтаа хүсээрэй
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-white/72">
              Та асуудлаа товч бичнэ. Зөвлөх тантай холбогдож тохирох үйлчилгээ,
              уулзалтын өдөр, хэлбэрийг баталгаажуулна.
            </p>
            <ButtonLink className="mt-8" href="/booking" variant="dark">
              Цаг хүсэх
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
