import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import MovieModal from "./components/MovieModal/MovieModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import { Toaster, toast } from "react-hot-toast";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(results);
    } catch {
      setError("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

export default App;
