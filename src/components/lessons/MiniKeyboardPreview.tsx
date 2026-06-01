import { russianKeyboard } from "../../data/lessons";

type MiniKeyboardPreviewProps = {
  targetKeys: string[];
};

export function MiniKeyboardPreview({ targetKeys }: MiniKeyboardPreviewProps) {
  const label = targetKeys.length > 0 ? `Клавиатура урока с подсветкой ${targetKeys.join(", ")}` : "Клавиатура урока";

  return (
    <div className="mini-keyboard-preview" aria-label={label}>
      <div className="mini-keyboard">
        {russianKeyboard.slice(0, 4).map((row, rowIndex) => (
          <div className="mini-keyboard-row" key={rowIndex}>
            {row.map((key, keyIndex) => (
              <span
                className={`mini-key${targetKeys.includes(key.label) ? " target" : ""}`}
                key={`${key.label}-${keyIndex}`}
              >
                {key.label.length === 1 ? key.label : ""}
              </span>
            ))}
          </div>
        ))}
      </div>
      <svg className="hands-preview" viewBox="0 0 360 120" aria-hidden="true">
        <path d="M62 112 C70 80, 73 47, 94 42 C113 37, 111 72, 104 112" />
        <path d="M103 112 C111 74, 119 38, 139 35 C159 32, 150 78, 142 112" />
        <path d="M143 112 C152 72, 166 42, 184 45 C201 48, 181 90, 176 112" />
        <path d="M226 112 C220 80, 218 47, 197 42 C178 37, 180 72, 187 112" />
        <path d="M185 112 C177 74, 169 38, 149 35 C129 32, 138 78, 146 112" />
        <path d="M246 112 C235 72, 222 42, 204 45 C187 48, 207 90, 212 112" />
      </svg>
    </div>
  );
}
