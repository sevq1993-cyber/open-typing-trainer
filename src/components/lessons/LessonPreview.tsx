import { BarChart3, Clock3, FileText, Play } from "lucide-react";
import type { Lesson } from "../../data/lessons";
import { Button } from "../ui/Button";
import { MiniKeyboardPreview } from "./MiniKeyboardPreview";

type LessonPreviewProps = {
  lesson: Lesson;
  onStart: () => void;
};

export function LessonPreview({ lesson, onStart }: LessonPreviewProps) {
  return (
    <aside className="card lesson-preview-card" aria-labelledby="lesson-preview-title">
      <span className="lesson-badge">Урок {lesson.displayId}</span>
      <h2 id="lesson-preview-title">{lesson.title}</h2>
      <p className="lesson-preview-subtitle">{lesson.subtitle}</p>

      <MiniKeyboardPreview targetKeys={lesson.targetKeys} />

      <section className="lesson-goal">
        <h3>Цель урока</h3>
        <p>{lesson.goal}</p>
      </section>

      <div className="lesson-preview-facts" aria-label="Параметры урока">
        <span>
          <Clock3 size={19} aria-hidden="true" />
          <small>Длительность</small>
          <strong>{lesson.duration}</strong>
        </span>
        <span>
          <FileText size={19} aria-hidden="true" />
          <small>Строк</small>
          <strong>{lesson.textsCount}</strong>
        </span>
        <span>
          <BarChart3 size={19} aria-hidden="true" />
          <small>Уровень</small>
          <strong>{lesson.level}</strong>
        </span>
      </div>

      <Button variant="primary" icon={<Play size={15} aria-hidden="true" />} onClick={onStart}>
        Начать урок
      </Button>
      <Button className="timed-training-button" variant="secondary" icon={<Clock3 size={15} aria-hidden="true" />}>
        Тренировка на время
      </Button>
    </aside>
  );
}
