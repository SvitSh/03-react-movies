import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchMovies, fetchSearchMovies } from "../../services/movieService";
import type { Movie, MovieResponse } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";

import styles from "./App.module.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", searchQuery, page],
    queryFn: () =>
      searchQuery.trim()
        ? fetchSearchMovies(searchQuery, page)
        : fetchMovies(page),
    placeholderData: undefined,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage>There was an error, please try again...</ErrorMessage>
      )}

      {data?.results && (
        <>
          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />

          {data.total_pages > 1 && (
            <Pagination
              pageCount={Math.min(data.total_pages, 500)}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
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
