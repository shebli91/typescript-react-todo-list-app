import React from "react";

export function TaskCounter({ tasks }) {
  // Filter tasks based on isDone property
  const todoTasks = tasks.filter((task) => !task.isDone);
  const doneTasks = tasks.filter((task) => task.isDone);

  return (
    <div className="default-box TaskCounter">
      <p>Total Tasks : {tasks.length}</p>
      <p>toDo : {todoTasks.length}</p>
      <p>Done : {doneTasks.length}</p>
    </div>
  );
}

export default TaskCounter;
