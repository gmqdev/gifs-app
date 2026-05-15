import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should render serachbar correctly", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should the input has the correct placeholder value", () => {
    const placeholder = "Search for a GIF...";
    render(<SearchBar onQuery={() => {}} placeholder={placeholder} />);

    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });

  test("should call onQuery with correct value after 700ms", () => {
    vi.useFakeTimers();
    const onQuery = vi.fn((value) => console.log('  => onQuery executed with:', value));
    
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    
    console.log('  [Test] Advancing timers by 700ms...');
    vi.advanceTimersByTime(700);
    
    expect(onQuery).toHaveBeenCalledWith("test");
    vi.useRealTimers();
  });

  test("should call only once with the last value (debounce)", () => {
    vi.useFakeTimers();
    const onQuery = vi.fn((value) => console.log('  => [SUCCESS] onQuery executed with:', value));
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");

    // Simulating multiple rapid changes
    console.log('  [Test] 0ms: Changing input to "a"...');
    fireEvent.change(input, { target: { value: "a" } });
    
    console.log('  [Test] Wait 200ms...');
    vi.advanceTimersByTime(200); 
    
    console.log('  [Test] 200ms: Changing input to "ab"...');
    fireEvent.change(input, { target: { value: "ab" } });
    
    console.log('  [Test] Wait 200ms...');
    vi.advanceTimersByTime(200); 
    
    console.log('  [Test] 400ms: Changing input to "abc"...');
    fireEvent.change(input, { target: { value: "abc" } });

    console.log('  [Test] Advancing timers by 700ms more (Total: 1100ms)...');
    vi.advanceTimersByTime(700);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("abc");

    vi.useRealTimers();
  });

  test("should call onQuery when button is clicked", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledWith("test query");
    expect((input as HTMLInputElement).value).toBe(""); // setQuery("")
  });

  test("should call onQuery when Enter key is pressed", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test enter" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onQuery).toHaveBeenCalledWith("test enter");
    expect((input as HTMLInputElement).value).toBe(""); // setQuery("")
  });

  test("should not call onQuery when other keys are pressed", () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test escape" } });
    fireEvent.keyDown(input, { key: "Escape" });

    // Should not call onQuery (except for the initial mount/debounce which we are not using fake timers here so it might eventually call it if we wait, but let's just check immediate handleSearch)
    // Actually handleSearch is called via handleKeyDown ONLY on Enter.
    expect(onQuery).not.toHaveBeenCalled();
  });
});
