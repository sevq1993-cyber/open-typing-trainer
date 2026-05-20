import type { CSSProperties } from "react";
import { dashboardData } from "../../data/dashboard";
import { Card } from "../ui/Card";

const maxSpeed = 120;

export function RecentActivityCard() {
  return (
    <Card className="recent-activity-card" stagger={260}>
      <div className="card-heading card-heading-with-action">
        <h2>Недавняя активность</h2>
        <a className="card-link interactive" href="/statistics">
          Вся статистика
        </a>
      </div>

      <div className="activity-chart" aria-label="Скорость за неделю">
        <div className="chart-y-axis" aria-hidden="true">
          <span>120</span>
          <span>80</span>
          <span>40</span>
          <span>0</span>
        </div>

        <div className="chart-plot">
          <span className="chart-grid-line chart-grid-line-top" />
          <span className="chart-grid-line chart-grid-line-mid" />
          <span className="chart-grid-line chart-grid-line-low" />

          {dashboardData.weeklyActivity.map((item, index) => (
            <div className="chart-day" key={item.day}>
              <div className="bar-slot">
                {item.active ? <span className="chart-tooltip">{item.speed} зн/мин</span> : null}
                <span
                  className={`bar${item.active ? " active" : ""}`}
                  style={
                    {
                      "--bar-height": `${Math.round((item.speed / maxSpeed) * 100)}%`,
                      "--bar-delay": `${index * 48}ms`
                    } as CSSProperties
                  }
                  aria-label={`${item.day}: ${item.speed} знаков в минуту`}
                />
              </div>
              <span className="chart-day-label">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
