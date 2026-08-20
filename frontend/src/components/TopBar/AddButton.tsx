import { CirclePlus } from "lucide-react";

type AddButtonProps = {
    selectedType: 'Filmes' | 'Séries';
    onClick: () => void;
};

export function AddButton({ selectedType, onClick }: AddButtonProps) {
    return (
        <button className={`${ selectedType === 'Filmes' ? 'bg-[#ee9f27]' : 'bg-[#3bee00]'} text-white font-semibold p-2 rounded-lg`} onClick={onClick}>
            <CirclePlus className="inline-block mr-1" />
            Adicionar {selectedType === "Filmes" ? "Filme" : "Série"}
        </button>
    );
}