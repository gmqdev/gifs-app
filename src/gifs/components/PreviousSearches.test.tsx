import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PreviousSearches } from "./PreviousSearches";

describe("PreviousSearches", () => {
  const searches = ["react", "vue", "angular"];

  test("should render the list of searches", () => {
    render(<PreviousSearches searches={searches} onLabelClicked={() => {}} />);

    expect(screen.getByText("react")).toBeDefined();
    expect(screen.getByText("vue")).toBeDefined();
    expect(screen.getByText("angular")).toBeDefined();
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  test("should call onLabelClicked when a term is clicked", () => {
    const onLabelClicked = vi.fn();
    render(<PreviousSearches searches={searches} onLabelClicked={onLabelClicked} />);

    const term = screen.getByText("vue");
    fireEvent.click(term);

    expect(onLabelClicked).toHaveBeenCalledWith("vue");
  });

  test("should render nothing in the list when searches is empty", () => {
    render(<PreviousSearches searches={[]} onLabelClicked={() => {}} />);
    expect(screen.queryByRole("listitem")).toBeNull();
  });
});
