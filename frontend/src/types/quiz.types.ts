export type QuizCategory = "STAR WARS" | "HARRY POTTER" | "MARVEL" | "POKEMON" | "DISNEY" | "DC COMICS";

export interface QuizProduct {
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

export interface QuizOption {
    text: string;
    icon: string;
    categories: QuizCategory[];
}

export interface QuizQuestion {
    id: number;
    text: string;
    options: QuizOption[];
}
