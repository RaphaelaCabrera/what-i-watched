import { useEffect, useState } from "react";
import { getTvShows, createTvShow as createTvShowApi, deleteTvShow as deleteTvShowApi, updateTvShow as updateTvShowApi} from "../api";
import type { MediaFormData } from "../types/mediaForm";

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

  async function createTvShow(tvShow: MediaFormData) {
    try {
      setLoading(true);
      setError(null);

      await createTvShowApi(tvShow);

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

  async function updateTvShow(id: number, tvShow: MediaFormData) {
    try {
      setLoading(true);
      setError(null);

      await updateTvShowApi(id, tvShow);

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

  async function deleteTvShow(id: number) {
    try {
      setLoading(true);
      setError(null);

      await deleteTvShowApi(id);

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
    createTvShow,
    updateTvShow,
    deleteTvShow,
  };
}