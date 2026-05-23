import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { bookingStatus, consultationMode } from "./schema";

const optionalText = v.optional(v.string());

export const createBooking = mutation({
  args: {
    email: optionalText,
    grade: v.string(),
    message: optionalText,
    mode: consultationMode,
    parentName: v.string(),
    phone: v.string(),
    preferredDate: v.string(),
    preferredTime: v.string(),
    serviceType: v.string(),
    studentName: v.string(),
  },
  handler: async (ctx, args) => {
    validateRequired(args.parentName, "Эцэг эхийн нэр");
    validateRequired(args.studentName, "Хүүхдийн нэр");
    validatePhone(args.phone);
    validateRequired(args.grade, "Анги");
    validateRequired(args.serviceType, "Зөвлөгөөний төрөл");
    validateRequired(args.preferredDate, "Хүссэн өдөр");
    validateRequired(args.preferredTime, "Хүссэн цаг");

    const now = Date.now();
    const booking = {
      ...args,
      email: clean(args.email),
      message: clean(args.message),
      parentName: args.parentName.trim(),
      phone: args.phone.trim(),
      status: "NEW" as const,
      studentName: args.studentName.trim(),
      createdAt: now,
      updatedAt: now,
    };
    const id = await ctx.db.insert("bookings", booking);

    await ctx.scheduler.runAfter(0, internal.telegram.sendBookingNotification, {
      grade: booking.grade,
      mode: booking.mode,
      parentName: booking.parentName,
      phone: booking.phone,
      preferredDate: booking.preferredDate,
      preferredTime: booking.preferredTime,
      serviceType: booking.serviceType,
      studentName: booking.studentName,
    });

    return id;
  },
});

export const listBookings = query({
  args: {
    search: optionalText,
    status: v.optional(bookingStatus),
  },
  handler: async (ctx, args) => {
    const bookings = args.status
      ? await ctx.db.query("bookings").withIndex("by_status", (q) => q.eq("status", args.status!)).collect()
      : await ctx.db.query("bookings").collect();
    const search = args.search?.trim().toLowerCase();
    const filtered = search
      ? bookings.filter((booking) =>
          [booking.parentName, booking.studentName, booking.phone].some((value) =>
            value.toLowerCase().includes(search),
          ),
        )
      : bookings;

    return filtered.sort((left, right) => right.createdAt - left.createdAt);
  },
});

export const getBooking = query({
  args: {
    id: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateBookingStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: bookingStatus,
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

export const updateBookingNote = mutation({
  args: {
    adminNote: v.string(),
    id: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      adminNote: args.adminNote.trim() || undefined,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

function clean(value?: string) {
  const trimmed = value?.trim();

  return trimmed ? trimmed : undefined;
}

function validateRequired(value: string, label: string) {
  if (!value.trim()) {
    throw new Error(`${label} шаардлагатай.`);
  }
}

function validatePhone(value: string) {
  const phone = value.trim();

  if (!/^[+\d][\d\s-]{5,18}$/.test(phone)) {
    throw new Error("Утасны дугаараа зөв оруулна уу.");
  }
}
