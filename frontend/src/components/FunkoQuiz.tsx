"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaMagic, FaRocket, FaFistRaised } from "react-icons/fa"; // Example icons
import { IoSparkles } from "react-icons/io5";

// Revert to local interface to match the transformed data from page.tsx (getProducts)
interface QuizProduct {
    id: number;
    category: string;
    name: string;
    price: number | string;
    imageFront: string;
    imageBack: string;
    tag?: string;
    installments: string;
    stock: number;
    discount?: number;
}

interface FunkoQuizProps {
    products: QuizProduct[];
}

type Category = "STAR WARS" | "HARRY POTTER" | "MARVEL" | "POKEMON" | "DISNEY" | "DC COMICS";

interface Question {
    id: number;
    text: string;
    options: {
        text: string;
        icon: string;
        categories: Category[];
    }[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "¿Cuál es tu plan ideal para el fin de semana?",
        options: [
            { text: "Explorar la galaxia", icon: "🚀", categories: ["STAR WARS"] },
            { text: "Aprender nuevos hechizos", icon: "✨", categories: ["HARRY POTTER"] },
            { text: "Salvar el mundo", icon: "🛡️", categories: ["MARVEL", "DC COMICS"] },
            { text: "Entrenar con mi mascota", icon: "🐾", categories: ["POKEMON", "DISNEY"] },
        ],
    },
    {
        id: 2,
        text: "¿Qué poder te gustaría tener?",
        options: [
            { text: "La Fuerza", icon: "🌌", categories: ["STAR WARS"] },
            { text: "Magia", icon: "🪄", categories: ["HARRY POTTER", "DISNEY"] },
            { text: "Súper Fuerza/Tecnología", icon: "🦾", categories: ["MARVEL", "DC COMICS"] },
            { text: "Controlar Elementos", icon: "🔥", categories: ["POKEMON"] },
        ],
    },
    {
        id: 3,
        text: "¿Quién sería tu compañero de aventuras?",
        options: [
            { text: "Un droide leal", icon: "🤖", categories: ["STAR WARS"] },
            { text: "Un mago sabio", icon: "🧙‍♂️", categories: ["HARRY POTTER"] },
            { text: "Un equipo de héroes", icon: "🦸", categories: ["MARVEL", "DC COMICS"] },
            { text: "Una criatura adorable", icon: "🐣", categories: ["POKEMON", "DISNEY"] },
        ],
    },
];

export default function FunkoQuiz({ products }: FunkoQuizProps) {
    const [step, setStep] = useState<"intro" | "question" | "loading" | "result">("intro");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [recommendedProduct, setRecommendedProduct] = useState<QuizProduct | null>(null);

    const handleAnswer = (categories: Category[]) => {
        const newScores = { ...scores };
        categories.forEach((cat) => {
            newScores[cat] = (newScores[cat] || 0) + 1;
        });
        setScores(newScores);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(newScores);
        }
    };

    const calculateResult = (finalScores: Record<string, number>) => {
        setStep("loading");

        // Find winning category
        let winningCategory = "";
        let maxScore = -1;

        Object.entries(finalScores).forEach(([cat, score]) => {
            if (score > maxScore) {
                maxScore = score;
                winningCategory = cat;
            }
        });

        // Find products in that category
        const categoryProducts = products.filter((p) =>
            (p.category && p.category.toUpperCase().includes(winningCategory)) ||
            (p.category && winningCategory.includes(p.category.toUpperCase()))
        );

        // Fallback if no exact match (pick random or first available)
        const winner = categoryProducts.length > 0
            ? categoryProducts[Math.floor(Math.random() * categoryProducts.length)]
            : products[Math.floor(Math.random() * products.length)];

        setTimeout(() => {
            setRecommendedProduct(winner);
            setStep("result");
        }, 2000); // Fake loading delay for suspense
    };

    const resetQuiz = () => {
        setStep("intro");
        setCurrentQuestionIndex(0);
        setScores({});
        setRecommendedProduct(null);
    };

    // --- RENDER STATES ---

    if (step === "intro") {
        return (
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://res.cloudinary.com/dp7jr9k94/image/upload/v1765590925/isotype_jca7v6.svg')] bg-repeat space"></div>
                <div className="container-custom relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left max-w-2xl"
                    >
                        <span className="bg-black/20 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 inline-block backdrop-blur-sm">
                            QUIZ DIVERTIDO
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-white uppercase italic mb-6 leading-tight">
                            ¿Qué Pop! <br /> Eres Tú?
                        </h2>
                        <p className="text-white/90 text-xl font-medium mb-8 leading-relaxed">
                            Responde 3 preguntas rápidas para descubrir tu Funko ideal y obtener una recomendación personalizada.
                        </p>
                        <button
                            onClick={() => setStep("question")}
                            className="bg-white text-primary text-xl font-bold px-10 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-white/90 hover:scale-105 transition-all transform"
                        >
                            Comenzar Quiz
                        </button>
                    </motion.div>

                    {/* Mockup / Decor */}
                    <motion.div
                        initial={{ opacity: 0, rotate: 10, y: 100 }}
                        whileInView={{ opacity: 1, rotate: 3, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">🤔</div>
                            <div className="h-4 bg-white/20 rounded-full w-full"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-16 bg-white/20 rounded-xl w-full"></div>
                            <div className="h-16 bg-white/20 rounded-xl w-full opacity-60"></div>
                            <div className="h-16 bg-white/20 rounded-xl w-full opacity-40"></div>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    if (step === "loading") {
        return (
            <section className="py-32 bg-primary relative flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-24 h-24 border-8 border-white/30 border-t-white rounded-full mb-8 mx-auto"
                    />
                    <h3 className="text-4xl font-black text-white uppercase italic animate-pulse">
                        Analizando tu ADN Funko...
                    </h3>
                </div>
            </section>
        );
    }

    if (step === "result" && recommendedProduct) {
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
                            Eres... <span className="text-primary">{recommendedProduct.name}</span>
                        </h2>

                        <div className="relative mx-auto w-full max-w-xs group mb-8">
                            <div className="absolute inset-0 bg-primary/40 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transform transition-transform duration-500 hover:-translate-y-2">
                                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-white/5">
                                    <Image
                                        src={recommendedProduct.imageFront}
                                        alt={recommendedProduct.name}
                                        fill
                                        className="object-contain hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{recommendedProduct.category}</span>
                                    <h3 className="text-lg font-black text-white uppercase italic leading-none mt-1 mb-1">{recommendedProduct.name}</h3>
                                    {recommendedProduct.discount && recommendedProduct.discount > 0 ? (
                                        <div className="flex items-center gap-2">
                                            <p className="text-primary font-bold text-lg">${(Number(recommendedProduct.price) - (Number(recommendedProduct.price) * recommendedProduct.discount / 100)).toFixed(2)}</p>
                                            <p className="text-xs text-gray-500 line-through">${recommendedProduct.price}</p>
                                        </div>
                                    ) : (
                                        <p className="text-primary font-bold text-lg">${recommendedProduct.price}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-3">
                            <Link href={`/shop/${recommendedProduct.id}`} className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg text-sm md:text-base">
                                Comprar Ahora
                            </Link>
                            <button
                                onClick={resetQuiz}
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

    // Default: Question State
    const question = questions[currentQuestionIndex];

    return (
        <section className="py-24 bg-gray-100 relative min-h-[700px] flex items-center">
            <div className="container-custom max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-2 bg-primary transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>

                    <div className="text-center mb-12">
                        <span className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-2 block">
                            Pregunta {currentQuestionIndex + 1} de {questions.length}
                        </span>
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 uppercase italic">
                            {question.text}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence mode="wait">
                            {question.options.map((option, idx) => (
                                <motion.button
                                    key={option.text}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => handleAnswer(option.categories)}
                                    className="group flex items-center gap-6 p-6 rounded-2xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all text-left"
                                >
                                    <span className="text-4xl group-hover:scale-125 transition-transform duration-300 filter drop-shadow-md">
                                        {option.icon}
                                    </span>
                                    <span className="text-xl font-bold text-gray-700 group-hover:text-primary transition-colors">
                                        {option.text}
                                    </span>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
