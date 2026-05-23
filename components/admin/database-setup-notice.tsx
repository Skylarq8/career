import { Database, ExternalLink } from "lucide-react";
import Link from "next/link";

export function DatabaseSetupNotice() {
  return (
    <div className="grid min-h-[calc(100svh-4rem)] place-items-center rounded-[1.5rem] border border-line bg-soft-white p-5 sm:p-8">
      <div className="w-full max-w-2xl rounded-[1.75rem] border border-gold/35 bg-cream p-6 premium-shadow sm:p-8">
        <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-navy">
          <Database size={22} />
        </span>
        <p className="mt-5 font-semibold text-emerald">Database setup</p>
        <h1 className="heading-font mt-3 text-3xl font-extrabold leading-tight text-navy">
          Admin data харахын тулд `DATABASE_URL` тохируулна уу
        </h1>
        <p className="mt-4 leading-8 text-muted">
          Нэвтрэлт ажиллаж байна. Харин цагийн хүсэлт, тестийн үр дүн, admin
          төлөвүүд PostgreSQL дээр хадгалагдах тул Supabase эсвэл локал Postgres
          холбоос хэрэгтэй.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-[1.25rem] border border-line bg-night p-4 text-sm leading-7 text-white">
          <code>{`# .env.local
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..." # Supabase direct URL байвал`}</code>
        </pre>
        <p className="mt-5 leading-8 text-muted">
          Env нэмсний дараа dev server-ээ дахин асаагаад migration ажиллуулна.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-[1.25rem] border border-line bg-soft-white p-4 text-sm leading-7 text-navy">
          <code>{`npm run db:generate
npm run db:migrate
npm run dev`}</code>
        </pre>
        <Link
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-soft-white px-5 py-3 font-semibold text-navy transition hover:border-emerald hover:bg-skywash"
          href="/"
        >
          <ExternalLink size={18} />
          Public site руу буцах
        </Link>
      </div>
    </div>
  );
}
