import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoForm from "../TodoForm";

describe("TodoForm", () => {
  afterEach(cleanup);

  it("calls the onAddTask function with the correct task object when Add button is clicked", () => {
    const onAddTaskMock = jest.fn();

    render(<TodoForm onAddTask={onAddTaskMock} />);
    const taskInput = screen.getByPlaceholderText("task");
    const assigneeInput = screen.getByPlaceholderText("assignee");
    const addButton = screen.getByRole("button", { name: "Add" });

    const task = "Make Dinner";
    const assignee = "Mohammed Shebli";

    fireEvent.change(taskInput, { target: { value: task } });
    fireEvent.change(assigneeInput, { target: { value: assignee } });
    fireEvent.click(addButton);

    expect(onAddTaskMock).toHaveBeenCalledTimes(1);
    expect(onAddTaskMock).toHaveBeenCalledWith(
      expect.objectContaining({
        task,
        assignee,
        isDone: false,
        id: expect.any(Number),
      })
    );

    expect(taskInput.value).toBe("");
    expect(assigneeInput.value).toBe("");
  });

  it("does not call the onAddTask function if either task or assignee is empty", () => {
    const onAddTaskMock = jest.fn();

    render(<TodoForm onAddTask={onAddTaskMock} />);
    const taskInput = screen.getByPlaceholderText("task");
    const assigneeInput = screen.getByPlaceholderText("assignee");
    const addButton = screen.getByRole("button", { name: "Add" });

    const task = "Make Dinner";
    const assignee = "";

    fireEvent.change(taskInput, { target: { value: task } });
    fireEvent.change(assigneeInput, { target: { value: assignee } });
    fireEvent.click(addButton);

    expect(onAddTaskMock).not.toHaveBeenCalled();
  });
});
