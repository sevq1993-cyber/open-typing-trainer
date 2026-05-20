import type { NavItemData } from "../../data/dashboard";

type NavItemProps = {
  item: NavItemData;
  active: boolean;
  onNavigate: (href: string) => void;
};

export function NavItem({ item, active, onNavigate }: NavItemProps) {
  const Icon = item.icon;

  return (
    <a
      className={`nav-item interactive${active ? " active" : ""}`}
      href={item.href}
      aria-current={active ? "page" : undefined}
      data-mobile-hidden={item.mobileHidden ? "true" : undefined}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(item.href);
      }}
    >
      <Icon size={22} aria-hidden="true" />
      <span className="sidebar-label">{item.label}</span>
    </a>
  );
}
