import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShopAuthProvider } from "@/context/AuthContext"; // Renamed inside file but exported as AuthProvider/ShopAuthProvider

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-400px)]">
                {children}
            </main>
            <Footer />
        </>
    );
}
