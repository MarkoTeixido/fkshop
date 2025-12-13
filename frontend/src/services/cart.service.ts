import { api } from './api';

export const cartService = {
    addToCart: async (productId: number, quantity: number = 1) => {
        const response = await api.post('/shop/cart', { product_id: productId, quantity });
        return response; // Data is returned directly per interceptor
    },

    getCart: async () => {
        const response = await api.get('/shop/cart');
        return response.data;
    },

    removeItem: async (productId: number) => {
        await api.delete(`/shop/cart/${productId}`);
    },

    updateItem: async (productId: number, quantity: number) => {
        const response = await api.put(`/shop/cart/${productId}`, { quantity });
        return response;
    },

    checkout: async (data: any) => {
        const response = await api.post('/shop/checkout', data);
        return response;
    },

    // Additional methods as needed (update quantity, etc)
};
