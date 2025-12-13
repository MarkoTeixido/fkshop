import Image from "next/image";
import { FaCircleXmark } from "react-icons/fa6";
import { CartItem as ICartItem } from "@/hooks/useCart";

interface CartItemProps {
    item: ICartItem;
    onUpdateQuantity: (id: number, qty: number) => void;
    onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const price = typeof item.Product.price === 'string' ? parseFloat(item.Product.price) : item.Product.price;
    const total = price * item.quantity;

    return (
        <div className="bg-light-bg rounded-[10px] p-[2rem] shadow-md grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_auto] gap-[2rem] items-center relative">
            <div className="flex items-center gap-[2rem]">
                <Image
                    src={item.Product.image_front || "/placeholder.webp"}
                    alt={item.Product.product_name}
                    width={100}
                    height={100}
                    className="w-[80px] h-auto object-contain"
                />
                <div className="flex flex-col gap-[0.4rem]">
                    <h3 className="text-[1.8rem] font-bold uppercase">{item.Product.product_name}</h3>
                    <p className="text-[1.4rem] font-medium text-gray-500">
                        {(item.Product as any).category?.category_name || (item.Product as any).Category?.category_name || "Coleccionable"}
                    </p>
                    <p className="text-[1.4rem] font-medium">PRECIO: $ {price}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-[6rem] text-center border border-dark rounded-[10px] py-[0.4rem] text-[1.6rem]"
                />
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
                        className="bg-dark-bg text-white w-[2rem] h-[2rem] rounded-[4px] flex items-center justify-center text-[1.2rem] hover:opacity-90 transition-opacity"
                    >
                        +
                    </button>
                    <button
                        onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
                        className="bg-dark-bg text-white w-[2rem] h-[2rem] rounded-[4px] flex items-center justify-center text-[1.2rem] hover:opacity-90 transition-opacity"
                    >
                        -
                    </button>
                </div>
            </div>

            <p className="text-[1.8rem] font-medium text-primary">$ {total.toFixed(2)}</p>

            <button
                onClick={() => onRemove(item.product_id)}
                className="text-secondary hover:text-red-500 transition-colors absolute top-4 right-4 md:static"
            >
                <FaCircleXmark size={24} />
            </button>
        </div>
    );
}
