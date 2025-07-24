import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import MovieModal from "./components/MovieModal/MovieModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import toast, { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const data = await fetchMovies(query);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(data.results);
    } catch {
      setError("Failed to fetch movies. Please try again.");
      toast.error("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default App;
