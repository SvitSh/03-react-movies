// src/components/App/App.tsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchSearchMovies } from "../../services/movieService";
import { Movie, MovieResponse } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", page, searchQuery],
    queryFn: () =>
      searchQuery.trim()
        ? fetchSearchMovies(searchQuery, page)
        : fetchMovies(page),
    staleTime: 300000,
    gcTime: 600000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message="There was an error, please try again..." />
      )}

      {data && <MovieGrid movies={data.results} />}

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
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
