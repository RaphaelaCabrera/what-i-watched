import type { Media } from "./media";

export interface Movie extends Media {
  duration: number | null;
  release_year: number | null;
}