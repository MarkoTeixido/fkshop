import { FaChevronRight, FaTruck } from "react-icons/fa6";

interface ShippingData {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
}

interface ShippingFormProps {
    data: ShippingData;
    onChange: (data: ShippingData) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function ShippingForm({ data, onChange, onSubmit }: ShippingFormProps) {
    const handleChange = (field: keyof ShippingData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
            <h2 className="text-2xl font-bold text-white uppercase mb-8 flex items-center gap-3">
                <FaTruck className="text-primary" /> Información de Envío
            </h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Dirección (Calle y Número)</label>
                        <input required value={data.street} onChange={e => handleChange('street', e.target.value)} type="text" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="Av. Siempre Viva 742" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Ciudad</label>
                        <input required value={data.city} onChange={e => handleChange('city', e.target.value)} type="text" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="Springfield" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Estado / Provincia</label>
                        <input required value={data.state} onChange={e => handleChange('state', e.target.value)} type="text" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Código Postal</label>
                        <input required value={data.zip} onChange={e => handleChange('zip', e.target.value)} type="text" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="12345" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Teléfono</label>
                        <input required value={data.phone} onChange={e => handleChange('phone', e.target.value)} type="tel" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="+54 11 1234 5678" />
                    </div>
                </div>
                <div className="pt-6 flex justify-center">
                    <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center gap-3">
                        Continuar a Pago <FaChevronRight />
                    </button>
                </div>
            </form>
        </div>
    );
}
