import { useState, useRef, useEffect, useMemo } from 'react';
import { Product } from '@/types/product.types';

const ITEMS_PER_PAGE = 15;

export function useDashboardLogic(products: Product[]) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter & Sort States
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("newest"); // newest, oldest, price-asc, price-desc, stock-asc, stock-desc
    const [currentPage, setCurrentPage] = useState(1);

    // Refs for click outside
    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handlers that reset page
    const handleSetSearchTerm = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleSetSelectedCategory = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    const handleSetSortOption = (opt: string) => {
        setSortOption(opt);
        setCurrentPage(1);
    };

    // Data Processing
    const { processedProducts, totalPages, paginatedProducts, uniqueCategories, newProductsCount, lowStockItems, totalValue } = useMemo(() => {
        if (!products) return { processedProducts: [], totalPages: 0, paginatedProducts: [], uniqueCategories: [], newProductsCount: 0, lowStockItems: 0, totalValue: 0 };

        // 1. Calculate Stats
        const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * p.stock), 0);
        const lowStockItems = products.filter(p => p.stock < 5).length;

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newProductsCount = products.filter(p => {
            if (!p.created_at) return false;
            return new Date(p.created_at) > oneWeekAgo;
        }).length;

        // 2. Extract Categories
        const categories = Array.from(new Set(products.map(p => p.Category?.category_name || p.category_name).filter(Boolean))) as string[];

        // 3. Filter
        const result = products.filter(p => {
            const lowerTerm = searchTerm.toLowerCase();
            const categoryName = p.Category?.category_name || p.category_name;

            const matchesSearch = (
                p.product_name.toLowerCase().includes(lowerTerm) ||
                p.sku.toLowerCase().includes(lowerTerm) ||
                categoryName?.toLowerCase().includes(lowerTerm)
            );

            const matchesCategory = selectedCategory === "all" || categoryName === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        // 4. Sort
        result.sort((a, b) => {
            switch (sortOption) {
                case 'newest':
                    return b.product_id - a.product_id;
                case 'oldest':
                    return a.product_id - b.product_id;
                case 'price-asc':
                    return Number(a.price) - Number(b.price);
                case 'price-desc':
                    return Number(b.price) - Number(a.price);
                case 'stock-asc':
                    return a.stock - b.stock;
                case 'stock-desc':
                    return b.stock - a.stock;
                default:
                    return 0;
            }
        });

        // 5. Pagination
        const total = Math.ceil(result.length / ITEMS_PER_PAGE);
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const sliced = result.slice(start, start + ITEMS_PER_PAGE);

        return {
            processedProducts: result,
            totalPages: total,
            paginatedProducts: sliced,
            uniqueCategories: categories,
            newProductsCount,
            lowStockItems,
            totalValue
        };
    }, [products, searchTerm, selectedCategory, sortOption, currentPage]);

    return {
        filterState: {
            searchTerm, setSearchTerm: handleSetSearchTerm,
            filterOpen, setFilterOpen,
            sortOpen, setSortOpen,
            selectedCategory, setSelectedCategory: handleSetSelectedCategory,
            sortOption, setSortOption: handleSetSortOption,
            currentPage, setCurrentPage,
            filterRef, sortRef
        },
        stats: {
            totalProducts: products.length,
            newProductsCount,
            lowStockItems,
            totalValue,
            uniqueCategories,
            totalPages,
            processedProducts,
            paginatedProducts
        }
    };
}
