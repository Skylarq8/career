import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const variantClassName: Record<Variant, string> = {
  primary:
    "border-emerald bg-emerald text-white hover:border-navy hover:bg-navy",
  secondary:
    "border-line bg-soft-white text-navy hover:border-emerald hover:bg-skywash",
  ghost: "border-transparent bg-transparent text-navy hover:bg-soft-white",
  dark: "border-white/15 bg-white text-navy hover:border-gold hover:bg-gold",
};

function classes(variant: Variant, className?: string) {
  return [
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald/20 disabled:cursor-not-allowed disabled:opacity-60",
    variantClassName[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={classes(variant, className)} {...props} />;
}

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: Variant;
}) {
  return (
    <Link className={classes(variant, className)} href={href}>
      {children}
    </Link>
  );
}
