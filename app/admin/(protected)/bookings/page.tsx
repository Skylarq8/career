import { AdminBookingsClient } from "@/components/admin/admin-bookings-client";
import { bookingStatusSchema } from "@/lib/validators";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const status = bookingStatusSchema.safeParse(params.status);

  return (
    <AdminBookingsClient
      search={params.search?.trim() || undefined}
      status={status.success ? status.data : undefined}
    />
  );
}
