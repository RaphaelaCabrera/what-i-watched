import { CirclePlus } from "lucide-react";
import { useTranslation } from "react-i18next";

type AddButtonProps = {
    selectedType: 'Movies' | 'TvShows';
    onClick: () => void;
};

export function AddButton({ selectedType, onClick }: AddButtonProps) {
    const { t } = useTranslation();

    return (
        <button className={`${ selectedType === 'Movies' ? 'bg-[#ee9f27]' : 'bg-[#3bee00]'} text-white font-semibold p-2 rounded-lg`} onClick={onClick}>
            <CirclePlus className="inline-block mr-1" />
            {t('topBar.add')} {selectedType === "Movies" ? t('common.movie') : t('common.tvShow')}
        </button>
    );
}