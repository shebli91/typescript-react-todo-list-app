import React from "react";

interface Props {
  showTasks: boolean;
  setShowTasks: (value: boolean) => void;
}

export function TaskVisibilityToggle({ showTasks, setShowTasks }: Props) {
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
