"use client";
import React from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import { FaFilePdf, FaCalendarDays, FaArrowLeft } from "react-icons/fa6";
import Loader from '@/components/ui/Loader';
import { useAdminReports } from '@/hooks/useAdminReports';
import { KPICard } from '@/components/admin/reports/KPICard';
import RevenueChart from '@/components/admin/reports/RevenueChart';
import StatusChart from '@/components/admin/reports/StatusChart';
import TopProductsTable from '@/components/admin/reports/TopProductsTable';
import TopCustomersTable from '@/components/admin/reports/TopCustomersTable';

export default function AdminReports() {
    const {
        loading,
        period,
        setPeriod,
        kpis,
        salesData,
        statusData,
        topCustomers,
        topProducts
    } = useAdminReports();

    // PDF Generator
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setTextColor(20, 20, 20); // Primary Color
        doc.text(`Reporte de Ventas`, 14, 22);
        // We could add more data here if needed, but keeping simple as per original
        doc.save('reporte_funkoshop.pdf');
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <Loader />
        </div>
    );

    return (
        <div className="animate-fade-in-up max-w-[1200px] mx-auto pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Panel</Link>
                        <span>/</span>
                        <span className="text-gray-800">Analíticas</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-xl font-black text-dark-bg tracking-tight">Reportes</h1>
                        <span className="text-gray-400 text-xs font-medium">Resumen de actividad</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Period Selector */}
                    <div className="relative">
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 text-gray-600 py-2 px-3 pr-8 rounded-lg text-xs font-bold focus:outline-none focus:border-gray-300 cursor-pointer transition-all"
                        >
                            <option value="all">Histórico</option>
                            <option value="month">Último Mes</option>
                        </select>
                        <FaCalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                    </div>

                    <button
                        onClick={generatePDF}
                        className="bg-dark-bg text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <FaFilePdf size={12} />
                        <span>Exportar</span>
                    </button>

                    <Link
                        href="/admin/dashboard"
                        className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
                    >
                        <FaArrowLeft size={12} />
                        <span>Volver</span>
                    </Link>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {kpis.map((kpi, i) => <KPICard key={i} kpi={kpi} />)}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Main Revenue Chart */}
                <div className="lg:col-span-2">
                    <RevenueChart data={salesData} />
                </div>

                {/* Status Distribution */}
                <div className="lg:col-span-1">
                    <StatusChart data={statusData} />
                </div>
            </div>

            {/* Bottom Grid: Top Customers & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TopProductsTable products={topProducts} />
                <TopCustomersTable customers={topCustomers} />
            </div>
        </div>
    );
}
