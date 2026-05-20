import { LogOut, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { HeaderActions } from "../layout/HeaderActions";
import { Button } from "../ui/Button";
import { routes } from "../../data/dashboard";
import { activeSession, russianKeyMap, selectedLesson, typingText } from "../../data/lessons";
import { CurrentSessionCard } from "./CurrentSessionCard";
import { FinishLessonModal } from "./FinishLessonModal";
import { RussianKeyboard } from "./RussianKeyboard";
import { TrainerSidePanel } from "./TrainerSidePanel";
import { TypingTextCard, type TypedState } from "./TypingTextCard";

type TrainerPageProps = {
  onNavigate: (href: string) => void;
};

export function TrainerPage({ onNavigate }: TrainerPageProps) {
  const [typedStates, setTypedStates] = useState<TypedState[]>([]);
  const [runtimeErrors, setRuntimeErrors] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [lastWrongIndex, setLastWrongIndex] = useState<number | null>(null);
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

  const currentChar = typingText[currentIndex] ?? "";
  const weakKeys = activeSession.weakKeys;

  useEffect(() => {
    window.localStorage.setItem("typing.keyboardVisible", String(keyboardVisible));
  }, [keyboardVisible]);

  function isRussianLetter(key: string) {
    return /^[а-яё]$/i.test(key);
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
      return key.toLocaleLowerCase("ru-RU");
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
    if (isPaused || currentIndex >= typingText.length) {
      return;
    }

    const expected = typingText[currentIndex];
    const normalizedExpected = expected === " " ? " " : expected.toLocaleLowerCase("ru-RU");
    const normalizedKey = normalizeInputKey(key, code);

    if (normalizedKey === null) {
      return;
    }

    const correct = normalizedExpected === normalizedKey;
    const displayKey = keyForKeyboard(key, code);
    setPressedKey(displayKey);

    if (correct) {
      setTypedStates((states) => {
        const next = [...states];
        next[currentIndex] = "correct";
        return next;
      });
      setCurrentIndex((index) => index + 1);
      setLastWrongIndex(null);
      setErrorKey(null);
    } else {
      setTypedStates((states) => {
        const next = [...states];
        next[currentIndex] = "error";
        return next;
      });
      setRuntimeErrors((count) => count + 1);
      setLastWrongIndex(currentIndex);
      setErrorKey(displayKey);
    }

    window.setTimeout(() => {
      setPressedKey(null);
      setErrorKey(null);
      setLastWrongIndex(null);
      setTypedStates((states) => {
        if (states[currentIndex] !== "error") {
          return states;
        }

        const next = [...states];
        delete next[currentIndex];
        return next;
      });
    }, 190);
  }

  function handleBackspace() {
    if (isPaused) {
      return;
    }

    setCurrentIndex((index) => {
      const nextIndex = Math.max(0, index - 1);
      setTypedStates((states) => {
        const next = [...states];
        next.splice(nextIndex, 1);
        return next;
      });
      return nextIndex;
    });
  }

  return (
    <section className="page page-trainer" aria-labelledby="trainer-title">
      <header className="page-header trainer-header">
        <div>
          <div className="breadcrumb">
            <span>Урок {selectedLesson.id}</span>
            <span aria-hidden="true">›</span>
            <strong>{selectedLesson.title}</strong>
          </div>
          <h1 id="trainer-title">{selectedLesson.subtitle}</h1>
        </div>
        <HeaderActions>
          <Button
            variant="secondary"
            icon={<LogOut size={18} aria-hidden="true" />}
            onClick={() => setFinishOpen(true)}
          >
            Завершить урок
          </Button>
          <Button
            className="header-pause-button"
            variant="secondary"
            icon={isPaused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
            onClick={() => setIsPaused((value) => !value)}
          >
            {isPaused ? "Продолжить" : "Пауза"}
          </Button>
        </HeaderActions>
      </header>

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
            currentKey={currentChar}
            disabled={isPaused}
            errorKey={errorKey}
            isVisible={keyboardVisible}
            onToggleVisible={() => setKeyboardVisible((value) => !value)}
            pressedKey={pressedKey}
            targetKeys={selectedLesson.targetKeys}
          />
        </div>

        <TrainerSidePanel />
      </div>

      <CurrentSessionCard errors={activeSession.errors + runtimeErrors} weakKeys={weakKeys} />

      {isPaused ? (
        <div className="pause-floating-note" role="status">
          <Pause size={18} aria-hidden="true" />
          Урок на паузе
          <button type="button" onClick={() => setIsPaused(false)}>
            <Play size={16} aria-hidden="true" />
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
