import { Globe, ShoppingCart, Code2, TrendingUp, LifeBuoy, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  ShoppingCart,
  Code2,
  TrendingUp,
  LifeBuoy,
};

export default function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Code2;
  return <Icon className={className} aria-hidden="true" />;
}
