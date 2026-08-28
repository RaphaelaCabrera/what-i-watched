import type { Movie } from "../types/movie";
import type { TvShow } from "../types/tvShow";
import { Pencil, Trash } from "lucide-react";
import { getMediaGenre, getMediaStatus } from "../utils";
import { useTranslation } from "react-i18next";

type MediaCardProps = {
    selectedType: 'Movies' | 'TvShows';
    media: Movie | TvShow;
    handleDeleteModalOpen?: (id: number) => void;
    handleEditClick?: (media: Movie | TvShow) => void;
}

export function MediaCard({ selectedType, media, handleDeleteModalOpen, handleEditClick }: MediaCardProps) {
    const API_URL =  import.meta.env.VITE_API_URL;
    const { t } = useTranslation();

    return (
        <div className={`bg-white rounded-2xl border ${selectedType === 'Movies' ? 'border-[#ee9f27]' : 'border-[#3bee00]'} p-2 mt-2`}>
            <div className="flex flex-row w-full h-full rounded-lg">
                <div className="flex flex-row">
                    <img
                        src={
                            media.cover_image
                                ? `${API_URL}${media.cover_image}`
                                : "/placeholder.png"
                        }
                        alt={t('media.posterPlaceholder', { title: media.title })}
                        className="w-18 h-full rounded-lg mr-4 object-cover"
                    />
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold mx-2">{media.title}</h3>
                        <div className="flex flex-row items-center">
                            <span className="text-gray-600 mx-2 font-semibold">{t('media.status')}:</span>
                            <span>{getMediaStatus(media.status, t)}</span>

                            <span className="text-gray-600 mx-2 font-semibold">{t('media.rating')}:</span>
                            <span>{media.rate ? media.rate : "-"}</span>

                            {selectedType === 'Movies' ? (
                                <>
                                    <span className="text-gray-600 mx-2 font-semibold">{t('media.releaseYear')}:</span>
                                    <span>{"release_year" in media ? media.release_year : "-"}</span>

                                    <span className="text-gray-600 mx-2 font-semibold">{t('media.duration')}:</span>
                                    <span>{"duration" in media ? media.duration : "-"} {t('common.minutes')}</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-gray-600 mx-2 font-semibold">{t('media.episodes')}:</span>
                                    <span>{"episodes" in media ? media.episodes : "-"}</span>

                                    <span className="text-gray-600 mx-2 font-semibold">{t('media.seasons')}:</span>
                                    <span>{"seasons" in media ? media.seasons : "-"}</span>
                                </>
                            )}
                        </div>

                        <div className="flex flex-row items-center">
                            <span className="text-gray-600 mx-2 font-semibold">{t('media.genres')}:</span>
                            <span>
                                {media.genre_details && media.genre_details.length > 0
                                    ? media.genre_details
                                        .map((genre) => getMediaGenre(genre.name, t))
                                        .join(", ")
                                    : "-"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end ml-auto">
                    <button className="text-gray-600 hover:text-gray-800">
                        <Pencil className="w-6 h-6 inline-block mr-1 text-[#2171B5]" onClick={() => handleEditClick(media)}/>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 ml-4" onClick={() => handleDeleteModalOpen(media.id)}>
                        <Trash className="w-6 h-6 inline-block mr-1 text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}