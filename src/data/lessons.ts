export const courseStats = {
  completedLessons: 6,
  totalLessons: 45,
  averageAccuracy: 96,
  totalTime: "2 ч 18 мин",
  courseProgress: 13
};

export type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  locked: boolean;
};

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Основной ряд: Н — Р",
    subtitle: "Знакомство с клавишами",
    progress: 75,
    locked: false
  },
  {
    id: 2,
    title: "Основной ряд: Ф — Ы",
    subtitle: "Тренируем новые клавиши",
    progress: 0,
    locked: true
  },
  {
    id: 3,
    title: "Основной ряд: В — А",
    subtitle: "Продолжаем закрепление",
    progress: 0,
    locked: true
  },
  {
    id: 4,
    title: "Основной ряд: П — О — Л — Д",
    subtitle: "Расширяем зону комфорта",
    progress: 0,
    locked: true
  },
  {
    id: 5,
    title: "Основной ряд: Ж — Э",
    subtitle: "Сложные, но важные буквы",
    progress: 0,
    locked: true
  },
  {
    id: 6,
    title: "Верхний ряд: Й — Ц — У — К — Е — Н",
    subtitle: "Переходим вверх",
    progress: 0,
    locked: true
  },
  {
    id: 7,
    title: "Верхний ряд: Г — Ш — Щ — З — Х — Ъ",
    subtitle: "Продолжаем движение",
    progress: 0,
    locked: true
  }
];

export const selectedLesson = {
  id: 7,
  displayId: 1,
  title: "Основной ряд: Н — Р",
  subtitle: "Знакомство с клавишами",
  progress: 75,
  duration: "15 мин",
  textsCount: 5,
  level: "Лёгкий",
  goal: "Научиться уверенно печатать буквы Н и Р без ошибок и лишних взглядов на клавиатуру.",
  targetKeys: ["Н", "Р"]
};

export const activeSession = {
  progress: 75,
  speed: 82,
  accuracy: 96,
  errors: 3,
  time: "02:18",
  weakKeys: ["Ф", "Ы", "Ж"],
  eyeTracking: {
    enabled: true,
    lookedDownCount: 12,
    lastLookedDownKey: "Р"
  },
  keyboardSounds: {
    enabled: true,
    profile: "Эфирный кремовый",
    volume: 72
  },
  hints: {
    enabled: false
  }
};

export const soundProfiles = [
  "Эфирный кремовый",
  "Механический мягкий",
  "Тихий ноутбук",
  "Печатная машинка",
  "Без звука"
];

export const typingText =
  "н р н р н р н р н р нора ран роса норка ротор рацион норма ранок нота рисунок экран трон нить рост неровно броня";

export const russianKeyMap: Record<string, string> = {
  KeyQ: "Й",
  KeyW: "Ц",
  KeyE: "У",
  KeyR: "К",
  KeyT: "Е",
  KeyY: "Н",
  KeyU: "Г",
  KeyI: "Ш",
  KeyO: "Щ",
  KeyP: "З",
  BracketLeft: "Х",
  BracketRight: "Ъ",
  KeyA: "Ф",
  KeyS: "Ы",
  KeyD: "В",
  KeyF: "А",
  KeyG: "П",
  KeyH: "Р",
  KeyJ: "О",
  KeyK: "Л",
  KeyL: "Д",
  Semicolon: "Ж",
  Quote: "Э",
  KeyZ: "Я",
  KeyX: "Ч",
  KeyC: "С",
  KeyV: "М",
  KeyB: "И",
  KeyN: "Т",
  KeyM: "Ь",
  Comma: "Б",
  Period: "Ю"
};

export type KeyboardKey = {
  label: string;
  value?: string;
  width?: number;
  hint?: string;
};

export const russianKeyboard: KeyboardKey[][] = [
  [
    { label: "Ё" },
    { label: "1", hint: "!" },
    { label: "2", hint: "\"" },
    { label: "3", hint: "№" },
    { label: "4", hint: ";" },
    { label: "5", hint: "%" },
    { label: "6", hint: ":" },
    { label: "7", hint: "?" },
    { label: "8", hint: "*" },
    { label: "9", hint: "(" },
    { label: "0", hint: ")" },
    { label: "-", hint: "_" },
    { label: "=", hint: "+" },
    { label: "⌫", value: "Backspace", width: 1.63 }
  ],
  [
    { label: "Tab", value: "Tab", width: 1.41 },
    { label: "Й" },
    { label: "Ц" },
    { label: "У" },
    { label: "К" },
    { label: "Е" },
    { label: "Н" },
    { label: "Г" },
    { label: "Ш" },
    { label: "Щ" },
    { label: "З" },
    { label: "Х" },
    { label: "Ъ" },
    { label: "\\" }
  ],
  [
    { label: "Caps Lock", value: "CapsLock", width: 1.7 },
    { label: "Ф" },
    { label: "Ы" },
    { label: "В" },
    { label: "А" },
    { label: "П" },
    { label: "Р" },
    { label: "О" },
    { label: "Л" },
    { label: "Д" },
    { label: "Ж" },
    { label: "Э" },
    { label: "Enter", value: "Enter", width: 1.63 }
  ],
  [
    { label: "Shift", value: "Shift", width: 2.07 },
    { label: "Я" },
    { label: "Ч" },
    { label: "С" },
    { label: "М" },
    { label: "И" },
    { label: "Т" },
    { label: "Ь" },
    { label: "Б" },
    { label: "Ю" },
    { label: "/" },
    { label: "Shift", value: "Shift", width: 2.07 }
  ],
  [
    { label: "fn", value: "Fn", width: 1.07 },
    { label: "control", value: "Control", width: 1.07 },
    { label: "option", value: "Alt", width: 1.07 },
    { label: "⌘", value: "Meta", width: 1.07 },
    { label: "", value: "Space", width: 4.63 },
    { label: "⌘", value: "Meta", width: 1.07 },
    { label: "option", value: "Alt", width: 1.07 },
    { label: "←", value: "ArrowLeft", width: 0.89 },
    { label: "↓", value: "ArrowDown", width: 0.89 },
    { label: "↑", value: "ArrowUp", width: 0.89 },
    { label: "→", value: "ArrowRight", width: 0.89 }
  ]
];
