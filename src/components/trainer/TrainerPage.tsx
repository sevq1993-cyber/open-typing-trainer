import { LogOut, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeaderActions } from "../layout/HeaderActions";
import { Button } from "../ui/Button";
import { routes } from "../../data/dashboard";
import { activeSession, getLessonTypingText, russianKeyMap, type Lesson } from "../../data/lessons";
import { FinishLessonModal } from "./FinishLessonModal";
import { RussianKeyboard } from "./RussianKeyboard";
import { TrainerSidePanel } from "./TrainerSidePanel";
import { TypingTextCard, type TypedState } from "./TypingTextCard";

type TrainerPageProps = {
  lesson: Lesson;
  onNavigate: (href: string) => void;
};

export function TrainerPage({ lesson, onNavigate }: TrainerPageProps) {
  const [typedStates, setTypedStates] = useState<TypedState[]>([]);
  const [runtimeErrors, setRuntimeErrors] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const pressTokenRef = useRef(0);
  const keyFeedbackTimeoutRef = useRef<number | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [lastWrongIndex, setLastWrongIndex] = useState<number | null>(null);
  const [hintsEnabled, setHintsEnabled] = useState(activeSession.hints.enabled);
  const [soundsEnabled, setSoundsEnabled] = useState(activeSession.keyboardSounds.enabled);
  const [keyboardVisible, setKeyboardVisible] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const stored = window.localStorage.getItem("typing.keyboardVisible");
    if (stored !== null) {
      return stored === "true";
    }

    return window.matchMedia("(min-width: 768px)").matches;
  });

  const typingText = getLessonTypingText(lesson);
  const currentChar = typingText[currentIndex] ?? "";

  useEffect(() => {
    window.localStorage.setItem("typing.keyboardVisible", String(keyboardVisible));
  }, [keyboardVisible]);

  useEffect(() => {
    return () => {
      if (keyFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(keyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  function isRussianLetter(key: string) {
    return /^[а-яё]$/i.test(key);
  }

  function normalizePunctuation(key: string) {
    return ["—", "–", "‑", "−"].includes(key) ? "-" : key;
  }

  function normalizeInputKey(key: string, code?: string) {
    if (key === " ") {
      return " ";
    }

    if (key.length === 1 && isRussianLetter(key)) {
      return key.toLocaleLowerCase("ru-RU");
    }

    if (code && russianKeyMap[code]) {
      return russianKeyMap[code].toLocaleLowerCase("ru-RU");
    }

    if (key.length === 1) {
      return normalizePunctuation(key).toLocaleLowerCase("ru-RU");
    }

    return null;
  }

  function keyForKeyboard(key: string, code?: string) {
    if (key === " ") {
      return "Space";
    }

    if (key.length === 1 && isRussianLetter(key)) {
      return key.toLocaleUpperCase("ru-RU");
    }

    if (code && russianKeyMap[code]) {
      return russianKeyMap[code];
    }

    if (key.length === 1) {
      return key.toLocaleUpperCase("ru-RU");
    }

    return key;
  }

  function handleCharacter(key: string, code?: string) {
    const typedIndex = currentIndexRef.current;

    if (isPaused || typedIndex >= typingText.length) {
      return;
    }

    const expected = typingText[typedIndex];
    const normalizedExpected = expected === " " ? " " : normalizePunctuation(expected).toLocaleLowerCase("ru-RU");
    const normalizedKey = normalizeInputKey(key, code);

    if (normalizedKey === null) {
      return;
    }

    const correct = normalizedExpected === normalizedKey;
    const displayKey = keyForKeyboard(key, code);
    const pressToken = pressTokenRef.current + 1;
    pressTokenRef.current = pressToken;
    if (keyFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(keyFeedbackTimeoutRef.current);
    }
    setPressedKey(displayKey);

    if (correct) {
      setTypedStates((states) => {
        const next = [...states];
        next[typedIndex] = "correct";
        return next;
      });
      currentIndexRef.current = typedIndex + 1;
      setCurrentIndex(currentIndexRef.current);
      setLastWrongIndex(null);
      setErrorKey(null);
    } else {
      setTypedStates((states) => {
        const next = [...states];
        next[typedIndex] = "error";
        return next;
      });
      setRuntimeErrors((count) => count + 1);
      setLastWrongIndex(typedIndex);
      setErrorKey(displayKey);
    }

    keyFeedbackTimeoutRef.current = window.setTimeout(() => {
      if (pressTokenRef.current !== pressToken) {
        return;
      }

      setPressedKey(null);
      setErrorKey(null);
      setLastWrongIndex(null);
      keyFeedbackTimeoutRef.current = null;
      setTypedStates((states) => {
        if (states[typedIndex] !== "error") {
          return states;
        }

        const next = [...states];
        delete next[typedIndex];
        return next;
      });
    }, 190);
  }

  function handleBackspace() {
    if (isPaused) {
      return;
    }

    const nextIndex = Math.max(0, currentIndexRef.current - 1);
    currentIndexRef.current = nextIndex;
    setTypedStates((states) => {
      const next = [...states];
      next.splice(nextIndex, 1);
      return next;
    });
    setCurrentIndex(nextIndex);
  }

  return (
    <section className="page page-trainer" aria-labelledby="trainer-title">
      <header className="page-header trainer-header">
        <div>
          <div className="breadcrumb">
            <span>Урок {lesson.id}</span>
            <span aria-hidden="true">›</span>
            <strong>{lesson.title}</strong>
          </div>
          <h1 id="trainer-title">{lesson.subtitle}</h1>
        </div>
        <HeaderActions>
          <Button
            variant="secondary"
            icon={<LogOut size={15} aria-hidden="true" />}
            onClick={() => setFinishOpen(true)}
          >
            Завершить урок
          </Button>
          <Button
            className="header-pause-button"
            variant="secondary"
            icon={isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            onClick={() => setIsPaused((value) => !value)}
          >
            {isPaused ? "Продолжить" : "Пауза"}
          </Button>
        </HeaderActions>
      </header>

      <section className="trainer-compact-stats" aria-label="Показатели урока">
        <span>
          <small>Скорость</small>
          <strong>{activeSession.speed} зн/мин</strong>
        </span>
        <span>
          <small>Точность</small>
          <strong>{activeSession.accuracy}%</strong>
        </span>
        <span>
          <small>Ошибки</small>
          <strong>{activeSession.errors + runtimeErrors}</strong>
        </span>
        <span>
          <small>Прогресс</small>
          <strong>{activeSession.progress}%</strong>
        </span>
      </section>

      <div className="trainer-grid">
        <div className="trainer-main-column">
          <TypingTextCard
            currentIndex={currentIndex}
            isPaused={isPaused}
            lastWrongIndex={lastWrongIndex}
            onBackspace={handleBackspace}
            onCharacter={handleCharacter}
            text={typingText}
            typedStates={typedStates}
          />
          <RussianKeyboard
            currentKey={hintsEnabled ? currentChar : ""}
            disabled={isPaused}
            enableSound={soundsEnabled}
            errorKey={errorKey}
            isVisible={keyboardVisible}
            onHide={() => setKeyboardVisible(false)}
            onShow={() => setKeyboardVisible(true)}
            pressedKey={pressedKey}
            targetKeys={hintsEnabled ? lesson.targetKeys : []}
          />
        </div>

        <TrainerSidePanel
          hintsEnabled={hintsEnabled}
          onHintsEnabledChange={setHintsEnabled}
          onSoundsEnabledChange={setSoundsEnabled}
          soundsEnabled={soundsEnabled}
          targetKeys={lesson.targetKeys}
        />
      </div>

      {isPaused ? (
        <div className="pause-floating-note" role="status">
          <Pause size={15} aria-hidden="true" />
          Урок на паузе
          <button type="button" onClick={() => setIsPaused(false)}>
            <Play size={14} aria-hidden="true" />
            Продолжить
          </button>
        </div>
      ) : null}

      {finishOpen ? (
        <FinishLessonModal
          onCancel={() => setFinishOpen(false)}
          onConfirm={() => onNavigate(routes.lessons)}
        />
      ) : null}
    </section>
  );
}
