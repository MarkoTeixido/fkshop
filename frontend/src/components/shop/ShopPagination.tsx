import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface ShopPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function ShopPagination({ page, totalPages, onPageChange }: ShopPaginationProps) {
    if (totalPages === 0) return null;

    return (
        <div className="flex justify-center items-center gap-4 py-8">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-surface border border-white/10 text-white hover:bg-primary hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaAngleLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${page === p
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-dark-surface border border-white/10 text-white hover:bg-white/10"
                        }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-surface border border-white/10 text-white hover:bg-primary hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaAngleRight />
            </button>
        </div>
    );
}
