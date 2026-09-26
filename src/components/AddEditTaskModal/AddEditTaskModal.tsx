import classNames from "classnames";
import { useState, type Dispatch, type SetStateAction } from "react";
import Close from "../../assets/icons/close.svg?react";
import { Button } from "../../ui/button/Button";
import { Input } from "../../ui/Input/Input";
import { Modal } from "../../ui/Modal/Modal";
import { Prioroty, Status } from "../../types";
import type { Task } from "../../serverData/taskList";

import Style from "./AddEditTaskModal.style.module.scss";

type AddEditTaskModalType = {
  onClose: () => void;
  selectedTaskId: string | null;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const AddEditTaskModal = ({
  onClose,
  setTasks,
  selectedTaskId,
}: AddEditTaskModalType) => {
  const [taskText, setTaskText] = useState("");
  const [prioritySelected, setPrioritySelected] = useState<Prioroty>(
    Prioroty.HIGH,
  );

  const handleCangePriority = (newPriority: Prioroty) => {
    setPrioritySelected(newPriority);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Math.random().toString(),
      title: taskText,
      priority: prioritySelected,
      status: Status.TODO,
      progress: 0,
    };

    setTasks((prev) => [newTask, ...prev]);
    onClose();
  };

  const handleEditTask = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTaskId
          ? {
              ...task,
              title: taskText,
              priority: prioritySelected,
            }
          : task,
      ),
    );

    onClose();
  };

  return (
    <Modal>
      <form>
        <div className={Style["add-edit-modal"]}>
          <div className="flx-between">
            <span className={Style["modal-title"]}>
              {selectedTaskId ? "Редактировать" : "Добавить"} задачу
            </span>

            <Button
              title=""
              type="button"
              classNames={["btn--reset"]}
              icon={<Close className="cp" />}
              onClick={onClose}
            />
          </div>

          <Input
            label="Задача"
            placeholder="Введите текст.."
            onChange={(event) => setTaskText(event.target.value)}
            name="title"
            value={taskText}
          />

          <div className={Style["modal-priority"]}>
            <span>Приоритет</span>

            <ul className={Style["priority-buttons"]}>
              {[Prioroty.HIGH, Prioroty.MEDIUM, Prioroty.LOW].map(
                (priority) => (
                  <li
                    key={priority}
                    onClick={() => handleCangePriority(priority)}
                    className={classNames(
                      Style[
                        `${priority}${
                          priority === prioritySelected ? "-selected" : ""
                        }`
                      ],
                      Style.priority,
                    )}
                  >
                    {priority}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="flx-right mt-50">
            <Button
              title={selectedTaskId ? "Редактировать" : "Добавить"}
              onClick={selectedTaskId ? handleEditTask : handleAddTask}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
