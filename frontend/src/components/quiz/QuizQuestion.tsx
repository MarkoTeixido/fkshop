import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion as IQuizQuestion, QuizCategory } from "@/types/quiz.types";

interface QuizQuestionProps {
    question: IQuizQuestion;
    currentQuestionIndex: number;
    totalQuestions: number;
    onAnswer: (categories: QuizCategory[]) => void;
}

export default function QuizQuestion({ question, currentQuestionIndex, totalQuestions, onAnswer }: QuizQuestionProps) {
    return (
        <section className="py-24 bg-gray-100 relative min-h-[700px] flex items-center">
            <div className="container-custom max-w-4xl mx-auto">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-2 bg-primary transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>

                    <div className="text-center mb-12">
                        <span className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-2 block">
                            Pregunta {currentQuestionIndex + 1} de {totalQuestions}
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
                                    onClick={() => onAnswer(option.categories)}
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
