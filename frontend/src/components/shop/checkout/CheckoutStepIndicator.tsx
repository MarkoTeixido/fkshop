interface CheckoutStepIndicatorProps {
    step: number;
}

export default function CheckoutStepIndicator({ step }: CheckoutStepIndicatorProps) {
    return (
        <div className="flex items-center justify-center md:justify-start mb-10 space-x-4">
            <div className={`flex items-center transition-colors duration-300 ${step >= 1 ? 'text-primary' : 'text-gray-600'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 ${step >= 1 ? 'border-primary bg-primary/20' : 'border-gray-700 bg-transparent'}`}>1</div>
                <span className="ml-3 font-bold uppercase hidden md:inline">Envío</span>
            </div>
            <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-primary' : 'bg-gray-800'}`}></div>
            <div className={`flex items-center transition-colors duration-300 ${step >= 2 ? 'text-primary' : 'text-gray-600'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 ${step >= 2 ? 'border-primary bg-primary/20' : 'border-gray-700 bg-transparent'}`}>2</div>
                <span className="ml-3 font-bold uppercase hidden md:inline">Pago</span>
            </div>
        </div>
    );
}
