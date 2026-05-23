export const bookingStatuses = [
  "NEW",
  "CONTACTED",
  "CONFIRMED",
  "CANCELLED",
  "DONE",
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export const bookingStatusLabels: Record<BookingStatus, string> = {
  CANCELLED: "Цуцалсан",
  CONFIRMED: "Баталгаажсан",
  CONTACTED: "Холбогдсон",
  DONE: "Дууссан",
  NEW: "Шинэ",
};
