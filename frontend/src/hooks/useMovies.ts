import { useEffect, useState } from "react";
import { getMovies, createMovie as createMovieApi, deleteMovie as deleteMovieApi, updateMovie as updateMovieApi} from "../api";
import type { MediaFormData } from "../types/mediaForm";

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

  async function createMovie(movie: MediaFormData) {
    try {
      setLoading(true);
      setError(null);

      await createMovieApi(movie);

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

   async function updateMovie(id: number, movie: MediaFormData) {
    try {
      setLoading(true);
      setError(null);

      await updateMovieApi(id, movie);

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

      await deleteMovieApi(id);

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
    createMovie,
    updateMovie,
    deleteMovie,
  };
}