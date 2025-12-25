import { api } from './api';

export const wishlistService = {
    // Get all wishlist items (populated with product data)
    getWishlist: async () => {
        const response = await api.get('/wishlist');
        return response.data;
    },

    // Get only array of product IDs (lightweight check for heart icons)
    getWishlistIds: async () => {
        const response = await api.get<number[]>('/wishlist/ids');
        return response.data;
    },

    addToWishlist: async (productId: number) => {
        const response = await api.post('/wishlist/add', { product_id: productId });
        return response.data;
    },

    removeFromWishlist: async (productId: number) => {
        const response = await api.delete(`/wishlist/${productId}`);
        return response.data;
    }
};
