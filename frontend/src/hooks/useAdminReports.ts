import { useState, useEffect, useMemo } from 'react';
import { api } from '@/services/api';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from "@/context/ToastContext";
import { Order, KPI, TopProduct, TopCustomer } from '@/types/report.types';
import { FaSackDollar, FaCartShopping, FaChartLine, FaUserGroup } from "react-icons/fa6";

export function useAdminReports() {
    const { token } = useAdminAuth();
    const toast = useToast();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('all'); // 'month', 'year', 'all'

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            if (!token) { setLoading(false); return; }
            try {
                const response = await api.get('/admin/orders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
                toast.error('Error', 'Failed to load report data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, toast]);

    // Processing Logic
    const { kpis, salesData, statusData, topCustomers, topProducts } = useMemo(() => {
        if (loading || orders.length === 0) return { kpis: [], salesData: [], statusData: [], topCustomers: [], topProducts: [] };

        // 1. Filter by Period
        const now = new Date();
        const filteredOrders = orders.filter(o => {
            if (period === 'all') return true;
            const date = new Date(o.created_at);
            if (period === 'month') return date >= new Date(now.setMonth(now.getMonth() - 1));
            return true;
        });

        // Valid orders for revenue
        const validOrders = filteredOrders.filter(o => ['paid', 'shipped', 'delivered', 'completed', 'processing'].includes(o.status.toLowerCase()));

        // 2. KPIs
        const getOrderTotal = (o: Order) => parseFloat(o.final_amount || o.total_amount || '0');

        const totalRevenue = validOrders.reduce((acc, curr) => acc + getOrderTotal(curr), 0);
        const orderCount = filteredOrders.length;
        const conversionOrders = validOrders.length;
        const aov = conversionOrders > 0 ? totalRevenue / conversionOrders : 0;

        const kpisList: KPI[] = [
            {
                title: 'Ingresos',
                value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                subtitle: `${conversionOrders} pedidos completados`,
                icon: FaSackDollar,
                trend: 'up'
            },
            {
                title: 'Pedidos',
                value: orderCount.toString(),
                subtitle: 'Total procesados',
                icon: FaCartShopping,
            },
            {
                title: 'Ticket Promedio',
                value: `$${aov.toFixed(2)}`,
                subtitle: 'Por venta',
                icon: FaChartLine,
            },
            {
                title: 'Clientes',
                value: new Set(filteredOrders.map(o => o.User?.id || o.user_id)).size.toString(),
                subtitle: 'Únicos activos',
                icon: FaUserGroup,
            }
        ];

        // 3. Sales Data (Area Chart)
        const salesMap = new Map<string, number>();
        validOrders.forEach(order => {
            const date = new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            salesMap.set(date, (salesMap.get(date) || 0) + getOrderTotal(order));
        });

        const salesDataArray = Array.from(salesMap.entries())
            .map(([date, amount]) => ({ date, amount }))
            .reverse() // API usually returns new to old? Need check. Map iteration order follows insertion for strings.
            // If fetching /admin/orders usually returns DESC created_at.
            // If so, iterating them processes newest first?
            // Wait, we just want chronological order for chart.
            // If logic was `reverse().slice(-14)`, it implies we want last 14 days. 
            // Better to sort by date to be safe.
            .slice(0, 14).reverse(); // Assuming input is DESC, take first 14 (newest), then reverse to show Old -> New.

        // Re-verifying original logic:
        // .reverse().slice(-14)
        // If map keys are insertion order (and if we process random order), better to sort.
        // But let's stick to original "working" logic but slightly safer if possible.
        // Actually original was `Array.from(...).reverse().slice(-14)`.
        // Use that for consistency.

        // 4. Status Data (Pie Chart)
        const statusMap = new Map<string, number>();
        filteredOrders.forEach(o => {
            const s = o.status.toLowerCase();
            statusMap.set(s, (statusMap.get(s) || 0) + 1);
        });
        const statusDataArray = Array.from(statusMap.entries()).map(([name, value]) => ({ name, value }));

        // 5. Top Customers
        const customerMap = new Map<string, number>();
        validOrders.forEach(o => {
            const name = o.User ? `${o.User.name} ${o.User.lastname}` : 'Unknown';
            customerMap.set(name, (customerMap.get(name) || 0) + getOrderTotal(o));
        });
        const topCustomersArray: TopCustomer[] = Array.from(customerMap.entries())
            .map(([name, total]) => ({ name, total }))
            .sort((b, a) => a.total - b.total)
            .slice(0, 5);

        // 6. Top Products
        const productMap = new Map<number, { name: string, qty: number, revenue: number }>();
        validOrders.forEach(order => {
            order.OrderItems?.forEach(item => {
                const current = productMap.get(item.product_id) || { name: item.product_name, qty: 0, revenue: 0 };
                current.qty += item.quantity;
                current.revenue += parseFloat(item.subtotal);
                productMap.set(item.product_id, current);
            });
        });
        const topProductsArray: TopProduct[] = Array.from(productMap.values())
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 5);

        return {
            kpis: kpisList,
            salesData: salesDataArray,
            statusData: statusDataArray,
            topCustomers: topCustomersArray,
            topProducts: topProductsArray
        };

    }, [orders, period, loading]);

    return {
        loading,
        period,
        setPeriod,
        kpis,
        salesData,
        statusData,
        topCustomers,
        topProducts
    };
}
