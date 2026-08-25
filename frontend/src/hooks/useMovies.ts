import { useEffect, useState } from "react";
import { getMovies } from "../api";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchMovies() {
    try {
      setLoading(true);
      setError(null);

      const data = await getMovies();

      setMovies(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function addMovie(movie: { data }) {
    try {
      setLoading(true);
      setError(null);

      await fetch(`${import.meta.env.VITE_API_URL}/movies/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      await fetchMovies();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteMovie(id: number) {
    try {
      setLoading(true);
      setError(null);

      await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}/`, {
        method: "DELETE",
      });

      await fetchMovies();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    fetchMovies,
    deleteMovie,
  };
}