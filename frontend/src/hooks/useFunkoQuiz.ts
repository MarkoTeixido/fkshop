import { useState } from "react";
import { QuizProduct, QuizCategory } from "@/types/quiz.types";
import { questions } from "@/data/quizQuestions";

export type QuizStep = "intro" | "question" | "loading" | "result";

export function useFunkoQuiz(products: QuizProduct[]) {
    const [step, setStep] = useState<QuizStep>("intro");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [recommendedProduct, setRecommendedProduct] = useState<QuizProduct | null>(null);

    const handleAnswer = (categories: QuizCategory[]) => {
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
        }, 2000); // 2s Loading delay
    };

    const resetQuiz = () => {
        setStep("intro");
        setCurrentQuestionIndex(0);
        setScores({});
        setRecommendedProduct(null);
    };

    const startQuiz = () => {
        setStep("question");
    }

    return {
        step,
        currentQuestion: questions[currentQuestionIndex],
        currentQuestionIndex,
        totalQuestions: questions.length,
        recommendedProduct,
        handleAnswer,
        resetQuiz,
        startQuiz
    };
}
