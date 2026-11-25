import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "available" | "unavailable" | "restock";
  className?: string;
  children: React.ReactNode;
};

export function Badge({
  variant = "unavailable",
  className,
  children,
}: BadgeProps) {
  const variants = {
    available:
      "bg-pink text-cocoa border border-pink/30 px-3 py-1 rounded-full text-xs font-semibold",
    unavailable:
      "bg-lavender text-cocoa border border-lavender/30 px-3 py-1 rounded-full text-xs font-semibold",
    restock:
      "bg-blush text-cocoa border border-blush/30 px-3 py-1 rounded-full text-xs font-semibold animate-pulse",
  };

  return (
    <span className={cn(variants[variant], className)}>{children}</span>
  );
}
