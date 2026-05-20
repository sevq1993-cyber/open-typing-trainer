import { HeaderActions } from "./HeaderActions";

export function MainHeader() {
  return (
    <header className="main-header">
      <div className="header-copy">
        <h1>Добро пожаловать!</h1>
        <p>Тренируйтесь каждый день и достигайте новых результатов.</p>
      </div>

      <HeaderActions />
    </header>
  );
}
