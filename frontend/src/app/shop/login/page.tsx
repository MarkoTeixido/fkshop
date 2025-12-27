"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShopAuth } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaArrowRight, FaUserShield, FaUser } from "react-icons/fa6";
import { authService } from '@/services/auth.service';
import AuthCard from '@/components/shop/auth/AuthCard';
import FormInput from '@/components/shop/auth/FormInput';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useShopAuth();
    const router = useRouter(); // Keeping router for future expansion if needed
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const performLogin = async (e?: React.FormEvent, creds?: { email: string, password: string }) => {
        if (e) e.preventDefault();
        const loginEmail = creds ? creds.email : email;
        const loginPass = creds ? creds.password : password;

        setError('');
        setLoading(true);
        try {
            const response = await authService.login(loginEmail, loginPass);
            if (response.token && response.user) {
                login(response.token, response.user);
            } else {
                setError("Respuesta inválida del servidor");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleTestUserLogin = () => {
        const creds = { email: 'juan@ejemplo.com', password: 'Contraseña1.' };
        setEmail(creds.email);
        setPassword(creds.password);
        performLogin(undefined, creds);
    };

    return (
        <AuthCard title="Bienvenido de Nuevo" subtitle="Ingresa tus credenciales para acceder a tu cuenta." error={error}>
            <form onSubmit={(e) => performLogin(e)} className="space-y-6">
                <FormInput
                    label="Correo Electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    required
                    icon={<FaEnvelope />}
                />

                <FormInput
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    icon={<FaLock />}
                />

                <div className="flex justify-end">
                    <Link href="/shop/forgot-password" className="text-xs text-gray-400 hover:text-white transition-colors">
                        ¿Olvidaste tu Contraseña?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    {!loading && <FaArrowRight className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </form>

            {/* Test Accounts */}
            <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-4">Inicio Rápido (Modo Prueba)</p>
                <div className="grid grid-cols-2 gap-4">
                    <Link
                        href="/admin/login"
                        className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all group"
                    >
                        <FaUserShield className="text-primary group-hover:scale-110 transition-transform" size={20} />
                        <span className="text-xs font-bold text-gray-300">Administrador</span>
                    </Link>
                    <button
                        type="button"
                        onClick={handleTestUserLogin}
                        className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition-all group"
                    >
                        <FaUser className="text-blue-500 group-hover:scale-110 transition-transform" size={20} />
                        <span className="text-xs font-bold text-gray-300">Usuario</span>
                    </button>
                </div>
            </div>

            <p className="text-center text-gray-400 mt-8 text-sm">
                ¿No tienes una cuenta? <Link href="/shop/register" className="text-white font-bold hover:underline decoration-primary underline-offset-4">Registrarse</Link>
            </p>
        </AuthCard>
    );
}
