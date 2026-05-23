import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const bookingStatus = v.union(
  v.literal("NEW"),
  v.literal("CONTACTED"),
  v.literal("CONFIRMED"),
  v.literal("CANCELLED"),
  v.literal("DONE"),
);

export const consultationMode = v.union(v.literal("ONLINE"), v.literal("IN_PERSON"));

export const riasecCategory = v.union(
  v.literal("R"),
  v.literal("I"),
  v.literal("A"),
  v.literal("S"),
  v.literal("E"),
  v.literal("C"),
);

export const riasecScores = v.object({
  A: v.number(),
  C: v.number(),
  E: v.number(),
  I: v.number(),
  R: v.number(),
  S: v.number(),
});

export const riasecRankedCategory = v.object({
  category: riasecCategory,
  label: v.string(),
  score: v.number(),
});

export const riasecAnswer = v.object({
  category: riasecCategory,
  questionId: v.string(),
  score: v.number(),
});

export default defineSchema({
  bookings: defineTable({
    adminNote: v.optional(v.string()),
    createdAt: v.number(),
    email: v.optional(v.string()),
    grade: v.string(),
    message: v.optional(v.string()),
    mode: consultationMode,
    parentName: v.string(),
    phone: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    serviceType: v.string(),
    status: bookingStatus,
    studentName: v.string(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"])
    .index("by_phone", ["phone"]),
  riasecResults: defineTable({
    answers: v.array(riasecAnswer),
    createdAt: v.number(),
    grade: v.optional(v.string()),
    hollandCode: v.string(),
    parentPhone: v.optional(v.string()),
    phone: v.optional(v.string()),
    resultSummary: v.string(),
    scores: riasecScores,
    studentName: v.optional(v.string()),
    suggestedFields: v.array(v.string()),
    topCategories: v.array(riasecRankedCategory),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_hollandCode", ["hollandCode"])
    .index("by_phone", ["phone"]),
  services: defineTable({
    createdAt: v.number(),
    description: v.string(),
    duration: v.string(),
    includes: v.array(v.string()),
    isActive: v.boolean(),
    slug: v.string(),
    targetAudience: v.string(),
    title: v.string(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_isActive", ["isActive"]),
});
