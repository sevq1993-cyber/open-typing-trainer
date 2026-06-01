import type { ReactNode } from "react";
import { Sun, User } from "lucide-react";
import { dashboardData } from "../../data/dashboard";

type HeaderActionsProps = {
  children?: ReactNode;
};

export function HeaderActions({ children }: HeaderActionsProps) {
  return (
    <div className="header-actions">
      {children}
      <button className="icon-button interactive" type="button" aria-label="Переключить тему">
        <Sun aria-hidden="true" />
      </button>
      <button className="avatar-button interactive" type="button" aria-label="Открыть профиль">
        {dashboardData.user.avatarUrl ? (
          <img src={dashboardData.user.avatarUrl} alt="" />
        ) : (
          <span aria-hidden="true">
            <User size={19} />
          </span>
        )}
      </button>
    </div>
  );
}
