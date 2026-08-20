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

  useEffect(() => {
    fetchTvShows();
  }, []);

  return {
    tvShows,
    loading,
    error,
    fetchTvShows,
  };
}