import classNames from "classnames";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import { CircularProgressBar } from "../CircularProgressBar/CircularProgressBar";
import Style from "./TaskCard.style.module.scss";
import { Button } from "../../ui/button/Button";

type TaskCardProps = {
  task: {
    id: string;
    title: string;
    priority: string;
    status: string;
    progress: number;
  };
  onEdit(id: string): void;
  onDelete(id: string): void;
};
export const TaskCard = ({
  task: { id, title, priority, status, progress },
  onEdit,
  onDelete,
}: TaskCardProps) => {
  return (
    <div className={Style["task-card"]}>
      <div className="flex w-100">
        <span className={Style["task-title"]}>Задача</span>
        <span className={Style["task"]}>{title}</span>
      </div>
      <div className="flex">
        <span className={Style["priority-title"]}>Приоритет</span>
        <span
          className={classNames(Style[`priority--${priority}`], Style.priority)}
        >
          {priority}
        </span>
      </div>
      <div className={Style["task-status-wrapper"]}>
        <button
          className={classNames(Style[`status--${status}`], Style.status)}
        >
          {status}
        </button>
      </div>
      <div className={Style.progress}>
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={progress}
        />
      </div>
      <div className={Style.actions}>
        <Button
          title=""
          type="button"
          classNames={["btn--reset"]}
          icon={<EditIcon className="mr-20 cp" />}
          onClick={() => onEdit(id)}
        />
        <Button
          title=""
          type="button"
          classNames={["btn--reset"]}
          icon={<DeleteIcon className="cp" />}
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
};
