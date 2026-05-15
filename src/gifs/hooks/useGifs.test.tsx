import { afterEach, describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";
import * as gifActions from "../actions/get-gifs-by-query.action";

// Mock the action to avoid real API calls and ensure consistency
vi.mock("../actions/get-gifs-by-query.action", () => ({
  getGifsByQuery: vi.fn(),
}));

describe("useGifs", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockGifs = new Array(10).fill({
    id: "1",
    title: "test",
    url: "test",
    width: 100,
    height: 100,
  });

  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });
  
  test("should return a list of gifs", async () => {
    vi.mocked(gifActions.getGifsByQuery).mockResolvedValue(mockGifs);
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("react");
    });

    expect(result.current.gifs.length).toBe(10);
  });
  test("should return a list of gifs when handleTermClicked is called", async () => {
    vi.mocked(gifActions.getGifsByQuery).mockResolvedValue(mockGifs);
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("react");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from cache", async () => {
    vi.mocked(gifActions.getGifsByQuery).mockResolvedValue(mockGifs);
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("react");
    });

    expect(result.current.gifs.length).toBe(10);

    // Mock an error to prove it doesn't call the action again
    vi.mocked(gifActions.getGifsByQuery).mockRejectedValue(
      new Error("This should not be called"),
    );

    await act(async () => {
      await result.current.handleTermClicked("react");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 8 previous terms", async () => {
    vi.mocked(gifActions.getGifsByQuery).mockResolvedValue([]);
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      for (let i = 1; i <= 9; i++) {
        await result.current.handleSearch(i.toString());
      }
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toEqual([
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
    ]);
  });

  test("should handleSearch from cache", async () => {
    vi.mocked(gifActions.getGifsByQuery).mockResolvedValue(mockGifs);
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("react");
    });

    expect(result.current.gifs.length).toBe(10);

    // Mock should not be called again
    const spy = vi.mocked(gifActions.getGifsByQuery);

    await act(async () => {
      await result.current.handleSearch("react");
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current.gifs.length).toBe(10);
  });

  test("should not search if query is empty", async () => {
    const { result } = renderHook(() => useGifs());

    const spy = vi.spyOn(gifActions, "getGifsByQuery");

    await act(async () => {
      await result.current.handleSearch("");
      await result.current.handleSearch("   ");
    });

    expect(spy).not.toHaveBeenCalled();
    expect(result.current.gifs.length).toBe(0);
  });
});
