import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskListRender from "../TaskListRender";

describe("TaskListRender", () => {
  afterEach(cleanup);

  it("renders the list of tasks correctly", () => {
    const tasks = [
      { id: 1, task: "Task 1", assignee: "Assignee 1", isDone: false },
      { id: 2, task: "Task 2", assignee: "Assignee 2", isDone: true },
      { id: 3, task: "Task 3", assignee: "Assignee 3", isDone: false },
    ];

    render(<TaskListRender tasks={tasks} onTaskDone={() => {}} />);

    // Assert that each task is rendered in the list
    const task1Element = screen.getByText("Task 1");
    expect(task1Element).toBeInTheDocument();

    const task2Element = screen.queryByText("Task 2");
    expect(task2Element).not.toBeInTheDocument();

    const task3Element = screen.getByText("Assignee 3");
    expect(task3Element).toBeInTheDocument();
  });

  it("handles task completion correctly", () => {
    const tasks = [
      { id: 1, task: "Task 1", assignee: "Assignee 1", isDone: false },
      { id: 2, task: "Task 2", assignee: "Assignee 2", isDone: false },
      { id: 3, task: "Task 3", assignee: "Assignee 3", isDone: false },
    ];

    const onTaskDoneMock = jest.fn();

    render(<TaskListRender tasks={tasks} onTaskDone={onTaskDoneMock} />);

    const doneButtons = screen.queryAllByText("Done");
    doneButtons.forEach((button) => {
      fireEvent.click(button);
    });

    // Verify that the onTaskDone callback was called for each button click
    expect(onTaskDoneMock).toHaveBeenCalledTimes(doneButtons.length);

    // Verify that the onTaskDone callback was called with the correct arguments for each button click
    doneButtons.forEach((button, index) => {
      const taskId = tasks[index].id;
      const updatedTask = { ...tasks[index], isDone: true };
      expect(onTaskDoneMock).toHaveBeenCalledWith(taskId, updatedTask);
    });
  });
});
