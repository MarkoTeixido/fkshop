import Header from "@/components/header/Header";
import FunkoQuiz from "@/components/quiz/FunkoQuiz";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewsletterSection from "@/components/home/NewsletterSection";
import { productService } from "@/services/product.service";

async function getProducts() {
    try {
        const collections = await productService.getHomeProducts();

        if (!collections || collections.length === 0) return [];

        return collections.map((item: any) => ({
            id: item.product_id,
            category: item.licence?.licence_name || item.category?.category_name || "General",
            name: item.product_name,
            price: item.price,
            imageFront: item.image_front,
            imageBack: item.image_back,
            discount: item.discount || undefined,
            created_at: item.created_at,
            installments: item.dues ? `${item.dues} CUOTAS SIN INTERÉS` : "3 CUOTAS SIN INTERÉS",
            stock: item.stock
        }));
    } catch (error) {
        console.error("Error fetching home products:", error);
        return [];
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
