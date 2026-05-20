import { Clock3, Gauge, Pause, Play, RotateCcw, Target } from "lucide-react";
import { activeSession } from "../../data/lessons";
import { Button } from "../ui/Button";
import { MetricItem } from "../ui/MetricItem";
import { ProgressBar } from "../ui/ProgressBar";

type TrainerMetricsBarProps = {
  errors: number;
  isPaused: boolean;
  onTogglePause: () => void;
};

export function TrainerMetricsBar({ errors, isPaused, onTogglePause }: TrainerMetricsBarProps) {
  return (
    <section className="card trainer-metrics-bar" aria-label="Показатели активного урока">
      <div className="trainer-progress-metric">
        <span>Прогресс урока</span>
        <strong>{activeSession.progress}%</strong>
        <ProgressBar value={activeSession.progress} label="Прогресс урока" />
      </div>
      <MetricItem icon={Gauge} label="Скорость" value={activeSession.speed} unit="зн/мин" tone="purple" />
      <MetricItem icon={Target} label="Точность" value={activeSession.accuracy} unit="%" tone="peach" />
      <MetricItem icon={RotateCcw} label="Ошибки" value={errors} tone="red" />
      <MetricItem icon={Clock3} label="Время" value={activeSession.time} tone="yellow" />
      <Button
        className="pause-button"
        icon={isPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
        onClick={onTogglePause}
        variant="secondary"
      >
        {isPaused ? "Продолжить" : "Пауза"}
      </Button>
    </section>
  );
}
