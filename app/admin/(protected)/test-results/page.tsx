import { DataTable } from "@/components/admin/data-table";
import { getAdminTestResults } from "@/lib/admin-data";

export default async function AdminTestResultsPage() {
  const results = await getAdminTestResults();

  return (
    <>
      <div>
        <p className="font-semibold text-emerald">Tests</p>
        <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy">
          Тестийн үр дүн
        </h1>
      </div>
      <div className="mt-7">
        <DataTable headers={["Хэрэглэгч", "Тест", "Үр дүн", "Санал", "Үүссэн"]}>
          {results.map((result) => (
            <tr key={result.id} className="align-top text-navy">
              <td className="px-4 py-4">
                <span className="font-bold">{result.name || "Нэргүй"}</span>
                <span className="mt-1 block text-muted">{result.phone || "Утасгүй"}</span>
              </td>
              <td className="min-w-40 px-4 py-4">{result.testType}</td>
              <td className="min-w-56 px-4 py-4">
                <span className="font-bold">{result.resultTitle}</span>
                <span className="mt-1 block leading-6 text-muted">
                  {result.resultDescription}
                </span>
              </td>
              <td className="min-w-48 px-4 py-4 text-muted">
                {directions(result.suggestedDirections)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-muted">
                {formatDateTime(result.createdAt)}
              </td>
            </tr>
          ))}
        </DataTable>
        {results.length === 0 ? (
          <p className="mt-4 rounded-[1.25rem] border border-dashed border-line p-5 text-muted">
            Хадгалсан тестийн үр дүн одоогоор алга.
          </p>
        ) : null}
      </div>
    </>
  );
}

function directions(value: unknown) {
  return Array.isArray(value) ? value.join(", ") : "Чиглэл хадгалагдаагүй";
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("mn-MN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
