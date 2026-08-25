import { useState } from "react";
import type { Genre } from "../types/media";
import type { Movie } from "../types/movie";
import type { TvShow } from "../types/tvShow";
import { getMediaStatusList } from "../utils";

type MediaFormData = {
  title: string;
  status: string;
  rate: number;
  genres: number[];
  cover_image: File | null;

  duration?: number;
  release_year?: number;

  episodes?: number;
  seasons?: number;
};

type MediaManagementModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: (data: MediaFormData) => void;
  selectedType: 'Movies' | 'TvShows';
  media?: Movie | TvShow;
  genres: Genre[];
};

export function MediaManagementModal({
  isOpen,
  isEditing,
  onClose,
  onSave,
  selectedType,
  media,
  genres
}: MediaManagementModalProps) {
  const [formData, setFormData] = useState<MediaFormData>({
    title: '',
    status: 'Plan to Watch',
    rate: null,
    genres: [],
    cover_image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) {
    return null;
 }

  function handleChange<K extends keyof MediaFormData>(
    field: K,
    value: MediaFormData[K]
    ) {
    setFormData((prev) => ({
        ...prev,
        [field]: value,
    }));
  }

  function handleGenreChange(genreId: number) {
    setFormData((prev) => {
        const alreadySelected = prev.genres.includes(genreId);

        return {
        ...prev,
        genres: alreadySelected
            ? prev.genres.filter((id) => id !== genreId)
            : [...prev.genres, genreId],
        };
    });
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    handleChange("cover_image", file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-black/50"
    >
      <div className="w-auto rounded-xl bg-white p-6 shadow-xl">
        <span className="mb-1 text-xl text-[#2171B5]">
          {isEditing ? 'Editar' : 'Adicionar'} {selectedType === 'Movies' ? ' Filme' : ' Série'}
        </span>

        <div className="flex flex-row mb-4">
          <div className="flex flex-col mr-4">
            <label className="text-sm font-medium text-[#2171B5] p-2">
                Título
            </label>

            <input
                type="text"
                className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          
          <div className="flex flex-col mr-4">
            <label className="text-sm font-medium text-[#2171B5] p-2">
                Status
            </label>

            <select
                value={formData.status}
                className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                onChange={(e) => handleChange("status", e.target.value)}
            >
                {getMediaStatusList().map(([status, label]) => (
                    <option key={status} value={status}>
                        {label}
                    </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col mr-4">
            <label className="text-sm font-medium text-[#2171B5] p-2">
                Nota
            </label>

            <input
                type="number"
                min="0"
                max="10"
                step={"0.1"}
                className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                value={formData.rate}
                onChange={(e) => handleChange("rate", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        
        {selectedType === "Movies" ? (
            <div className="flex flex-row mb-1">
                <div className="flex flex-col mr-4">
                    <label className="block mb-1 text-sm font-medium text-[#2171B5] p-2">
                        Ano de lançamento
                    </label>

                    <input
                        type="text"
                        className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                        value={formData.release_year}
                        onChange={(e) => handleChange("release_year", e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>

                 <div className="flex flex-col mr-4 ml-auto">
                    <label className="block mb-1 text-sm font-medium text-[#2171B5] p-2">
                        Duração (em minutos)
                    </label>

                    <input
                        type="text"
                        className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                        value={formData.duration}
                        onChange={(e) => handleChange("duration", e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>
            </div>
            
        ) : (
            <div className="flex flex-row mb-1">
                <div className="flex flex-col mr-4">
                    <label className=" text-sm font-medium text-[#2171B5] p-2">
                        Episódios
                    </label>

                    <input
                        type="number"
                        className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                        value={formData.episodes}
                        onChange={(e) => handleChange("episodes", e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>

                <div className="flex flex-col mr-4">
                    <label className="text-sm font-medium text-[#2171B5] p-2">
                        Temporadas
                    </label>

                    <input
                        type="number"
                        className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                        value={formData.seasons}
                        onChange={(e) => handleChange("seasons", e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>
            </div>
        )}

        <div className="flex flex-row mb-1">
            <div className="flex flex-col w-116">
                <label className="text-sm font-medium text-[#2171B5] p-2">
                    Gêneros
                </label>

                <div className="flex flex-wrap gap-2 rounded-md bg-[#c6dbef] p-3">
                    {genres.map((genre) => {
                    const selected = formData.genres.includes(genre.id);

                    return (
                        <button
                        key={genre.id}
                        type="button"
                        onClick={() => handleGenreChange(genre.id)}
                        className={`rounded-full px-3 py-1 text-sm transition ${
                            selected
                            ? "bg-[#2171B5] text-white"
                            : "bg-white text-[#2171B5] hover:bg-gray-100"
                        }`}
                        >
                        {genre.name}
                        </button>
                    );
                    })}
                </div>
            </div>
        </div>

        <div className="flex flex-row mb-1">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-[#2171B5] p-2">
                  Capa
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm"
                />

                {imagePreview && (
                  <img
                  src={imagePreview}
                  alt="Preview da capa"
                  className="mt-3 h-40 w-28 rounded-lg object-cover"
                  />
                )}
            </div>
        </div>
          
        <div className="mt-6 flex justify-end gap-3 ml-auto">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-[#2171B5] bg-[#c6dbef] hover:bg-[#2171B5] hover:text-white"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(formData)}
            className={`rounded-md ${selectedType === 'Movies' ? 'bg-[#ee9f27]' : 'bg-[#3bee00]'} px-4 py-2 text-white hover:bg-[#2171B5]`}
          >
            Salvar
          </button>
        </div>
      </div>
    </dialog>
  );
}