import { useEffect, useState } from "react";
import type { MediaFormData } from "../types/mediaForm";
import type { TvShow } from "../types/tvShow";
import type { Movie } from "../types/movie";
import { useMovies } from "../hooks/useMovies";
import { useTvShows } from "../hooks/useTvShows";
import { useGenres } from "../hooks/useGenres";
import { TopBar } from "../components/TopBar/TopBar";
import { MediaCard } from "../components/MediaCard";
import { useMediaFilter } from "../hooks/useMediaFilter";
import { MediaDeleteModal } from "../components/MediaDeleteModal";
import { MediaManagementModal } from "../components/MediaManagementModal";
import { Pagination } from "../components/Pagination";
import { useTranslation } from "react-i18next";


export function Home() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<"Movies" | "TvShows">("Movies");
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<Movie | TvShow | null>(null);

  const { movies, createMovie, updateMovie, deleteMovie } = useMovies();
  const { tvShows, createTvShow, updateTvShow, deleteTvShow } = useTvShows();
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
  const [isEditing, setIsEditing] = useState(false);

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

  function handleEditClick(media: Movie | TvShow) {
    setSelectedMedia(media);
    setIsEditing(true);
    setMediaManagementModalIsOpen(true);
  }

  async function handleSaveMedia(data: MediaFormData) {
    if (isEditing && selectedMedia) {
      if (selectedType === "Movies") {
        await updateMovie(selectedMedia.id, data);
      } else {
        await updateTvShow(selectedMedia.id, data);
      }
    } else {
      if (selectedType === "Movies") {
        await createMovie(data);
      } else {
        await createTvShow(data);
      }
    }

    setMediaManagementModalIsOpen(false);
    setSelectedMedia(null);
    setIsEditing(false);
  }

  function handleCancel() {
    setMediaManagementModalIsOpen(false);
    setSelectedMedia(null);
    setIsEditing(false);
  }

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.max(1, Math.ceil(filteredMedia.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedMedia = filteredMedia.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    genreFilter,
    selectedType,
  ])

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

      <div className="flex flex-col items-center justify-center p-2 gap-2">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold text-[#2171B5]">{t("home.title")}</h2>
          <p className="text-lg text-[#2171B5]">{t("home.subtitle")}</p>
        </div>
       
        <div className="flex flex-col rounded-3xl bg-gray-50 p-4 shadow-md w-full max-w-7xl mt-1">
          { filteredMedia.length === 0 ? (
             selectedType === "Movies" ? (
              <p className="text-gray-500">{t("home.noMovies")}</p>
            ) : (
              <p className="text-gray-500">{t("home.noTvShows")}</p>
            )
          ) : ( paginatedMedia.map((media) => (
            <MediaCard key={media.id} selectedType={selectedType} media={media} 
            handleDeleteModalOpen={() => {
              setDeleteModalIsOpen(true);
              setSelectedMediaId(media.id);
            }} 
            handleEditClick={() => handleEditClick(media)} />
          )))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <MediaManagementModal
        isOpen={mediaManagementModalIsOpen}
        isEditing={isEditing}
        media={selectedMedia || undefined}
        onClose={handleCancel}
        onSave={handleSaveMedia}
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