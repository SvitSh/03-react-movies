import axios from "axios";
import type { MovieResponse } from "../types/movieResponse.ts";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

export async function fetchSearchMovies(
  query: string,
  page: number
): Promise<MovieResponse> {
  const { data } = await tmdb.get<MovieResponse>("/search/movie", {
    params: { query, page },
  });
  return data;
}
