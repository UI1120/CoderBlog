import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-12 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 mx-auto w-fit">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors"
                aria-label="前へ"
            >
                <ChevronLeft className="h-4 w-4" />
                前へ
            </button>

            <div className="text-sm font-medium text-gray-700 bg-gray-100 px-4 py-1.5 rounded-full">
                {currentPage} <span className="text-gray-400 mx-1">/</span> {totalPages}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors"
                aria-label="次へ"
            >
                次へ
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
