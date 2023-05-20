import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskCounter from "../TaskCounter";

describe("TaskCounter", () => {
  afterEach(cleanup);

  it("renders the correct number of tasks", () => {
    const tasks = [
      { id: 1, task: "Task 1", assignee: "Assignee 1", isDone: false },
      { id: 2, task: "Task 2", assignee: "Assignee 2", isDone: true },
      { id: 3, task: "Task 3", assignee: "Assignee 3", isDone: false },
    ];

    render(<TaskCounter tasks={tasks} />);

    const totalTasksElement = screen.getByText("Total Tasks : 3");
    expect(totalTasksElement).toBeInTheDocument();

    const todoTasksElement = screen.getByText("toDo : 2");
    expect(todoTasksElement).toBeInTheDocument();

    const doneTasksElement = screen.getByText("Done : 1");
    expect(doneTasksElement).toBeInTheDocument();
  });

  it("renders zero tasks when there are no tasks", () => {
    const tasks = [];

    render(<TaskCounter tasks={tasks} />);

    const totalTasksElement = screen.getByText("Total Tasks : 0");
    expect(totalTasksElement).toBeInTheDocument();

    const todoTasksElement = screen.getByText("toDo : 0");
    expect(todoTasksElement).toBeInTheDocument();

    const doneTasksElement = screen.getByText("Done : 0");
    expect(doneTasksElement).toBeInTheDocument();
  });

  it("renders the correct number of tasks when all tasks are done", () => {
    const tasks = [
      { id: 1, task: "Task 1", assignee: "Assignee 1", isDone: true },
      { id: 2, task: "Task 2", assignee: "Assignee 2", isDone: true },
      { id: 3, task: "Task 3", assignee: "Assignee 3", isDone: true },
    ];

    render(<TaskCounter tasks={tasks} />);

    const totalTasksElement = screen.getByText("Total Tasks : 3");
    expect(totalTasksElement).toBeInTheDocument();

    const todoTasksElement = screen.getByText("toDo : 0");
    expect(todoTasksElement).toBeInTheDocument();

    const doneTasksElement = screen.getByText("Done : 3");
    expect(doneTasksElement).toBeInTheDocument();
  });
});
