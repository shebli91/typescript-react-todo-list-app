import React, { useState } from "react";
import { TaskObject } from "./model";

interface Props {
  onAddTask: (taskObj: TaskObject) => void;
}

export function TodoForm({ onAddTask }: Props) {
  const [task, setTask] = useState("");
  const [assignee, setAssignee] = useState("");

  const onTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignee(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique id for the new task
    const taskId = new Date().getTime();

    // Check if the task and the assignee are not empty
    if (task && assignee) {
      //  Create a task object contains the task and assignee values
      // also set the value of the ke (isDone) to false
      const newTaskObj = {
        id: taskId,
        task: task,
        assignee: assignee,
        isDone: false,
      };

      // Call the onAddTask callback function with the new task object as an argument
      if (onAddTask) {
        onAddTask(newTaskObj);
      }

      // set the task and the assignee values back to an empty String
      setTask("");
      setAssignee("");
    }
  };

  return (
    <form className="default-box todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="task"
        value={task}
        onChange={onTaskChange}
      ></input>

      <input
        type="text"
        placeholder="assignee"
        value={assignee}
        onChange={onAssigneeChange}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
