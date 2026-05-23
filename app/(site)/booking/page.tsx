import type { Metadata } from "next";
import { BookingForm } from "@/components/site/booking-form";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Цаг хүсэх",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const selectedService = services.find((service) => service.slug === params.service);

  return (
    <section className="hero-gradient min-h-[calc(100svh-5rem)] py-14 sm:py-20">
      <div className="site-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionHeader
            description="Эцэг эх, хүүхдийн мэдээлэл болон хүссэн цагийн хүрээг үлдээнэ. Зөвлөх тантай гараар холбогдож баталгаажуулна."
            eyebrow="Цагийн хүсэлт"
            title="Зөвлөгөөний хүсэлтээ илгээх"
          />
          <div className="mt-7 grid gap-4 rounded-[1.5rem] border border-line bg-soft-white/72 p-5 text-sm leading-7 text-muted">
            <p>Хүсэлт илгээхэд төлбөр авахгүй.</p>
            <p>Онлайн төлбөр, банкны screenshot, QPay энэ хувилбарт байхгүй.</p>
            <p>Төлбөр болон эцсийн цагийг зөвлөх холбогдсоны дараа авна.</p>
          </div>
        </div>
        <BookingForm defaultService={selectedService?.title} />
      </div>
    </section>
  );
}
