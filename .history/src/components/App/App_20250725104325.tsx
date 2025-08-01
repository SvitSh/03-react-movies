// src/components/App/App.tsx

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import { fetchMovies, fetchSearchMovies } from "../../services/movieService";
import type { Movie, MovieResponse } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message="There was an error, please try again..." />
      )}

      {data && (
        <>
          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />

          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={Math.min(data.total_pages, 500)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
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
