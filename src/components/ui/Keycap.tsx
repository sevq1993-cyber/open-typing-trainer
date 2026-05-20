type KeycapProps = {
  value: string;
};

export function Keycap({ value }: KeycapProps) {
  return (
    <div className="key-visual" aria-label={`Фокусная клавиша ${value}`}>
      <span className="key-platform" aria-hidden="true" />
      <span className="keycap">
        <span>{value}</span>
      </span>
    </div>
  );
}
