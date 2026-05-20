import { ChevronRight, Eye, Keyboard } from "lucide-react";
import { dashboardData } from "../../data/dashboard";
import { Card } from "../ui/Card";
import { Metric } from "../ui/Metric";

export function LastSessionCard() {
  const { lastSession } = dashboardData;

  return (
    <Card className="last-session-card full-width" stagger={320}>
      <div className="card-heading last-session-heading">
        <h2>Последняя сессия</h2>
      </div>

      <div className="last-session-content">
        <span className="keyboard-summary-icon" aria-hidden="true">
          <Keyboard size={30} />
        </span>

        <div className="last-metrics" aria-label="Результаты последней сессии">
          <Metric label="Скорость" value={lastSession.speed} unit="зн/мин" />
          <Metric label="Точность" value={lastSession.accuracy} unit="%" />
          <Metric label="Время" value={lastSession.durationMinutes} unit="мин" />
          <Metric label="Ошибки" value={lastSession.mistakes} />
        </div>

        <span className="session-divider" aria-hidden="true" />

        <section className="weak-keys" aria-label="Слабые клавиши">
          <div>
            <h3>Слабые клавиши</h3>
            <p>Чаще всего допускаешь ошибки</p>
          </div>
          <div className="weak-key-list">
            {lastSession.weakKeys.map((key) => (
              <span className="weak-key" key={key}>
                {key}
              </span>
            ))}
          </div>
        </section>

        <a className="eye-analysis-button interactive" href="/eye-tracking" aria-label="Открыть анализ взгляда">
          <Eye size={24} aria-hidden="true" />
          <span>Анализ взгляда</span>
          <ChevronRight size={18} aria-hidden="true" />
        </a>
      </div>
    </Card>
  );
}
