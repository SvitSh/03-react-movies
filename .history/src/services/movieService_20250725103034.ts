// src/services/movieService.ts

import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTRmYTc5M2JiYmE1MmM0MTU0ZTkwNDVlODU5NjEzOCIsIm5iZiI6MTc1MzM2MDcyOC4yODEsInN1YiI6IjY4ODIyOTU4YTU3NDZkYzg1OTI0NWIwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.29PBKt46Gw6rEcJzW3A3_amz72wniopyfhi97ZQti1s";
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
