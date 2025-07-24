import React, { useState } from "react";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const results = await fetchMovies(query); // Здесь передаём просто строку, а не объект
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
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster />
    </>
  );
};

export default App;
