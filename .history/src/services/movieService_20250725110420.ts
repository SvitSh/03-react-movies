import axios from "axios";
import type { MovieResponse } from "../types/movie";

// Базова URL API
const BASE_URL = "https://api.themoviedb.org/3";

// Створюємо axios-екземпляр з авторизацією
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

// Отримати популярні фільми (без пошуку)
export const fetchMovies = async (page: number): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>("/movie/popular", {
    params: { page },
  });
  return data;
};

// Отримати фільми за пошуковим запитом
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
