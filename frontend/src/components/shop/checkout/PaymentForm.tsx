import { FaCircleCheck, FaCreditCard, FaLock } from "react-icons/fa6";

interface PaymentData {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
}

interface PaymentFormProps {
    data: PaymentData;
    onChange: (data: PaymentData) => void;
    onSubmit: (e: React.FormEvent) => void;
    onBack: () => void;
    processing: boolean;
    total: number;
}

export default function PaymentForm({ data, onChange, onSubmit, onBack, processing, total }: PaymentFormProps) {
    const handleChange = (field: keyof PaymentData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase flex items-center gap-3">
                    <FaCreditCard className="text-primary shrink-0" /> Método de Pago
                </h2>
                <div className="flex gap-2 opacity-50">
                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                    <div className="w-10 h-6 bg-white/10 rounded"></div>
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-4 mb-6">
                    <FaLock className="text-blue-400 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-bold text-blue-400 text-sm uppercase mb-1">Transacción Segura</h4>
                        <p className="text-xs text-blue-200/70">Tus datos están protegidos con encriptación de 256-bit.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Nombre en Tarjeta</label>
                    <input required value={data.cardName} onChange={e => handleChange('cardName', e.target.value.toUpperCase())} type="text" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="JUAN PEREZ" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Número de Tarjeta</label>
                    <input
                        required
                        value={data.cardNumber}
                        onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                            const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                            handleChange('cardNumber', formatted);
                        }}
                        type="text"
                        maxLength={19}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                        placeholder="0000 0000 0000 0000"
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">Vencimiento</label>
                        <input
                            required
                            value={data.expiry}
                            onChange={e => {
                                const val = e.target.value.replace(/\D/g, '').substring(0, 6);
                                let formatted = val;
                                if (val.length >= 2) {
                                    formatted = val.substring(0, 2) + (val.length > 2 ? '/' + val.substring(2) : '');
                                }
                                handleChange('expiry', formatted);
                            }}
                            type="text"
                            maxLength={7}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                            placeholder="MM/AAAA"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 pl-1">CVC</label>
                        <input
                            required
                            value={data.cvc}
                            onChange={e => handleChange('cvc', e.target.value.replace(/\D/g, '').substring(0, 4))}
                            type="text"
                            maxLength={4}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                            placeholder="123"
                        />
                    </div>
                </div>

                <div className="pt-8 flex flex-col-reverse sm:flex-row justify-between items-center gap-6 sm:gap-0">
                    <button type="button" onClick={onBack} className="text-gray-400 hover:text-white font-bold text-sm uppercase transition-colors">
                        Volver
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-[1.02] shadow-lg shadow-green-500/25 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? (
                            <>Procesando <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div></>
                        ) : (
                            <>Pagar ${total.toFixed(2)} <FaCircleCheck /></>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
