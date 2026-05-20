import { Clock3, Gauge, Target } from "lucide-react";
import { dashboardData } from "../../data/dashboard";
import { Card } from "../ui/Card";
import { IconBadge } from "../ui/IconBadge";

export function TodayCard() {
  const { today } = dashboardData;

  return (
    <Card className="today-card" stagger={80}>
      <div className="card-heading">
        <h2>Сегодня</h2>
      </div>

      <div className="today-metrics">
        <section className="today-metric" aria-label="Скорость сегодня">
          <IconBadge icon={Gauge} tone="purple" />
          <span className="metric-label">Скорость</span>
          <strong className="metric-value">
            <span>{today.speed}</span>
            <small>{today.speedUnit}</small>
          </strong>
          <span className="metric-delta">↑ {today.speedDelta}% к вчера</span>
        </section>

        <section className="today-metric" aria-label="Точность сегодня">
          <IconBadge icon={Target} tone="peach" />
          <span className="metric-label">Точность</span>
          <strong className="metric-value">
            <span>{today.accuracy}</span>
            <small>%</small>
          </strong>
          <span className="metric-delta">↑ {today.accuracyDelta}% к вчера</span>
        </section>

        <section className="today-metric" aria-label="Время практики сегодня">
          <IconBadge icon={Clock3} tone="yellow" />
          <span className="metric-label">Время</span>
          <strong className="metric-value">
            <span>{today.practiceMinutes}</span>
            <small>мин</small>
          </strong>
          <span className="metric-note">практики</span>
        </section>
      </div>
    </Card>
  );
}
