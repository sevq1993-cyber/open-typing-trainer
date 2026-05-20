import { ChevronDown, Lock, Play } from "lucide-react";
import { lessons } from "../../data/lessons";
import { ProgressBar } from "../ui/ProgressBar";

type LessonListProps = {
  onContinue: () => void;
};

export function LessonList({ onContinue }: LessonListProps) {
  return (
    <section className="card lesson-list-card" aria-labelledby="course-list-title">
      <h2 id="course-list-title">Курс слепой печати</h2>
      <div className="lesson-rows">
        {lessons.map((lesson) => (
          <article className={`lesson-row${lesson.id === 1 ? " active" : ""}`} key={lesson.id}>
            <span className="lesson-index">{lesson.id}</span>
            <span className="lesson-row-copy">
              <strong>{lesson.title}</strong>
              <small>{lesson.subtitle}</small>
            </span>
            <span className="lesson-row-progress">
              {lesson.locked ? (
                <Lock size={16} aria-label="Урок закрыт" />
              ) : (
                <ProgressBar value={lesson.progress} label={`Прогресс урока ${lesson.id}`} />
              )}
              <small>{lesson.progress}%</small>
            </span>
            {lesson.locked ? null : (
              <button className="lesson-row-button interactive" type="button" onClick={onContinue}>
                <Play size={16} aria-hidden="true" />
                Продолжить
              </button>
            )}
          </article>
        ))}
      </div>
      <button className="show-all-lessons" type="button">
        Показать все уроки
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    </section>
  );
}
