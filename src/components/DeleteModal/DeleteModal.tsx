import { Button } from "../../ui/button/Button";
import { Modal } from "../../ui/Modal/Modal";
import Style from "./DeleteModal.style.module.scss";

type DeleteModalProps = {
  onClose(): void;
  handleClickDeleteTask(id: string): void;
  selectedTaskId: string;
};

export const DeleteModal = ({
  onClose,
  handleClickDeleteTask,
  selectedTaskId,
}: DeleteModalProps) => {
  return (
    <Modal>
      <div className={Style["delete-modal"]}>
        <p>Точно удалить задачу?</p>
        <div className={Style["delete-modal__actions"]}>
          <Button
            title="Удалить"
            onClick={() => handleClickDeleteTask(selectedTaskId)}
          />
          <Button title="Выйти" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};
