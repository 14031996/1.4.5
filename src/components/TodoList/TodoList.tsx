import Style from "./TodoList.style.module.scss";
import Add from "../../assets/icons/add.svg?react";
import { AddEditTaskModal } from "../AddEditTaskModal/AddEditTaskModal";
import { Button } from "../../ui/button/Button";
import { DeleteModal } from "../DeleteModal/DeleteModal";
import { TaskCard } from "../TaskCard/TaskCard";
import { taskList } from "../../serverData/taskList";
import { useState } from "react";

export const TodoList = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState(taskList);

  const handleClickOpenModal = () => {
    setSelectedTaskId(null);
    setShowAddEditModal(true);
  };
  const handleClickCloseModal = () => {
    setSelectedTaskId(null);
    setShowAddEditModal(false);
  };

  const handleClickEditTask = (id: string) => {
    console.log(id);
    if (id) {
      setSelectedTaskId(id);
      setShowAddEditModal(true);
    }
  };

  const handleClickDeleteTaskModal = (id: string) => {
    setShowDeleteModal(true);
    setSelectedTaskId(id);
  };

  const handleClickCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTaskId(null);
  };

  const handleClickDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={Style["page-wrapper"]}>
        <div className={Style["top-title"]}>
          <h2>Список задач</h2>
          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={handleClickOpenModal}
          />
        </div>
        <div className={Style["task-container"]}>
          {tasks.map((task) => (
            <TaskCard
              task={task}
              onEdit={handleClickEditTask}
              onDelete={handleClickDeleteTaskModal}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskModal
          onClose={handleClickCloseModal}
          selectedTaskId={selectedTaskId}
          setTasks={setTasks}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={handleClickCloseDeleteModal}
          handleClickDeleteTask={handleClickDeleteTask}
          selectedTaskId={selectedTaskId || ""}
        />
      )}
    </>
  );
};
