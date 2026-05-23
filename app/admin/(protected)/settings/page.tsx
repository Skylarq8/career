export default function AdminSettingsPage() {
  const checks = [
    { label: "DATABASE_URL", ready: Boolean(process.env.DATABASE_URL) },
    { label: "TELEGRAM_BOT_TOKEN", ready: Boolean(process.env.TELEGRAM_BOT_TOKEN) },
    { label: "TELEGRAM_CHAT_ID", ready: Boolean(process.env.TELEGRAM_CHAT_ID) },
    { label: "ADMIN_PASSWORD", ready: Boolean(process.env.ADMIN_PASSWORD) },
  ] as const;

  return (
    <>
      <div>
        <p className="font-semibold text-emerald">Settings</p>
        <h1 className="heading-font mt-3 text-3xl font-extrabold text-navy">
          Орчны тохиргоо
        </h1>
      </div>
      <div className="mt-7 grid gap-3">
        {checks.map((check) => (
          <div
            key={check.label}
            className="flex flex-col gap-2 rounded-[1.25rem] border border-line bg-soft-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <code className="text-sm font-bold text-navy">{check.label}</code>
            <span
              className={[
                "rounded-full border px-3 py-1 text-sm font-semibold",
                check.ready
                  ? "border-emerald/25 bg-emerald/12 text-navy"
                  : "border-gold/35 bg-gold/12 text-navy",
              ].join(" ")}
            >
              {check.ready ? "Тохирсон" : "Дутуу"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
