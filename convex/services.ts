import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const defaultServices = [
  {
    description: "Эхний эргэлзээг тодруулж, хүүхдийн сонирхол ба гэр бүлийн хүлээлтийг нэг зураглалд оруулна.",
    duration: "60 минут",
    includes: ["Анхны ярилцлага", "Гол асуултыг тодруулах", "Дараагийн алхмын зөвлөмж"],
    slug: "starter",
    targetAudience: "Мэргэжил сонголтын яриаг эхлүүлэх гэр бүл",
    title: "Анхан шатны зөвлөгөө",
  },
  {
    description: "Эцэг эх, хүүхэд хамт оролцож сонголтын талаар тайван, ойлгомжтой яриа үүсгэнэ.",
    duration: "90 минут",
    includes: ["Хамтарсан ярилцлага", "Гэр бүлийн хүлээлт", "Хүүхдийн дуу хоолой"],
    slug: "family-session",
    targetAudience: "Эцэг эх, хүүхэд хамт шийдвэр гаргах гэж буй гэр бүл",
    title: "Эцэг эх + хүүхэд хамтарсан зөвлөгөө",
  },
  {
    description: "RIASEC болон нэмэлт ажиглалтаар сонирхол, чадварын чиглэлийг илүү нарийвчилна.",
    duration: "2 уулзалт",
    includes: ["RIASEC тайлбар", "Хүчтэй талын зураглал", "Салбарын санал"],
    slug: "assessment-package",
    targetAudience: "Илүү нарийн үнэлгээтэй зөвлөгөө авах сурагч",
    title: "Сонирхол, чадварын үнэлгээтэй багц",
  },
  {
    description: "Их сургууль, мэргэжил, хичээл сонголт, туршиж үзэх алхмыг төлөвлөгөө болгоно.",
    duration: "2-3 уулзалт",
    includes: ["Мэргэжлийн shortlist", "Хичээл, portfolio зөвлөмж", "3 сарын action plan"],
    slug: "university-plan",
    targetAudience: "Ахлах ангийн сурагч болон элсэлтийн өмнөх гэр бүл",
    title: "Их сургууль / мэргэжил сонголтын төлөвлөгөө",
  },
];

export const listServices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("services")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect();
  },
});

export const seedServices = mutation({
  args: {
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let created = 0;

    for (const service of defaultServices) {
      const existing = await ctx.db
        .query("services")
        .withIndex("by_slug", (q) => q.eq("slug", service.slug))
        .unique();

      if (existing && !args.force) {
        continue;
      }

      if (existing) {
        await ctx.db.patch(existing._id, {
          ...service,
          isActive: true,
          updatedAt: now,
        });
      } else {
        await ctx.db.insert("services", {
          ...service,
          isActive: true,
          createdAt: now,
          updatedAt: now,
        });
        created += 1;
      }
    }

    return {
      created,
      total: defaultServices.length,
    };
  },
});
