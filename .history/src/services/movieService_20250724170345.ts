import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";

interface FetchMoviesParams {
  query: string;
}

export async function fetchMovies({
  query,
}: FetchMoviesParams): Promise<Movie[]> {
  const response = await axios.get(API_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return response.data.results;
}
