import type { CSSProperties, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Card({ children, className = "", stagger = 0 }: CardProps) {
  return (
    <article
      className={`card ${className}`.trim()}
      style={{ "--stagger": `${stagger}ms` } as CSSProperties}
    >
      {children}
    </article>
  );
}
