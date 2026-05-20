import { Button } from "../ui/Button";

type FinishLessonModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function FinishLessonModal({ onCancel, onConfirm }: FinishLessonModalProps) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="finish-modal" role="dialog" aria-modal="true" aria-labelledby="finish-title">
        <h2 id="finish-title">Завершить урок?</h2>
        <p>Текущий прогресс будет сохранён.</p>
        <div className="modal-actions">
          <Button variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Завершить
          </Button>
        </div>
      </section>
    </div>
  );
}
