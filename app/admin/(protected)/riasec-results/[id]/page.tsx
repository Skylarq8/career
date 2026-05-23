import { notFound } from "next/navigation";
import { RiasecIcon } from "@/components/tests/riasec-icons";
import { getAdminRiasecResult } from "@/lib/admin-data";
import {
  riasecCategoryOrder,
  riasecProfiles,
  riasecQuestions,
  riasecScale,
} from "@/lib/riasec";
import type { RiasecAnswers, RiasecRankedCategory, RiasecScores } from "@/lib/riasec";

export default async function AdminRiasecResultDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getAdminRiasecResult(id);

  if (!result) {
    notFound();
  }

  const scores = result.scores as RiasecScores;
  const answers = result.answers as RiasecAnswers;
  const topCategories = result.topCategories as RiasecRankedCategory[];
  const suggestedFields = Array.isArray(result.suggestedFields)
    ? (result.suggestedFields as string[])
    : [];

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-emerald">RIASEC detail</p>
          <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy">
            {result.studentName || "Anonymous student"} · {result.hollandCode}
          </h1>
          <p className="mt-3 leading-7 text-muted">{result.resultSummary}</p>
        </div>
        <span className="rounded-full bg-navy px-4 py-3 text-xl font-extrabold text-white">
          {result.hollandCode}
        </span>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Сурагч", value: result.studentName || "-" },
          { label: "Анги", value: result.grade || "-" },
          { label: "Сурагчийн утас", value: result.phone || "-" },
          { label: "Эцэг эхийн утас", value: result.parentPhone || "-" },
        ].map((item) => (
          <div key={item.label} className="rounded-[1.25rem] border border-line bg-soft-white p-4">
            <p className="text-sm font-semibold text-muted">{item.label}</p>
            <p className="mt-2 break-words font-bold text-navy">{item.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {topCategories.map((item) => {
          const profile = riasecProfiles[item.category];

          return (
            <article key={item.category} className="rounded-[1.5rem] border border-line bg-soft-white p-5">
              <span
                className="inline-grid h-11 w-11 place-items-center rounded-2xl text-white"
                style={{ backgroundColor: profile.color }}
              >
                <RiasecIcon category={item.category} size={20} />
              </span>
              <p className="mt-4 font-bold text-emerald">
                {item.category} · {item.score}/30
              </p>
              <h2 className="heading-font mt-2 text-xl font-extrabold text-navy">
                {profile.label}
              </h2>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[1.5rem] border border-line bg-soft-white p-5">
          <h2 className="heading-font text-2xl font-extrabold text-navy">
            Онооны задаргаа
          </h2>
          <div className="mt-5 grid gap-4">
            {riasecCategoryOrder.map((category) => (
              <div key={category}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold text-navy">
                    {category} · {riasecProfiles[category].label}
                  </span>
                  <span className="text-muted">{scores[category] ?? 0}/30</span>
                </div>
                <div className="h-3 rounded-full bg-cream">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: riasecProfiles[category].color,
                      width: `${((scores[category] ?? 0) / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <h3 className="mt-7 font-bold text-navy">Санал болгосон салбар</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedFields.slice(0, 16).map((field) => (
              <span
                key={field}
                className="rounded-full border border-line bg-cream px-3 py-2 text-sm font-semibold text-navy"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-soft-white p-5">
          <h2 className="heading-font text-2xl font-extrabold text-navy">
            36 хариулт
          </h2>
          <div className="mt-5 grid gap-3">
            {riasecQuestions.map((question, index) => {
              const answer = answers[question.id];

              return (
                <div
                  key={question.id}
                  className="grid gap-3 rounded-[1.25rem] border border-line bg-cream/45 p-4 md:grid-cols-[auto_1fr_auto]"
                >
                  <span className="text-sm font-bold text-muted">{index + 1}.</span>
                  <p className="leading-7 text-navy">{question.prompt}</p>
                  <span className="rounded-full bg-navy px-3 py-2 text-sm font-bold text-white">
                    {answer ?? "-"} · {scaleLabel(answer)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

function scaleLabel(value?: number) {
  return riasecScale.find((item) => item.value === value)?.label ?? "Хариултгүй";
}
