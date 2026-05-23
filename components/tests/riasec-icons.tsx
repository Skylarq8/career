import {
  BriefcaseBusiness,
  ClipboardCheck,
  FlaskConical,
  HandHeart,
  Palette,
  Wrench,
} from "lucide-react";
import type { RiasecCategory } from "@/lib/riasec";

const icons = {
  A: Palette,
  C: ClipboardCheck,
  E: BriefcaseBusiness,
  I: FlaskConical,
  R: Wrench,
  S: HandHeart,
} as const;

export function RiasecIcon({
  category,
  size = 22,
}: {
  category: RiasecCategory;
  size?: number;
}) {
  const Icon = icons[category];

  return <Icon size={size} />;
}
