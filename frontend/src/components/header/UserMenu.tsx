"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser, FaChevronDown } from "react-icons/fa6";

interface UserMenuProps {
    user: any;
    logout: () => void;
}

export default function UserMenu({ user, logout }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative hidden lg:block" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
                <FaUser size={20} />
                <span className="hidden sm:inline text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                <FaChevronDown size={10} className="hidden sm:block" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-4 w-48 bg-[#141414] border border-white/10 rounded-lg shadow-xl overflow-hidden py-2"
                    >
                        <Link href="/shop/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Mi Perfil</Link>
                        <Link href="/shop/wishlist" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Lista de Deseos</Link>
                        <Link href="/shop/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">Mis Pedidos</Link>
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-white/5"
                        >
                            Cerrar Sesión
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
