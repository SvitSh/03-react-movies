import axios from "axios";
import type { MovieResponse } from "../types/movieResponse";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchMovies = async (page = 1): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>("/movie/popular", {
    params: {
      language: "en-US",
      include_adult: false,
      page,
    },
  });
  return data;
};

export const fetchSearchMovies = async (
  query: string,
  page = 1
): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>("/search/movie", {
    params: {
      language: "en-US",
      include_adult: false,
      query,
      page,
    },
  });
  return data;
};
