import { AdminRiasecResultDetailClient } from "@/components/admin/admin-riasec-result-detail-client";

export default async function AdminRiasecResultDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdminRiasecResultDetailClient id={id} />;
}
