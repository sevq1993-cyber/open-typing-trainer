import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  activeRoute: string;
  children: ReactNode;
  onNavigate: (href: string) => void;
};

export function AppShell({ activeRoute, children, onNavigate }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activeRoute={activeRoute} onNavigate={onNavigate} />
      <main className="main">
        <div className="main-inner">{children}</div>
      </main>
    </div>
  );
}
