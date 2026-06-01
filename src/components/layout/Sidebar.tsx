import { Crown, ExternalLink, Github } from "lucide-react";
import { navItems } from "../../data/dashboard";
import { NavItem } from "../ui/NavItem";

type SidebarProps = {
  activeRoute: string;
  onNavigate: (href: string) => void;
};

export function Sidebar({ activeRoute, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Основная навигация">
      <div className="window-controls" aria-hidden="true">
        <span className="window-control window-control-red" />
        <span className="window-control window-control-yellow" />
        <span className="window-control window-control-green" />
      </div>

      <a
        className="brand"
        href="/"
        aria-label="Слепая Печать, главная"
        onClick={(event) => {
          event.preventDefault();
          onNavigate("/");
        }}
      >
        <span className="logo-mark" aria-hidden="true">
          C
        </span>
        <span className="brand-text">
          <span className="brand-row">
            <span className="brand-name">Слепая Печать</span>
            <span className="plan-badge">PRO</span>
          </span>
          <span className="brand-subtitle">Русская раскладка</span>
        </span>
      </a>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            active={item.id === activeRoute}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <section className="pro-card" aria-labelledby="pro-card-title">
        <div className="pro-icon" aria-hidden="true">
          <Crown size={19} />
        </div>
        <h2 id="pro-card-title">Слепая Печать PRO</h2>
        <p>Поддержите развитие приложения и получите доступ к эксклюзивным возможностям.</p>
        <button className="primary-button interactive" type="button">
          Перейти на PRO
        </button>
      </section>

      <a className="github-link interactive" href="#github" aria-label="Открыть GitHub проекта">
        <span>
          <Github size={18} aria-hidden="true" />
          <span className="github-label">GitHub</span>
        </span>
        <ExternalLink className="github-external" size={14} aria-hidden="true" />
      </a>

      <span className="app-version">v0.1 prototype</span>
    </aside>
  );
}
