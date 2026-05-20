import { Play } from "lucide-react";
import { useState } from "react";
import { HeaderActions } from "../layout/HeaderActions";
import { Button } from "../ui/Button";
import { routes } from "../../data/dashboard";
import { CourseSummary } from "./CourseSummary";
import { LessonList } from "./LessonList";
import { LessonPreview } from "./LessonPreview";
import { LessonsTabs, type LessonsTab } from "./LessonsTabs";

type LessonsPageProps = {
  onNavigate: (href: string) => void;
};

export function LessonsPage({ onNavigate }: LessonsPageProps) {
  const [activeTab, setActiveTab] = useState<LessonsTab>("course");

  return (
    <section className="page page-lessons" aria-labelledby="lessons-title">
      <header className="page-header lessons-header">
        <div>
          <h1 id="lessons-title">Уроки</h1>
          <LessonsTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <HeaderActions>
          <Button
            variant="secondary"
            className="continue-lesson-button"
            icon={<Play size={18} aria-hidden="true" />}
            onClick={() => onNavigate(routes.activeLesson)}
          >
            Продолжить урок
          </Button>
        </HeaderActions>
      </header>

      {activeTab === "course" ? (
        <>
          <CourseSummary />
          <div className="lessons-grid">
            <LessonList onContinue={() => onNavigate(routes.activeLesson)} />
            <LessonPreview onStart={() => onNavigate(routes.activeLesson)} />
          </div>
        </>
      ) : (
        <section className="card lessons-empty-state">
          <h2>{activeTab === "practice" ? "Практика" : "Свой текст"}</h2>
          <p>
            Этот режим будет следующим шагом. Сейчас курс сфокусирован на первом уроке и
            русской раскладке.
          </p>
        </section>
      )}

      <footer className="lessons-footer">Печатай уверенно. Печатай вслепую.</footer>
    </section>
  );
}
