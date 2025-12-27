import { QuizQuestion } from "@/types/quiz.types";

export const questions: QuizQuestion[] = [
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
