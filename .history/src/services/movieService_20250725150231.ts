import axios from "axios";
import type { MovieResponse } from "../types/movieResponse"; // Переместили сюда!
import type { Movie } from "../types/movie"; // ← если всё ещё нужно

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

export async function fetchMovies(query: string): Promise<MovieResponse> {
  const { data } = await tmdb.get<MovieResponse>("/search/movie", {
    params: { query },
  });
  return data;
}
