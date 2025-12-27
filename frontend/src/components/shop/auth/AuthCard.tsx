import { ReactNode } from "react";

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    error?: string;
}

export default function AuthCard({ title, subtitle, children, error }: AuthCardProps) {
    return (
        <div className="bg-dark-bg min-h-screen flex flex-col">
            <main className="flex-grow flex items-center justify-center p-4 pt-25 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-3xl shadow-2xl relative z-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-black italic uppercase text-white mb-2">{title}</h1>
                        <p className="text-gray-400">{subtitle}</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    {children}
                </div>
            </main>
        </div>
    );
}
