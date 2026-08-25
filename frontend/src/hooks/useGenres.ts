import { useEffect, useState } from "react";
import { getGenres } from "../api";

export function useGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchGenres() {
    try {
      setLoading(true);
      setError(null);

      const data = await getGenres();

      setGenres(data);
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
    fetchGenres();
  }, []);

  return {
    genres,
    loading,
    error,
    fetchGenres,
  };
}