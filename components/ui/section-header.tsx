export function SectionHeader({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={[
          "mb-4 inline-flex rounded-full border px-4 py-2 text-sm font-semibold",
          inverted
            ? "border-white/15 bg-white/10 text-gold"
            : "border-gold/35 bg-gold/10 text-navy",
        ].join(" ")}
      >
        {eyebrow}
      </p>
      <h2
        className={[
          "heading-font text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl",
          inverted ? "text-white" : "text-navy",
        ].join(" ")}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={[
            "mt-5 text-base leading-8 sm:text-lg",
            inverted ? "text-white/72" : "text-muted",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
