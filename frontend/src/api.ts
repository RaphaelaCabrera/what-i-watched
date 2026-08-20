const API_URL =  import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export async function getMovies() {
  const response = await fetch(`${API_URL}/movies/`);
  console.log("Response from getMovies:", response);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
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