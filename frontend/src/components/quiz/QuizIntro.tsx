import { motion } from "framer-motion";

interface QuizIntroProps {
    onStart: () => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
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
                        onClick={onStart}
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
