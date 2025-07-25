// src/services/movieService.ts

import axios from "axios";
import type { MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchMovies = async (page: number): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>("/movie/popular", {
    params: { page },
  });
  return data;
};

export const fetchSearchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });
  return data;
};
