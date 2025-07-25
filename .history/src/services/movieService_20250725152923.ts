import axios from "axios";
import type { MovieResponse } from "../types/movieResponse";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page = 1): Promise<MovieResponse> => {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
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
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      include_adult: false,
      query,
      page,
    },
  });
  return data;
};
