import type { Movie } from "../types/movie";
import type { TvShow } from "../types/tvShow";
import { Pencil, Trash } from "lucide-react";
import { getMediaStatus } from "../utils";

type MediaCardProps = {
    selectedType: 'Movies' | 'TvShows';
    media: Movie | TvShow;
    handleDeleteModalOpen?: (id: number) => void;
}

export function MediaCard({ selectedType, media, handleDeleteModalOpen }: MediaCardProps) {
    const API_URL =  import.meta.env.VITE_API_URL;

    return (
        <div className={`bg-white rounded-2xl border ${selectedType === 'Movies' ? 'border-[#ee9f27]' : 'border-[#3bee00]'} p-5 mt-3`}>
            <div className="flex flex-row w-full h-full rounded-lg mb-4">
                <div className="flex flex-row">
                    <img
                        src={
                            media.cover_image
                                ? `${API_URL}${media.cover_image}`
                                : "/placeholder.png"
                        }
                        alt={`Capa de ${media.title}`}
                        className="w-30 h-full rounded-lg mr-4 object-cover"
                    />
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold p-2">{media.title}</h3>
                        <div className="flex flex-row items-center mt-1">
                            <span className="text-gray-600 p-2 font-semibold">Status:</span>
                            <span>{getMediaStatus(media.status)}</span>

                            <span className="text-gray-600 p-2 font-semibold">Nota:</span>
                            <span>{media.rate}</span>

                            {selectedType === 'Movies' ? (
                                <>
                                    <span className="text-gray-600 p-2 font-semibold">Ano de lançamento:</span>
                                    <span>{"release_year" in media ? media.release_year : "-"}</span>

                                    <span className="text-gray-600 p-2 font-semibold">Duração:</span>
                                    <span>{"duration" in media ? media.duration : "-"} minutos</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-gray-600 p-2 font-semibold">Número de episódios:</span>
                                    <span>{"episodes" in media ? media.episodes : "-"}</span>

                                    <span className="text-gray-600 p-2 font-semibold">Número de temporadas:</span>
                                    <span>{"seasons" in media ? media.seasons : "-"}</span>
                                </>
                            )}
                        </div>

                        <div className="flex flex-row items-center">
                            <span className="text-gray-600 p-2 font-semibold">Gêneros:</span>
                            <span>{media.genre_details && media.genre_details.length > 0 ? media.genre_details.map(genre => genre.name).join(", ") : "-"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end ml-auto">
                    <button className="text-gray-600 hover:text-gray-800">
                        <Pencil className="w-6 h-6 inline-block mr-1 text-[#2171B5]" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 ml-4" onClick={() => handleDeleteModalOpen(media.id)}>
                        <Trash className="w-6 h-6 inline-block mr-1 text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}