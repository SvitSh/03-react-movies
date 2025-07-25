// src/components/SearchBar/SearchBar.tsx

import React, { useState } from "react";
import type { FormEvent } from "react";
import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (formData: FormData) => {
    const input = formData.get("query")?.toString().trim();

    if (!input) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(input);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form
          className={styles.form}
          action={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);
            handleSearch(formData);
          }}
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
