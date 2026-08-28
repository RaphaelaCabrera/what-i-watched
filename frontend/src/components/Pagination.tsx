import { useTranslation } from "react-i18next";


type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};


export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center gap-3">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-md bg-[#2171B5] px-4 py-1 text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
                {t('common.previous')}
            </button>

            <span className="text-[#2171B5]">
                {t('pagination.page', { current: currentPage, total: totalPages })}
            </span>

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-md bg-[#2171B5] px-4 py-1 text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
                {t('common.next')}
            </button>
        </div>
    );
}