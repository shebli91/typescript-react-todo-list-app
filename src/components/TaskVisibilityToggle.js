import React from "react";

export function TaskVisibilityToggle({ showTasks, setShowTasks }) {
  const handleClick = () => {
    setShowTasks(!showTasks);
  };

  return (
    <div className="task-visibility-toggle">
      <button onClick={handleClick}>{showTasks ? "Hide" : "Show"} Tasks</button>
    </div>
  );
}
export default TaskVisibilityToggle;
