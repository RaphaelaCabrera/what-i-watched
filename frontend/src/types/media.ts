export type MediaStatus =
  | "Plan to Watch"
  | "Watching"
  | "Completed"
  | "On Hold"
  | "Dropped";

export interface Genre {
  id: number;
  name: string;
}

export interface Media {
  id: number;
  title: string;
  genres: Genre[];
  status: MediaStatus;
  rate: number | null;
  cover_image: string | null;
}