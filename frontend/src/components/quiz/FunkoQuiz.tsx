"use client";

import { useFunkoQuiz } from "@/hooks/useFunkoQuiz";
import { QuizProduct } from "@/types/quiz.types";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizLoading from "./QuizLoading";
import QuizResult from "./QuizResult";

interface FunkoQuizProps {
    products: QuizProduct[];
}

export default function FunkoQuiz({ products }: FunkoQuizProps) {
    const {
        step,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        recommendedProduct,
        handleAnswer,
        resetQuiz,
        startQuiz
    } = useFunkoQuiz(products);

    switch (step) {
        case "intro":
            return <QuizIntro onStart={startQuiz} />;

        case "question":
            return (
                <QuizQuestion
                    question={currentQuestion}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={totalQuestions}
                    onAnswer={handleAnswer}
                />
            );

        case "loading":
            return <QuizLoading />;

        case "result":
            if (!recommendedProduct) return null; // Should not happen
            return <QuizResult product={recommendedProduct} onReset={resetQuiz} />;

        default:
            return null;
    }
}
