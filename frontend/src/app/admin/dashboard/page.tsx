"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaBox, FaTriangleExclamation, FaMoneyBillWave } from "react-icons/fa6";
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import SearchInput from '@/components/ui/SearchInput';
import ProductTable from '@/components/admin/ProductTable';
import Loader from '@/components/ui/Loader';
import StatCard from '@/components/admin/StatCard';

export default function AdminDashboard() {
    const { products, loading, error, deleteProduct } = useAdminDashboard();
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate Stats
    const totalProducts = products.length;
    const lowStockItems = products.filter(p => p.stock < 10).length;
    const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * p.stock), 0);

    const filteredProducts = products.filter(p => {
        const lowerTerm = searchTerm.toLowerCase();
        return (
            p.product_name.toLowerCase().includes(lowerTerm) ||
            p.sku.toLowerCase().includes(lowerTerm) ||
            (p as any).Category?.category_name?.toLowerCase().includes(lowerTerm)
        );
    });

    if (loading) return <div className="flex justify-center items-center h-[60vh]"><Loader /></div>;

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                        <span>Home</span>
                        <span>/</span>
                    </div>
                    <h1 className="text-2xl font-black text-dark-bg tracking-tight">Product Inventory</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your stores catalog, stock levels, and pricing.</p>
                </div>
                <Link href="/admin/products/create" className="bg-primary hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-primary/25 hover:shadow-rose-600/30 transition-all flex items-center gap-2 group text-sm">
                    <FaPlus className="group-hover:rotate-90 transition-transform" />
                    <span>Add New Product</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    icon={FaBox}
                    trend="up"
                    trendValue="+12 this week"
                />
                <StatCard
                    title="Low Stock Items"
                    value={lowStockItems}
                    icon={FaTriangleExclamation}
                    trend={lowStockItems > 0 ? "down" : "neutral"}
                    trendValue="Requires attention"
                    alert={lowStockItems > 0}
                />
                <StatCard
                    title="Total Inventory Value"
                    value={`$${totalValue.toLocaleString()}`}
                    icon={FaMoneyBillWave}
                    subtext="Updated just now"
                />
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="w-full md:w-1/2 text-black">
                        <SearchInput onSearch={setSearchTerm} placeholder="Search by SKU, Name, or Series..." />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 text-xs">
                            Filtrar
                        </button>
                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 text-xs">
                            Sort: Newest
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {error && (
                    <div className="bg-rose-50 text-rose-600 p-3 font-medium text-center text-sm">
                        {error}
                    </div>
                )}
                {/* We pass the filtered products to the existing table component, assuming it renders rows */}
                {/* Note: Ideally we refactor ProductTable to match the new UI style as well, but for now we wrap it */}
                <div className="p-4 text-black">
                    <ProductTable products={filteredProducts} onDelete={deleteProduct} />
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                    <span>Showing 1-{filteredProducts.length} of {totalProducts} products</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">Previous</button>
                        <button className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
