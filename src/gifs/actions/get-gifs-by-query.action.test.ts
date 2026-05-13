import { describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphyApi } from "../api/giphy.api";

// Mock the API module
vi.mock("../api/giphy.api", () => ({
  giphyApi: vi.fn(),
}));

describe("getGifsByQuery action", () => {
  test("should fetch gifs and return them mapped using mocked axios", async () => {
    // Define the mock response that axios should return
    const mockGiphyResponse = {
      data: {
        data: [
          {
            id: "fake-id",
            title: "Fake Gif Title",
            images: {
              fixed_height: {
                url: "https://media.giphy.com/fake.gif",
                width: "250",
                height: "250",
              },
            },
          },
        ],
      },
    };

    // Tell the mock what value it should resolve to
    vi.mocked(giphyApi).mockResolvedValue(mockGiphyResponse);

    const gifs = await getGifsByQuery("react");

    // Verify that the API was called with the correct parameters
    expect(giphyApi).toHaveBeenCalledWith("/search", {
      params: {
        q: "react",
        limit: 10,
      },
    });

    // Verify that the data was mapped correctly
    expect(gifs.length).toBe(1);
    expect(gifs[0]).toEqual({
      id: "fake-id",
      title: "Fake Gif Title",
      url: "https://media.giphy.com/fake.gif",
      width: 250,
      height: 250,
    });
  });

  test("should handle error when the API returns an error", async () => {
    // 1. Spy on console.error
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // 2. Simulate 400 error
    // Use mockRejectedValue to simulate a failed Axios/Fetch promise
    vi.mocked(giphyApi).mockRejectedValue({
      response: {
        status: 400,
        data: { message: "Bad Request" },
      },
    });

    // 3. Execute the function
    const gifs = await getGifsByQuery("goku");

    // 4. Assertions
    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());

    // Clean up the spy
    consoleErrorSpy.mockRestore();
  });
});
