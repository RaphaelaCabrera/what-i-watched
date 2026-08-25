import { useMemo, useState } from "react";
import type { Movie } from "../types/movie";
import type { TvShow } from "../types/tvShow";

export function useMediaFilter(
    movies: Movie[],
    tvShows: TvShow[],
    selectedType: "Movies" | "TvShows",
) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");

    const media = selectedType === "Movies"
        ? movies
        : tvShows;

    const filteredMedia = useMemo(() => {
        return media.filter((item) => {
            const matchesSearch = item.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesStatus =
                !statusFilter ||
                item.status === statusFilter;

            const matchesGenre =
                !genreFilter ||
                item.genre_details.some(
                    (genre) => genre.name === genreFilter
                );

            return (
                matchesSearch &&
                matchesStatus &&
                matchesGenre
            );
        });
    }, [
        media,
        searchTerm,
        statusFilter,
        genreFilter,
    ]);

    return {
        filteredMedia,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        genreFilter,
        setGenreFilter,
    };
}