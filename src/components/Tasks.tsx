import { Task, TaskInterface } from "./Task";
import { TaskForm } from "./TaskForm";
import { useState } from "react";

import clipboardSvg from "../assets/clipboard.svg";

import styles from "./Tasks.module.css";

export function Tasks() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const totalTasks = tasks.length;
  const totalTasksCompleteds = tasks.filter((task) => task.isComplete).length;

  const createTask = (task: TaskInterface) => {
    setTasks((tasks) => [task, ...tasks]);
  };

  const deleteTask = (taskId: number): void => {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksWithoutDeletedOne);
  };

  const completeTask = (taskId: number): void => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks([...newTasks]);
  };

  return (
    <div>
      <TaskForm tasks={tasks} onCreateTask={createTask} />

      <div className={styles.tasksHeader}>
        <strong className={styles.tasksCreated}>
          Tarefas criadas
          <span>{totalTasks}</span>
        </strong>
        <strong className={styles.tasksCompleteds}>
          Concluídas
          <span>
            {totalTasks === 0
              ? totalTasks
              : `${totalTasksCompleteds} de ${totalTasks}`}
          </span>
        </strong>
      </div>
      <ul className={styles.tasks}>
        {totalTasks > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDeleteTask={deleteTask}
              onCompleteTask={completeTask}
            />
          ))
        ) : (
          <div className={styles.withoutTasks}>
            <img src={clipboardSvg} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}
      </ul>
    </div>
  );
}
