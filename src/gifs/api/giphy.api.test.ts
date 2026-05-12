import { describe, expect, test } from "vitest";
import { giphyApi } from "../api/giphy.api";

describe("useGifs", () => {
  test("should be configured correctly", () => {    
    const params = giphyApi.defaults.params;

    // With primitives => toBe
    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");
    expect(giphyApi.defaults.params.lang).toBe("es");
    expect(giphyApi.defaults.params.api_key).toBe(
      import.meta.env.VITE_GIPHY_API_KEY,
    );

    // With objects => toStrictEqual
    expect(params).toStrictEqual({
      lang: "es",
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
