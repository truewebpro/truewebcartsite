import { Globe, ShoppingCart, Code2, TrendingUp, LifeBuoy, PenTool, Smartphone, Plug, Search, Megaphone, Store, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Globe,
  ShoppingCart,
  Code2,
  TrendingUp,
  LifeBuoy,
  PenTool,
  Smartphone,
  Plug,
  Search,
  Megaphone,
  Store,
};

export default function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Code2;
  return <Icon className={className} aria-hidden="true" />;
}
