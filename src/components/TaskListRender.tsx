import React from "react";
import { TaskObject } from "../App";

interface Props {
  tasks: TaskObject[];
  onTaskDone: (taskId: number, updatedTask: TaskObject) => void;
}

export function TaskListRender({ tasks, onTaskDone }: Props) {
  const handleTaskDone = (taskId: number) => {
    // Find the index of the task with the given taskId
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      // Update the isDone property of the task to true
      const updatedTask = { ...tasks[taskIndex], isDone: true };
      // Invoke the callback function with the updated task object
      if (onTaskDone) {
        onTaskDone(taskId, updatedTask);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => !task.isDone);

  return (
    <ul className="TaskListRender">
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <p>
            <span>Task: </span> {task.task}
          </p>
          <p>
            <span>Assignee: </span> {task.assignee}
          </p>

          <button onClick={() => handleTaskDone(task.id)}>Done</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskListRender;
