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
        id?: number;
        name: string;
        lastname: string;
        email: string;
    };
    OrderItems?: OrderItem[];
}

export interface KPI {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ElementType;
    trend?: string;
}

export interface ChartData {
    name: string; // or date
    value?: number;
    amount?: number;
    [key: string]: any;
}

export interface TopProduct {
    name: string;
    qty: number;
    revenue: number;
}

export interface TopCustomer {
    name: string;
    total: number;
}
