import { CirclePlus } from "lucide-react";

type AddButtonProps = {
    selectedType: 'Movies' | 'TvShows';
    onClick: () => void;
};

export function AddButton({ selectedType, onClick }: AddButtonProps) {
    return (
        <button className={`${ selectedType === 'Movies' ? 'bg-[#ee9f27]' : 'bg-[#3bee00]'} text-white font-semibold p-2 rounded-lg`} onClick={onClick}>
            <CirclePlus className="inline-block mr-1" />
            Adicionar {selectedType === "Movies" ? "Filme" : "Série"}
        </button>
    );
}