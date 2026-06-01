import type { CSSProperties, KeyboardEvent } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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
  const [focused, setFocused] = useState(false);
  const [caret, setCaret] = useState({ x: 0, y: 0 });
  const textTokens = useMemo(() => {
    const chars = Array.from(text);
    const tokens: Array<Array<{ char: string; index: number }>> = [];
    let currentToken: Array<{ char: string; index: number }> = [];

    chars.forEach((char, index) => {
      currentToken.push({ char, index });

      if (char === " ") {
        tokens.push(currentToken);
        currentToken = [];
      }
    });

    if (currentToken.length > 0) {
      tokens.push(currentToken);
    }

    return tokens;
  }, [text]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const updateCaret = useCallback(() => {
    const card = cardRef.current;
    const target = charRefs.current[currentIndex] ?? charRefs.current[text.length - 1];

    if (!card || !target) {
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const visualScale = card.offsetWidth > 0 ? cardRect.width / card.offsetWidth : 1;
    const scale = visualScale || 1;
    const isEnd = currentIndex >= text.length;
    const nextX = ((isEnd ? targetRect.right : targetRect.left) - cardRect.left) / scale - 1;
    const nextY = (targetRect.top - cardRect.top) / scale + 1;

    setCaret({ x: nextX, y: nextY });
  }, [currentIndex, text.length]);

  useLayoutEffect(() => {
    updateCaret();
  }, [currentIndex, text, typedStates]);

  useEffect(() => {
    updateCaret();
    const frameId = window.requestAnimationFrame(updateCaret);
    const fontsReady = document.fonts?.ready;

    fontsReady?.then(updateCaret).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [updateCaret, typedStates]);

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
        {textTokens.map((token, tokenIndex) => (
          <span className="typing-word" key={`${token[0]?.index ?? tokenIndex}-${tokenIndex}`}>
            {token.map(({ char, index }) => {
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
          </span>
        ))}
      </p>
      <span
        className={[
          "typing-caret",
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
