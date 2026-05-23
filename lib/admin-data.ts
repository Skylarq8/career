import { bookingStatusSchema } from "@/lib/validators";
import { getPrisma } from "@/lib/prisma";
import type { Booking, BookingStatus, RiasecResult, TestResult } from "@prisma/client";

export async function getDashboardStats() {
  const prisma = getPrisma();
  const [newBookings, contactedBookings, confirmedBookings, testResults] =
    await Promise.all([
      prisma.booking.count({ where: { status: "NEW" } }),
      prisma.booking.count({ where: { status: "CONTACTED" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.testResult.count(),
    ]);

  return {
    contactedBookings,
    confirmedBookings,
    newBookings,
    testResults,
  };
}

export async function getAdminBookings({
  search,
  status,
}: {
  search?: string;
  status?: BookingStatus;
}): Promise<Booking[]> {
  const parsedStatus = bookingStatusSchema.safeParse(status);

  return getPrisma().booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      ...(parsedStatus.success ? { status: parsedStatus.data } : {}),
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
  });
}

export async function getAdminBooking(id: string): Promise<Booking | null> {
  return getPrisma().booking.findUnique({
    where: {
      id,
    },
  });
}

export async function getAdminTestResults(): Promise<TestResult[]> {
  return getPrisma().testResult.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminRiasecResults(): Promise<RiasecResult[]> {
  return getPrisma().riasecResult.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAdminRiasecResult(id: string): Promise<RiasecResult | null> {
  return getPrisma().riasecResult.findUnique({
    where: {
      id,
    },
  });
}
