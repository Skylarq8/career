"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { DataTable } from "@/components/admin/data-table";
import { AdminLoading } from "@/components/admin/admin-dashboard-client";
import { api } from "@/convex/_generated/api";
import { riasecProfiles } from "@/lib/riasec";
import type { RiasecRankedCategory } from "@/lib/riasec";

export function AdminRiasecResultsClient() {
  const results = useQuery(api.riasec.listRiasecResults, {});

  if (!results) {
    return <AdminLoading label="RIASEC үр дүн уншиж байна..." />;
  }

  return (
    <>
      <div>
        <p className="font-semibold text-emerald">RIASEC</p>
        <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy">
          Holland Code үр дүн
        </h1>
      </div>
      <div className="mt-7">
        <DataTable
          headers={["Сурагч", "Анги", "Утас", "Holland Code", "Топ чиглэл", "Үүссэн"]}
        >
          {results.map((result) => (
            <tr key={result._id} className="align-top text-navy">
              <td className="px-4 py-4">
                <Link
                  className="font-bold hover:text-emerald"
                  href={`/admin/riasec-results/${result._id}`}
                >
                  {result.studentName || "Anonymous"}
                </Link>
                <span className="mt-1 block text-muted">
                  Эцэг эх: {result.parentPhone || "Оруулаагүй"}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-4">{result.grade || "-"}</td>
              <td className="whitespace-nowrap px-4 py-4">{result.phone || "-"}</td>
              <td className="px-4 py-4">
                <span className="rounded-full bg-navy px-3 py-2 font-extrabold text-white">
                  {result.hollandCode}
                </span>
              </td>
              <td className="min-w-64 px-4 py-4 text-muted">
                {topLabels(result.topCategories)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-muted">
                {formatDateTime(result.createdAt)}
              </td>
            </tr>
          ))}
        </DataTable>
        {results.length === 0 ? (
          <p className="mt-4 rounded-[1.25rem] border border-dashed border-line p-5 text-muted">
            Хадгалсан RIASEC үр дүн одоогоор алга.
          </p>
        ) : null}
      </div>
    </>
  );
}

function topLabels(value: RiasecRankedCategory[]) {
  return value
    .map((item) => `${item.category} ${riasecProfiles[item.category]?.label ?? ""}`)
    .join(", ");
}

function formatDateTime(timestamp: number) {
  return new Intl.DateTimeFormat("mn-MN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}
