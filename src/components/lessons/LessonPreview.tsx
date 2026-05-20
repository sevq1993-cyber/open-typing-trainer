import { BarChart3, Clock3, FileText, Play } from "lucide-react";
import { selectedLesson } from "../../data/lessons";
import { Button } from "../ui/Button";
import { MiniKeyboardPreview } from "./MiniKeyboardPreview";

type LessonPreviewProps = {
  onStart: () => void;
};

export function LessonPreview({ onStart }: LessonPreviewProps) {
  return (
    <aside className="card lesson-preview-card" aria-labelledby="lesson-preview-title">
      <span className="lesson-badge">Урок {selectedLesson.displayId}</span>
      <h2 id="lesson-preview-title">{selectedLesson.title}</h2>
      <p className="lesson-preview-subtitle">{selectedLesson.subtitle}</p>

      <MiniKeyboardPreview targetKeys={selectedLesson.targetKeys} />

      <section className="lesson-goal">
        <h3>Цель урока</h3>
        <p>{selectedLesson.goal}</p>
      </section>

      <div className="lesson-preview-facts" aria-label="Параметры урока">
        <span>
          <Clock3 size={22} aria-hidden="true" />
          <small>Длительность</small>
          <strong>{selectedLesson.duration}</strong>
        </span>
        <span>
          <FileText size={22} aria-hidden="true" />
          <small>Текстов</small>
          <strong>{selectedLesson.textsCount}</strong>
        </span>
        <span>
          <BarChart3 size={22} aria-hidden="true" />
          <small>Уровень</small>
          <strong>{selectedLesson.level}</strong>
        </span>
      </div>

      <Button variant="primary" icon={<Play size={18} aria-hidden="true" />} onClick={onStart}>
        Начать урок
      </Button>
      <Button className="timed-training-button" variant="secondary" icon={<Clock3 size={18} aria-hidden="true" />}>
        Тренировка на время
      </Button>
    </aside>
  );
}
