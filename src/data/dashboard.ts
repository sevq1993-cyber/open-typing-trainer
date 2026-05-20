import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Eye,
  GraduationCap,
  Home,
  Keyboard,
  Settings,
  Target
} from "lucide-react";

export type QuickStartType = "lesson" | "timed" | "free";

export const routes = {
  home: "/",
  lessons: "/lessons",
  activeLesson: "/lessons/7",
  statistics: "/statistics",
  mistakes: "/mistakes",
  sounds: "/sounds",
  eyeTracking: "/eye-tracking",
  settings: "/settings"
} as const;

export type NavItemData = {
  label: string;
  href: string;
  icon: LucideIcon;
  id: "home" | "lessons" | "statistics" | "mistakes" | "sounds" | "eyeTracking" | "settings";
  mobileHidden?: boolean;
};

export const navItems: NavItemData[] = [
  { id: "home", label: "Главная", icon: Home, href: routes.home },
  { id: "lessons", label: "Уроки", icon: GraduationCap, href: routes.lessons },
  { id: "statistics", label: "Статистика", icon: BarChart3, href: routes.statistics },
  { id: "mistakes", label: "Анализ ошибок", icon: Target, href: routes.mistakes, mobileHidden: true },
  { id: "sounds", label: "Звуки клавиатуры", icon: Keyboard, href: routes.sounds, mobileHidden: true },
  { id: "eyeTracking", label: "Взгляд", icon: Eye, href: routes.eyeTracking },
  { id: "settings", label: "Настройки", icon: Settings, href: routes.settings }
];

export const dashboardData = {
  user: {
    name: "Андрей",
    avatarUrl: null,
    plan: "PRO"
  },

  today: {
    speed: 78,
    speedUnit: "зн/мин",
    speedDelta: 12,
    accuracy: 96,
    accuracyDelta: 3,
    practiceMinutes: 24
  },

  currentLesson: {
    lessonNumber: 7,
    title: "Основной ряд: Н – Р",
    progress: 75,
    focusKey: "Н"
  },

  quickStart: [
    {
      title: "Продолжить обучение",
      description: "Урок 7. Основной ряд: Н – Р",
      type: "lesson" as QuickStartType
    },
    {
      title: "Практика на время",
      description: "Напечатай как можно больше",
      type: "timed" as QuickStartType
    },
    {
      title: "Свободный режим",
      description: "Печатай свой текст",
      type: "free" as QuickStartType
    }
  ],

  weeklyActivity: [
    { day: "Пн", speed: 76 },
    { day: "Вт", speed: 77 },
    { day: "Ср", speed: 92 },
    { day: "Чт", speed: 76 },
    { day: "Пт", speed: 73 },
    { day: "Сб", speed: 87 },
    { day: "Вс", speed: 78, active: true }
  ],

  lastSession: {
    speed: 82,
    accuracy: 97,
    durationMinutes: 25,
    mistakes: 5,
    weakKeys: ["Ф", "Ы", "Ж"]
  }
};
