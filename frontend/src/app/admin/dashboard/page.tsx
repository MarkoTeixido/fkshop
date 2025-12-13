"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus } from "react-icons/fa6";
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import SearchInput from '@/components/ui/SearchInput';
import ProductTable from '@/components/admin/ProductTable';
import Loader from '@/components/ui/Loader';

export default function AdminDashboard() {
    const { products, loading, error, deleteProduct } = useAdminDashboard();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter(p => {
        const lowerTerm = searchTerm.toLowerCase();
        return (
            p.product_name.toLowerCase().includes(lowerTerm) ||
            p.sku.toLowerCase().includes(lowerTerm) ||
            // Handle optional category name safely
            (p as any).Category?.category_name?.toLowerCase().includes(lowerTerm)
        );
    });

    if (loading) return <Loader />;

    return (
        <div className="text-dark">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}

            {/* Search */}
            <div className="mb-[4rem] max-w-[600px]">
                <SearchInput onSearch={setSearchTerm} placeholder="código, nombre o categoria" />
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[2rem] gap-4">
                <h1 className="text-[3.2rem] font-bold uppercase text-dark">LISTADO DE PRODUCTOS</h1>
                <div className="flex items-center gap-4 pr-4">
                    <span className="text-[1.8rem] font-bold text-primary uppercase">AGREGAR</span>
                    <Link href="/admin/products/create" className="bg-primary text-white p-3 rounded-[10px] hover:bg-primary-900 transition-colors">
                        <FaPlus size={24} />
                    </Link>
                </div>
            </div>

            {/* Table */}
            <ProductTable products={filteredProducts} onDelete={deleteProduct} />
        </div>
    );
}
