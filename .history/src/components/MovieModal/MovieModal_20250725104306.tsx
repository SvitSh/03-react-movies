import { useEffect } from "react";
import ReactDOM from "react-dom";
import type { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        <h2>{movie.title}</h2>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <p>{movie.overview}</p>
        <p>
          <b>Release date:</b> {movie.release_date}
        </p>
        <p>
          <b>Rating:</b> {movie.vote_average}
        </p>
      </div>
    </div>,
    modalRoot
  );
}
