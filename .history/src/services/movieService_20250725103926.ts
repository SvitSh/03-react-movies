// src/services/movieService.ts

import axios from "axios";
import { MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTRmYTc5M2JiYmE1MmM0MTU0ZTkwNDVlODU5NjEzOCIsIm5iZiI6MTc1MzM2MDcyOC4yODEsInN1YiI6IjY4ODIyOTU4YTU3NDZkYzg1OTI0NWIwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.29PBKt46Gw6rEcJzW3A3_amz72wniopyfhi97ZQti1s`,
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
