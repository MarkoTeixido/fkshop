import React from 'react';
import SearchInput from '@/components/ui/SearchInput';

interface ShopSidebarProps {
    search: string;
    setSearch: (value: string) => void;
    sort: string;
    setSort: (value: string) => void;
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
    filterNew: boolean;
    setFilterNew: (value: boolean) => void;
    filterOffers: boolean;
    setFilterOffers: (value: boolean) => void;
    filterSpecial: boolean;
    setFilterSpecial: (value: boolean) => void;
}

export default function ShopSidebar({
    search, setSearch,
    sort, setSort,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    filterNew, setFilterNew,
    filterOffers, setFilterOffers,
    filterSpecial, setFilterSpecial
}: ShopSidebarProps) {
    return (
        <aside className="w-full md:w-[250px] shrink-0 space-y-[4rem]">
            {/* Search */}
            <div className="space-y-[1.2rem]">
                <label className="text-[1.8rem] font-medium block" htmlFor="search">BUSCAR</label>
                {/* Reusing SearchInput might need adaptation as it filters internally vs parent state */}
                {/* For this specific Sidebar logic where parent controls everything: */}
                <div className="relative">
                    <input
                        className="w-full border-2 border-primary rounded-[50px] px-[1.6rem] py-[0.8rem] text-[1.6rem] placeholder:text-gray-400 focus:outline-none"
                        type="text"
                        name="buscar"
                        placeholder="item o categoria"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    // onKeyDown dealt with by debounce usually or external
                    />
                </div>
            </div>

            {/* Order */}
            <div className="space-y-[1.2rem]">
                <label className="text-[1.8rem] font-medium block" htmlFor="order">ORDENAR POR</label>
                <select
                    className="w-full border-2 border-primary rounded-[50px] px-[1.6rem] py-[0.8rem] text-[1.6rem] bg-white focus:outline-none cursor-pointer"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Defecto</option>
                    <option value="price-ascending">Menor Precio</option>
                    <option value="price-descending">Mayor Precio</option>
                    <option value="alpha-ascending">A-Z</option>
                    <option value="alpha-descending">Z-A</option>
                </select>
            </div>

            {/* Price */}
            <div className="space-y-[1.2rem]">
                <label className="text-[1.8rem] font-medium block" htmlFor="price">PRECIO</label>
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[1.4rem]">MIN</span>
                        <input
                            className="w-[7rem] border border-gray-300 rounded px-2 py-1 text-[1.4rem]"
                            type="number"
                            placeholder="0"
                            min="0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <span className="text-[1.4rem]">-</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[1.4rem]">MAX</span>
                        <input
                            className="w-[7rem] border border-gray-300 rounded px-2 py-1 text-[1.4rem]"
                            type="number"
                            placeholder="0"
                            min="0"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="space-y-[1.2rem]">
                <label className="text-[1.8rem] font-medium block" htmlFor="filter">FILTRAR</label>
                <div className="space-y-[0.8rem]">
                    <div className="flex items-center gap-[0.8rem]">
                        <input
                            type="checkbox"
                            className="w-[1.8rem] h-[1.8rem] accent-primary cursor-pointer"
                            checked={filterNew}
                            onChange={(e) => setFilterNew(e.target.checked)}
                        />
                        <label className="text-[1.6rem]">NUEVOS</label>
                    </div>
                    <div className="flex items-center gap-[0.8rem]">
                        <input
                            type="checkbox"
                            className="w-[1.8rem] h-[1.8rem] accent-primary cursor-pointer"
                            checked={filterOffers}
                            onChange={(e) => setFilterOffers(e.target.checked)}
                        />
                        <label className="text-[1.6rem]">OFERTAS</label>
                    </div>
                    <div className="flex items-center gap-[0.8rem]">
                        <input
                            type="checkbox"
                            className="w-[1.8rem] h-[1.8rem] accent-primary cursor-pointer"
                            checked={filterSpecial}
                            onChange={(e) => setFilterSpecial(e.target.checked)}
                        />
                        <label className="text-[1.6rem]">EDICIÓN ESPECIAL</label>
                    </div>
                </div>
            </div>
        </aside>
    );
}
