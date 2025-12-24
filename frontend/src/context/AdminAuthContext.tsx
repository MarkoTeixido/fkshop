"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth.types";
import { authUtils } from "@/utils/auth.utils";

interface AdminAuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User, redirectPath?: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = () => {
            const storedToken = authUtils.getAdminToken();
            const storedUser = authUtils.getAdminUser();

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(storedUser);
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = (newToken: string, newUser: User, redirectPath: string = "/admin/dashboard") => {
        // Enforce Mutual Exclusion
        authUtils.removeShopToken();

        authUtils.setAdminToken(newToken);
        authUtils.setAdminUser(newUser);

        setToken(newToken);
        setUser(newUser);
        router.push(redirectPath);
    };

    const logout = () => {
        authUtils.removeAdminToken();
        setToken(null);
        setUser(null);
        router.push("/admin/login");
    };

    const isAuthenticated = !!token;

    return (
        <AdminAuthContext.Provider value={{ user, token, isAuthenticated, login, logout, isLoading }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider");
    }
    return context;
}
