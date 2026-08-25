import { useState } from "react";
import { TopBar } from "../components/TopBar/TopBar";
import { MediaCard } from "../components/MediaCard";
import { useMovies } from "../hooks/useMovies";
import { useTvShows } from "../hooks/useTvShows";
import { useGenres } from "../hooks/useGenres";
import { useMediaFilter } from "../hooks/useMediaFilter";
import { MediaDeleteModal } from "../components/MediaDeleteModal";
import { MediaManagementModal } from "../components/MediaManegementModal";

export function Home() {
  const [selectedType, setSelectedType] = useState<"Movies" | "TvShows">("Movies");
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);

  const { movies, deleteMovie } = useMovies();
  const { tvShows, deleteTvShow } = useTvShows();
  const { genres } = useGenres();
  const {
      filteredMedia,
      searchTerm,
      setSearchTerm,
      statusFilter,
      setStatusFilter,
      genreFilter,
      setGenreFilter,
  } = useMediaFilter(
      movies,
      tvShows,
      selectedType
    );

  function handleSelectType(type: 'Movies' | 'TvShows') {
    setSelectedType(type);
  }

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [mediaManagementModalIsOpen, setMediaManagementModalIsOpen] = useState(false);

  function handleDeleteMedia(id: number) {
    if (selectedType === "Movies") {
      deleteMovie(id);
    } else {
      deleteTvShow(id);
    }
    setDeleteModalIsOpen(false);
  }

  function handleAddClick() {
    setMediaManagementModalIsOpen(true);
  }

  return (
    <div className="bg-[#c6dbef] min-h-screen">
      <TopBar
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        genreFilter={genreFilter}
        selectedType={selectedType}
        onSearchChange={setSearchTerm}
        onTypeChange={handleSelectType}
        onStatusFilterChange={setStatusFilter}
        onGenreFilterChange={setGenreFilter}
        handleAddClick={handleAddClick}
        genres={genres}
      />

      <div className="flex flex-col items-center justify-center p-3 gap-2">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-[#2171B5]">Bem-vindo ao What I Watch</h2>
          <p className="text-lg text-[#2171B5]">Gerencie sua lista de filmes e séries assistidos.</p>
        </div>
       
        <div className="flex flex-col rounded-3xl bg-gray-50 p-6 shadow-md w-full max-w-7xl mt-6">
          { filteredMedia.length === 0 ? (
             selectedType === "Movies" ? (
              <p className="text-gray-500">Nenhum filme encontrado.</p>
            ) : (
              <p className="text-gray-500">Nenhuma série encontrada.</p>
            )
          ) : ( filteredMedia.map((media) => (
            <MediaCard key={media.id} selectedType={selectedType} media={media} handleDeleteModalOpen={() => {
              setDeleteModalIsOpen(true);
              setSelectedMediaId(media.id);
            }} />
          )))}
        </div>
      </div>
      <MediaManagementModal
        isOpen={mediaManagementModalIsOpen}
        isEditing={false}
        onClose={() => setMediaManagementModalIsOpen(false)}
        onSave={() => setMediaManagementModalIsOpen(false)}
        selectedType={selectedType}
        genres={genres}
      />
      <MediaDeleteModal 
        isOpen={deleteModalIsOpen} 
        onClose={() => setDeleteModalIsOpen(false)} 
        onDelete={() => handleDeleteMedia(selectedMediaId)} 
        selectedType={selectedType}
      />
    </div>
  );
}