import { SquareProps } from "../models/interfaces.model";
import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { Square } from "./square";

let container: HTMLDivElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = {} as HTMLDivElement;
});

it("highlighted square with X and 'clicked' action", () => {
  let hasClicked = false;
  act(() => {
    render(
      <Square
        highlight={true}
        value="X"
        onClick={() => hasClicked = !hasClicked}
      />,
      { container }
    );
  });
  expect(container.textContent).toBe("X");

  const button = document.querySelector("button");
  expect(button?.className).toContain("highlight");

  expect(hasClicked).toBe(false);
  act(() => {
    button?.click();
  });
  expect(hasClicked).toBe(true);
});

it("non-highlighted square with '' and 'clicked' action", () => {
  let hasClicked = false;
  act(() => {
    render(
      <Square
        highlight={true}
        value=""
        onClick={() => hasClicked = !hasClicked}
      />,
      { container }
    );
  });
  expect(container.textContent).toBe("");

  const button = document.querySelector("button");
  expect(button?.className).toContain("highlight");

  expect(hasClicked).toBe(false);
  act(() => {
    button?.click();
  });
  expect(hasClicked).toBe(true);
});
