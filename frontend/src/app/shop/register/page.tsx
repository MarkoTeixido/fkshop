"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from "react-icons/fa6";
import AuthCard from '@/components/shop/auth/AuthCard';
import FormInput from '@/components/shop/auth/FormInput';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        try {
            await authService.register(formData);
            router.push('/shop/login');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error al crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard title="Únete al Club" subtitle="Crea tu cuenta para comenzar a coleccionar." error={error}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Juan"
                        required
                        icon={<FaUser />}
                    />
                    <FormInput
                        label="Apellido"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Pérez"
                        required
                    />
                </div>

                <FormInput
                    label="Correo Electrónico"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@ejemplo.com"
                    required
                    icon={<FaEnvelope />}
                />

                <FormInput
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    icon={<FaLock />}
                />

                <FormInput
                    label="Confirmar Contraseña"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    icon={<FaLock />}
                />

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
                        {!loading && <FaArrowRight className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </form>

            <p className="text-center text-gray-400 mt-8 text-sm">
                ¿Ya tienes una cuenta? <Link href="/shop/login" className="text-white font-bold hover:underline decoration-primary underline-offset-4">Iniciar Sesión</Link>
            </p>
        </AuthCard>
    );
}
