// src/components/App.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchSearchMovies } from "../services/movieService";
import { MovieResponse } from "../types/movie";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import ReactPaginate from "react-paginate";
import styles from "./App.module.css";
import toast from "react-hot-toast";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", page, searchQuery],
    queryFn: () =>
      searchQuery.trim()
        ? fetchSearchMovies(searchQuery, page)
        : fetchMovies(page),
    // если ты используешь React Query < v5, перенеси этот параметр выше
    // В v5 опция "keepPreviousData" помещается сюда:
    options: {
      keepPreviousData: true,
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className={styles.error}>There was an error, please try again...</p>
      )}

      <div className={styles.grid}>
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          forcePage={page - 1}
        />
      )}
    </div>
  );
};

export default App;
