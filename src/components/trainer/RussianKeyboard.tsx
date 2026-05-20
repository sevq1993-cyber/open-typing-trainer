import type { CSSProperties } from "react";
import { Eye, EyeOff, Keyboard } from "lucide-react";
import { russianKeyboard } from "../../data/lessons";

type RussianKeyboardProps = {
  currentKey: string;
  disabled: boolean;
  errorKey: string | null;
  isVisible: boolean;
  onToggleVisible: () => void;
  pressedKey: string | null;
  targetKeys: string[];
};

function normalizeKey(value: string) {
  if (value === " " || value === "Space") {
    return "Space";
  }

  return value.toLocaleUpperCase("ru-RU");
}

export function RussianKeyboard({
  currentKey,
  disabled,
  errorKey,
  isVisible,
  onToggleVisible,
  pressedKey,
  targetKeys
}: RussianKeyboardProps) {
  const nextKey = normalizeKey(currentKey);

  return (
    <section className="keyboard-section" aria-label="Русская виртуальная клавиатура">
      <div className={isVisible ? "keyboard-deck-wrap is-visible" : "keyboard-deck-wrap is-hidden"}>
        <div className={`keyboard-deck${disabled ? " is-disabled" : ""}`}>
          <div className="keyboard-toolbar">
            <div className="keyboard-title">
              <Keyboard size={16} aria-hidden="true" />
              Русская раскладка
            </div>
            <button className="keyboard-hide-btn interactive" type="button" onClick={onToggleVisible}>
              <EyeOff size={15} aria-hidden="true" />
              Скрыть клавиатуру
            </button>
          </div>
          <div className="keyboard-inner">
            {russianKeyboard.map((row, rowIndex) => (
              <div className={`keyboard-row row-${rowIndex}`} key={rowIndex}>
                {row.map((key, keyIndex) => {
                  const normalized = normalizeKey(key.value ?? key.label);
                  const labelNormalized = normalizeKey(key.label);
                  const isTarget = targetKeys.includes(key.label);
                  const isCurrent = labelNormalized === nextKey || normalized === nextKey;
                  const isRelated = isTarget && !isCurrent;
                  const isPressed = pressedKey === normalized || pressedKey === labelNormalized;
                  const isError = errorKey === normalized || errorKey === labelNormalized;
                  const isSpace = normalized === "Space";
                  const isArrow = ["←", "↓", "↑", "→"].includes(key.label);
                  const isModifier = key.label.length > 1 || ["⌘", "⌫", "←", "↓", "↑", "→"].includes(key.label);

                  return (
                    <span
                      className={[
                        "keyboard-key",
                        isTarget ? "target" : "",
                        isCurrent ? "is-current next" : "",
                        isRelated ? "is-related" : "",
                        isPressed ? "is-pressed pressed" : "",
                        isError ? "is-error error" : "",
                        isSpace ? "key-space" : "",
                        isArrow ? "key-arrow" : "",
                        isModifier ? "key-modifier" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      key={`${key.label}-${keyIndex}`}
                      style={{ "--key-width": key.width ?? 1 } as CSSProperties}
                    >
                      {key.hint ? <small>{key.hint}</small> : null}
                      <span>{key.label}</span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <svg className="keyboard-hands" viewBox="0 0 900 260" aria-hidden="true">
            <path d="M190 240 C206 165, 230 122, 270 128 C307 134, 282 201, 272 244" />
            <path d="M255 246 C270 158, 305 98, 344 110 C378 121, 333 203, 318 252" />
            <path d="M330 252 C354 166, 398 119, 432 139 C462 157, 406 213, 386 254" />
            <path d="M703 240 C687 165, 663 122, 623 128 C586 134, 611 201, 621 244" />
            <path d="M638 246 C623 158, 588 98, 549 110 C515 121, 560 203, 575 252" />
            <path d="M563 252 C539 166, 495 119, 461 139 C431 157, 487 213, 507 254" />
          </svg>
        </div>
      </div>

      {!isVisible ? (
        <div className="keyboard-collapsed">
          <span>
            <strong>Клавиатура скрыта</strong>
            <small>Продолжай печатать без подсказок</small>
          </span>
          <button className="keyboard-hide-btn interactive" type="button" onClick={onToggleVisible}>
            <Eye size={15} aria-hidden="true" />
            Показать клавиатуру
          </button>
        </div>
      ) : null}
    </section>
  );
}
