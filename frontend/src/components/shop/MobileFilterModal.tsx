import { FaXmark } from "react-icons/fa6";
import ShopSidebar from './ShopSidebar';

interface MobileFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    filters: any; // Ideally typed to match useShop filter state
}

export default function MobileFilterModal({ isOpen, onClose, filters }: MobileFilterModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex justify-end transition-all md:hidden">
            <div className="w-full max-w-[320px] h-full bg-dark-surface border-l border-white/10 overflow-y-auto p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Filtros</h3>
                    <button onClick={onClose} className="text-white hover:text-primary transition-colors">
                        <FaXmark size={24} />
                    </button>
                </div>

                <ShopSidebar
                    className="w-full p-0 border-none bg-transparent"
                    hideSearch={true}
                    {...filters}
                />

                <button
                    onClick={onClose}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl mt-8 sticky bottom-0 shadow-lg shadow-black/50"
                >
                    Aplicar Filtros
                </button>
            </div>
        </div>
    );
}
