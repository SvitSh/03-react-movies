// src/services/movieService.ts

import axios from "axios";
import { MovieResponse } from "../types/types";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const fetchMovies = async (): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/trending/movie/day`,
    options
  );
  return response.data;
};

export const fetchSearchMovies = async (
  query: string
): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    ...options,
    params: {
      query,
    },
  });
  return response.data;
};
