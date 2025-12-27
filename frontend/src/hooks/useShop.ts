import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { productService } from '@/services/product.service';

export function useShop() {
    const { products, pagination, loading, fetchProducts } = useProducts();
    const searchParams = useSearchParams();

    // Filters - Initialize from URL Params to avoid race conditions
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [search, setSearch] = useState(searchParams.get('search') || "");
    const [sort, setSort] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filterNew, setFilterNew] = useState(false);
    const [filterOffers, setFilterOffers] = useState(false);
    const [filterSpecial, setFilterSpecial] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");
    const [categories, setCategories] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            // Only reset page if search changed from what we initialized
            if (search !== (searchParams.get('search') || "")) {
                setPage(1);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [search, searchParams]);

    // Extract categories on load
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await productService.getCategories();
                setCategories(cats.map(c => c.licence_name).sort());
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };

        if (categories.length === 0) {
            loadCategories();
        }
    }, [categories.length]);

    useEffect(() => {
        const params: Record<string, string | number> = {
            page,
            limit: 9
        };
        if (debouncedSearch) params.search = debouncedSearch;
        if (sort) params.sort = sort;
        if (minPrice) params.min = minPrice;
        if (maxPrice) params.max = maxPrice;
        if (filterNew) params.new = 'true';
        if (filterOffers) params.offers = 'true';
        if (filterSpecial) params.special = 'true';
        if (selectedCategory) params.category = selectedCategory;

        fetchProducts(params);
        // Scroll to top on page change
        if (page > 1) window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [fetchProducts, debouncedSearch, sort, minPrice, maxPrice, filterNew, filterOffers, filterSpecial, selectedCategory, page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };

    return {
        products,
        pagination,
        loading,
        page,
        handlePageChange,
        filters: {
            search, setSearch,
            sort, setSort,
            minPrice, setMinPrice,
            maxPrice, setMaxPrice,
            filterNew, setFilterNew,
            filterOffers, setFilterOffers,
            filterSpecial, setFilterSpecial,
            selectedCategory, setSelectedCategory,
            categories,
            isMobileFiltersOpen, setIsMobileFiltersOpen
        }
    };
}
