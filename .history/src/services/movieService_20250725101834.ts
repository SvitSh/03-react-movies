import axios from "axios";
import { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = "🔐ТВОЙ_BEARER_ТОКЕН"; // заміни на свій

const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, options);
  return response.data.results;
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
