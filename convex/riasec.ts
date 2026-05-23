import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { riasecAnswer } from "./schema";

const categoryOrder = ["R", "I", "A", "S", "E", "C"] as const;

type RiasecCategory = (typeof categoryOrder)[number];
type RiasecAnswer = {
  category: RiasecCategory;
  questionId: string;
  score: number;
};
type RiasecScores = Record<RiasecCategory, number>;

const profiles: Record<
  RiasecCategory,
  {
    fields: string[];
    label: string;
    schoolSubjects: string[];
  }
> = {
  A: {
    fields: [
      "Дизайн",
      "Медиа",
      "Контент бүтээлт",
      "Урлаг",
      "Fashion",
      "Архитектурын дизайн",
      "UI/UX design",
      "Бичих, сэтгүүл зүй",
      "Кино, зураг авалт",
    ],
    label: "Бүтээлч",
    schoolSubjects: ["Уран зураг", "Хэл, бичиг", "Хөгжим", "Технологи", "Медиа төсөл"],
  },
  C: {
    fields: [
      "Санхүү",
      "Нягтлан бодох",
      "Data management",
      "Банк",
      "Админ, оффис менежмент",
      "Логистик",
      "Архив, бичиг хэрэг",
      "Чанарын хяналт",
      "Системийн зохион байгуулалт",
    ],
    label: "Зохион байгуулалттай, системтэй",
    schoolSubjects: ["Математик", "Мэдээлэл зүй", "Санхүүгийн суурь", "Статистик"],
  },
  E: {
    fields: [
      "Бизнес",
      "Маркетинг",
      "Борлуулалт",
      "Менежмент",
      "Entrepreneurship",
      "Хууль",
      "Олон нийттэй харилцах",
      "Project management",
      "Улс төр, leadership",
    ],
    label: "Манлайлагч, бизнес",
    schoolSubjects: ["Нийгэм судлал", "Эдийн засгийн суурь", "Математик", "Илтгэл"],
  },
  I: {
    fields: [
      "Шинжлэх ухаан",
      "Мэдээллийн технологи",
      "Data analysis",
      "Анагаах ухаан",
      "Судалгаа",
      "Инженерчлэл",
      "Математик",
      "Лабораторийн ажил",
    ],
    label: "Судлаач, шинжилгээний",
    schoolSubjects: ["Математик", "Физик", "Хими", "Биологи", "Мэдээлэл зүй"],
  },
  R: {
    fields: [
      "Инженерчлэл",
      "Архитектур",
      "Барилга",
      "Механик",
      "Үйлдвэрлэл",
      "Спорт, хөдөлгөөнтэй ажил",
      "Хөдөө аж ахуй",
      "Техник технологи",
    ],
    label: "Бодит, практик",
    schoolSubjects: ["Физик", "Технологи", "Математик", "Дүрслэх геометр"],
  },
  S: {
    fields: [
      "Боловсрол",
      "Сэтгэл зүй",
      "Зөвлөгөө өгөх үйлчилгээ",
      "Эмч, сувилахуй",
      "Нийгмийн ажил",
      "Хүний нөөц",
      "Харилцаа, сургалт",
      "Хүүхэд хөгжил",
    ],
    label: "Нийгмийн, хүмүүстэй ажиллах",
    schoolSubjects: ["Нийгэм судлал", "Биологи", "Хэл яриа", "Багийн төсөл"],
  },
};

const combinationSummaries: Record<string, string> = {
  AIS: "Бүтээлч дизайн, медиа, боловсрол, контентын чиглэлүүдийг хүмүүстэй холбон сонирхох төлөв харагдаж байна.",
  ASE: "Creative business, маркетинг, branding зэрэг санааг нөлөөлөл болгох орчин танд сонирхолтой байж болно.",
  ESC: "Business operations, management, admin leadership зэрэг зорилго ба системийг хамтад нь хөдөлгөх чиглэлүүд ойр байна.",
  IAS: "Судалгаа + бүтээлч + хүмүүстэй ажиллах огтлолцолд UX research, education design зэрэг чиглэлүүд сонирхолтой байж болно.",
  IEC: "Data, finance, technology, analysis зэрэг нотолгоо ба систем шаардсан чиглэлүүдийг судлах дохио байна.",
  IRE: "Технологи, инженерчлэл, product development, startup зэрэг бодит шийдэл бүтээх тал руу сонирхол илүү байна.",
  RIC: "Engineering, technical systems, architecture зэрэг практик ба нарийвчлал хосолсон чиглэлүүд ойр байна.",
  SAE: "Сургалт, PR, контент, хүний нөөц, community management зэрэг хүн ба илэрхийллийг холбох чиглэлүүд ойр байна.",
  SAI: "Боловсрол, сэтгэл зүй, зөвлөгөө, creative teaching зэрэг хүн төвтэй мэдлэгийн чиглэлүүдийг судлахад тохиромжтой дохио байна.",
  SEC: "HR, education administration, service management зэрэг үйлчилгээ ба зохион байгуулалтыг холбох чиглэлүүдийг судалж болно.",
};

export function calculateRiasecResult(answers: RiasecAnswer[]) {
  if (answers.length !== 36) {
    throw new Error("RIASEC тестийн бүх 36 асуултад хариулна уу.");
  }

  const seen = new Set<string>();
  const scores = Object.fromEntries(categoryOrder.map((category) => [category, 0])) as RiasecScores;

  for (const answer of answers) {
    if (seen.has(answer.questionId)) {
      throw new Error("RIASEC асуултын давхардсан хариулт байна.");
    }

    if (!categoryOrder.includes(answer.category) || answer.score < 1 || answer.score > 5) {
      throw new Error("RIASEC хариулт 1-5 онооны хооронд байна.");
    }

    seen.add(answer.questionId);
    scores[answer.category] += answer.score;
  }

  const ranked = categoryOrder
    .map((category, index) => ({
      category,
      index,
      label: profiles[category].label,
      score: scores[category],
    }))
    .sort((left, right) => right.score - left.score || left.index - right.index);
  const topCategories = ranked.slice(0, 3).map(({ category, label, score }) => ({
    category,
    label,
    score,
  }));
  const hollandCode = topCategories.map((item) => item.category).join("");
  const resultSummary =
    combinationSummaries[hollandCode] ??
    `Таны илүү давамгай сонирхол ${topCategories.map((item) => `${item.category} (${item.label})`).join(", ")} чиглэлд төвлөрч байна.`;

  return {
    answers,
    hasTie: ranked.some((item, index) => item.score === ranked[index + 1]?.score),
    hollandCode,
    resultSummary,
    scores,
    suggestedFields: unique(topCategories.flatMap((item) => profiles[item.category].fields)),
    suggestedNextStep:
      "Топ чиглэлүүдтэй холбоотой 2-3 мэргэжлийг сонгож, тухайн ажлын өдөр тутмын орчин, шаардлагатай хичээл, туршиж үзэх жижиг төслөө зөвлөхтэй ярилцаарай.",
    suggestedSubjects: unique(topCategories.flatMap((item) => profiles[item.category].schoolSubjects)),
    topCategories,
  };
}

export const submitRiasecResult = mutation({
  args: {
    answers: v.array(riasecAnswer),
    grade: v.optional(v.string()),
    parentPhone: v.optional(v.string()),
    phone: v.optional(v.string()),
    saveResult: v.boolean(),
    studentName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = calculateRiasecResult(args.answers);

    if (!args.saveResult) {
      return {
        result,
        saved: false,
      };
    }

    const id = await ctx.db.insert("riasecResults", {
      answers: result.answers,
      createdAt: Date.now(),
      grade: clean(args.grade),
      hollandCode: result.hollandCode,
      parentPhone: clean(args.parentPhone),
      phone: clean(args.phone),
      resultSummary: result.resultSummary,
      scores: result.scores,
      studentName: clean(args.studentName),
      suggestedFields: result.suggestedFields,
      topCategories: result.topCategories,
    });

    return {
      id,
      result,
      saved: true,
    };
  },
});

export const listRiasecResults = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("riasecResults").withIndex("by_createdAt").order("desc").collect();
  },
});

export const getRiasecResult = query({
  args: {
    id: v.id("riasecResults"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

function clean(value?: string) {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}
