import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils } from '@/utils/auth.utils';
import { useAuth } from '@/context/AuthContext';

export function useCheckout() {
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const [shippingData, setShippingData] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'Argentina',
        phone: ''
    });

    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessingPayment(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUtils.getShopToken()}`
                },
                body: JSON.stringify(shippingData)
            });

            if (res.status === 401 || res.status === 403) {
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                router.push('/shop/login');
                return;
            }

            const data = await res.json();

            if (res.ok) {
                setOrderId(data.orderId);
                setStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(data.message || "Error al procesar el pedido");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        } finally {
            setProcessingPayment(false);
        }
    };

    return {
        step,
        setStep,
        processingPayment,
        orderId,
        shippingData,
        setShippingData,
        paymentData,
        setPaymentData,
        handleShippingSubmit,
        handlePaymentSubmit,
        user
    };
}
