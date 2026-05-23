import { z } from "zod";
import { riasecQuestions } from "@/lib/riasec";

const trimmedText = (label: string, max = 140) =>
  z
    .string()
    .trim()
    .min(1, `${label} оруулна уу.`)
    .max(max, `${label} хэт урт байна.`);

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9()\-\s]{8,24}$/, "Утасны дугаараа зөв оруулна уу.")
  .refine(
    (value) => value.replace(/\D/g, "").length >= 8,
    "Утасны дугаарт дор хаяж 8 цифр байна.",
  );

export const dateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Өдрөө YYYY-MM-DD хэлбэрээр сонгоно уу.")
  .refine(
    (value) => !Number.isNaN(new Date(`${value}T00:00:00.000Z`).valueOf()),
    "Өдөр буруу байна.",
  );

export const timeSchema = z
  .string()
  .trim()
  .regex(/^\d{2}:\d{2}$/, "Цагаа HH:MM хэлбэрээр сонгоно уу.");

export const bookingInputSchema = z.object({
  parentName: trimmedText("Эцэг эхийн нэр"),
  studentName: trimmedText("Хүүхдийн нэр"),
  phone: phoneSchema,
  email: z
    .union([z.literal(""), z.string().trim().email("Имэйлээ зөв оруулна уу.")])
    .optional()
    .transform((value) => value || undefined),
  grade: trimmedText("Анги", 40),
  serviceType: trimmedText("Үйлчилгээний төрөл", 120),
  preferredDate: dateSchema,
  preferredTime: timeSchema,
  mode: z.enum(["ONLINE", "IN_PERSON"]),
  message: z
    .union([z.literal(""), z.string().trim().max(1200, "Мессеж хэт урт байна.")])
    .optional()
    .transform((value) => value || undefined),
  consent: z
    .boolean()
    .refine(Boolean, "Холбоо барих зөвшөөрлөө баталгаажуулна уу."),
});

export const bookingStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "CONFIRMED",
  "CANCELLED",
  "DONE",
]);

export const bookingStatusInputSchema = z.object({
  status: bookingStatusSchema,
});

export const bookingNotesInputSchema = z.object({
  adminNote: z
    .union([z.literal(""), z.string().trim().max(2000, "Тэмдэглэл хэт урт байна.")])
    .transform((value) => value || null),
});

export const adminLoginSchema = z.object({
  password: trimmedText("Нууц үг", 200),
});

export const testResultInputSchema = z.object({
  name: z
    .union([z.literal(""), z.string().trim().max(140, "Нэр хэт урт байна.")])
    .optional()
    .transform((value) => value || undefined),
  phone: z
    .union([z.literal(""), phoneSchema])
    .optional()
    .transform((value) => value || undefined),
  testType: trimmedText("Тестийн төрөл", 80),
  answers: z
    .array(
      z.object({
        questionId: trimmedText("Асуултын ID", 80),
        answerId: trimmedText("Хариултын ID", 80),
      }),
    )
    .min(1, "Хариулт хоосон байна."),
  resultTitle: trimmedText("Үр дүнгийн гарчиг", 180),
  resultDescription: trimmedText("Үр дүнгийн тайлбар", 800),
  suggestedDirections: z
    .array(trimmedText("Санал болгосон чиглэл", 160))
    .min(1, "Санал болгосон чиглэл дутуу байна."),
});

const riasecAnswerIds = new Set(riasecQuestions.map((question) => question.id));

export const riasecSubmitInputSchema = z.object({
  answers: z
    .record(z.string(), z.number().int().min(1).max(5))
    .superRefine((answers, context) => {
      const ids = Object.keys(answers);

      if (ids.length !== riasecQuestions.length) {
        context.addIssue({
          code: "custom",
          message: "RIASEC тестийн бүх 36 асуултад хариулна уу.",
        });
      }

      ids.forEach((id) => {
        if (!riasecAnswerIds.has(id)) {
          context.addIssue({
            code: "custom",
            message: "RIASEC асуултын ID буруу байна.",
            path: [id],
          });
        }
      });
    }),
  grade: z
    .union([z.literal(""), z.string().trim().max(40, "Анги хэт урт байна.")])
    .optional()
    .transform((value) => value || undefined),
  parentPhone: z
    .union([z.literal(""), phoneSchema])
    .optional()
    .transform((value) => value || undefined),
  phone: z
    .union([z.literal(""), phoneSchema])
    .optional()
    .transform((value) => value || undefined),
  saveResult: z.boolean().optional().default(false),
  studentName: z
    .union([z.literal(""), z.string().trim().max(140, "Нэр хэт урт байна.")])
    .optional()
    .transform((value) => value || undefined),
});
