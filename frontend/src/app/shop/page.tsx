"use client";
import { Suspense } from 'react';
import ShopSidebar from '@/components/shop/ShopSidebar';
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import { useShop } from '@/hooks/useShop';
import ProductGrid from '@/components/shop/ProductGrid';
import ShopPagination from '@/components/shop/ShopPagination';
import MobileFilterModal from '@/components/shop/MobileFilterModal';
import Loader from '@/components/ui/Loader';

function ShopContent() {
    const {
        products,
        pagination,
        loading,
        page,
        handlePageChange,
        filters
    } = useShop();

    return (
        <div className="container-custom pt-24 md:pt-32 pb-12 flex flex-col md:flex-row gap-12">
            {/* Desktop Sidebar */}
            <ShopSidebar
                className="hidden md:flex"
                {...filters}
            />

            {/* Mobile Filter Modal */}
            <MobileFilterModal
                isOpen={filters.isMobileFiltersOpen}
                onClose={() => filters.setIsMobileFiltersOpen(false)}
                filters={filters}
            />

            <div className="flex-1">
                {/* Mobile Search Bar */}
                <div className="md:hidden mb-6 relative">
                    <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={filters.search}
                        onChange={(e) => filters.setSearch(e.target.value)}
                        className="w-full bg-dark-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                    />
                </div>

                {/* Header for Shop Grid */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/5 pb-6 gap-4">
                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <h2 className="text-xl sm:text-3xl font-black text-white italic uppercase">Productos <span className="text-primary text-base sm:text-xl ml-1">({pagination.total || 0})</span></h2>
                        <button
                            onClick={() => filters.setIsMobileFiltersOpen(true)}
                            className="md:hidden flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap"
                        >
                            <FaFilter /> FILTROS
                        </button>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
                        Mostrando <span className="text-white font-bold">{products.length}</span> resultados
                    </div>
                </div>

                <ProductGrid loading={loading} products={products} />

                <ShopPagination
                    page={page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <div className="bg-dark-bg min-h-screen">
            <Suspense fallback={<div className="flex justify-center pt-32"><Loader /></div>}>
                <ShopContent />
            </Suspense>
        </div>
    );
}
