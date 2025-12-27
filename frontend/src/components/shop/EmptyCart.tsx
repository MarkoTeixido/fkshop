import Link from 'next/link';
import { FaBoxOpen } from "react-icons/fa6";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5 animate-fade-in-up">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <FaBoxOpen className="text-4xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-8 text-center px-4 max-w-md">Parece que aún no has agregado ningún Funko a tu colección. ¡Explora la tienda para encontrar tus favoritos!</p>
            <Link href="/shop" className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg shadow-primary/20">
                Comenzar a Comprar
            </Link>
        </div>
    );
}
