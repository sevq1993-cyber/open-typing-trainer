import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type TypedState = "correct" | "error";

type TypingTextCardProps = {
  currentIndex: number;
  isPaused: boolean;
  lastWrongIndex: number | null;
  onBackspace: () => void;
  onCharacter: (key: string, code?: string) => void;
  text: string;
  typedStates: TypedState[];
};

export function TypingTextCard({
  currentIndex,
  isPaused,
  lastWrongIndex,
  onBackspace,
  onCharacter,
  text,
  typedStates
}: TypingTextCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousYRef = useRef(0);
  const [focused, setFocused] = useState(false);
  const [caret, setCaret] = useState({ x: 0, y: 0, moving: false, lineJump: false });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const target = charRefs.current[currentIndex] ?? charRefs.current[text.length - 1];

    if (!card || !target) {
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const isEnd = currentIndex >= text.length;
    const nextX = (isEnd ? targetRect.right : targetRect.left) - cardRect.left - 2;
    const nextY = targetRect.top - cardRect.top + 2;
    const lineJump = Math.abs(nextY - previousYRef.current) > 20 && previousYRef.current !== 0;

    previousYRef.current = nextY;
    setCaret({ x: nextX, y: nextY, moving: true, lineJump });

    const timeout = window.setTimeout(() => {
      setCaret((value) => ({ ...value, moving: false, lineJump: false }));
    }, lineJump ? 120 : 150);

    return () => window.clearTimeout(timeout);
  }, [currentIndex, text, typedStates]);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      onBackspace();
      return;
    }

    if (event.key.length === 1) {
      event.preventDefault();
      onCharacter(event.key, event.code);
    }
  }

  return (
    <section
      className={`typing-card${isPaused ? " paused" : ""}${focused ? " is-focused" : ""}`}
      ref={cardRef}
      tabIndex={0}
      aria-label="Текст для печати"
      onClick={() => inputRef.current?.focus()}
      onFocus={() => inputRef.current?.focus()}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget) {
          handleKeyDown(event);
        }
      }}
    >
      <input
        ref={inputRef}
        className="typing-input"
        aria-label="Введите текст урока"
        autoCapitalize="off"
        autoComplete="off"
        defaultValue=""
        spellCheck={false}
        onInput={(event) => {
          const value = event.currentTarget.value;
          Array.from(value).forEach((char) => onCharacter(char));
          event.currentTarget.value = "";
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
      />
      <span className="typing-label">Печатайте:</span>
      <p className="typing-text">
        {Array.from(text).map((char, index) => {
          const typedState = typedStates[index];
          const current = index === currentIndex;
          const space = char === " ";
          const wrong = lastWrongIndex === index;

          return (
            <span
              className={[
                "char",
                space ? "char-space" : "",
                current ? "char-current" : "",
                typedState === "correct" ? "char-completed correct" : "",
                typedState === "error" || wrong ? "char-error error" : ""
              ]
                .filter(Boolean)
                .join(" ")}
              key={`${char}-${index}`}
              ref={(node) => {
                charRefs.current[index] = node;
              }}
            >
              {space ? "\u00A0" : char}
            </span>
          );
        })}
      </p>
      <span
        key={`${currentIndex}-${lastWrongIndex ?? "steady"}`}
        className={[
          "typing-caret",
          caret.moving ? "is-moving" : "",
          caret.lineJump ? "is-line-jump" : "",
          lastWrongIndex === currentIndex ? "is-error" : ""
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ "--caret-x": `${caret.x}px`, "--caret-y": `${caret.y}px` } as CSSProperties}
        aria-hidden="true"
      />
      {isPaused ? (
        <span className="typing-overlay">
          <strong>Урок на паузе</strong>
          Нажмите продолжить, чтобы вернуться.
        </span>
      ) : null}
    </section>
  );
}
