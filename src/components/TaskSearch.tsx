import React, { useState } from "react";
import { TaskListRender } from "./TaskListRender";
import { TaskObject } from "./model";

interface Props {
  tasks: TaskObject[];
  onTaskDone: (taskId: number, updatedTask: TaskObject) => void;
}

export function TaskSearch({ tasks, onTaskDone }: Props) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.task.toLowerCase().includes(searchText.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="default-box TaskSearch">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search tasks..."
      />
      {/* Render the filtered tasks using TaskListRender component */}
      <TaskListRender tasks={filteredTasks} onTaskDone={onTaskDone} />
    </div>
  );
}
export default TaskSearch;
