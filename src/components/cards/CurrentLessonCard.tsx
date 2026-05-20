import { Play } from "lucide-react";
import { dashboardData } from "../../data/dashboard";
import { Card } from "../ui/Card";
import { Keycap } from "../ui/Keycap";
import { ProgressBar } from "../ui/ProgressBar";

export function CurrentLessonCard() {
  const { currentLesson } = dashboardData;

  return (
    <Card className="current-lesson-card" stagger={140}>
      <div className="lesson-copy">
        <div className="card-heading">
          <h2>Текущий урок</h2>
        </div>
        <p className="lesson-number">Урок {currentLesson.lessonNumber}</p>
        <h3>{currentLesson.title}</h3>

        <div className="lesson-progress-row">
          <ProgressBar value={currentLesson.progress} label="Прогресс текущего урока" />
          <span>{currentLesson.progress}%</span>
        </div>

        <button className="lesson-button interactive" type="button">
          <Play size={18} aria-hidden="true" />
          Продолжить
        </button>
      </div>

      <Keycap value={currentLesson.focusKey} />
    </Card>
  );
}
