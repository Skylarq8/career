"use client";

import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, Check, Clock3, LoaderCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { publicApiPath } from "@/lib/api-url";
import {
  calculateRiasecResult,
  riasecProfiles,
  riasecQuestions,
  riasecScale,
} from "@/lib/riasec";
import type { RiasecAnswers } from "@/lib/riasec";
import { RiasecIcon } from "@/components/tests/riasec-icons";

export const riasecResultSessionKey = "minii-chiglel-riasec-result";

const questionsPerStep = 3;
const totalQuestionSteps = Math.ceil(riasecQuestions.length / questionsPerStep);
const scaleButtonStyles = {
  1: {
    active: "border-[#FF8A83] bg-[#FF8A83] text-navy",
    circle: "h-[3.1rem] w-[3.1rem] sm:h-[4.5rem] sm:w-[4.5rem]",
    idle: "border-[#E9857D] bg-[#FCE9E5] text-[#8E332D] hover:bg-[#F9DDD8]",
  },
  2: {
    active: "border-[#F1BF67] bg-[#F1BF67] text-navy",
    circle: "h-[2.7rem] w-[2.7rem] sm:h-[3.85rem] sm:w-[3.85rem]",
    idle: "border-[#D6A84F] bg-[#FFF2DA] text-[#7B5720] hover:bg-[#FBE8C2]",
  },
  3: {
    active: "border-[#C6D0D4] bg-[#C6D0D4] text-navy",
    circle: "h-[2.5rem] w-[2.5rem] sm:h-[3.25rem] sm:w-[3.25rem]",
    idle: "border-[#B6C2C8] bg-soft-white text-muted hover:bg-cream",
  },
  4: {
    active: "border-[#74D48E] bg-[#74D48E] text-navy",
    circle: "h-[2.7rem] w-[2.7rem] sm:h-[3.85rem] sm:w-[3.85rem]",
    idle: "border-[#68C987] bg-[#E7F7EB] text-[#21673D] hover:bg-[#D8F1E0]",
  },
  5: {
    active: "border-[#3ECFB3] bg-[#3ECFB3] text-navy",
    circle: "h-[3.1rem] w-[3.1rem] sm:h-[4.5rem] sm:w-[4.5rem]",
    idle: "border-emerald bg-[#DDF4ED] text-navy hover:bg-[#CDEDE3]",
  },
} as const;

export function RiasecTestFlow() {
  const router = useRouter();
  const stepRef = useRef<HTMLDivElement>(null);
  const questionCardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollStepTopRef = useRef(false);
  const [step, setStep] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<RiasecAnswers>({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const profileStep = step === totalQuestionSteps;
  const currentQuestions = riasecQuestions.slice(
    step * questionsPerStep,
    step * questionsPerStep + questionsPerStep,
  );
  const progress = profileStep
    ? 100
    : Math.round((Object.keys(answers).length / riasecQuestions.length) * 100);
  const stepReady = currentQuestions.every((question) => Boolean(answers[question.id]));

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (scrollStepTopRef.current) {
      const stepTop = profileStep ? stepRef.current : questionCardRefs.current[0] ?? stepRef.current;

      requestAnimationFrame(() => {
        stepTop?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      });
      scrollStepTopRef.current = false;
    }

    if (!stepRef.current || reducedMotion) {
      return;
    }

    gsap.fromTo(
      stepRef.current,
      { autoAlpha: 0, x: 20 },
      { autoAlpha: 1, duration: 0.38, ease: "power2.out", x: 0 },
    );
  }, [profileStep, step]);

  function saveSession(result: ReturnType<typeof calculateRiasecResult>, saved: boolean) {
    sessionStorage.setItem(
      riasecResultSessionKey,
      JSON.stringify({
        result,
        saved,
      }),
    );
    router.push("/tests/riasec/result");
  }

  function viewAnonymousResult() {
    setError("");

    try {
      saveSession(calculateRiasecResult(answers), false);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Үр дүн тооцоолж чадсангүй.");
    }
  }

  function scrollToQuestion(index: number) {
    const card = questionCardRefs.current[index];

    if (!card) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    requestAnimationFrame(() => {
      const cardTop = card.getBoundingClientRect().top + window.scrollY;
      const targetTop = Math.max(window.scrollY, cardTop - 350);

      window.scrollTo({
        behavior: reducedMotion ? "auto" : "smooth",
        top: targetTop,
      });
    });
  }

  function selectAnswer(questionId: string, choice: number, index: number) {
    setAnswers((value) => ({
      ...value,
      [questionId]: choice,
    }));

    const nextUnansweredIndex = currentQuestions.findIndex(
      (question, questionIndex) => questionIndex > index && !answers[question.id],
    );
    const nextIndex =
      nextUnansweredIndex >= 0
        ? nextUnansweredIndex
        : Math.min(index + 1, currentQuestions.length - 1);

    if (nextIndex !== index) {
      setActiveQuestionIndex(nextIndex);
      scrollToQuestion(nextIndex);
      return;
    }

    setActiveQuestionIndex(index);
  }

  function moveToStep(nextStep: number) {
    scrollStepTopRef.current = true;
    setActiveQuestionIndex(0);
    setStep(nextStep);
  }

  async function submitSavedResult(formData: FormData) {
    setPending(true);
    setError("");

    try {
      const response = await fetch(publicApiPath("/api/tests/riasec/submit"), {
        body: JSON.stringify({
          answers,
          grade: formData.get("grade"),
          parentPhone: formData.get("parentPhone"),
          phone: formData.get("phone"),
          saveResult: true,
          studentName: formData.get("studentName"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = (await response.json()) as {
        error?: string;
        result?: ReturnType<typeof calculateRiasecResult>;
        saved?: boolean;
      };

      if (!response.ok || !payload.result) {
        throw new Error(payload.error ?? "RIASEC үр дүн хадгалж чадсангүй.");
      }

      saveSession(payload.result, Boolean(payload.saved));
    } catch (reason) {
      setError(
        reason instanceof Error
          ? `${reason.message} Хадгалахгүйгээр үр дүнгээ харж болно.`
          : "RIASEC үр дүн хадгалж чадсангүй.",
      );
      setPending(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-[1.75rem] border border-line bg-soft-white p-5 premium-shadow sm:p-8">
      <div className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald/12 px-3 py-2 text-sm font-semibold text-navy">
              <Sparkles className="text-emerald" size={16} />
              RIASEC / Holland Code
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-2 text-sm font-semibold text-muted">
              <Clock3 size={16} />
              5-7 минут
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold text-emerald">
            {profileStep ? "Сонголтын өмнөх мэдээлэл" : `Алхам ${step + 1} / ${totalQuestionSteps}`}
          </p>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Сонирхлын оноо өндөр гарсан чиглэл нь боломжит судлах хүрээг
          харуулна. Хариулт бүрт өөрт ойр мэдрэмжээ сонгоорой.
        </p>
      </div>

      <div
        aria-label="RIASEC тестийн явц"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="mt-6 h-2 overflow-hidden rounded-full bg-cream"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald via-gold to-navy transition-[width] duration-300"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>
      {!profileStep ? <ScaleLegend /> : null}

      <div ref={stepRef} className="pt-7">
        {profileStep ? (
          <ProfileStep
            error={error}
            onAnonymous={viewAnonymousResult}
            onBack={() => moveToStep(totalQuestionSteps - 1)}
            pending={pending}
            submitSavedResult={submitSavedResult}
          />
        ) : (
          <>
            <div className="grid gap-4">
              {currentQuestions.map((question, index) => {
                const activeQuestion = index === activeQuestionIndex;
                const answeredQuestion = Boolean(answers[question.id]);
                const unlockedQuestion = activeQuestion || answeredQuestion || index < activeQuestionIndex;

                return (
                  <article
                    key={question.id}
                    ref={(card) => {
                      questionCardRefs.current[index] = card;
                    }}
                    aria-current={activeQuestion ? "step" : undefined}
                    className={[
                      "scroll-mt-24 rounded-[1.5rem] border p-4 transition duration-300 sm:p-5",
                      activeQuestion
                        ? "border-emerald/45 bg-cream/70 opacity-100 shadow-[0_16px_42px_rgba(16,42,67,0.1)]"
                        : answeredQuestion
                          ? "border-line bg-cream/38 opacity-55 hover:opacity-85"
                          : "border-line bg-cream/28 opacity-35",
                    ].join(" ")}
                  >
                    <div className="flex gap-4">
                      <span
                        className="inline-grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white"
                        style={{ backgroundColor: riasecProfiles[question.category].color }}
                      >
                        <RiasecIcon category={question.category} size={20} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-muted">
                          Асуулт {step * questionsPerStep + index + 1} / {riasecQuestions.length}
                        </p>
                        <h2 className="heading-font mt-2 text-xl font-extrabold leading-8 text-navy sm:text-2xl">
                          {question.prompt}
                        </h2>
                      </div>
                    </div>
                    <fieldset className="mt-5">
                      <legend className="sr-only">{question.prompt}</legend>
                      <div className="flex items-center justify-between gap-2 rounded-[1.35rem] border border-line bg-soft-white/90 px-2 py-4 sm:px-4 sm:py-5">
                        {riasecScale.map((choice) => {
                          const active = answers[question.id] === choice.value;
                          const choiceStyle = scaleButtonStyles[choice.value];

                          return (
                            <button
                              key={choice.value}
                              aria-label={`${choice.value}. ${choice.label}`}
                              aria-pressed={active}
                              className={[
                                "grid shrink-0 place-items-center rounded-full border-2 text-sm font-extrabold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald/20 disabled:cursor-not-allowed",
                                choiceStyle.circle,
                                active
                                  ? `scale-[1.03] shadow-[0_14px_32px_rgba(16,42,67,0.16)] ${choiceStyle.active}`
                                  : choiceStyle.idle,
                              ].join(" ")}
                              disabled={!unlockedQuestion}
                              onClick={() => selectAnswer(question.id, choice.value, index)}
                              type="button"
                            >
                              {active ? (
                                <Check
                                  aria-hidden="true"
                                  className="stroke-[3] sm:h-8 sm:w-8"
                                  size={choice.value === 3 ? 20 : 24}
                                />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  </article>
                );
              })}
            </div>
            {error ? (
              <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</p>
            ) : null}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button
                disabled={step === 0}
                onClick={() => moveToStep(Math.max(0, step - 1))}
                type="button"
                variant="secondary"
              >
                <ArrowLeft size={18} />
                Буцах
              </Button>
              <Button
                disabled={!stepReady}
                onClick={() => {
                  setError("");
                  moveToStep(step + 1);
                }}
                type="button"
              >
                {step === totalQuestionSteps - 1 ? "Үр дүн рүү" : "Дараах"}
                <ArrowRight size={18} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ScaleLegend() {
  return (
    <div className="mt-4 rounded-[1.5rem] border border-line bg-[#F3F5F8] px-3 py-5 sm:px-6 sm:py-6">
      <p className="text-center text-sm font-semibold text-emerald">Сонголтын утга</p>
      <h2 className="heading-font mx-auto mt-2 max-w-2xl text-center text-lg font-extrabold leading-7 text-navy sm:text-2xl sm:leading-8">
        Хариулт бүрт өөрт ойр мэдрэмжээ сонгоорой.
      </h2>
      <div className="mt-5 grid grid-cols-5 items-center gap-1 text-center sm:mt-6 sm:items-start sm:gap-4">
        {riasecScale.map((choice) => {
          const choiceStyle = scaleButtonStyles[choice.value];

          return (
            <div key={choice.value} className="min-w-0">
              <span
                aria-hidden="true"
                className={[
                  "mx-auto block rounded-full border-2 shadow-[0_8px_24px_rgba(16,42,67,0.06)]",
                  choiceStyle.circle,
                  choiceStyle.idle,
                ].join(" ")}
              />
              <p className="mx-auto mt-4 hidden max-w-[6.5rem] text-sm font-bold leading-5 text-navy sm:block">
                {choice.label}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid gap-2 sm:hidden">
        {riasecScale.map((choice) => {
          const choiceStyle = scaleButtonStyles[choice.value];

          return (
            <div
              key={choice.value}
              className="flex min-h-11 items-center gap-3 rounded-2xl border border-line bg-soft-white/85 px-3 py-2"
            >
              <span
                aria-hidden="true"
                className={["h-4 w-4 shrink-0 rounded-full border-2", choiceStyle.idle].join(" ")}
              />
              <span className="min-w-5 text-sm font-extrabold text-navy">{choice.value}</span>
              <span className="text-sm font-semibold leading-5 text-muted">{choice.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileStep({
  error,
  onAnonymous,
  onBack,
  pending,
  submitSavedResult,
}: {
  error: string;
  onAnonymous: () => void;
  onBack: () => void;
  pending: boolean;
  submitSavedResult: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.88fr]">
      <form action={submitSavedResult} className="rounded-[1.5rem] border border-line bg-cream/55 p-5">
        <p className="font-semibold text-emerald">Нэмэлт мэдээлэл</p>
        <h2 className="heading-font mt-3 text-2xl font-extrabold text-navy">
          Үр дүнгээ хүсвэл зөвлөхтэй холбож хадгална
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Дараах талбарууд бүгд сонголттой. Мэдээлэл өгөхгүй байсан ч Holland
          Code үр дүнгээ шууд харж болно.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Сурагчийн нэр" name="studentName" />
          <Field label="Анги" name="grade" placeholder="Жишээ: 10-р анги" />
          <Field inputMode="tel" label="Сурагчийн утас" name="phone" />
          <Field inputMode="tel" label="Эцэг эхийн утас" name="parentPhone" />
        </div>
        {error ? (
          <p aria-live="polite" className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button disabled={pending} type="submit">
            {pending ? <LoaderCircle className="animate-spin" size={18} /> : null}
            Хадгалаад үр дүн харах
          </Button>
          <Button onClick={onAnonymous} type="button" variant="secondary">
            Хадгалахгүй харах
          </Button>
        </div>
      </form>
      <div className="rounded-[1.5rem] border border-line bg-soft-white p-5">
        <p className="font-semibold text-navy">Сануулах нь</p>
        <p className="mt-4 leading-8 text-muted">
          Энэхүү тест нь мэргэжил сонголтын ерөнхий чиглэл өгөх зорилготой
          бөгөөд оношилгоо биш. Илүү нарийвчилсан зөвлөгөө авах бол мэргэжлийн
          зөвлөхтэй уулзахыг санал болгож байна.
        </p>
        <Button className="mt-6" onClick={onBack} type="button" variant="ghost">
          <ArrowLeft size={18} />
          Сүүлийн асуулт руу буцах
        </Button>
        <ButtonLink className="mt-3 w-full" href="/booking" variant="secondary">
          Зөвлөгөөний цаг хүсэх
        </ButtonLink>
      </div>
    </div>
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
