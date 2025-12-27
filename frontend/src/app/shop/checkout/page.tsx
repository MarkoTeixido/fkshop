"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useCheckout } from '@/hooks/checkout/useCheckout';
import EmptyCart from '@/components/shop/EmptyCart';
import CheckoutSuccess from '@/components/shop/checkout/CheckoutSuccess';
import CheckoutStepIndicator from '@/components/shop/checkout/CheckoutStepIndicator';
import ShippingForm from '@/components/shop/checkout/ShippingForm';
import PaymentForm from '@/components/shop/checkout/PaymentForm';
import CheckoutOrderSummary from '@/components/shop/checkout/CheckoutOrderSummary';

// Animation variants
const stepVariants: Variants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.3 } }
};

export default function CheckoutPage() {
    const { cartItems, subtotal, fetchCart } = useCart();
    const [initialLoading, setInitialLoading] = useState(true);

    const {
        step,
        setStep,
        processingPayment,
        orderId,
        shippingData,
        setShippingData,
        paymentData,
        setPaymentData,
        handleShippingSubmit,
        handlePaymentSubmit
    } = useCheckout();

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 800);
        fetchCart();
        return () => clearTimeout(timer);
    }, [fetchCart]);

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-dark-bg relative overflow-x-hidden pt-24 pb-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-8">
                <EmptyCart />
            </div>
        );
    }

    if (step === 3) {
        return <CheckoutSuccess orderId={orderId} />;
    }

    return (
        <div className="min-h-screen bg-dark-bg relative overflow-x-hidden pt-24 pb-20">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Checkout Seguro</span>
                    <h1 className="text-5xl md:text-6xl font-black italic uppercase text-white drop-shadow-2xl">Finalizar Compra</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">

                    {/* Left Column: Form Steps */}
                    <div className="lg:col-span-7">
                        <CheckoutStepIndicator step={step} />

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <ShippingForm
                                        data={shippingData}
                                        onChange={setShippingData}
                                        onSubmit={handleShippingSubmit}
                                    />
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <PaymentForm
                                        data={paymentData}
                                        onChange={setPaymentData}
                                        onSubmit={handlePaymentSubmit}
                                        onBack={() => setStep(1)}
                                        processing={processingPayment}
                                        total={subtotal}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5 relative">
                        <CheckoutOrderSummary cartItems={cartItems} subtotal={subtotal} />
                    </div>
                </div>
            </div>
        </div>
    );
}
