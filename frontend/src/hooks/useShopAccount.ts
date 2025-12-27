import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { Order } from "@/types/report.types";

interface UserProfile {
    name: string;
    lastname: string;
    email: string;
    phone: string;
}

export function useShopAccount() {
    const { token, user, logout } = useAuth();
    const router = useRouter();
    const { addToast } = useToast();

    // State
    const [profile, setProfile] = useState<UserProfile>({
        name: "",
        lastname: "",
        email: "",
        phone: ""
    });
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState(""); // Feedback message

    // Fetch Data
    const fetchData = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            // Profile
            const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (profileRes.ok) {
                const data = await profileRes.json();
                setProfile({
                    name: data.name || "",
                    lastname: data.lastname || "",
                    email: data.email || "",
                    phone: data.phone || ""
                });
            }

            // Orders
            const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/orders`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (ordersRes.ok) {
                const data = await ordersRes.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching account data", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchData();
        } else if (user === null && !loading) {
            // If no user and not loading (initial check done), redirect
            router.push("/shop/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, fetchData]); // Removed loading and user to prevent infinite loop


    // Update Profile
    const updateProfile = async (data: UserProfile) => {
        setMsg("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setMsg("Perfil actualizado correctamente");
                addToast("Perfil actualizado", "success");
                setProfile(data); // Optimistic update or confirm
                return true;
            } else {
                setMsg("Error al actualizar perfil");
                addToast("Error al actualizar", "error");
                return false;
            }
        } catch (error) {
            console.error(error);
            setMsg("Error de conexión");
            return false;
        }
    };

    // Cancel Order
    const cancelOrder = async (orderId: number) => {
        if (!confirm("¿Estás seguro de que deseas cancelar este pedido?")) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/orders/${orderId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                fetchData(); // Refresh orders
                addToast('Pedido cancelado', 'success');
            } else {
                const err = await res.json();
                addToast(err.message || "No se pudo cancelar el pedido", "error");
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            addToast("Error al intentar cancelar el pedido.", "error");
        }
    };

    return {
        profile,
        orders,
        loading,
        msg,
        setMsg,
        updateProfile,
        cancelOrder,
        refreshData: fetchData,
        logout
    };
}
