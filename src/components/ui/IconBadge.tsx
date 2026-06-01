import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
  icon: LucideIcon;
  tone?: "purple" | "peach" | "yellow" | "mint";
  className?: string;
};

export function IconBadge({ icon: Icon, tone = "purple", className = "" }: IconBadgeProps) {
  return (
    <span className={`icon-badge icon-badge-${tone} ${className}`.trim()} aria-hidden="true">
      <Icon size={19} />
    </span>
  );
}
