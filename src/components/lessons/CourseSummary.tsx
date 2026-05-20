import type { CSSProperties } from "react";
import { BookOpen, Clock3, Target } from "lucide-react";
import { courseStats } from "../../data/lessons";
import { MetricItem } from "../ui/MetricItem";

export function CourseSummary() {
  return (
    <section className="card course-summary" aria-label="Прогресс курса">
      <MetricItem
        icon={BookOpen}
        label="Пройдено уроков"
        value={courseStats.completedLessons}
        unit={`из ${courseStats.totalLessons}`}
        tone="purple"
      />
      <MetricItem
        icon={Target}
        label="Средняя точность"
        value={courseStats.averageAccuracy}
        unit="%"
        tone="peach"
      />
      <MetricItem icon={Clock3} label="Общее время" value={courseStats.totalTime} tone="yellow" />
      <div className="course-ring-metric">
        <div
          className="course-ring"
          style={{ "--ring-value": `${courseStats.courseProgress}%` } as CSSProperties}
          aria-label={`Прогресс курса ${courseStats.courseProgress}%`}
        >
          <strong>{courseStats.courseProgress}%</strong>
        </div>
        <span>прогресс курса</span>
      </div>
    </section>
  );
}
