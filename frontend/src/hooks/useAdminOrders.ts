import { useState, useEffect, useMemo } from 'react';
import { api } from '@/services/api';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from "@/context/ToastContext";

export interface OrderItem {
    order_item_id: number;
    product_id: number;
    product_name: string;
    product_sku: string;
    quantity: number;
    unit_price: string;
    subtotal: string;
}

export interface Order {
    order_id: number;
    user_id: number;
    order_number: string;
    total_amount: string;
    final_amount: string;
    status: string;
    payment_method: string;
    created_at: string;
    shipping_street: string;
    shipping_city: string;
    shipping_state: string;
    shipping_country: string;
    shipping_postal_code: string;
    User: {
        name: string;
        lastname: string;
        email: string;
    };
    OrderItems: OrderItem[];
}

export function useAdminOrders() {
    const { token } = useAdminAuth();
    const toast = useToast();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 15;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get('/admin/orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                toast.error('Error', 'Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token, toast]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus, searchTerm]);

    const deleteOrder = async (orderId: number) => {
        try {
            await api.delete(`/admin/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(prev => prev.filter(o => o.order_id !== orderId));
            if (selectedOrder?.order_id === orderId) setSelectedOrder(null);
            toast.success('Éxito', 'Pedido eliminado correctamente.');
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Error', 'No se pudo eliminar el pedido.');
        }
    };

    const updateOrderStatus = async (orderId: number, newStatus: string) => {
        try {
            await api.put(`/admin/orders/${orderId}/status`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder?.order_id === orderId) {
                setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
            }
            toast.success('Éxito', 'Estado actualizado correctamente.');
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error', 'No se pudo actualizar el estado.');
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
            const customerName = `${order.User?.name || ''} ${order.User?.lastname || ''}`.trim();
            const matchesSearch = customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.order_id.toString().includes(searchTerm) ||
                order.order_number?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [orders, filterStatus, searchTerm]);

    const paginatedOrders = useMemo(() => {
        return filteredOrders.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
    }, [filteredOrders, currentPage]);

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

    return {
        orders: paginatedOrders,
        loading,
        filterStatus,
        setFilterStatus,
        searchTerm,
        setSearchTerm,
        selectedOrder,
        setSelectedOrder,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems: filteredOrders.length,
        itemsPerPage: ITEMS_PER_PAGE,
        deleteOrder,
        updateOrderStatus
    };
}
