import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: API_KEY, // Передаем ключ здесь!
        query,
      },
    }
  );

  return response.data.results;
};
