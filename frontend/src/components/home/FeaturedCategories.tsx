import Link from "next/link";
import Image from "next/image";

export default function FeaturedCategories() {
    return (
        <section className="py-24 bg-dark-surface relative overflow-hidden">
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Large Featured Card 1 */}
                    <Link href="/shop?category=STAR WARS" className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 block">
                        <Image src="https://res.cloudinary.com/dp7jr9k94/image/upload/v1766493611/Google_AI_Studio_2025-12-23T12_32_58.985Z_hnyk28.png" alt="Star Wars" fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute bottom-10 left-10">
                            <span className="text-primary font-bold tracking-wider mb-2 block">STAR WARS</span>
                            <h3 className="text-4xl font-black text-white italic uppercase mb-4">Imperio <br /> Galáctico</h3>
                            <span className="text-white border-b-2 border-white pb-1 group-hover:border-primary transition-colors">Comprar Ahora</span>
                        </div>
                    </Link>

                    {/* Large Featured Card 2 */}
                    <Link href="/shop?category=POKEMON" className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 block">
                        <Image src="https://res.cloudinary.com/dp7jr9k94/image/upload/v1766495580/Generated_Image_December_23_2025_-_10_11AM_u3pxvj.png" alt="Pokemon" fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute bottom-10 left-10">
                            <span className="text-primary font-bold tracking-wider mb-2 block">POKÉMON</span>
                            <h3 className="text-4xl font-black text-white italic uppercase mb-4">Atrápalos <br /> a Todos</h3>
                            <span className="text-white border-b-2 border-white pb-1 group-hover:border-primary transition-colors">Comprar Ahora</span>
                        </div>
                    </Link>
                </div>

                {/* Smaller Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Harry Potter', 'Marvel', 'DC Comics', 'Disney'].map((cat) => (
                        <Link href={`/shop?category=${cat}`} key={cat} className="group relative h-40 rounded-2xl overflow-hidden border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <h4 className="text-lg md:text-xl font-bold text-white uppercase text-center md:group-hover:scale-110 transition-transform">{cat}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
