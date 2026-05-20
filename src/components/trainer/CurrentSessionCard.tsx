import { ChevronRight, Clock3, Gauge, Target, RotateCcw, TrendingUp } from "lucide-react";
import { activeSession } from "../../data/lessons";
import { MetricItem } from "../ui/MetricItem";

type CurrentSessionCardProps = {
  errors: number;
  weakKeys: string[];
};

export function CurrentSessionCard({ errors, weakKeys }: CurrentSessionCardProps) {
  return (
    <section className="card current-session-card" aria-label="Текущая сессия">
      <div>
        <h2>Текущая сессия</h2>
        <div className="session-metrics">
          <MetricItem icon={Clock3} label="Длительность" value={activeSession.time} tone="yellow" />
          <MetricItem icon={Gauge} label="Скорость" value={activeSession.speed} unit="зн/мин" tone="purple" />
          <MetricItem icon={Target} label="Точность" value={activeSession.accuracy} unit="%" tone="mint" />
          <MetricItem icon={RotateCcw} label="Ошибки" value={errors} tone="red" />
          <MetricItem icon={TrendingUp} label="Прогресс" value={activeSession.progress} unit="%" tone="peach" />
        </div>
      </div>
      <div className="session-weak-keys">
        <span>Слабые клавиши</span>
        <div>
          {weakKeys.map((key) => (
            <span className="weak-key-chip" key={key}>
              {key}
            </span>
          ))}
        </div>
      </div>
      <button className="analysis-button interactive" type="button">
        Показать анализ
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
