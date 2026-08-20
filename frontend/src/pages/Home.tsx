import { useState } from "react";
import { TopBar } from "../components/TopBar/TopBar";
import { MediaCard } from "../components/MediaCard";
import { useMovies } from "../hooks/useMovies";
import { useTvShows } from "../hooks/useTvShows";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"Filmes" | "Séries">("Filmes");

  const { movies } = useMovies();
  const { tvShows } = useTvShows();

  const filteredMedia = selectedType === "Filmes" ? movies : tvShows;

  function handleSelectType(type: 'Filmes' | 'Séries') {
    setSelectedType(type);
  }


  return (
    <div className="bg-[#c6dbef] min-h-screen">
      <TopBar
        searchTerm={searchTerm}
        selectedType={selectedType}
        onSearchChange={setSearchTerm}
        onTypeChange={handleSelectType}
      />

      <div className="flex flex-col items-center justify-center p-3 gap-2">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-[#2171B5]">Bem-vindo ao What I Watch</h2>
          <p className="text-lg text-[#2171B5]">Gerencie sua lista de filmes e séries assistidos.</p>
        </div>
       
        <div className="flex flex-col rounded-3xl bg-gray-50 p-6 shadow-md w-full">
          { filteredMedia.length === 0 ? (
             selectedType === "Filmes" ? (
              <p className="text-gray-500">Nenhum filme encontrado.</p>
            ) : (
              <p className="text-gray-500">Nenhuma série encontrada.</p>
            )
          ) : ( filteredMedia.map((media) => (
            <MediaCard key={media.id} selectedType={selectedType} />
          )))}
        </div>
      </div>
    </div>
  );
}