type TypeToggleProps = {
    selectedType: 'Movies' | 'TvShows';
    onToggle: (type: 'Movies' | 'TvShows') => void;
};

export function TypeToggle({ selectedType, onToggle }: TypeToggleProps) {
    return (
        <div className="p-1 rounded-full bg-[#c6dbef]">
            <button
                className={`p-1 rounded-full font-semibold ${selectedType === 'Movies' ? 'bg-[#ee9f27] text-white' : 'bg-[#c6dbef] text-[#2171B5]'}`}
                onClick={() => onToggle('Movies')}
            >
                Filmes
            </button>
            <button
                className={`p-1 rounded-full font-semibold ${selectedType === 'TvShows' ? 'bg-[#3bee00] text-white' : 'bg-[#c6dbef] text-[#2171B5]'}`}
                onClick={() => onToggle('TvShows')}
            >
                Séries
            </button>
        </div>
    )
}