import { Eye, EyeOff } from "lucide-react";
import type { MouseEvent, PointerEvent } from "react";
import { useLayoutEffect, useRef } from "react";
import { Keyboard as AceternityKeyboard } from "../ui/keyboard";

const MIN_KEYBOARD_SCALE = 0.8;
const MAX_KEYBOARD_SCALE = 2.15;
const KEYBOARD_FIT_PADDING = 2;

type RussianKeyboardProps = {
  currentKey: string;
  disabled: boolean;
  enableSound: boolean;
  errorKey: string | null;
  isVisible: boolean;
  onHide: () => void;
  onShow: () => void;
  pressedKey: string | null;
  targetKeys: string[];
};

type FingerId =
  | "left-pinky"
  | "left-ring"
  | "left-middle"
  | "left-index"
  | "left-thumb"
  | "right-thumb"
  | "right-index"
  | "right-middle"
  | "right-ring"
  | "right-pinky";

const BASE_FINGER_BY_KEY: Record<string, FingerId> = {
  Ё: "left-pinky",
  "1": "left-pinky",
  Й: "left-pinky",
  Ф: "left-pinky",
  Я: "left-pinky",
  TAB: "left-pinky",
  CAPSLOCK: "left-pinky",
  ESCAPE: "left-pinky",
  CONTROLLEFT: "left-pinky",
  SHIFTLEFT: "left-pinky",
  "2": "left-ring",
  Ц: "left-ring",
  Ы: "left-ring",
  Ч: "left-ring",
  "3": "left-middle",
  У: "left-middle",
  В: "left-middle",
  С: "left-middle",
  "4": "left-index",
  "5": "left-index",
  К: "left-index",
  Е: "left-index",
  А: "left-index",
  П: "left-index",
  М: "left-index",
  И: "left-index",
  ALTLEFT: "left-thumb",
  METALEFT: "left-thumb",
  SPACE: "right-thumb",
  ALTRIGHT: "right-thumb",
  METARIGHT: "right-thumb",
  "6": "right-index",
  "7": "right-index",
  Н: "right-index",
  Г: "right-index",
  Р: "right-index",
  О: "right-index",
  Т: "right-index",
  Ь: "right-index",
  "8": "right-middle",
  Ш: "right-middle",
  Л: "right-middle",
  Б: "right-middle",
  "9": "right-ring",
  Щ: "right-ring",
  Д: "right-ring",
  Ю: "right-ring",
  "0": "right-pinky",
  "-": "right-pinky",
  "=": "right-pinky",
  З: "right-pinky",
  Х: "right-pinky",
  Ъ: "right-pinky",
  Ж: "right-pinky",
  Э: "right-pinky",
  ".": "right-pinky",
  ENTER: "right-pinky",
  BACKSPACE: "right-pinky",
  SHIFTRIGHT: "right-pinky",
  CONTROLRIGHT: "right-pinky"
};

const SHIFTED_SYMBOLS: Record<string, { base: string; shift: FingerId }> = {
  "!": { base: "1", shift: "right-pinky" },
  "\"": { base: "2", shift: "right-pinky" },
  "«": { base: "2", shift: "right-pinky" },
  "»": { base: "2", shift: "right-pinky" },
  "“": { base: "2", shift: "right-pinky" },
  "”": { base: "2", shift: "right-pinky" },
  "№": { base: "3", shift: "right-pinky" },
  ";": { base: "4", shift: "right-pinky" },
  "%": { base: "5", shift: "right-pinky" },
  ":": { base: "6", shift: "left-pinky" },
  "?": { base: "7", shift: "left-pinky" },
  "*": { base: "8", shift: "left-pinky" },
  "(": { base: "9", shift: "left-pinky" },
  ")": { base: "0", shift: "left-pinky" },
  "_": { base: "-", shift: "left-pinky" },
  "+": { base: "=", shift: "left-pinky" },
  ",": { base: ".", shift: "left-pinky" }
};

function normalizeFingerKey(key: string) {
  if (["—", "–", "‑", "−"].includes(key)) {
    return "-";
  }

  return key;
}

export function getActiveFingers(key: string) {
  if (!key) {
    return new Set<FingerId>();
  }

  const normalizedKey = key === " " ? "SPACE" : normalizeFingerKey(key).toLocaleUpperCase("ru-RU");
  const activeFingers = new Set<FingerId>();

  if (normalizedKey === "SPACE") {
    activeFingers.add("left-thumb");
    activeFingers.add("right-thumb");
    return activeFingers;
  }

  const shiftedSymbol = SHIFTED_SYMBOLS[normalizeFingerKey(key)] ?? SHIFTED_SYMBOLS[normalizedKey];

  if (shiftedSymbol) {
    const baseFinger = BASE_FINGER_BY_KEY[shiftedSymbol.base];

    if (baseFinger) {
      activeFingers.add(baseFinger);
    }

    activeFingers.add(shiftedSymbol.shift);
    return activeFingers;
  }

  const baseFinger = BASE_FINGER_BY_KEY[normalizedKey];

  if (baseFinger) {
    activeFingers.add(baseFinger);
  }

  if (/^[А-ЯЁ]$/.test(key)) {
    activeFingers.add((baseFinger ?? "left-index").startsWith("left") ? "right-pinky" : "left-pinky");
  }

  return activeFingers;
}

export function RussianKeyboard({
  currentKey,
  disabled,
  enableSound,
  errorKey,
  isVisible,
  onHide,
  onShow,
  pressedKey,
  targetKeys
}: RussianKeyboardProps) {
  const keyboardWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = keyboardWrapRef.current;
    const keyboard = wrap?.querySelector<HTMLElement>(".trainer-aceternity-keyboard");

    if (!wrap || !keyboard) {
      return;
    }

    let frameId = 0;

    const updateScale = () => {
      const naturalWidth = keyboard.offsetWidth || keyboard.scrollWidth;
      const availableWidth = Math.max(0, wrap.clientWidth - KEYBOARD_FIT_PADDING);

      if (naturalWidth === 0 || availableWidth === 0) {
        return;
      }

      const scale = Math.min(MAX_KEYBOARD_SCALE, Math.max(MIN_KEYBOARD_SCALE, availableWidth / naturalWidth));
      wrap.style.setProperty("--trainer-keyboard-scale", scale.toFixed(3));
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateScale);
    };

    updateScale();

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleUpdate);
    resizeObserver?.observe(wrap);
    resizeObserver?.observe(keyboard);
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  function handleButtonPointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleHideClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onHide();
  }

  function handleShowClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onShow();
  }

  return (
    <section className="keyboard-section" aria-label="Виртуальная клавиатура">
      <div className={isVisible ? "keyboard-deck-wrap is-visible" : "keyboard-deck-wrap is-hidden"}>
        <section className={`keyboard-tray aceternity-keyboard-tray${disabled ? " is-disabled" : ""}`}>
          <div className="keyboard-header">
            <div className="keyboard-layout-label">
              <span>Клавиатура</span>
            </div>
            <button
              className="keyboard-hide-button interactive"
              type="button"
              onClick={handleHideClick}
              onPointerDown={handleButtonPointerDown}
            >
              <EyeOff size={13} aria-hidden="true" />
              <span>Скрыть клавиатуру</span>
            </button>
          </div>

          <div className="aceternity-keyboard-wrap" ref={keyboardWrapRef}>
            <AceternityKeyboard
              className="trainer-aceternity-keyboard"
              currentKey={currentKey}
              enableSound={enableSound}
              errorKey={errorKey}
              pressedKey={pressedKey}
              targetKeys={targetKeys}
            />
          </div>
        </section>
      </div>

      {!isVisible ? (
        <div className="keyboard-collapsed">
          <span>
            <strong>Клавиатура скрыта</strong>
            <small>Продолжай печатать без подсказок</small>
          </span>
          <button
            className="keyboard-hide-button interactive"
            type="button"
            onClick={handleShowClick}
            onPointerDown={handleButtonPointerDown}
          >
            <Eye size={13} aria-hidden="true" />
            Показать клавиатуру
          </button>
        </div>
      ) : null}
    </section>
  );
}
