// src/services/movieService.ts

import axios from "axios";
import { MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ВСТАВЬ_СЮДА_СВОЙ_BEARER_TOKEN`,
    Accept: "application/json",
  },
});

export const fetchMovies = async (page: number): Promise<MovieResponse> => {
  const response = await axiosInstance.get<MovieResponse>("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const fetchSearchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const response = await axiosInstance.get<MovieResponse>("/search/movie", {
    params: { query, page },
  });
  return response.data;
};
