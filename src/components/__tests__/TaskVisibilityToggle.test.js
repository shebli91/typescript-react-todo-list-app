import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskVisibilityToggle from "../TaskVisibilityToggle";

describe("TaskVisibilityToggle", () => {
  const setShowTasksMock = jest.fn();

  afterEach(cleanup);

  it("renders the toggle button correctly", () => {
    render(
      <TaskVisibilityToggle showTasks={true} setShowTasks={setShowTasksMock} />
    );
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  it("calls the setShowTasks function with true  value when button is clicked (tasks are Shown )", () => {
    const setShowTasksMock = jest.fn();
    const showTasks = true;
    render(
      <TaskVisibilityToggle
        showTasks={showTasks}
        setShowTasks={setShowTasksMock}
      />
    );
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(setShowTasksMock).toHaveBeenCalledTimes(1);
    expect(setShowTasksMock).toHaveBeenCalledWith(!showTasks);
  });

  it("calls the setShowTasks function with False value when button is clicked (tasks are Hidden )", () => {
    const setShowTasksMock = jest.fn();
    const showTasks = false;
    render(
      <TaskVisibilityToggle
        showTasks={showTasks}
        setShowTasks={setShowTasksMock}
      />
    );
    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);
    expect(setShowTasksMock).toHaveBeenCalledTimes(1);
    expect(setShowTasksMock).toHaveBeenCalledWith(!showTasks);
  });
});
