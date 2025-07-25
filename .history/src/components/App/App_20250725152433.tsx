import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";

import { fetchMovies, fetchSearchMovies } from "../../services/movieService";
import type { Movie, MovieResponse } from "../../types/movieResponse";

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
    placeholderData: undefined,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage>There was an error, please try again...</ErrorMessage>
      )}

      {data?.results && data.results.length > 0 && (
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
