export type MediaFormData = {
  title: string;
  status: string;
  rate: number | null;
  genres: number[];
  cover_image: File | null;

  duration?: number | null;
  release_year?: number | null;

  episodes?: number | null;
  seasons?: number | null;
};