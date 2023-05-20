import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskSearch from "../TaskSearch";

describe("TaskSearch", () => {
  const tasks = [
    { id: 1, task: "Task 1", assignee: "Assignee 1", isDone: false },
    { id: 2, task: "Task 2", assignee: "Assignee 2", isDone: false },
    { id: 3, task: "Task 3", assignee: "Assignee 3", isDone: false },
  ];

  const onTaskDoneMock = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it("renders the search input correctly", () => {
    render(<TaskSearch tasks={tasks} onTaskDone={onTaskDoneMock} />);
    const searchInput = screen.getByPlaceholderText("Search tasks...");
    expect(searchInput).toBeInTheDocument();
  });

  it("filters tasks based on search input", () => {
    render(<TaskSearch tasks={tasks} onTaskDone={onTaskDoneMock} />);
    const searchInput = screen.getByPlaceholderText("Search tasks...");

    fireEvent.change(searchInput, { target: { value: "Task 1" } });

    const task1Element = screen.getByText("Task 1");
    expect(task1Element).toBeInTheDocument();

    const task2Element = screen.queryByText("Task 2");
    expect(task2Element).not.toBeInTheDocument();

    const task3Element = screen.queryByText("Task 3");
    expect(task3Element).not.toBeInTheDocument();
  });

  it("calls the onTaskDone function when task is marked as done", () => {
    render(<TaskSearch tasks={tasks} onTaskDone={onTaskDoneMock} />);
    const searchInput = screen.getByPlaceholderText("Search tasks...");

    fireEvent.change(searchInput, { target: { value: "Task 1" } });

    const doneButton = screen.getByText("Done");
    fireEvent.click(doneButton);

    const taskId = tasks[0].id;
    const updatedTask = { ...tasks[0], isDone: true };
    expect(onTaskDoneMock).toHaveBeenCalledWith(taskId, updatedTask);
  });
});
