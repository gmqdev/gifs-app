import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Test title";
  test("should render the title correctly", () => {
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });
  test("should render the description when provided", () => {
    const description = "Test description";

    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });
  test("should not render the description when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);
    const divElement = container.querySelector(".content-center");
    const p = divElement?.querySelector("p");

    expect(p).toBeNull();
  });
});
