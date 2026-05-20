import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type MetricItemProps = {
  icon?: LucideIcon;
  label: string;
  value: ReactNode;
  unit?: string;
  tone?: "purple" | "peach" | "yellow" | "mint" | "red";
};

export function MetricItem({ icon: Icon, label, tone = "purple", unit, value }: MetricItemProps) {
  return (
    <div className="metric-item">
      {Icon ? (
        <span className={`metric-item-icon metric-item-icon-${tone}`} aria-hidden="true">
          <Icon size={22} />
        </span>
      ) : null}
      <span className="metric-item-copy">
        <span className="metric-item-label">{label}</span>
        <strong>
          {value}
          {unit ? <small>{unit}</small> : null}
        </strong>
      </span>
    </div>
  );
}
