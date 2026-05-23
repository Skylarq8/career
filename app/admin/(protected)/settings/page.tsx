export default function AdminSettingsPage() {
  const checks = [
    { label: "NEXT_PUBLIC_CONVEX_URL", ready: Boolean(process.env.NEXT_PUBLIC_CONVEX_URL) },
    { label: "ADMIN_PASSWORD", ready: Boolean(process.env.ADMIN_PASSWORD) },
    { label: "TELEGRAM_BOT_TOKEN", ready: "Convex dashboard дээр тохируулна" },
    { label: "TELEGRAM_CHAT_ID", ready: "Convex dashboard дээр тохируулна" },
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
                check.ready === true
                  ? "border-emerald/25 bg-emerald/12 text-navy"
                  : "border-gold/35 bg-gold/12 text-navy",
              ].join(" ")}
            >
              {check.ready === true ? "Тохирсон" : check.ready || "Дутуу"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
