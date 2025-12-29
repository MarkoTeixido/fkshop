"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark, FaBars } from "react-icons/fa6";
import { useEffect } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    navLinks: { name: string; href: string }[];
    user: any;
    isAdmin: boolean;
    logout: () => void;
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks, user, isAdmin, logout }: MobileMenuProps) {

    // Lock Body Scroll
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    const mobileMenuVariants = {
        closed: { opacity: 0, x: "100%" },
        open: { opacity: 1, x: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <>
            {/* Mobile Toggle Button (Visible only on mobile) */}
            <button
                className="lg:hidden text-white z-50 p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
                {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
            </button>


            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-dark-bg z-40 flex flex-col items-center justify-center lg:hidden"
                    >
                        <ul className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <motion.li key={link.name} variants={itemVariants}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-bold text-white hover:text-primary tracking-wider"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}

                            {user && !isAdmin && (
                                <>
                                    <motion.div variants={itemVariants} className="w-12 h-px bg-white/20 my-2" />
                                    <motion.li variants={itemVariants}>
                                        <Link href="/shop/wishlist" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-300 hover:text-white">
                                            LISTA DE DESEOS
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        <Link href="/shop/orders" onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-300 hover:text-white">
                                            MIS PEDIDOS
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                        <button
                                            onClick={() => { logout(); setIsOpen(false); }}
                                            className="text-xl font-bold text-primary hover:text-red-400"
                                        >
                                            CERRAR SESIÓN
                                        </button>
                                    </motion.li>
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
