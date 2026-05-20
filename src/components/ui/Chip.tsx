import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  tone?: "purple" | "red" | "cream";
};

export function Chip({ children, tone = "cream" }: ChipProps) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}
