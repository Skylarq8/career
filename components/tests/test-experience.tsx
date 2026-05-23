"use client";

import { gsap } from "gsap";
import { ArrowLeft, CheckCircle2, LoaderCircle } from "lucide-react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { TestCard } from "@/components/site/test-card";
import { publicApiPath } from "@/lib/api-url";
import { careerTests, scoreTest } from "@/lib/tests";
import type { CareerTest, TestResultProfile } from "@/lib/tests";

export function TestExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const test = careerTests.find((item) => item.id === selectedId);

  if (!test) {
    return (
      <div className="grid gap-5 lg:grid-cols-3">
        {careerTests.map((item) => (
          <TestCard
            key={item.id}
            description={item.description}
            onSelect={() => setSelectedId(item.id)}
            questions={item.questions.length}
            title={item.title}
          />
        ))}
      </div>
    );
  }

  return <QuestionFlow onClose={() => setSelectedId(null)} test={test} />;
}

function QuestionFlow({
  onClose,
  test,
}: {
  onClose: () => void;
  test: CareerTest;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<TestResultProfile | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const question = test.questions[step];
  const progress = result ? 100 : Math.round(((step + 1) / test.questions.length) * 100);
  const answerRows = useMemo(
    () =>
      Object.entries(answers).map(([questionId, answerId]) => ({
        answerId,
        questionId,
      })),
    [answers],
  );

  useLayoutEffect(() => {
    if (!cardRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0, x: 18 },
      { autoAlpha: 1, duration: 0.36, ease: "power2.out", x: 0 },
    );
  }, [result, step]);

  function choose(answerId: string) {
    const nextAnswers = {
      ...answers,
      [question.id]: answerId,
    };

    setAnswers(nextAnswers);

    if (step === test.questions.length - 1) {
      setResult(scoreTest(test, nextAnswers));
      return;
    }

    setStep((value) => value + 1);
  }

  async function save(formData: FormData) {
    if (!result) {
      return;
    }

    setSaveState("saving");
    setSaveError("");

    try {
      const response = await fetch(publicApiPath("/api/test-results"), {
        body: JSON.stringify({
          answers: answerRows,
          name: formData.get("name"),
          phone: formData.get("phone"),
          resultDescription: result.description,
          resultTitle: result.title,
          suggestedDirections: result.suggestedDirections,
          testType: test.title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Үр дүн хадгалж чадсангүй.");
      }

      setSaveState("saved");
    } catch (reason) {
      setSaveError(reason instanceof Error ? reason.message : "Үр дүн хадгалж чадсангүй.");
      setSaveState("error");
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-line bg-soft-white p-5 premium-shadow sm:p-8">
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald">{test.title}</p>
          <p className="mt-2 text-sm text-muted">
            {result ? "Ерөнхий чиглэл" : `${step + 1} / ${test.questions.length}`}
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:text-emerald"
          onClick={onClose}
          type="button"
        >
          <ArrowLeft size={18} />
          Тестүүд рүү буцах
        </button>
      </div>
      <div
        aria-label="Тестийн явц"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="mt-6 h-2 overflow-hidden rounded-full bg-cream"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald to-gold transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div ref={cardRef} className="pt-7">
        {result ? (
          <ResultPanel
            result={result}
            save={save}
            saveError={saveError}
            saveState={saveState}
          />
        ) : (
          <>
            <h3 className="heading-font max-w-3xl text-2xl font-extrabold leading-tight text-navy sm:text-3xl">
              {question.prompt}
            </h3>
            <div className="mt-6 grid gap-3">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  className="rounded-[1.25rem] border border-line bg-cream/48 px-5 py-4 text-left font-medium leading-7 text-navy transition hover:border-emerald hover:bg-skywash focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald/20"
                  onClick={() => choose(option.id)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
            {step > 0 ? (
              <button
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-navy"
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                type="button"
              >
                <ArrowLeft size={16} />
                Өмнөх асуулт
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  save,
  saveError,
  saveState,
}: {
  result: TestResultProfile;
  save: (formData: FormData) => Promise<void>;
  saveError: string;
  saveState: "idle" | "saving" | "saved" | "error";
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <CheckCircle2 className="text-emerald" size={34} />
        <h3 className="heading-font mt-5 text-3xl font-extrabold text-navy">
          {result.title}
        </h3>
        <p className="mt-4 leading-8 text-muted">{result.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {result.suggestedDirections.map((direction) => (
            <span
              key={direction}
              className="rounded-full border border-emerald/20 bg-emerald/10 px-4 py-2 text-sm font-semibold text-navy"
            >
              {direction}
            </span>
          ))}
        </div>
        <ButtonLink className="mt-7" href="/booking">
          Илүү нарийн зөвлөгөө авах бол цаг хүсээрэй
        </ButtonLink>
      </div>
      <form
        action={save}
        className="rounded-[1.5rem] border border-line bg-cream/55 p-5"
      >
        <p className="font-semibold text-navy">Үр дүнгээ хадгалах</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          Нэр, утсаа үлдээвэл зөвлөх тестийн ерөнхий чиглэлийг хүсэлттэй тань
          холбож харах боломжтой.
        </p>
        {saveState === "saved" ? (
          <p className="mt-5 rounded-2xl bg-emerald/12 p-4 text-sm leading-6 text-navy">
            Үр дүн хадгалагдлаа.
          </p>
        ) : (
          <>
            <label className="mt-5 grid gap-2 text-sm font-semibold text-navy">
              Нэр
              <input className="field" name="name" required />
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-navy">
              Утас
              <input className="field" inputMode="tel" name="phone" required />
            </label>
            {saveState === "error" ? (
              <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">
                {saveError}
              </p>
            ) : null}
            <Button className="mt-5 w-full" disabled={saveState === "saving"} type="submit">
              {saveState === "saving" ? <LoaderCircle className="animate-spin" size={18} /> : null}
              Үр дүн хадгалах
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
