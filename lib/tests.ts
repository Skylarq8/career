export type TestOption = {
  id: string;
  label: string;
  scores: Record<string, number>;
};

export type TestQuestion = {
  id: string;
  prompt: string;
  options: TestOption[];
};

export type TestResultProfile = {
  key: string;
  title: string;
  description: string;
  suggestedDirections: string[];
};

export type CareerTest = {
  id: string;
  title: string;
  description: string;
  questions: TestQuestion[];
  results: TestResultProfile[];
};

const interestResults: TestResultProfile[] = [
  {
    key: "creative",
    title: "Бүтээлч чиглэл",
    description:
      "Та санаа, дүрслэл, шинэ өнцөг гаргах ажилд эрч хүч авах хандлагатай байна.",
    suggestedDirections: ["Дизайн ба медиа", "Архитектур", "Контент ба бүтээлч технологи"],
  },
  {
    key: "science",
    title: "Шинжлэх ухаан/технологи",
    description:
      "Асуудлыг туршиж, систем ойлгож, шинэ шийдэл бүтээх орчин танд сонирхолтой байж магадгүй.",
    suggestedDirections: ["Инженерчлэл", "Программ хангамж", "Байгалийн шинжлэх ухаан"],
  },
  {
    key: "people",
    title: "Хүмүүстэй ажиллах чиглэл",
    description:
      "Хүмүүсийг сонсох, тайлбарлах, дэмжих үед таны оролцоо тод мэдрэгддэг.",
    suggestedDirections: ["Боловсрол", "Зөвлөгөө ба сэтгэл судлалын орчин", "Эрүүл мэндийн үйлчилгээ"],
  },
  {
    key: "business",
    title: "Бизнес/удирдлага",
    description:
      "Зорилго тавих, боломж тооцох, багийг хөдөлгөх ажил танд сонирхол төрүүлж байна.",
    suggestedDirections: ["Бизнес удирдлага", "Маркетинг", "Эдийн засаг ба төслийн менежмент"],
  },
  {
    key: "analysis",
    title: "Судалгаа/аналитик",
    description:
      "Баримт цуглуулж, хэв шинж олж, тайван дүгнэлт гаргах ажил танд тохирох дохио байна.",
    suggestedDirections: ["Өгөгдлийн шинжилгээ", "Судалгаа", "Санхүү ба бодлогын анализ"],
  },
];

const learningResults: TestResultProfile[] = [
  {
    key: "visual",
    title: "Visual learner",
    description:
      "Зураглал, өнгө, схем, жишээ харах нь мэдээллийг тогтоох эхний түлхүүр байж магадгүй.",
    suggestedDirections: ["Mind map ашиглах", "Диаграм зурж тайлбарлах", "Өнгөөр ангилсан тэмдэглэл"],
  },
  {
    key: "auditory",
    title: "Auditory learner",
    description:
      "Яриа сонсох, асуулт хэлэлцэх, өөртөө чангаар тайлбарлах нь ойлголтыг бататгаж байна.",
    suggestedDirections: ["Багшийн тайлбарыг дүгнэх", "Хэлэлцүүлгийн бүлэг", "Өөрийн дуугаар давтах"],
  },
  {
    key: "practical",
    title: "Practical learner",
    description:
      "Хийж үзэх, турших, бодит жишээнд хүрэх үед суралцах идэвх өндөрсдөг.",
    suggestedDirections: ["Дасгал ба туршилт", "Кейс дээр ажиллах", "Бага алхмаар хийж шалгах"],
  },
  {
    key: "reading",
    title: "Reading/writing learner",
    description:
      "Унших, бичих, өөрийн үгээр нэгтгэх нь мэдлэгээ цэгцлэх хүчтэй арга болж байна.",
    suggestedDirections: ["Товч тэмдэглэл", "Асуулт-хариултын карт", "Өөрийн үгээр тайлбар бичих"],
  },
];

const strengthResults: TestResultProfile[] = [
  {
    key: "communication",
    title: "Харилцааны хүчтэй тал",
    description:
      "Сонсох, ойлгуулах, хүмүүсийн хооронд холбоо үүсгэх үед таны хүчтэй тал илэрч байна.",
    suggestedDirections: ["Илтгэл ба фасилитаци", "Багийн хамтын ажиллагаа", "Хэрэглэгчтэй ажиллах орчин"],
  },
  {
    key: "logic",
    title: "Логик сэтгэлгээ",
    description:
      "Учир шалтгаан олох, бүтэц гаргах, нарийн асуудлыг тайлах тал тань тод байна.",
    suggestedDirections: ["Математик загварчлал", "Код ба алгоритм", "Шийдвэрийн анализ"],
  },
  {
    key: "creativity",
    title: "Бүтээлч байдал",
    description:
      "Шинэ санаа, хэлбэр, туршилт гаргахдаа та бусдад өөр өнцөг харуулдаг.",
    suggestedDirections: ["Бүтээгдэхүүний санаачилга", "Дизайн сэтгэлгээ", "Өгүүлэмж ба контент"],
  },
  {
    key: "organization",
    title: "Зохион байгуулах чадвар",
    description:
      "Даалгавар, хугацаа, жижиг хэсгүүдийг эмхлэх нь таны найдвартай давуу тал байж болно.",
    suggestedDirections: ["Төслийн зохион байгуулалт", "Судалгааны төлөвлөлт", "Процесс сайжруулалт"],
  },
  {
    key: "leadership",
    title: "Манлайлах хандлага",
    description:
      "Чиглэл өгөх, шийдвэр гаргах, бусдыг зоригжуулах мөчид та идэвхтэй оролцдог.",
    suggestedDirections: ["Баг удирдах дадлага", "Нийгмийн санаачилга", "Бизнесийн туршилт"],
  },
];

export const careerTests: CareerTest[] = [
  {
    id: "interest",
    title: "Сонирхлын тест",
    description:
      "Ямар төрлийн асуудал, орчин, өдөр тутмын ажил танд илүү сонирхолтойг ажиглана.",
    results: interestResults,
    questions: [
      {
        id: "interest-1",
        prompt: "Чөлөөт өдөр нэг төсөл сонговол аль нь хамгийн татах вэ?",
        options: [
          option("i1-a", "Постер эсвэл богино видео бүтээх", "creative"),
          option("i1-b", "Жижиг робот эсвэл апп турших", "science"),
          option("i1-c", "Найздаа хичээл ойлгуулах", "people"),
          option("i1-d", "Сургуулийн арга хэмжээ төлөвлөх", "business"),
          option("i1-e", "Сонирхолтой сэдвээр баримт цуглуулах", "analysis"),
        ],
      },
      {
        id: "interest-2",
        prompt: "Асуудал гарвал хамгийн түрүүнд юу хийх дуртай вэ?",
        options: [
          option("i2-a", "Өөр санаа олон хувилбараар зурж үзэх", "creative"),
          option("i2-b", "Яаж ажилладгийг нь задлах", "science"),
          option("i2-c", "Хэнд яаж нөлөөлж байгааг сонсох", "people"),
          option("i2-d", "Зорилго, нөөц, хугацааг тооцох", "business"),
          option("i2-e", "Мэдээлэл шалгаж шалтгаан олох", "analysis"),
        ],
      },
      {
        id: "interest-3",
        prompt: "Сургуулийн багт ямар үүрэг танд эвтэйхэн вэ?",
        options: [
          option("i3-a", "Дүр төрх, санааны өнгийг гаргах", "creative"),
          option("i3-b", "Техникийн шийдэл турших", "science"),
          option("i3-c", "Багийн уур амьсгалыг холбох", "people"),
          option("i3-d", "Ажлыг чиглүүлж танилцуулах", "business"),
          option("i3-e", "Баримт, судалгааг нэгтгэх", "analysis"),
        ],
      },
      {
        id: "interest-4",
        prompt: "Ямар хичээлийн даалгавар танд илүү амьд санагддаг вэ?",
        options: [
          option("i4-a", "Өөрийн бүтээлээр санаа илэрхийлэх", "creative"),
          option("i4-b", "Туршилт эсвэл кодын үр дүн харах", "science"),
          option("i4-c", "Хүмүүсийн түүх, хэрэгцээг ойлгох", "people"),
          option("i4-d", "Төлөвлөгөө гаргаж шийдвэр хамгаалах", "business"),
          option("i4-e", "Эх сурвалж харьцуулж дүгнэх", "analysis"),
        ],
      },
      {
        id: "interest-5",
        prompt: "Ирээдүйн ажлын өдөрт аль мэдрэмжийг хүсэх вэ?",
        options: [
          option("i5-a", "Шинэ санаа бодитоор харагдах", "creative"),
          option("i5-b", "Нарийн систем ажиллаж эхлэх", "science"),
          option("i5-c", "Хэн нэгэнд ахиц мэдрэгдэх", "people"),
          option("i5-d", "Том зорилго урагшлах", "business"),
          option("i5-e", "Тодорхойгүй зүйл ойлгомжтой болох", "analysis"),
        ],
      },
      {
        id: "interest-6",
        prompt: "Клуб эсвэл дугуйлан сонговол аль нь ойр вэ?",
        options: [
          option("i6-a", "Дизайн, театр, медиа", "creative"),
          option("i6-b", "STEM, код, лаборатори", "science"),
          option("i6-c", "Сайн дурын ажил, мэтгэлцээн", "people"),
          option("i6-d", "Энтрепренер, арга хэмжээ", "business"),
          option("i6-e", "Олимпиад, дата, судалгааны клуб", "analysis"),
        ],
      },
      {
        id: "interest-7",
        prompt: "Хүмүүс таныг юунд туслаач гэж их асуудаг вэ?",
        options: [
          option("i7-a", "Илүү сонирхолтой харагдуулах", "creative"),
          option("i7-b", "Техникийн алдаа олох", "science"),
          option("i7-c", "Сонсож зөв үг олох", "people"),
          option("i7-d", "Ажлыг хөдөлгөж зохицуулах", "business"),
          option("i7-e", "Мэдээлэл шалгаж тайлбарлах", "analysis"),
        ],
      },
      {
        id: "interest-8",
        prompt: "Шинэ мэргэжил судлахдаа юуг хамгийн түрүүнд хармаар вэ?",
        options: [
          option("i8-a", "Ямар бүтээл гаргадаг вэ", "creative"),
          option("i8-b", "Ямар технологи ашигладаг вэ", "science"),
          option("i8-c", "Хэнд тусалдаг вэ", "people"),
          option("i8-d", "Ямар нөлөө, боломжтой вэ", "business"),
          option("i8-e", "Ямар асуудлыг нотолгоогоор шийддэг вэ", "analysis"),
        ],
      },
      {
        id: "interest-9",
        prompt: "Багаар хийсэн амжилтаас юу танд хамгийн их таалагддаг вэ?",
        options: [
          option("i9-a", "Өвөрмөц санаа хүмүүсийг гайхшруулах", "creative"),
          option("i9-b", "Шийдэл алдаагүй ажиллах", "science"),
          option("i9-c", "Бүгд оролцож чадсан байх", "people"),
          option("i9-d", "Зорилгодоо хүрч үр дүн гарах", "business"),
          option("i9-e", "Дүгнэлт нь баттай байх", "analysis"),
        ],
      },
      {
        id: "interest-10",
        prompt: "Нэг асуултыг удаан судлах бол аль сэдэв ойр вэ?",
        options: [
          option("i10-a", "Хүмүүс юунаас урам авдаг вэ", "creative"),
          option("i10-b", "Ирээдүйн төхөөрөмж яаж ажиллах вэ", "science"),
          option("i10-c", "Хүүхэд яаж сайн суралцдаг вэ", "people"),
          option("i10-d", "Санаа яаж тогтвортой бизнес болдог вэ", "business"),
          option("i10-e", "Өгөгдөл ямар хэв шинж харуулж байна вэ", "analysis"),
        ],
      },
    ],
  },
  {
    id: "learning-style",
    title: "Суралцах хэв маягийн тест",
    description:
      "Мэдээллийг харах, сонсох, хийж үзэх, уншиж бичих аргуудаас аль нь танд ойр байгааг харна.",
    results: learningResults,
    questions: [
      learningQuestion("learning-1", "Шинэ ойлголт сурахдаа юу хамгийн түрүүнд тусалдаг вэ?"),
      learningQuestion("learning-2", "Шалгалтад бэлдэхдээ ямар аргыг өөрөө сонгох вэ?"),
      learningQuestion("learning-3", "Заавар авахад аль хэлбэр амар вэ?"),
      learningQuestion("learning-4", "Алдаа гарсны дараа юугаар хурдан ойлгох вэ?"),
      learningQuestion("learning-5", "Урт сэдвийг тогтоохдоо юу хийдэг вэ?"),
      learningQuestion("learning-6", "Багийн хичээл дээр аль үүрэг танд сурахад тусалдаг вэ?"),
      learningQuestion("learning-7", "Нэг бодлогын арга барилыг яаж давтах вэ?"),
      learningQuestion("learning-8", "Шинэ хичээл сонирхолтой санагдах мөч аль нь вэ?"),
    ],
  },
  {
    id: "strength-finder",
    title: "Хүчтэй талын мини тест",
    description:
      "Та асуудал шийдэх, багт оролцох үед ямар хүчтэй тал илүү тодордгийг ажиглана.",
    results: strengthResults,
    questions: [
      strengthQuestion("strength-1", "Багийн ажил эхлэхэд та юу авч үзэх вэ?"),
      strengthQuestion("strength-2", "Найзууд тань танд юугаар найдах нь олон вэ?"),
      strengthQuestion("strength-3", "Хэцүү даалгавар дундаас юу таныг урагшлуулдаг вэ?"),
      strengthQuestion("strength-4", "Танилцуулга бэлдэх үед ямар хэсэг танд ойр вэ?"),
      strengthQuestion("strength-5", "Төлөвлөгөө өөрчлөгдвөл та ихэвчлэн яадаг вэ?"),
      strengthQuestion("strength-6", "Шинэ клуб байгуулбал ямар хувь нэмэр оруулах вэ?"),
      strengthQuestion("strength-7", "Маргаантай үед та юу хийхийг зорьдог вэ?"),
      strengthQuestion("strength-8", "Өөрийн ахицыг харахад юуг чухалчилдаг вэ?"),
      strengthQuestion("strength-9", "Бусдын анзаараагүй юуг та олж хардаг вэ?"),
      strengthQuestion("strength-10", "Ирээдүйн ажилд аль чанараа ашигламаар вэ?"),
    ],
  },
];

export function scoreTest(test: CareerTest, answers: Record<string, string>) {
  const scores = new Map(test.results.map((result) => [result.key, 0]));

  test.questions.forEach((question) => {
    const selected = question.options.find((option) => option.id === answers[question.id]);

    if (!selected) {
      return;
    }

    Object.entries(selected.scores).forEach(([key, value]) => {
      scores.set(key, (scores.get(key) ?? 0) + value);
    });
  });

  const winner = [...scores.entries()].sort((left, right) => right[1] - left[1])[0]?.[0];

  return test.results.find((result) => result.key === winner) ?? test.results[0];
}

function option(id: string, label: string, key: string): TestOption {
  return {
    id,
    label,
    scores: {
      [key]: 2,
    },
  };
}

function learningQuestion(id: string, prompt: string): TestQuestion {
  return {
    id,
    prompt,
    options: [
      option(`${id}-visual`, "Зураг, хүснэгт, схемээр харах", "visual"),
      option(`${id}-auditory`, "Тайлбар сонсож ярилцах", "auditory"),
      option(`${id}-practical`, "Өөрөө хийж турших", "practical"),
      option(`${id}-reading`, "Уншиж, тэмдэглэл бичих", "reading"),
    ],
  };
}

function strengthQuestion(id: string, prompt: string): TestQuestion {
  return {
    id,
    prompt,
    options: [
      option(`${id}-communication`, "Хүмүүсийг сонсож ойлголцуулах", "communication"),
      option(`${id}-logic`, "Шалтгаан, бүтэц, тооцоог олох", "logic"),
      option(`${id}-creativity`, "Шинэ хувилбар, санаа гаргах", "creativity"),
      option(`${id}-organization`, "Алхам, хугацаа, эмх цэгцийг барих", "organization"),
      option(`${id}-leadership`, "Чиглэл өгч шийдвэр хөдөлгөх", "leadership"),
    ],
  };
}
