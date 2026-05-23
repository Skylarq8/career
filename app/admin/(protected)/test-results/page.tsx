import Link from "next/link";

export default function AdminTestResultsPage() {
  return (
    <>
      <div>
        <p className="font-semibold text-emerald">Tests</p>
        <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy">
          Тестийн үр дүн
        </h1>
      </div>
      <div className="mt-7 rounded-[1.5rem] border border-line bg-soft-white p-6">
        <p className="font-bold text-navy">MVP хадгалалт Convex дээр RIASEC үр дүнд төвлөрсөн.</p>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Interest, learning style, strength finder mini тестүүд одоогоор browser дээр л
          ажиллана. Admin-д хадгалагдсан RIASEC / Holland Code үр дүнг доорх
          хэсгээс харна уу.
        </p>
        <Link
          className="mt-5 inline-flex min-h-12 items-center rounded-full bg-emerald px-5 font-semibold text-white transition hover:bg-navy"
          href="/admin/riasec-results"
        >
          RIASEC үр дүн харах
        </Link>
      </div>
    </>
  );
}
