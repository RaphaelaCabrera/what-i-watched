const API_URL =  import.meta.env.VITE_API_URL;

export async function getMovies() {
  const response = await fetch(`${API_URL}/movies/`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}

export async function addMovie(movie: { data }) {
  const response = await fetch(`${API_URL}/movies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Failed to add movie");
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
  
  return response.json();
}

export async function getTvShows() {
  const response = await fetch(`${API_URL}/tv-shows/`);

  if (!response.ok) {
    throw new Error("Failed to fetch TV shows");
  }

  return response.json();
}

export async function getGenres() {
  const response = await fetch(`${API_URL}/genres/`);

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return response.json();
}