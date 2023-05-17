import { React, useState } from "react";
import "./App.css";
import { TaskCounter } from "./components/TaskCounter";
import { TodoForm } from "./components/TodoForm";
import { TaskVisibilityToggle } from "./components/TaskVisibilityToggle";
import { TaskSearch } from "./components/TaskSearch";

function App() {
  // Array of tasks
  const [tasks, setTasks] = useState([]);

  const [showTasks, setShowTasks] = useState(true);

  // Define the onAddTask callback function
  const handleAddTask = (taskObj) => {
    // Push the new task object to the tasks array using the setTasks function
    setTasks([...tasks, taskObj]);
  };

  // Define the onTaskDone callback function
  const handleTaskDone = (taskId, updatedTask) => {
    // Find the index of the task with the given taskId
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      // Update the tasks array with the updated task object
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = updatedTask;
      setTasks(updatedTasks);
    }
  };

  return (
    <div>
      {/*render the main form from (TodoForm) component*/}
      <TodoForm onAddTask={handleAddTask} />
      <TaskVisibilityToggle showTasks={showTasks} setShowTasks={setShowTasks} />
      {/* Render the search box  from TaskSearch component */}
      {showTasks && <TaskSearch tasks={tasks} onTaskDone={handleTaskDone} />}
      {/*render the tasks counter form (TaskCounter) component*/}
      <TaskCounter tasks={tasks} />
    </div>
  );
}

export default App;
