import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    language: "en-US",
    include_adult: false,
    page: 1,
  },
});

export async function fetchSearchMovies(query: string): Promise<MovieResponse> {
  const { data } = await tmdb.get<MovieResponse>("/search/movie", {
    params: { query },
  });
  return data;
}
