import StatCard from '@/components/admin/StatCard';
import { FaBox, FaTriangleExclamation, FaMoneyBillWave } from "react-icons/fa6";

interface DashboardStatsProps {
    totalProducts: number;
    newProductsCount: number;
    lowStockItems: number;
    totalValue: number;
}

export default function DashboardStats({ totalProducts, newProductsCount, lowStockItems, totalValue }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard
                title="Productos Totales"
                value={totalProducts}
                icon={FaBox}
                trend="up"
                trendValue={newProductsCount > 0 ? `+${newProductsCount} esta semana` : "Sin cambios"}
                variant="blue"
            />
            <StatCard
                title="Bajo Stock"
                value={lowStockItems}
                icon={FaTriangleExclamation}
                trend={lowStockItems > 0 ? "down" : "neutral"}
                trendValue={lowStockItems > 0 ? "Requiere atención" : "Stock saludable"}
                alert={lowStockItems > 0}
                variant={lowStockItems > 0 ? "rose" : "amber"}
            />
            <StatCard
                title="Valor Total del Inventario"
                value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                icon={FaMoneyBillWave}
                subtext="Actualizado en tiempo real"
                variant="emerald"
            />
        </div>
    );
}
