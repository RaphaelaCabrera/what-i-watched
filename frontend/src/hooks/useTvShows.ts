import { useEffect, useState } from "react";
import { getTvShows } from "../api";

export function useTvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTvShows() {
    try {
      setLoading(true);
      setError(null);

      const data = await getTvShows();

      setTvShows(data);
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

  async function deleteTvShow(id: number) {
    try {
      setLoading(true);
      setError(null);

      await fetch(`${import.meta.env.VITE_API_URL}/tv-shows/${id}/`, {
        method: "DELETE",
      });

      await fetchTvShows();
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
    fetchTvShows();
  }, []);

  return {
    tvShows,
    loading,
    error,
    fetchTvShows,
    deleteTvShow,
  };
}