import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { GifList } from "./GifList";
import type { Gif } from "../interfaces/gif.interface";

describe("GifList", () => {
  const gifs: Gif[] = [
    {
      id: "1",
      title: "Gif 1",
      url: "https://gif1.com",
      width: 100,
      height: 100,
    },
    {
      id: "2",
      title: "Gif 2",
      url: "https://gif2.com",
      width: 200,
      height: 200,
    },
  ];

  test("should render a list of gifs", () => {
    render(<GifList gifs={gifs} />);

    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(2);
    expect(screen.getByText("Gif 1")).toBeDefined();
    expect(screen.getByText("Gif 2")).toBeDefined();
  });

  test("should render nothing when list is empty", () => {
    const { container } = render(<GifList gifs={[]} />);
    expect(container.querySelector(".gifs-container")?.children.length).toBe(0);
  });
});
