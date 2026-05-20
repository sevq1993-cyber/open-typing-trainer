import { CurrentLessonCard } from "../cards/CurrentLessonCard";
import { LastSessionCard } from "../cards/LastSessionCard";
import { QuickStartCard } from "../cards/QuickStartCard";
import { RecentActivityCard } from "../cards/RecentActivityCard";
import { TodayCard } from "../cards/TodayCard";

export function Dashboard() {
  return (
    <section className="dashboard-grid" aria-label="Обзор тренировки">
      <TodayCard />
      <CurrentLessonCard />
      <QuickStartCard />
      <RecentActivityCard />
      <LastSessionCard />
    </section>
  );
}
