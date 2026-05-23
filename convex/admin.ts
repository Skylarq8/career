import { query } from "./_generated/server";

export const dashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const [bookings, riasecResults] = await Promise.all([
      ctx.db.query("bookings").collect(),
      ctx.db.query("riasecResults").collect(),
    ]);

    return {
      confirmedBookings: bookings.filter((booking) => booking.status === "CONFIRMED").length,
      contactedBookings: bookings.filter((booking) => booking.status === "CONTACTED").length,
      newBookings: bookings.filter((booking) => booking.status === "NEW").length,
      testResults: riasecResults.length,
    };
  },
});
