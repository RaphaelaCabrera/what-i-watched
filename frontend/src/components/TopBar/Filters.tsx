
import type { Genre } from "../../types/media";
import { getMediaStatusList } from "../../utils";

type FiltersProps = {
    statusFilter: string;
    genreFilter: string;
    onStatusFilterChange: (status: string) => void;
    onGenreFilterChange: (genre: string) => void;
    genres: Genre[];
};

export function Filters({ statusFilter, genreFilter, onStatusFilterChange, onGenreFilterChange, genres }: FiltersProps) {
    return (
        <div className="flex items-center justify-end gap-2 p-3 ml-auto">
           <select
                className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
            >
                <option value="">Filtrar por status</option>
                {getMediaStatusList().map(([status, label]) => (
                    <option key={status} value={status}>
                        {label}
                    </option>
                ))}
            </select>

            <select
                className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                value={genreFilter}
                onChange={(e) => onGenreFilterChange(e.target.value)}
            >
                <option value="">Filtrar por gênero</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
}