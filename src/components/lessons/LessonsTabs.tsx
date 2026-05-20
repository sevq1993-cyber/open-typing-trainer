export type LessonsTab = "course" | "practice" | "custom";

const tabs: Array<{ id: LessonsTab; label: string }> = [
  { id: "course", label: "Курс" },
  { id: "practice", label: "Практика" },
  { id: "custom", label: "Свой текст" }
];

type LessonsTabsProps = {
  activeTab: LessonsTab;
  onChange: (tab: LessonsTab) => void;
};

export function LessonsTabs({ activeTab, onChange }: LessonsTabsProps) {
  return (
    <div className="lessons-tabs" role="tablist" aria-label="Разделы уроков">
      {tabs.map((tab) => (
        <button
          className={`lessons-tab${activeTab === tab.id ? " active" : ""}`}
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
