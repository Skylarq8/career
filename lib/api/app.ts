import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { cors } from "hono/cors";
import { Hono } from "hono";
import type { Context } from "hono";
import {
  ADMIN_COOKIE_NAME,
  getAdminSessionValue,
  isAdminSessionValue,
  isValidAdminPassword,
} from "@/lib/admin-auth";
import { getPrisma } from "@/lib/prisma";
import { calculateRiasecResult } from "@/lib/riasec";
import { sendBookingTelegramNotification } from "@/lib/telegram";
import {
  adminLoginSchema,
  bookingInputSchema,
  bookingNotesInputSchema,
  bookingStatusInputSchema,
  bookingStatusSchema,
  riasecSubmitInputSchema,
  testResultInputSchema,
} from "@/lib/validators";

export const api = new Hono();

api.use(
  "/api/*",
  cors({
    origin: (origin) => origin || "*",
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  }),
);

function adminGuard(c: Context) {
  const session = getCookie(c, ADMIN_COOKIE_NAME);

  if (!isAdminSessionValue(session)) {
    return c.json({ error: "Admin нэвтрэлт шаардлагатай." }, 401);
  }

  return null;
}

async function bodyJson(c: Context) {
  try {
    return await c.req.json();
  } catch {
    return null;
  }
}

function validationError(c: Context, issues: unknown) {
  return c.json(
    {
      error: "Оруулсан мэдээллээ шалгана уу.",
      issues,
    },
    400,
  );
}

api.get("/api/health", (c) =>
  c.json({
    ok: true,
    service: "minii-chiglel-api",
  }),
);

api.post("/api/admin/session", async (c) => {
  const parsed = adminLoginSchema.safeParse(await bodyJson(c));
  const session = getAdminSessionValue();

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  if (!session || !isValidAdminPassword(parsed.data.password)) {
    return c.json({ error: "Нууц үг буруу байна." }, 401);
  }

  setCookie(c, ADMIN_COOKIE_NAME, session, {
    httpOnly: true,
    maxAge: 60 * 60 * 10,
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  return c.json({ ok: true });
});

api.delete("/api/admin/session", (c) => {
  deleteCookie(c, ADMIN_COOKIE_NAME, {
    path: "/",
  });

  return c.json({ ok: true });
});

api.post("/api/bookings", async (c) => {
  const parsed = bookingInputSchema.safeParse(await bodyJson(c));

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const { preferredDate } = parsed.data;
  const prisma = getPrisma();
  const booking = await prisma.booking.create({
    data: {
      email: parsed.data.email,
      grade: parsed.data.grade,
      message: parsed.data.message,
      mode: parsed.data.mode,
      parentName: parsed.data.parentName,
      phone: parsed.data.phone,
      preferredDate: new Date(`${preferredDate}T00:00:00.000Z`),
      preferredTime: parsed.data.preferredTime,
      serviceType: parsed.data.serviceType,
      studentName: parsed.data.studentName,
    },
  });

  await sendBookingTelegramNotification(booking);

  return c.json({ booking }, 201);
});

api.get("/api/bookings", async (c) => {
  const denied = adminGuard(c);

  if (denied) {
    return denied;
  }

  const status = bookingStatusSchema.safeParse(c.req.query("status"));
  const search = c.req.query("search")?.trim();
  const prisma = getPrisma();
  const bookings = await prisma.booking.findMany({
    where: {
      ...(status.success ? { status: status.data } : {}),
      ...(search
        ? {
            OR: [
              { parentName: { contains: search, mode: "insensitive" } },
              { studentName: { contains: search, mode: "insensitive" } },
              { phone: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json({ bookings });
});

api.get("/api/bookings/:id", async (c) => {
  const denied = adminGuard(c);

  if (denied) {
    return denied;
  }

  const booking = await getPrisma().booking.findUnique({
    where: {
      id: c.req.param("id"),
    },
  });

  if (!booking) {
    return c.json({ error: "Хүсэлт олдсонгүй." }, 404);
  }

  return c.json({ booking });
});

api.patch("/api/bookings/:id/status", async (c) => {
  const denied = adminGuard(c);

  if (denied) {
    return denied;
  }

  const parsed = bookingStatusInputSchema.safeParse(await bodyJson(c));

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const booking = await getPrisma().booking.update({
    where: {
      id: c.req.param("id"),
    },
    data: parsed.data,
  });

  return c.json({ booking });
});

api.patch("/api/bookings/:id/notes", async (c) => {
  const denied = adminGuard(c);

  if (denied) {
    return denied;
  }

  const parsed = bookingNotesInputSchema.safeParse(await bodyJson(c));

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const booking = await getPrisma().booking.update({
    where: {
      id: c.req.param("id"),
    },
    data: parsed.data,
  });

  return c.json({ booking });
});

api.post("/api/test-results", async (c) => {
  const parsed = testResultInputSchema.safeParse(await bodyJson(c));

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const result = await getPrisma().testResult.create({
    data: parsed.data,
  });

  return c.json({ result }, 201);
});

api.get("/api/test-results", async (c) => {
  const denied = adminGuard(c);

  if (denied) {
    return denied;
  }

  const results = await getPrisma().testResult.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json({ results });
});

api.post("/api/tests/riasec/submit", async (c) => {
  const parsed = riasecSubmitInputSchema.safeParse(await bodyJson(c));

  if (!parsed.success) {
    return validationError(c, parsed.error.flatten());
  }

  const calculation = calculateRiasecResult(parsed.data.answers);
  const shouldSave = Boolean(
    parsed.data.saveResult ||
      parsed.data.studentName ||
      parsed.data.grade ||
      parsed.data.phone ||
      parsed.data.parentPhone,
  );

  if (!shouldSave) {
    return c.json({ result: calculation, saved: false });
  }

  const savedResult = await getPrisma().riasecResult.create({
    data: {
      answers: calculation.answers,
      grade: parsed.data.grade,
      hollandCode: calculation.hollandCode,
      parentPhone: parsed.data.parentPhone,
      phone: parsed.data.phone,
      resultSummary: calculation.resultSummary,
      scores: calculation.scores,
      studentName: parsed.data.studentName,
      suggestedFields: calculation.suggestedFields,
      topCategories: calculation.topCategories,
    },
  });

  return c.json({ id: savedResult.id, result: calculation, saved: true }, 201);
});

api.get("/api/admin/riasec-results", async (c) => {
  const denied = adminGuard(c);

  if (denied) {
    return denied;
  }

  const results = await getPrisma().riasecResult.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json({ results });
});

api.get("/api/admin/riasec-results/:id", async (c) => {
  const denied = adminGuard(c);

  if (denied) {
    return denied;
  }

  const result = await getPrisma().riasecResult.findUnique({
    where: {
      id: c.req.param("id"),
    },
  });

  if (!result) {
    return c.json({ error: "RIASEC үр дүн олдсонгүй." }, 404);
  }

  return c.json({ result });
});

api.onError((error, c) => {
  console.error("API error.", error);

  return c.json(
    {
      error: "Серверийн алдаа гарлаа. Дахин оролдоно уу.",
    },
    500,
  );
});
