export const SHOP_TOKEN_KEY = 'funkoshop_token';
export const SHOP_USER_KEY = 'funkoshop_user';
export const ADMIN_TOKEN_KEY = 'funkoshop_admin_token';
export const ADMIN_USER_KEY = 'funkoshop_admin_user';

export const authUtils = {
    // SHOP Methods
    getShopToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        const token = localStorage.getItem(SHOP_TOKEN_KEY);
        if (!token || token === 'undefined' || token === 'null') return null;
        return token;
    },

    setShopToken: (token: string) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(SHOP_TOKEN_KEY, token);
    },

    removeShopToken: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(SHOP_TOKEN_KEY);
        localStorage.removeItem(SHOP_USER_KEY);
    },

    getShopUser: () => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem(SHOP_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    setShopUser: (user: any) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(SHOP_USER_KEY, JSON.stringify(user));
    },

    // ADMIN Methods
    getAdminToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        const token = localStorage.getItem(ADMIN_TOKEN_KEY);
        if (!token || token === 'undefined' || token === 'null') return null;
        return token;
    },

    setAdminToken: (token: string) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
    },

    removeAdminToken: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_USER_KEY);
    },

    getAdminUser: () => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem(ADMIN_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    setAdminUser: (user: any) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    },

    // Backward compatibility shim (Deprecated - prefer specific methods)
    getToken: (): string | null => {
        // Default to Shop for legacy calls, or warn
        return authUtils.getShopToken();
    },
    setToken: (token: string) => {
        authUtils.setShopToken(token);
    },
    removeToken: () => {
        authUtils.removeShopToken();
    },
    getUser: () => {
        return authUtils.getShopUser();
    },
    setUser: (user: any) => {
        authUtils.setShopUser(user);
    }
};
