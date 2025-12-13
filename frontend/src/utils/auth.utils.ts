export const AUTH_TOKEN_KEY = 'funkoshop_token';
export const USER_DATA_KEY = 'funkoshop_user';

export const authUtils = {
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(AUTH_TOKEN_KEY);
    },

    setToken: (token: string) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    },

    removeToken: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    },

    getUser: () => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem(USER_DATA_KEY);
        return user ? JSON.parse(user) : null;
    },

    setUser: (user: any) => { // Type defined in auth.types but using generic here to avoid circular dep if needed, or import User
        if (typeof window === 'undefined') return;
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }
};
