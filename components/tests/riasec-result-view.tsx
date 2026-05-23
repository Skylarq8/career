"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, Share2, Sparkles } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { RiasecIcon } from "@/components/tests/riasec-icons";
import { riasecResultSessionKey } from "@/components/tests/riasec-test-flow";
import { riasecCategoryOrder, riasecProfiles } from "@/lib/riasec";
import type { RiasecCalculation } from "@/lib/riasec";

type StoredRiasecResult = {
  result: Omit<RiasecCalculation, "answers"> & { answers: unknown };
  saved: boolean;
};

export function RiasecResultView() {
  const [shareMessage, setShareMessage] = useState("");
  const rawStored = useSyncExternalStore(
    () => () => undefined,
    () => sessionStorage.getItem(riasecResultSessionKey),
    () => undefined,
  );
  const stored = useMemo(() => {
    if (rawStored === undefined) {
      return undefined;
    }

    return rawStored ? (JSON.parse(rawStored) as StoredRiasecResult) : null;
  }, [rawStored]);

  const chartData = useMemo(() => {
    if (!stored) {
      return [];
    }

    return riasecCategoryOrder.map((category) => ({
      fill: riasecProfiles[category].color,
      name: category,
      score: stored.result.scores[category],
    }));
  }, [stored]);

  async function shareResult() {
    if (!stored) {
      return;
    }

    const text = `Миний RIASEC код ${stored.result.hollandCode}. ${stored.result.resultSummary}`;

    try {
      if (navigator.share) {
        await navigator.share({
          text,
          title: "Миний Чиглэл RIASEC үр дүн",
          url: window.location.href,
        });
        setShareMessage("Үр дүнгээ хуваалцлаа.");
        return;
      }

      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setShareMessage("Хуваалцах текст clipboard дээр хуулж авлаа.");
    } catch {
      setShareMessage("Хуваалцах үйлдэл цуцлагдлаа.");
    }
  }

  if (stored === undefined) {
    return (
      <div className="rounded-[1.75rem] border border-line bg-soft-white p-8 text-muted premium-shadow">
        Үр дүн уншиж байна...
      </div>
    );
  }

  if (!stored) {
    return (
      <div className="rounded-[1.75rem] border border-line bg-soft-white p-6 premium-shadow sm:p-10">
        <p className="font-semibold text-emerald">RIASEC result</p>
        <h1 className="heading-font mt-4 text-3xl font-extrabold text-navy">
          Үр дүн олдсонгүй
        </h1>
        <p className="mt-4 max-w-2xl leading-8 text-muted">
          RIASEC үр дүн энэ browser session-д хадгалагдаагүй байна. Тестээ
          бөглөөд Holland Code-оо харна уу.
        </p>
        <ButtonLink className="mt-6" href="/tests/riasec">
          RIASEC тест эхлэх
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="dark-cta-gradient overflow-hidden rounded-[1.75rem] p-6 text-white premium-shadow sm:p-9">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-gold">
              <Sparkles size={16} />
              Holland Code career exploration
            </p>
            <h1 className="heading-font mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
              Таны RIASEC код: {stored.result.hollandCode}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">
              {stored.result.resultSummary}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5">
            <p className="text-sm font-semibold text-white/64">Хадгалалтын төлөв</p>
            <p className="mt-2 font-bold">
              {stored.saved ? "Admin-д хадгалагдсан" : "Хадгалаагүй, anonymous үр дүн"}
            </p>
          </div>
        </div>
      </section>

      {stored.result.hasTie ? (
        <p className="rounded-[1.25rem] border border-gold/35 bg-gold/12 p-5 leading-7 text-navy">
          Зарим чиглэлийн оноо ойролцоо гарсан тул илүү нарийвчилсан
          ярилцлагаар тодруулах боломжтой.
        </p>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        {stored.result.topCategories.map((item, index) => {
          const profile = riasecProfiles[item.category];

          return (
            <article
              key={item.category}
              className="rounded-[1.5rem] border border-line bg-soft-white p-5 premium-shadow"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-grid h-12 w-12 place-items-center rounded-2xl text-white"
                  style={{ backgroundColor: profile.color }}
                >
                  <RiasecIcon category={item.category} />
                </span>
                <span className="rounded-full bg-cream px-3 py-1 text-sm font-bold text-navy">
                  #{index + 1} · {item.score}/30
                </span>
              </div>
              <p className="mt-5 font-bold text-emerald">
                {item.category} · {profile.label}
              </p>
              <h2 className="heading-font mt-2 text-2xl font-extrabold text-navy">
                {profile.title}
              </h2>
              <p className="mt-3 leading-7 text-muted">{profile.description}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-line bg-soft-white p-5 sm:p-7">
          <h2 className="heading-font text-2xl font-extrabold text-navy">
            6 чиглэлийн оноо
          </h2>
          <div className="mt-6 grid gap-4">
            {riasecCategoryOrder.map((category) => {
              const profile = riasecProfiles[category];
              const score = stored.result.scores[category];

              return (
                <div key={category}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-bold text-navy">
                      {category} · {profile.label}
                    </span>
                    <span className="font-semibold text-muted">{score}/30</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-cream">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{
                        backgroundColor: profile.color,
                        width: `${(score / 30) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-line bg-soft-white p-5 sm:p-7">
          <h2 className="heading-font text-2xl font-extrabold text-navy">
            Score chart
          </h2>
          <div className="mt-5 h-80 w-full">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={chartData}>
                <CartesianGrid stroke="#E6DED2" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#5F6C7B" />
                <YAxis domain={[0, 30]} stroke="#5F6C7B" />
                <Tooltip
                  cursor={{ fill: "rgba(47,158,126,0.08)" }}
                  formatter={(value) => [`${value}/30`, "Оноо"]}
                />
                <Bar dataKey="score" fill="#2F9E7E" radius={[10, 10, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <InfoPanel
          items={stored.result.suggestedFields.slice(0, 12)}
          title="Судалж болох салбарууд"
        />
        <InfoPanel items={stored.result.suggestedSubjects} title="Анхаарах хичээлүүд" />
        <div className="rounded-[1.5rem] border border-line bg-soft-white p-5">
          <h2 className="heading-font text-2xl font-extrabold text-navy">
            Дараагийн алхам
          </h2>
          <p className="mt-4 leading-8 text-muted">{stored.result.suggestedNextStep}</p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-line bg-soft-white p-5 premium-shadow sm:p-7">
        <p className="leading-8 text-muted">
          Энэхүү тест нь мэргэжил сонголтын ерөнхий чиглэл өгөх зорилготой
          бөгөөд оношилгоо биш. Илүү нарийвчилсан зөвлөгөө авах бол мэргэжлийн
          зөвлөхтэй уулзахыг санал болгож байна.
        </p>
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <Button disabled type="button" variant="secondary">
            <Download size={18} />
            PDF тайлан авах
          </Button>
          <ButtonLink href="/booking">
            Энэ үр дүн дээр үндэслэн илүү нарийвчилсан зөвлөгөө авах
          </ButtonLink>
          <Button onClick={shareResult} type="button" variant="secondary">
            <Share2 size={18} />
            Эцэг эхтэйгээ үр дүнгээ хуваалцах
          </Button>
        </div>
        {shareMessage ? (
          <p aria-live="polite" className="mt-4 text-sm font-semibold text-emerald">
            {shareMessage}
          </p>
        ) : null}
      </section>
    </div>
  );
}

function InfoPanel({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="rounded-[1.5rem] border border-line bg-soft-white p-5">
      <h2 className="heading-font text-2xl font-extrabold text-navy">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-emerald/20 bg-emerald/10 px-3 py-2 text-sm font-semibold text-navy"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
