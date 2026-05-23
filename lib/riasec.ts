export const riasecCategoryOrder = ["R", "I", "A", "S", "E", "C"] as const;

export type RiasecCategory = (typeof riasecCategoryOrder)[number];
export type RiasecAnswers = Record<string, number>;
export type RiasecScores = Record<RiasecCategory, number>;

export type RiasecQuestion = {
  category: RiasecCategory;
  id: string;
  prompt: string;
};

export type RiasecCategoryProfile = {
  color: string;
  description: string;
  fields: string[];
  label: string;
  schoolSubjects: string[];
  title: string;
};

export type RiasecRankedCategory = {
  category: RiasecCategory;
  label: string;
  score: number;
};

export type RiasecCalculation = {
  answers: RiasecAnswers;
  hasTie: boolean;
  hollandCode: string;
  resultSummary: string;
  scores: RiasecScores;
  suggestedFields: string[];
  suggestedNextStep: string;
  suggestedSubjects: string[];
  topCategories: RiasecRankedCategory[];
};

export const riasecScale = [
  { label: "Огт сонирхолгүй", value: 1 },
  { label: "Бага зэрэг сонирхолтой", value: 2 },
  { label: "Дунд зэрэг", value: 3 },
  { label: "Сонирхолтой", value: 4 },
  { label: "Маш их сонирхолтой", value: 5 },
] as const;

export const riasecProfiles: Record<RiasecCategory, RiasecCategoryProfile> = {
  R: {
    color: "#2F9E7E",
    description:
      "Та гараар хийх, бүтээх, турших, техник эсвэл бодит орчинд ажиллах зүйлд илүү татагддаг. Хэт онолын биш, үр дүн нь нүдэнд харагддаг ажил танд тохирох магадлалтай.",
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
    schoolSubjects: ["Физик", "Технологи", "Математик", "Дүрслэх геометр", "Биеийн тамир"],
    title: "Практик, бодит үр дүнд төвлөрдөг төрөл",
  },
  I: {
    color: "#3563C9",
    description:
      "Та аливаа зүйлийн учир шалтгааныг ойлгох, асуудал задлан шинжлэх, судлах, нотолгоонд тулгуурлах сонирхолтой. Логик, шинжлэх ухаан, дата, технологийн чиглэл танд тохирч болно.",
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
    title: "Судлаач, шинжилгээний сэтгэлгээтэй төрөл",
  },
  A: {
    color: "#C96A52",
    description:
      "Та шинэ санаа гаргах, дүрслэх, бичих, дизайн хийх, урлаг эсвэл контент бүтээх орчинд илүү идэвхтэй байдаг. Чөлөөтэй сэтгэх боломжтой ажил танд урам өгдөг.",
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
    title: "Бүтээлч, өөрийнхөөрөө илэрхийлэх төрөл",
  },
  S: {
    color: "#D6A84F",
    description:
      "Та бусдыг ойлгох, туслах, заах, зөвлөх, хамтран ажиллах сонирхолтой. Хүмүүсийн хөгжил, боловсрол, эрүүл мэнд, нийгмийн сайн сайхантай холбоотой ажил танд тохирч болно.",
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
    schoolSubjects: ["Нийгэм судлал", "Биологи", "Хэл яриа", "Сэтгэл зүйн суурь агуулга", "Багийн төсөл"],
    title: "Хүмүүстэй ажиллах, туслах чиглэлийн төрөл",
  },
  E: {
    color: "#8D5BC3",
    description:
      "Та санаагаа бусдад хүргэх, удирдах, шийдвэр гаргах, боломж олж харах, өрсөлдөөнтэй орчинд өөрийгөө сорих дуртай. Бизнес, удирдлага, маркетингийн чиглэл танд тохирч болно.",
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
    schoolSubjects: ["Нийгэм судлал", "Эдийн засгийн суурь", "Математик", "Илтгэл", "Англи хэл"],
    title: "Манлайлах, нөлөөлөх, бизнес сэтгэлгээтэй төрөл",
  },
  C: {
    color: "#546C85",
    description:
      "Та мэдээлэл, тоо, баримт, төлөвлөгөө, дүрэм журамтай ажиллахдаа тухтай байдаг. Нарийвчлал, тогтвортой байдал, зохион байгуулалт шаардсан чиглэл танд тохирч болно.",
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
    schoolSubjects: ["Математик", "Мэдээлэл зүй", "Санхүүгийн суурь", "Статистик", "Төслийн төлөвлөлт"],
    title: "Эмх цэгцтэй, системтэй ажиллах төрөл",
  },
};

export const riasecCombinationSummaries: Record<string, string> = {
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

export const riasecQuestions: RiasecQuestion[] = [
  question("R", 1, "Би гараараа ямар нэг зүйл угсрах, засах, бүтээх ажилд дуртай."),
  question("R", 2, "Би техник, төхөөрөмж, багаж хэрэгсэлтэй ажиллах сонирхолтой."),
  question("R", 3, "Би гадаа орчинд, хөдөлгөөнтэй ажил хийх дуртай."),
  question("R", 4, "Би бодит үр дүн нь шууд харагддаг ажилд татагддаг."),
  question("R", 5, "Би машин, төхөөрөмж, инженерчлэл, барилга зэрэг практик зүйлсийг сонирхдог."),
  question("R", 6, "Би удаан сууж онол уншихаас илүү бодитоор хийж туршиж үзэх дуртай."),
  question("I", 1, "Би аливаа зүйлийн учир шалтгааныг ойлгох дуртай."),
  question("I", 2, "Би шинжлэх ухаан, технологи, математик, судалгааны сэдвүүдэд сонирхолтой."),
  question("I", 3, "Би асуудлыг логикоор задлан шинжлэх дуртай."),
  question("I", 4, "Би шинэ мэдлэг хайж, асуулт асууж, нотолгоо олох дуртай."),
  question("I", 5, "Би туршилт хийх, дата шинжлэх, судалгаа хийх сонирхолтой."),
  question("I", 6, "Би төвөгтэй асуудлыг ганцаараа бодож шийдэхдээ дуртай."),
  question("A", 1, "Би зураг, дизайн, хөгжим, бичих, контент бүтээх зэрэг бүтээлч зүйлсэд дуртай."),
  question("A", 2, "Би өөрийн санааг өвөрмөц байдлаар илэрхийлэхийг хүсдэг."),
  question("A", 3, "Би дүрэм журам ихтэй ажлаас илүү чөлөөтэй сэтгэх боломжтой ажилд дуртай."),
  question("A", 4, "Би өнгө, хэлбэр, дуу, дүрслэл, story-той ажиллах сонирхолтой."),
  question("A", 5, "Би шинэ санаа гаргах, бусдаас өөрөөр бодох дуртай."),
  question("A", 6, "Би урлаг, медиа, fashion, design, creative technology зэрэг чиглэлүүдэд татагддаг."),
  question("S", 1, "Би бусдад туслах, зөвлөгөө өгөх, дэмжих дуртай."),
  question("S", 2, "Би хүүхэд, найз нөхөд, олон нийттэй харилцахдаа өөрийгөө сайн мэдэрдэг."),
  question("S", 3, "Би багшлах, тайлбарлах, бусдад ойлгуулах сонирхолтой."),
  question("S", 4, "Би хүмүүсийн сэтгэл хөдлөл, хэрэгцээ, асуудлыг ойлгохыг хичээдэг."),
  question("S", 5, "Би багаар ажиллах, хамтдаа шийдэл олох дуртай."),
  question("S", 6, "Би эрүүл мэнд, боловсрол, сэтгэл зүй, нийгмийн үйлчилгээ зэрэг салбарт сонирхолтой."),
  question("E", 1, "Би бусдыг ятгах, санаагаа хамгаалах, илтгэхдээ дуртай."),
  question("E", 2, "Би бизнес, худалдаа, маркетинг, удирдлагын чиглэл сонирхдог."),
  question("E", 3, "Би шинэ боломж олж харах, санаагаа хэрэгжүүлэх дуртай."),
  question("E", 4, "Би баг удирдах, шийдвэр гаргах, хариуцлага авахад бэлэн байдаг."),
  question("E", 5, "Би өрсөлдөөнтэй орчинд өөрийгөө сорих дуртай."),
  question("E", 6, "Би төсөл эхлүүлэх, мөнгө олох арга бодох, нөлөөлөл бий болгох сонирхолтой."),
  question("C", 1, "Би төлөвлөгөө гаргаж, ажлыг эмх цэгцтэй хийх дуртай."),
  question("C", 2, "Би тоо, баримт, бичиг цаас, мэдээлэлтэй нягт ажиллахдаа сайн."),
  question("C", 3, "Би тодорхой дүрэм, бүтэцтэй орчинд ажиллахад тухтай байдаг."),
  question("C", 4, "Би алдаа шалгах, бүртгэл хийх, зүйлсийг ангилах дуртай."),
  question("C", 5, "Би санхүү, дата, оффис, админ, системийн ажилд сонирхолтой."),
  question("C", 6, "Би ажлыг хугацаанд нь, зөв дарааллаар дуусгахыг чухалчилдаг."),
];

export function calculateRiasecResult(answers: RiasecAnswers): RiasecCalculation {
  assertRiasecAnswers(answers);

  const scores = emptyScores();

  riasecQuestions.forEach((item) => {
    scores[item.category] += answers[item.id];
  });

  const ranked = riasecCategoryOrder
    .map((category, index) => ({
      category,
      index,
      label: riasecProfiles[category].label,
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
    riasecCombinationSummaries[hollandCode] ?? fallbackSummary(topCategories);

  return {
    answers,
    hasTie: ranked.some((item, index) => item.score === ranked[index + 1]?.score),
    hollandCode,
    resultSummary,
    scores,
    suggestedFields: unique(topCategories.flatMap((item) => riasecProfiles[item.category].fields)),
    suggestedNextStep:
      "Топ чиглэлүүдтэй холбоотой 2-3 мэргэжлийг сонгож, тухайн ажлын өдөр тутмын орчин, шаардлагатай хичээл, туршиж үзэх жижиг төслөө зөвлөхтэй ярилцаарай.",
    suggestedSubjects: unique(
      topCategories.flatMap((item) => riasecProfiles[item.category].schoolSubjects),
    ),
    topCategories,
  };
}

export function assertRiasecAnswers(answers: RiasecAnswers) {
  const questionIds = new Set(riasecQuestions.map((item) => item.id));
  const answerIds = Object.keys(answers);

  if (answerIds.length !== riasecQuestions.length) {
    throw new Error("RIASEC тестийн бүх 36 асуултад хариулна уу.");
  }

  answerIds.forEach((id) => {
    if (!questionIds.has(id)) {
      throw new Error("RIASEC асуултын ID буруу байна.");
    }

    if (!Number.isInteger(answers[id]) || answers[id] < 1 || answers[id] > 5) {
      throw new Error("RIASEC хариулт 1-5 онооны хооронд байна.");
    }
  });
}

function emptyScores(): RiasecScores {
  return {
    A: 0,
    C: 0,
    E: 0,
    I: 0,
    R: 0,
    S: 0,
  };
}

function fallbackSummary(topCategories: RiasecRankedCategory[]) {
  const labels = topCategories.map((item) => riasecProfiles[item.category].label.toLowerCase());

  return `Таны илүү давамгай сонирхол ${labels.join(", ")} чиглэлүүд дээр төвлөрч байна. Эдгээрийн огтлолцох орчин, мэргэжлийн даалгаврыг ярилцлагаар илүү тодруулж болно.`;
}

function question(category: RiasecCategory, index: number, prompt: string): RiasecQuestion {
  return {
    category,
    id: `${category.toLowerCase()}-${index}`,
    prompt,
  };
}

function unique(items: string[]) {
  return [...new Set(items)];
}
