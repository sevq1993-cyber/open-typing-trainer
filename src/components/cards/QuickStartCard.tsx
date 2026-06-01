import type { LucideIcon } from "lucide-react";
import { BookOpen, ChevronRight, FileText, Target } from "lucide-react";
import { dashboardData, type QuickStartType } from "../../data/dashboard";
import { Card } from "../ui/Card";

const quickStartIcons: Record<QuickStartType, { icon: LucideIcon; tone: string }> = {
  lesson: { icon: BookOpen, tone: "purple" },
  timed: { icon: Target, tone: "peach" },
  free: { icon: FileText, tone: "mint" }
};

export function QuickStartCard() {
  return (
    <Card className="quick-start-card" stagger={200}>
      <div className="card-heading">
        <h2>Быстрый старт</h2>
      </div>

      <div className="quick-actions">
        {dashboardData.quickStart.map((action) => {
          const Icon = quickStartIcons[action.type].icon;
          const tone = quickStartIcons[action.type].tone;

          return (
            <button className="action-row interactive" type="button" key={action.type}>
              <span className={`action-icon action-icon-${tone}`} aria-hidden="true">
                <Icon size={19} />
              </span>
              <span className="action-copy">
                <strong>{action.title}</strong>
                <span>{action.description}</span>
              </span>
              <ChevronRight className="action-chevron" size={17} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </Card>
  );
}
