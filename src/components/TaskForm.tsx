import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { TaskInterface } from "./Task";
import { PlusCircle } from "phosphor-react";

import styles from "./TaskForm.module.css";

interface TaskFormProps {
  tasks: TaskInterface[];
  onCreateTask: (task: TaskInterface) => void;
}

export function TaskForm({ tasks, onCreateTask }: TaskFormProps) {
  const [task, setTask] = useState<TaskInterface>({
    id: 0,
    title: "",
    isComplete: false,
  } as TaskInterface);

  const handleCreateNewTask = (event: FormEvent): void => {
    event.preventDefault();

    onCreateTask(task);
    setTask({
      id: 0,
      title: "",
      isComplete: false,
    });
  };

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.target.setCustomValidity("");

    const lastTaskId =
      (tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0) + 1;

    setTask({
      id: lastTaskId,
      isComplete: false,
      title: event.target.value,
    });
  };

  const handleNewTaskInvalid = (
    event: InvalidEvent<HTMLInputElement>
  ): void => {
    event.target.setCustomValidity("Campo obrigatório!");
  };

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={task.title}
        onChange={handleNewTaskChange}
        onInvalid={handleNewTaskInvalid}
        required
      />
      <button type="submit">
        Criar
        <PlusCircle size={18} weight="bold" />
      </button>
    </form>
  );
}
