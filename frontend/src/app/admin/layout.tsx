"use client";
import React from 'react';
import { useAdminAuth, AdminAuthProvider } from '@/context/AdminAuthContext';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAdminAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Protect Admin Routes
    React.useEffect(() => {
        if (isLoading) return;

        if (pathname === '/admin/login') {
            if (user && user.role === 'admin') router.push('/admin/dashboard');
            return;
        }

        if (!user || user.role !== 'admin') {
            router.push('/admin/login');
        }
    }, [user, isLoading, router, pathname]);

    if (pathname === '/admin/login') return <>{children}</>;

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="flex min-h-screen bg-[#F3F4F6]">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-8 min-h-screen">
                <div className="max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminAuthProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminAuthProvider>
    );
}
