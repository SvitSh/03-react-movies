// src/services/movieService.ts
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(API_URL, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
    params: {
      query,
    },
  });

  return response.data.results;
};
