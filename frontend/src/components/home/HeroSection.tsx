import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background with Parallax/Gradient */}
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dp7jr9k94/image/upload/v1766491205/Generated_image_1_1_c66afj.png')] bg-cover bg-center bg-fixed opacity-60 scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/30 via-transparent to-dark-bg"></div>

            <div className="container-custom relative z-10 flex flex-col items-start gap-5 px-8">
                <span className="bg-primary/20 border border-primary text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase backdrop-blur-sm animate-fade-in">
                    Nueva Colección
                </span>

                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white italic tracking-tight uppercase leading-[0.9] drop-shadow-2xl">
                    Desata el <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 pr-6">
                        Multiverso
                    </span>
                </h1>

                <p className="max-w-xl text-gray-200 text-base sm:text-lg md:text-xl font-semibold leading-relaxed drop-shadow-lg">
                    Sumérgete en la colección más exclusiva. Desde raras variantes chase hasta tus favoritos. Encuentra el Pop! que completa tu set.
                </p>

                <div className="flex flex-wrap gap-4 mt-4">
                    <Link
                        href="/shop"
                        className="px-8 py-4 bg-primary hover:bg-primary-hover text-white text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(229,9,20,0.5)]"
                    >
                        Ver Colección
                    </Link>
                    <Link href="#quiz" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-bold rounded-full backdrop-blur-md border border-white/20 transition-all text-center flex items-center justify-center">
                        Ir al Quiz
                    </Link>
                </div>
            </div>
        </section>
    );
}
