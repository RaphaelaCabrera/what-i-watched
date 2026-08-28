import type { MediaFormData } from "./types/mediaForm";

const API_URL =  import.meta.env.VITE_API_URL;

export async function getMovies() {
  const response = await fetch(`${API_URL}/movies/`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}

export async function createMovie(movie: MediaFormData) {
  const formData = new FormData();

  formData.append("title", movie.title);
  formData.append("status", movie.status);

  if (movie.rate !== null) {
    formData.append("rate", String(movie.rate));
  }

  movie.genres.forEach((genreId) => {
    formData.append("genres", String(genreId));
  });

  if (movie.cover_image) {
    formData.append("cover_image", movie.cover_image);
  }

  if (movie.duration != null) {
    formData.append("duration", String(movie.duration));
  }

  if (movie.release_year != null) {
    formData.append("release_year", String(movie.release_year));
  }

  const response = await fetch(`${API_URL}/movies/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create movie");
  }

  return response.json();
}

export async function updateMovie(id: number, movie: MediaFormData) {
  const formData = new FormData();

  formData.append("title", movie.title);
  formData.append("status", movie.status);

  if (movie.rate !== null) {
    formData.append("rate", String(movie.rate));
  }

  movie.genres.forEach((genreId) => {
    formData.append("genres", String(genreId));
  });

  if (movie.cover_image) {
    formData.append("cover_image", movie.cover_image);
  }

  if (movie.duration != null) {
    formData.append("duration", String(movie.duration));
  }

  if (movie.release_year != null) {
    formData.append("release_year", String(movie.release_year));
  }

  const response = await fetch(`${API_URL}/movies/${id}/`, {
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update movie");
  }

  return response.json();
}

export async function deleteMovie(id: number) {
  const response = await fetch(`${API_URL}/movies/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }
}

export async function getTvShows() {
  const response = await fetch(`${API_URL}/tv-shows/`);

  if (!response.ok) {
    throw new Error("Failed to fetch TV shows");
  }

  return response.json();
}

export async function createTvShow(tvShow: MediaFormData) {
  const formData = new FormData();

  formData.append("title", tvShow.title);
  formData.append("status", tvShow.status);

  if (tvShow.rate !== null) {
    formData.append("rate", String(tvShow.rate));
  }

  tvShow.genres.forEach((genreId) => {
    formData.append("genres", String(genreId));
  });

  if (tvShow.cover_image) {
    formData.append("cover_image", tvShow.cover_image);
  }

  if (tvShow.episodes != null) {
    formData.append("episodes", String(tvShow.episodes));
  }

  if (tvShow.seasons != null) {
    formData.append("seasons", String(tvShow.seasons));
  }

  const response = await fetch(`${API_URL}/tv-shows/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create TV show");
  }

  return response.json();
}

export async function updateTvShow(id: number, tvShow: MediaFormData) {
  const formData = new FormData();

  formData.append("title", tvShow.title);
  formData.append("status", tvShow.status);

  if (tvShow.rate !== null) {
    formData.append("rate", String(tvShow.rate));
  }

  tvShow.genres.forEach((genreId) => {
    formData.append("genres", String(genreId));
  });

  if (tvShow.cover_image) {
    formData.append("cover_image", tvShow.cover_image);
  }

  if (tvShow.episodes != null) {
    formData.append("episodes", String(tvShow.episodes));
  }

  if (tvShow.seasons != null) {
    formData.append("seasons", String(tvShow.seasons));
  }

  const response = await fetch(`${API_URL}/tv-shows/${id}/`, {
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update tvShow");
  }

  return response.json();
}

export async function deleteTvShow(id: number) {
  const response = await fetch(`${API_URL}/tv-shows/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete TV show");
  }
}

export async function getGenres() {
  const response = await fetch(`${API_URL}/genres/`);

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return response.json();
}