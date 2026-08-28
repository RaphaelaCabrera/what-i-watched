import { useEffect, useState } from "react";
import type { Genre } from "../types/media";
import type { MediaFormData } from "../types/mediaForm";
import { getMediaGenre, getMediaStatusList } from "../utils";
import type { Movie } from "../types/movie";
import type { TvShow } from "../types/tvShow";
import { useTranslation } from "react-i18next";

type MediaManagementModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  media?: Movie | TvShow;
  onClose: () => void;
  onSave: (data: MediaFormData) => void;
  selectedType: 'Movies' | 'TvShows';
  genres: Genre[];
};

export function MediaManagementModal({
  isOpen,
  isEditing,
  media,
  onClose,
  onSave,
  selectedType,
  genres
}: MediaManagementModalProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<MediaFormData>({
    title: '',
    status: 'Plan to Watch',
    rate: null,
    genres: [],
    cover_image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (isEditing && media) {
      setFormData({
        title: media.title,
        status: media.status,
        rate: media.rate !== null ? Number(media.rate) : null,

        genres: media.genre_details.map((genre) => genre.id),
        
        cover_image: null,

        ...("duration" in media
          ? {
              duration: media.duration,
              release_year: media.release_year,
            }
          : {}),

        ...("episodes" in media
          ? {
              episodes: media.episodes,
              seasons: media.seasons,
            }
          : {}),
      });

      if (media.cover_image) {
        setImagePreview(
          `${import.meta.env.VITE_API_URL}${media.cover_image}`
        );
      } else {
        setImagePreview(null);
      }
    } else {
      resetForm();
    }
  }, [isEditing, isOpen, media]);

  function resetForm() {
    setFormData({
      title: '',
      status: 'Plan to Watch',
      rate: null,
      genres: [],
      cover_image: null,
    });
    setImagePreview(null);
  }

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
          {isEditing ? t('common.edit') : t('common.add')} {selectedType === 'Movies' ? t('common.movie') : t('common.tvShow')}
        </span>

        <div className="flex flex-row mb-4">
          <div className="flex flex-col mr-4">
            <label className="text-sm font-medium text-[#2171B5] p-2">
              {t("media.title")}
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
                {t("media.status")}
            </label>

            <select
                value={formData.status}
                className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2"
                onChange={(e) => handleChange("status", e.target.value)}
            >
                {getMediaStatusList(t).map(([status, label]) => (
                    <option key={status} value={status}>
                        {label}
                    </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col mr-4">
            <label className="text-sm font-medium text-[#2171B5] p-2">
              {t("media.rating")}
            </label>

            <input
              type="number"
              min="0"
              max="10"
              step={"0.1"}
              className="rounded-md bg-[#c6dbef] text-[#2171B5] p-2
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
                [appearance:textfield]"
              value={formData.rate}
              onChange={(e) => handleChange("rate", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        
        {selectedType === "Movies" ? (
            <div className="flex flex-row mb-1">
                <div className="flex flex-col mr-4">
                    <label className="block mb-1 text-sm font-medium text-[#2171B5] p-2">
                        {t("media.releaseYear")}
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
                        {t("media.duration")} ({t("common.minutes")})
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
                      {t("media.episodes")}
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
                      {t("media.seasons")}
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
                    {t("media.genres")}
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
                          {getMediaGenre(genre.name, t)}
                          </button>
                      );
                      })}
                </div>
            </div>
        </div>

        <div className="flex flex-row mb-1">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-[#2171B5] p-2">
                  {t("media.poster")}
                </label>

                <div className="flex flex-col border rounded-md bg-[#c6dbef] p-3 w-116">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview da capa"
                      className="mt-3 h-40 w-28 rounded-lg object-cover"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-[#2171B5] mt-2"
                  />
                </div>
                
            </div>
        </div>
          
        <div className="mt-6 flex justify-end gap-3 ml-auto">
          <button
            onClick={() => {onClose(); resetForm();}}
            className="rounded-md px-4 py-2 text-[#2171B5] bg-[#c6dbef] hover:bg-[#2171B5] hover:text-white"
          >
            {t("common.cancel")}
          </button>

          <button
            onClick={() => {onSave(formData); resetForm();}}
            className={`rounded-md ${selectedType === 'Movies' ? 'bg-[#ee9f27]' : 'bg-[#3bee00]'} px-4 py-2 text-white hover:bg-[#2171B5]`}
          >
            {t("common.save")}
          </button>
        </div>
      </div>
    </dialog>
  );
}