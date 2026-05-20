import { useCallback, useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { MainHeader } from "../components/layout/MainHeader";
import { LessonsPage } from "../components/lessons/LessonsPage";
import { Dashboard } from "../components/sections/Dashboard";
import { TrainerPage } from "../components/trainer/TrainerPage";
import { routes } from "../data/dashboard";

export function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((href: string) => {
    if (window.location.pathname !== href) {
      window.history.pushState({}, "", href);
      setPathname(href);
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    setPathname(href);
  }, []);

  const activeRoute = useMemo(() => {
    if (pathname.startsWith(routes.lessons)) {
      return "lessons";
    }

    return "home";
  }, [pathname]);

  return (
    <AppShell activeRoute={activeRoute} onNavigate={navigate}>
      {pathname === routes.activeLesson ? (
        <TrainerPage onNavigate={navigate} />
      ) : pathname === routes.lessons ? (
        <LessonsPage onNavigate={navigate} />
      ) : (
        <>
          <MainHeader />
          <Dashboard />
        </>
      )}
    </AppShell>
  );
}
