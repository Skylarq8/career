import type { ReactNode } from "react";

export function DataTable({
  children,
  headers,
}: {
  children: ReactNode;
  headers: string[];
}) {
  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-line bg-soft-white">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-cream/75 text-xs font-bold uppercase text-muted">
          <tr>
            {headers.map((header) => (
              <th key={header} className="whitespace-nowrap px-4 py-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}
