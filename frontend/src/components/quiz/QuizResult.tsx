import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { QuizProduct } from "@/types/quiz.types";

interface QuizResultProps {
    product: QuizProduct;
    onReset: () => void;
}

export default function QuizResult({ product, onReset }: QuizResultProps) {
    return (
        <section className="py-12 bg-dark-bg relative overflow-hidden min-h-[600px] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-dark-bg z-0"></div>

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                >
                    <span className="text-primary font-bold tracking-widest uppercase mb-2 block text-sm">
                        Tu Match Ideal
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase mb-8">
                        Eres... <span className="text-primary">{product.name}</span>
                    </h2>

                    <div className="relative mx-auto w-full max-w-xs group mb-8">
                        <div className="absolute inset-0 bg-primary/40 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transform transition-transform duration-500 hover:-translate-y-2">
                            <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-white/5">
                                <Image
                                    src={product.imageFront}
                                    alt={product.name}
                                    fill
                                    className="object-contain hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                                <h3 className="text-lg font-black text-white uppercase italic leading-none mt-1 mb-1">{product.name}</h3>
                                {product.discount && product.discount > 0 ? (
                                    <div className="flex items-center gap-2">
                                        <p className="text-primary font-bold text-lg">${(Number(product.price) - (Number(product.price) * product.discount / 100)).toFixed(2)}</p>
                                        <p className="text-xs text-gray-500 line-through">${product.price}</p>
                                    </div>
                                ) : (
                                    <p className="text-primary font-bold text-lg">${product.price}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3">
                        <Link href={`/shop/${product.id}`} className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg text-sm md:text-base">
                            Comprar Ahora
                        </Link>
                        <button
                            onClick={onReset}
                            className="bg-transparent border border-white/20 text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-all text-sm md:text-base"
                        >
                            Jugar de Nuevo
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
