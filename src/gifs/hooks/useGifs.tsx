import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = async (term: string) => {
    if (gifsCache[term]) {
      setGifs(gifsCache[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    gifsCache[term] = gifs;
    setGifs(gifs);
  };

  const handleSearch = async (query: string = "") => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;

    setPreviousTerms((prev) => {
      const filtered = prev.filter((t) => t !== query);
      return [query, ...filtered].slice(0, 8);
    });

    if (gifsCache[query]) {
      setGifs(gifsCache[query]);
      return;
    }

    const gifs = await getGifsByQuery(query);
    gifsCache[query] = gifs;
    setGifs(gifs);
  };

  return {
    // Values or Properties
    gifs,
    previousTerms,

    // Methods or Actions
    handleSearch,
    handleTermClicked,
  };
};
