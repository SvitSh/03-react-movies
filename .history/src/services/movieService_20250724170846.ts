import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

if (!API_KEY) {
  throw new Error("VITE_TMDB_TOKEN is not defined in environment variables");
}

export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get<FetchMoviesResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};
