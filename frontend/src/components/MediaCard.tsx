import type { Media } from "../types/media";
import { Pencil, Trash } from "lucide-react";

type MediaCardProps = {
    selectedType: 'Filmes' | 'Séries';
    media: Media;
}

export function MediaCard({ selectedType, media }: MediaCardProps) {
    return (
        <div className={`bg-white rounded-2xl border ${selectedType === 'Filmes' ? 'border-[#ee9f27]' : 'border-[#3bee00]'} p-4 mt-3`}>
            <div className="flex flex-row w-full h-full rounded-lg mb-4">
                <div className="flex flex-row">
                    <img src="https://via.placeholder.com/100" alt="Capa do filme" className="w-24 h-36 rounded-lg mr-4" />
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{media.title}</h3>
                        <div className="flex flex-row items-center mt-1">
                            <span className="text-gray-600 mr-2">Status:</span>
                            <span>Completo</span>

                            <span className="text-gray-600 mr-2">Nota:</span>
                            <span>10</span>

                            <span className="text-gray-600 ml-4 mr-2">Ano:</span>
                            <span>2023</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end ml-auto">
                    <button className="text-gray-600 hover:text-gray-800">
                        <Pencil className="w-4 h-4 inline-block mr-1 text-[#2171B5]" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 ml-4">
                        <Trash className="w-4 h-4 inline-block mr-1 text-red-500" />
                    </button>
                </div>
            </div>
            
        </div>
    );
}