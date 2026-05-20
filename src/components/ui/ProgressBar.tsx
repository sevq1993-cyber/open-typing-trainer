import type { CSSProperties } from "react";

type ProgressBarProps = {
  value: number;
  label: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <span
        className="progress-fill"
        style={{ "--progress-value": `${value}%` } as CSSProperties}
      />
    </div>
  );
}
