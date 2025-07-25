import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import { fetchMovies, fetchSearchMovies } from "../../services/movieService";
import type { Movie, MovieResponse } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import styles from "./App.module.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", page, query],
    queryFn: () => (query ? fetchSearchMovies(query, page) : fetchMovies(page)),
    keepPreviousData: true,
  });

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data)
    return <div>There was an error, please try again...</div>;

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearch} />

      <h1 className={styles.title}>
        {query ? `Results for "${query}"` : "Popular Movies"}
      </h1>

      <ul className={styles.movieList}>
        {data.results.map((movie: Movie) => (
          <li key={movie.id} className={styles.movieItem}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
            ) : (
              <div className={styles.noPoster}>No poster</div>
            )}
            <p className={styles.titleText}>{movie.title}</p>
          </li>
        ))}
      </ul>

      {data.total_pages > 1 && (
        <ReactPaginate
          pageCount={Math.min(data.total_pages, 500)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
}
