import { ChevronDown, Play, RotateCcw } from "lucide-react";
import { useState } from "react";
import { lessonSections, lessons, resumeLessonId } from "../../data/lessons";
import { ProgressBar } from "../ui/ProgressBar";

type LessonListProps = {
  onStartLesson: (lessonId: number) => void;
  onSelectLesson: (lessonId: number) => void;
};

function getActionLabel(progress: number) {
  if (progress >= 100) {
    return "Повторить";
  }

  if (progress > 0) {
    return "Продолжить";
  }

  return "Начать";
}

export function LessonList({ onSelectLesson, onStartLesson }: LessonListProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    initial: true,
    basic: true
  });

  return (
    <section className="card lesson-list-card" aria-labelledby="course-list-title">
      {lessonSections.map((section, index) => {
        const isOpen = openSections[section.id] ?? true;
        const sectionLessons = lessons.filter((lesson) => section.lessonIds.includes(lesson.id));
        const headingId = index === 0 ? "course-list-title" : `${section.id}-level-title`;
        const listId = `${section.id}-level-lessons`;

        return (
          <div className="lesson-level-group" key={section.id}>
            <button
              className="lesson-level-header"
              type="button"
              aria-expanded={isOpen}
              aria-controls={listId}
              onClick={() => setOpenSections((value) => ({ ...value, [section.id]: !isOpen }))}
            >
              <span>
                <h2 id={headingId}>{section.title}</h2>
                <small>{section.description}</small>
              </span>
              <ChevronDown className={isOpen ? "level-chevron open" : "level-chevron"} size={15} aria-hidden="true" />
            </button>

            {isOpen ? (
              <div className="lesson-rows" id={listId}>
                {sectionLessons.map((lesson) => (
                  <article
                    className={`lesson-row${lesson.id === resumeLessonId ? " active" : ""}`}
                    key={lesson.id}
                    onFocus={() => onSelectLesson(lesson.id)}
                    onMouseEnter={() => onSelectLesson(lesson.id)}
                  >
                    <span className="lesson-index">{lesson.id}</span>
                    <span className="lesson-row-copy">
                      <strong>{lesson.title}</strong>
                      <small>{lesson.subtitle}</small>
                    </span>
                    <span className="lesson-row-progress">
                      <ProgressBar value={lesson.progress} label={`Прогресс урока ${lesson.id}`} />
                      <small>{lesson.progress}%</small>
                    </span>
                    <button className="lesson-row-button interactive" type="button" onClick={() => onStartLesson(lesson.id)}>
                      {lesson.progress >= 100 ? <RotateCcw size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                      {getActionLabel(lesson.progress)}
                    </button>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
