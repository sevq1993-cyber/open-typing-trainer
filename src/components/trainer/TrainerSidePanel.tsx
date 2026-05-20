import { Eye, Info, Keyboard, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { activeSession, soundProfiles } from "../../data/lessons";
import { Toggle } from "../ui/Toggle";
import { MiniKeyboardPreview } from "../lessons/MiniKeyboardPreview";

export function TrainerSidePanel() {
  const [eyeEnabled, setEyeEnabled] = useState(activeSession.eyeTracking.enabled);
  const [soundsEnabled, setSoundsEnabled] = useState(activeSession.keyboardSounds.enabled);
  const [hintsEnabled, setHintsEnabled] = useState(activeSession.hints.enabled);
  const [volume, setVolume] = useState(activeSession.keyboardSounds.volume);
  const [soundProfile, setSoundProfile] = useState(activeSession.keyboardSounds.profile);

  return (
    <aside className="trainer-side-panel" aria-label="Быстрые настройки урока">
      <section className={`setting-card side-control-card${eyeEnabled ? "" : " is-muted"}`}>
        <div className="setting-card-header">
          <h2>Отслеживание глаз</h2>
          <Info size={14} aria-hidden="true" />
          <Toggle checked={eyeEnabled} label="Отслеживание глаз" onChange={setEyeEnabled} />
        </div>
        {eyeEnabled ? (
          <div className="setting-stat">
            <Eye size={26} aria-hidden="true" />
            <span>
              <small>Смотрел вниз</small>
              <strong>{activeSession.eyeTracking.lookedDownCount} раз</strong>
              <em>На букве: {activeSession.eyeTracking.lastLookedDownKey}</em>
            </span>
          </div>
        ) : (
          <p className="setting-muted">Выключено</p>
        )}
      </section>

      <section className={`setting-card side-control-card${soundsEnabled ? "" : " is-muted"}`}>
        <div className="setting-card-header">
          <h2>Звуки клавиатуры</h2>
          <Toggle checked={soundsEnabled} label="Звуки клавиатуры" onChange={setSoundsEnabled} />
        </div>
        <div className={`sound-profile${soundsEnabled ? "" : " muted"}`}>
          <Keyboard size={52} aria-hidden="true" />
          <label>
            <span className="sr-only">Профиль звуков клавиатуры</span>
            <select
              aria-label="Профиль звуков клавиатуры"
              disabled={!soundsEnabled}
              value={soundProfile}
              onChange={(event) => setSoundProfile(event.target.value)}
            >
              {soundProfiles.map((profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="volume-row">
          <VolumeX size={20} aria-hidden="true" />
          <input
            aria-label="Громкость звуков клавиатуры"
            disabled={!soundsEnabled}
            max={100}
            min={0}
            onChange={(event) => setVolume(Number(event.target.value))}
            type="range"
            value={volume}
          />
          <Volume2 size={20} aria-hidden="true" />
        </div>
      </section>

      <section className={`setting-card side-control-card${hintsEnabled ? "" : " is-muted"}`}>
        <div className="setting-card-header">
          <h2>Подсказки</h2>
          <Toggle checked={hintsEnabled} label="Подсказки на клавиатуре" onChange={setHintsEnabled} />
        </div>
        <p className="setting-muted">Показывать подсказки на клавиатуре</p>
        <div className={hintsEnabled ? "hints-preview on" : "hints-preview"}>
          <MiniKeyboardPreview targetKeys={["Н", "Р"]} />
        </div>
      </section>
    </aside>
  );
}
