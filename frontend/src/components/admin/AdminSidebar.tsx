"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaLayerGroup, FaBox, FaCartShopping, FaChartLine, FaUsers, FaGear, FaArrowRightFromBracket, FaRegBell } from "react-icons/fa6";
import { useAdminAuth } from '@/context/AdminAuthContext';

const menuItems = [
    { name: 'Dashboard', icon: FaLayerGroup, path: '/admin/dashboard' },
    { name: 'Orders', icon: FaCartShopping, path: '/admin/orders' },
    { name: 'Reports', icon: FaChartLine, path: '/admin/reports' },
    { name: 'Settings', icon: FaGear, path: '/admin/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAdminAuth();

    return (
        <aside className="w-64 bg-[#1E1E1E] border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300">
            {/* Logo Area */}
            {/* Logo Area */}
            <div className="p-6 border-b border-white/5 flex flex-col items-center justify-center">
                <Link href="/admin/dashboard" className="flex flex-col items-center group">
                    <div className="relative h-10 w-40 mb-2">
                        <Image
                            src="https://res.cloudinary.com/dp7jr9k94/image/upload/v1765590926/logo_light_horizontal_cz3q8t.svg"
                            alt="Funkoshop Admin"
                            fill
                            className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            priority
                        />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-primary transition-colors duration-300">
                        Admin Panel
                    </span>
                </Link>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                ? 'bg-gradient-to-r from-primary to-rose-600 text-white shadow-lg shadow-primary/25 font-bold'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className={`text-lg transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="relative z-10">{item.name}</span>
                            {item.name === 'Orders' && (
                                <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/20">
                                    12
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 mt-auto border-t border-white/5 space-y-2">
                {/* Notification Bell */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-left text-gray-400 hover:text-white group">
                    <div className="w-10 h-10 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center relative group-hover:border-primary/50 transition-colors">
                        <FaRegBell size={18} />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#1E1E1E]"></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">Notifications</span>
                        <span className="text-xs text-rose-500 font-medium">3 New</span>
                    </div>
                </button>

                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-left group"
                >
                    <div className="w-10 h-10 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-rose-500 group-hover:border-rose-500/50 transition-colors">
                        <FaArrowRightFromBracket size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-rose-500 transition-colors">Cerrar Sesión</span>
                        <span className="text-xs text-gray-500">Admin User</span>
                    </div>
                </button>
            </div>
        </aside>
    );
}
