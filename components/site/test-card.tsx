import { ArrowRight, Sparkles } from "lucide-react";

export function TestCard({
  title,
  description,
  questions,
  onSelect,
}: {
  title: string;
  description: string;
  questions: number;
  onSelect?: () => void;
}) {
  return (
    <button
      className="group flex h-full w-full flex-col rounded-[1.5rem] border border-line bg-soft-white p-6 text-left premium-shadow transition hover:-translate-y-1 hover:border-emerald focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald/20"
      onClick={onSelect}
      type="button"
    >
      <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-emerald/12 text-emerald">
        <Sparkles size={20} />
      </span>
      <h3 className="heading-font mt-5 text-2xl font-extrabold text-navy">
        {title}
      </h3>
      <p className="mt-3 flex-1 leading-7 text-muted">{description}</p>
      <span className="mt-5 flex items-center justify-between gap-3 text-sm font-semibold text-navy">
        {questions} асуулт
        <ArrowRight className="text-emerald transition group-hover:translate-x-1" size={18} />
      </span>
    </button>
  );
}
