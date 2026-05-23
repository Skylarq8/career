import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { consultationMode } from "./schema";

export const sendBookingNotification = internalAction({
  args: {
    grade: v.string(),
    mode: consultationMode,
    parentName: v.string(),
    phone: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    serviceType: v.string(),
    studentName: v.string(),
  },
  handler: async (_, args) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.warn("Telegram env vars are not configured for Convex.");
      return {
        ok: false,
        skipped: true,
      };
    }

    const text = `🧭 Шинэ мэргэжил сонголтын зөвлөгөөний хүсэлт

Эцэг эх: ${args.parentName}
Хүүхэд: ${args.studentName}
Утас: ${args.phone}
Анги: ${args.grade}
Үйлчилгээ: ${args.serviceType}
Өдөр/цаг: ${args.preferredDate} ${args.preferredTime}
Хэлбэр: ${args.mode}

Admin дээр шалгана уу.`;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Telegram notification failed: ${response.status}`);
    }

    return {
      ok: true,
    };
  },
});
