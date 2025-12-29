"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaRegBell, FaCartShopping } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
    isAdmin?: boolean;
    notificationCount?: number;
}

export default function Header({ isAdmin = false, notificationCount = 0 }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = isAdmin ? [
        { name: "PRODUCTOS", href: "/admin/dashboard" },
        { name: "ACTIVIDAD", href: "/admin/activity" },
        { name: "REPORTES", href: "/admin/reports" },
    ] : [
        { name: "SHOP", href: "/shop" },
        { name: "CONTACTO", href: "/shop/contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-[#141414] border-white/10 shadow-lg py-3"
                    : "bg-transparent border-transparent py-5"
            )}
        >
            <nav className="container-custom flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="relative z-50">
                    <Image
                        src="https://res.cloudinary.com/dp7jr9k94/image/upload/v1765590926/logo_light_horizontal_cz3q8t.svg"
                        alt="Funkoshop Logo"
                        width={180}
                        height={45}
                        className="w-32 md:w-44 h-auto object-contain hover:opacity-90 transition-opacity"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <Navbar navLinks={navLinks} />

                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                    {/* Actions */}
                    <div className="flex items-center gap-4 lg:gap-6 lg:border-l lg:border-white/10 lg:pl-6">
                        {isAdmin && (
                            <button className="relative text-white hover:text-primary transition-colors">
                                <FaRegBell size={20} />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] size-4 flex items-center justify-center rounded-full font-bold">
                                        {notificationCount}
                                    </span>
                                )}
                            </button>
                        )}

                        {!isAdmin && (
                            <Link href="/shop/cart" className="text-white hover:text-primary transition-colors relative group" aria-label="Ver carrito de compras">
                                <FaCartShopping size={20} />
                            </Link>
                        )}

                        {user ? (
                            <>
                                {/* Mobile: Direct Link to Profile */}
                                <Link href="/shop/profile" className="lg:hidden text-white hover:text-primary transition-colors" aria-label="Ver perfil">
                                    <FaUser size={20} />
                                </Link>

                                {/* Desktop: Dropdown Menu */}
                                <UserMenu user={user} logout={logout} />
                            </>
                        ) : (
                            <Link
                                href="/shop/login"
                                className="bg-primary hover:bg-primary-hover text-white text-xs font-bold p-2 lg:px-5 lg:py-2.5 rounded-full transition-all transform hover:scale-105 whitespace-nowrap flex items-center justify-center h-9 w-9 sm:w-auto sm:h-auto"
                                aria-label="Iniciar sesión"
                            >
                                <span className="hidden sm:inline">INICIAR SESIÓN</span>
                                <span className="sm:hidden"><FaUser size={14} /></span>
                            </Link>
                        )}
                    </div>

                    <MobileMenu
                        isOpen={isMobileMenuOpen}
                        setIsOpen={setIsMobileMenuOpen}
                        navLinks={navLinks}
                        user={user}
                        isAdmin={isAdmin}
                        logout={logout}
                    />
                </div>
            </nav>
        </header>
    );
}
