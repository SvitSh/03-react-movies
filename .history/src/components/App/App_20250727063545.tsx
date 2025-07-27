// src/components/App/App.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

import { fetchMovies, type MovieResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import styles from "./App.module.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<
    MovieResponse,
    Error
  >({
    queryKey: ["movies", searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: searchQuery.trim().length > 0,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (query: string) => {
    setSelectedMovie(null);
    setSearchQuery(query);
  };

  if (isSuccess && data.results.length === 0) {
    toast.error("No movies found for your request.");
  }

  return (
    <div className={styles.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage>There was an error, please try again...</ErrorMessage>
      )}

      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default App;
