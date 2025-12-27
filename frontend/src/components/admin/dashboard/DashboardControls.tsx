import { FaFilter, FaChevronDown, FaSort } from "react-icons/fa6";
import SearchInput from '@/components/ui/SearchInput';
import { RefObject } from "react";

interface DashboardControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterOpen: boolean;
    setFilterOpen: (open: boolean) => void;
    sortOpen: boolean;
    setSortOpen: (open: boolean) => void;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    sortOption: string;
    setSortOption: (opt: string) => void;
    uniqueCategories: unknown[];
    filterRef: RefObject<HTMLDivElement | null>;
    sortRef: RefObject<HTMLDivElement | null>;
}

export default function DashboardControls({
    setSearchTerm,
    filterOpen,
    setFilterOpen,
    sortOpen,
    setSortOpen,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    uniqueCategories,
    filterRef,
    sortRef
}: DashboardControlsProps) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="w-full md:w-1/2 text-black">
                    <SearchInput onSearch={setSearchTerm} placeholder="Buscar por SKU, Nombre o Serie..." />
                </div>
                <div className="flex gap-2">
                    {/* Filter Dropdown */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all
                            ${filterOpen || selectedCategory !== 'all' ? 'bg-gray-100 border-gray-300 text-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                            <FaFilter />
                            <span>{selectedCategory === 'all' ? 'Filtrar' : selectedCategory}</span>
                            <FaChevronDown size={10} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {filterOpen && (
                            <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                <h6 className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Categoría</h6>
                                <button
                                    onClick={() => { setSelectedCategory("all"); setFilterOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedCategory === 'all' ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Todas
                                </button>
                                {uniqueCategories.map((cat: any) => (
                                    <button
                                        key={cat as string}
                                        onClick={() => { setSelectedCategory(cat as string); setFilterOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${selectedCategory === cat ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {cat as string}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all
                            ${sortOpen ? 'bg-gray-100 border-gray-300 text-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                            <FaSort />
                            <span>Ordenar</span>
                        </button>

                        {sortOpen && (
                            <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                                <div className="space-y-1">
                                    {[
                                        { label: 'Más Recientes', value: 'newest' },
                                        { label: 'Más Antiguos', value: 'oldest' },
                                        { label: 'Precio: Bajo a Alto', value: 'price-asc' },
                                        { label: 'Precio: Alto a Bajo', value: 'price-desc' },
                                        { label: 'Stock: Bajo a Alto', value: 'stock-asc' },
                                        { label: 'Stock: Alto a Bajo', value: 'stock-desc' },
                                    ].map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortOption(opt.value); setSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortOption === opt.value ? 'bg-primary/5 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
