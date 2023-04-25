import { Check, Trash } from "phosphor-react";
import styles from "./Task.module.css";

export interface TaskInterface {
  id: number;
  isComplete: boolean;
  title: string;
}

interface TaskProps {
  task: TaskInterface;
  onDeleteTask: (taskId: number) => void;
  onCompleteTask: (taskId: number) => void;
}

export function Task({ task, onDeleteTask, onCompleteTask }: TaskProps) {
  const handleDeleteTask = (): void => {
    onDeleteTask(task.id);
  };

  const handleToggleCompletedTask = (): void => {
    onCompleteTask(task.id);
  };

  return (
    <li className={`${styles.task} ${task.isComplete && styles.taskCompleted}`}>
      <button className={styles.taskCheck} onClick={handleToggleCompletedTask}>
        {task.isComplete && <Check size={13} weight="bold" />}
      </button>
      <span>{task.title}</span>
      <button
        className={styles.deleteTask}
        title="Deletar tarefa"
        onClick={handleDeleteTask}
      >
        <Trash size={16} />
      </button>
    </li>
  );
}
