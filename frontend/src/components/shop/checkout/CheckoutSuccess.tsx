import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';

interface CheckoutSuccessProps {
    orderId: string | null;
}

export default function CheckoutSuccess({ orderId }: CheckoutSuccessProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"></div>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] max-w-lg w-full shadow-2xl"
            >
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-green-500/50 shadow-lg">
                    <FaCircleCheck className="text-5xl text-white" />
                </div>
                <h1 className="text-4xl font-black italic uppercase text-white mb-2">¡Pedido Confirmado!</h1>
                <p className="text-gray-300 mb-8 text-lg">Gracias por tu compra. Tu orden <span className="text-primary font-bold">#{orderId || 'PENDING'}</span> está siendo procesada.</p>

                <div className="space-y-4">
                    <button onClick={() => router.push('/shop')} className="w-full bg-white text-dark-bg font-bold py-4 rounded-xl transition-transform hover:scale-[1.02]">
                        Seguir Comprando
                    </button>
                    <button onClick={() => router.push('/shop/profile')} className="w-full bg-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/20 transition-colors">
                        Ver Mis Pedidos
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
