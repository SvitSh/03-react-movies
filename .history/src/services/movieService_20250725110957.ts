// src/services/movieService.ts
import axios from "axios";
import type { MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
};

export const fetchMovies = async (page: number): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/movie/popular`, {
    headers: HEADERS,
    params: { page },
  });
  return response.data;
};

export const fetchSearchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    headers: HEADERS,
    params: { query, page },
  });
  return response.data;
};
