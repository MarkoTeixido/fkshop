import Header from "@/components/header/Header";
import FunkoQuiz from "@/components/quiz/FunkoQuiz";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewsletterSection from "@/components/home/NewsletterSection";
import { productService } from "@/services/product.service";

// Fallback products (Replace with real data hook later if needed)
const fallbackProducts = [
    { id: 1, category: "STAR WARS", name: "STORMTROOPER LIGHTSABER", price: 1799.99, imageFront: "/images/star-wars/trooper-1.webp", imageBack: "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_front_placeholder.png", tag: "NUEVO", installments: "3 CUOTAS SIN INTERÉS", stock: 10 },
    { id: 2, category: "POKEMON", name: "PIDGEOTTO", price: 1799.99, imageFront: "/images/pokemon/pidgeotto-1.webp", imageBack: "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_front_placeholder.png", tag: "NUEVO", installments: "3 CUOTAS SIN INTERÉS", stock: 5 },
    { id: 3, category: "HARRY POTTER", name: "LUNA LOVEGOOD", price: 1799.99, imageFront: "/images/harry-potter/luna-1.webp", imageBack: "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_front_placeholder.png", tag: "HOT", installments: "3 CUOTAS SIN INTERÉS", stock: 2 },
    { id: 4, category: "MARVEL", name: "IRON MAN MARK 85", price: 2100.00, imageFront: "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_front_placeholder.png", imageBack: "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_box_placeholder.png", tag: "SALE", installments: "6 CUOTAS SIN INTERÉS", stock: 15 },
];

async function getProducts() {
    try {
        const collections = await productService.getHomeProducts();

        if (!collections) return fallbackProducts;

        return collections.map((item) => ({
            id: item.product_id,
            category: item.licence?.licence_name || "General",
            name: item.product_name,
            price: item.price,
            imageFront: item.image_front,
            imageBack: item.image_back,
            discount: item.discount || undefined,
            created_at: item.created_at,
            installments: "3 CUOTAS SIN INTERÉS",
            stock: item.stock
        }));
    } catch (error) {
        console.error("Using fallback:", error);
        return fallbackProducts;
    }
}

export default async function Home() {
    const products = await getProducts();

    return (
        <div className="bg-dark-bg min-h-screen flex flex-col">
            <Header />
            <main>
                <HeroSection />
                <TrendingSection products={products} />
                <FeaturedCategories />

                {/* "Which Pop Are You?" / Interactive Section */}
                <div id="quiz">
                    <FunkoQuiz products={products} />
                </div>

                <NewsletterSection />
            </main>
            <Footer />
        </div>
    )
}
