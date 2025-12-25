"use client";
import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaLocationDot, FaPaperPlane } from "react-icons/fa6";

export default function Contact() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for consistency
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="bg-dark-bg min-h-screen flex flex-col">
                <main className="flex-grow pt-32 pb-20 px-4 relative overflow-hidden">
                    {/* Background Details */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

                    <div className="container-custom relative z-10 max-w-5xl mx-auto">
                        <div className="text-center mb-10 flex flex-col items-center">
                            <div className="h-10 md:h-12 w-64 bg-white/10 rounded-lg mb-4 animate-pulse"></div>
                            <div className="h-4 w-64 md:w-96 bg-white/5 rounded animate-pulse"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Info Section Skeleton */}
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl animate-pulse flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg shrink-0"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-white/10 rounded"></div>
                                            <div className="h-3 w-40 bg-white/5 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Form Section Skeleton */}
                            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl h-[480px] animate-pulse">
                                <div className="h-6 w-40 bg-white/10 rounded mb-8"></div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="h-12 bg-white/5 rounded-lg"></div>
                                        <div className="h-12 bg-white/5 rounded-lg"></div>
                                    </div>
                                    <div className="h-12 bg-white/5 rounded-lg"></div>
                                    <div className="h-32 bg-white/5 rounded-lg"></div>
                                    <div className="h-12 bg-white/10 rounded-lg mt-2 w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-dark-bg min-h-screen flex flex-col">
            <main className="flex-grow pt-32 pb-20 px-4 relative overflow-hidden">
                {/* Background Details */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

                <div className="container-custom relative z-10 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-black italic uppercase text-white mb-2">Ponte en Contacto</h1>
                        <p className="text-gray-400 max-w-xl mx-auto text-sm">
                            ¿Tienes una pregunta, sugerencia o simplemente quieres hablar sobre Funkos? Nos encantaría saber de ti.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Info Section */}
                        <div className="space-y-6">
                            {/* Info Cards */}
                            <div className="grid gap-4">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:border-primary/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <FaPhone size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white uppercase mb-1">Teléfono</h3>
                                            <p className="text-gray-400 font-light text-sm">+54 011 4736-6830</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:border-primary/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-500/20 text-blue-500 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <FaEnvelope size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white uppercase mb-1">Correo Electrónico</h3>
                                            <p className="text-gray-400 font-light text-sm">contact@funkoshop.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:border-primary/50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-500/20 text-purple-500 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <FaLocationDot size={18} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white uppercase mb-1">Ubicación</h3>
                                            <p className="text-gray-400 font-light text-sm">Buenos Aires, Argentina</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
                            <h2 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-3">
                                Enviar Mensaje <span className="w-8 h-[1px] bg-primary block" />
                            </h2>

                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Nombre</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="Juan Pérez"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="juan@ejemplo.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Asunto</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                        placeholder="Consulta sobre pedido"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Mensaje</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                                        placeholder="¿Cómo podemos ayudarte?"
                                    />
                                </div>

                                <button
                                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] group uppercase tracking-wider text-sm mt-2"
                                >
                                    Enviar <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
