export const ORDER_STATUS_LABELS: Record<string, string> = {
    pending: "Pendiente de Pago",
    paid: "Pagado",
    processing: "Preparando",
    shipped: "Enviado",
    delivered: "Entregado",
    completed: "Completado",
    cancelled: "Cancelado"
};

export const getStatusLabel = (status: string) => {
    return ORDER_STATUS_LABELS[status.toLowerCase()] || status;
};

export const getShopStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
        case 'paid': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'shipped': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        case 'delivered': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};

export const formatCurrency = (amount: number | string) => {
    const val = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(val);
};
