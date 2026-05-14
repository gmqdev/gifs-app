import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });
  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("react");
    });

    expect(result.current.gifs.length).toBe(10);
  });
  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("react");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("react");
    });

    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is my custom error"),
    );

    await act(async () => {
      await result.current.handleTermClicked("react");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("1");
      await result.current.handleSearch("2");
      await result.current.handleSearch("3");
      await result.current.handleSearch("4");
      await result.current.handleSearch("5");
      await result.current.handleSearch("6");
      await result.current.handleSearch("7");
      await result.current.handleSearch("8");
      await result.current.handleSearch("9");
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toEqual(
      expect.arrayContaining(["9", "8", "7", "6", "5", "4", "3", "2"]),
    );
  });
});
