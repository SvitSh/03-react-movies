// src/services/movieService.ts

import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "🔐ТВОЙ_BEARER_ТОКЕН"; // замени на свой актуальный токен

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get<MovieResponse>("/movie/popular");
  return response.data.results;
};

export const fetchSearchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axiosInstance.get<MovieResponse>("/search/movie", {
    params: { query },
  });
  return response.data.results;
};
