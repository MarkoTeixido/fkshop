import { ReactNode } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: ReactNode;
}

export default function FormInput({ label, icon, className, ...props }: FormInputProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">{label}</label>
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all ${icon ? 'pl-12' : 'pl-4'} pr-4 ${className || ''}`}
                    {...props}
                />
            </div>
        </div>
    );
}
