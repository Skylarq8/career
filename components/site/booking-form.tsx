"use client";

import { CalendarDays, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { publicApiPath } from "@/lib/api-url";
import { services } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

type BookingState = "idle" | "submitting" | "success" | "error";

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const [state, setState] = useState<BookingState>("idle");
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  async function submit(formData: FormData) {
    setState("submitting");
    setError("");

    const payload = {
      parentName: formData.get("parentName"),
      studentName: formData.get("studentName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      grade: formData.get("grade"),
      serviceType: formData.get("serviceType"),
      preferredDate: formData.get("preferredDate"),
      preferredTime: formData.get("preferredTime"),
      mode: formData.get("mode"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch(publicApiPath("/api/bookings"), {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Цагийн хүсэлт илгээж чадсангүй.");
      }

      setState("success");
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Цагийн хүсэлт илгээж чадсангүй.",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-[1.75rem] border border-emerald/25 bg-soft-white p-6 premium-shadow sm:p-8">
        <CheckCircle2 className="text-emerald" size={34} />
        <h2 className="heading-font mt-5 text-3xl font-extrabold text-navy">
          Таны цагийн хүсэлт амжилттай илгээгдлээ.
        </h2>
        <p className="mt-4 max-w-2xl leading-8 text-muted">
          Зөвлөх тантай удахгүй холбогдож баталгаажуулна. Энэ нь одоогоор
          баталгаажсан цаг биш тул утсаа нээлттэй байлгаарай.
        </p>
      </div>
    );
  }

  return (
    <form
      action={submit}
      className="rounded-[1.75rem] border border-line bg-soft-white p-5 premium-shadow sm:p-8"
    >
      <div className="mb-7 flex items-start gap-4 rounded-[1.25rem] bg-skywash p-4 text-navy">
        <span className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-emerald">
          <CalendarDays size={20} />
        </span>
        <p className="leading-7">
          Энэ нь баталгаажсан цаг биш бөгөөд зөвлөх тантай холбогдож өдөр,
          цагийг эцэслэн баталгаажуулна.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Эцэг эхийн нэр" name="parentName" required />
        <Field label="Хүүхдийн нэр" name="studentName" required />
        <Field
          autoComplete="tel"
          inputMode="tel"
          label="Утасны дугаар"
          name="phone"
          placeholder="+976 9911 2233"
          required
        />
        <Field
          autoComplete="email"
          label="Имэйл"
          name="email"
          placeholder="Нэмэлт"
          type="email"
        />
        <Field label="Хүүхдийн анги" name="grade" placeholder="Жишээ: 10-р анги" required />
        <label className="grid gap-2 text-sm font-semibold text-navy">
          Зөвлөгөөний төрөл
          <select
            className="field"
            defaultValue={defaultService}
            name="serviceType"
            required
          >
            <option value="">Сонгох</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <Field label="Хүссэн өдөр" min={today} name="preferredDate" required type="date" />
        <Field label="Хүссэн цаг" name="preferredTime" required type="time" />
        <label className="grid gap-2 text-sm font-semibold text-navy md:col-span-2">
          Уулзалтын хэлбэр
          <select className="field" defaultValue="ONLINE" name="mode" required>
            <option value="ONLINE">Онлайн</option>
            <option value="IN_PERSON">Биечлэн</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-navy md:col-span-2">
          Гол санаа зовнил эсвэл мессеж
          <textarea
            className="field min-h-36 resize-y"
            name="message"
            placeholder="Хүүхэд ямар сонголтын өмнө байгаа, ямар асуулт хамгийн чухал байгааг товч бичээрэй."
          />
        </label>
      </div>
      <label className="mt-6 flex gap-3 rounded-[1.25rem] border border-line bg-cream/55 p-4 text-sm leading-6 text-muted">
        <input className="mt-1 h-4 w-4 accent-emerald" name="consent" required type="checkbox" />
        <span>
          Миний оруулсан мэдээллээр зөвлөх надтай холбогдохыг зөвшөөрч байна.
        </span>
      </label>
      {state === "error" ? (
        <p aria-live="polite" className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <Button className="mt-6 w-full sm:w-auto" disabled={state === "submitting"} type="submit">
        {state === "submitting" ? <LoaderCircle className="animate-spin" size={18} /> : null}
        Хүсэлт илгээх
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  ...props
}: {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-navy">
      {label}
      <input className="field" name={name} {...props} />
    </label>
  );
}
