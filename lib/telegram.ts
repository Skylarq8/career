import type { Booking } from "@prisma/client";

function modeLabel(mode: Booking["mode"]) {
  return mode === "ONLINE" ? "Онлайн" : "Биечлэн";
}

function dateLabel(date: Date) {
  return new Intl.DateTimeFormat("mn-MN", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export async function sendBookingTelegramNotification(booking: Booking) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { delivered: false, skipped: true };
  }

  const text = [
    "🧭 Шинэ мэргэжил сонголтын зөвлөгөөний хүсэлт",
    "",
    `Эцэг эх: ${booking.parentName}`,
    `Хүүхэд: ${booking.studentName}`,
    `Утас: ${booking.phone}`,
    `Анги: ${booking.grade}`,
    `Үйлчилгээ: ${booking.serviceType}`,
    `Өдөр/цаг: ${dateLabel(booking.preferredDate)} ${booking.preferredTime}`,
    `Хэлбэр: ${modeLabel(booking.mode)}`,
    "",
    "Admin дээр шалгана уу.",
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      },
    );

    return { delivered: response.ok, skipped: false };
  } catch (error) {
    console.error("Telegram booking notification failed.", error);
    return { delivered: false, skipped: false };
  }
}
