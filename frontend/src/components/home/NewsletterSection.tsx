import Image from "next/image";

export default function NewsletterSection() {
    return (
        <section className="py-24 bg-dark-bg">
            <div className="container-custom">
                <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-[3rem] p-6 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[400px]">
                    <div className="relative z-20 max-w-xl text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase mb-4">Únete al <span className="text-primary">FunkoClub</span></h2>
                        <p className="text-gray-300 text-base md:text-lg mb-8">Desbloquea 10% de descuento en tu primer pedido, además de acceso anticipado a lanzamientos de edición limitada y ventas exclusivas para miembros.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input type="email" placeholder="Ingresa tu correo electrónico" className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary w-full md:w-80" />
                            <button className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-full transition-colors whitespace-nowrap">
                                Suscribirme
                            </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-4">Al registrarte aceptas nuestros Términos y Condiciones.</p>
                    </div>

                    {/* Blended Background Image */}
                    <div className="absolute right-0 bottom-0 top-0 w-full md:w-1/2 pointer-events-none z-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-20"></div>
                        <Image
                            src="https://res.cloudinary.com/dp7jr9k94/image/upload/v1766491660/Google_AI_Studio_2025-12-23T12_07_11.596Z_r0bnhw.png"
                            alt="Club Mascot"
                            fill
                            className="object-cover object-center opacity-20 md:opacity-80 mix-blend-lighten"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
