type TypeToggleProps = {
    selectedType: 'Filmes' | 'Séries';
    onToggle: (type: 'Filmes' | 'Séries') => void;
};

export function TypeToggle({ selectedType, onToggle }: TypeToggleProps) {
    return (
        <div className="p-1 rounded-full bg-[#c6dbef]">
            <button
                className={`p-1 rounded-full font-semibold ${selectedType === 'Filmes' ? 'bg-[#ee9f27] text-white' : 'bg-[#c6dbef] text-[#2171B5]'}`}
                onClick={() => onToggle('Filmes')}
            >
                Filmes
            </button>
            <button
                className={`p-1 rounded-full font-semibold ${selectedType === 'Séries' ? 'bg-[#3bee00] text-white' : 'bg-[#c6dbef] text-[#2171B5]'}`}
                onClick={() => onToggle('Séries')}
            >
                Séries
            </button>
        </div>
    )
}