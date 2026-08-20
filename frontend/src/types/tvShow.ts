import type { Media } from "./media";

export interface TvShow extends Media {
  episodes: number | null;
  seasons: number | null;
}