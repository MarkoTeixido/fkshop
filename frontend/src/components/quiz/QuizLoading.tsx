import { motion } from "framer-motion";

export default function QuizLoading() {
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
