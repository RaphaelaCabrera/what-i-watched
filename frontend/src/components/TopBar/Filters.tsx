
import type { Genre } from "../../types/media";
import { getMediaGenre, getMediaStatusList } from "../../utils";
import { useTranslation } from "react-i18next";

type FiltersProps = {
    statusFilter: string;
    genreFilter: string;
    onStatusFilterChange: (status: string) => void;
    onGenreFilterChange: (genre: string) => void;
    genres: Genre[];
};

export function Filters({ statusFilter, genreFilter, onStatusFilterChange, onGenreFilterChange, genres }: FiltersProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-end gap-2 p-3 ml-auto">
           <select
                className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
            >
                <option value="">{t('topBar.statusFilter')}</option>
                {getMediaStatusList(t).map(([status, label]) => (
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
                <option value="">{t('topBar.genreFilter')}</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                        {getMediaGenre(genre.name, t)}
                    </option>
                ))}
            </select>
        </div>
    );
}