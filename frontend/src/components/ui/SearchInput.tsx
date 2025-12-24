import { useState, useEffect } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchInputProps {
    onSearch: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({ onSearch, placeholder = "Buscar...", className = "" }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(searchTerm);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm, onSearch]);

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <FaMagnifyingGlass size={16} className="text-gray-400" />
            <input
                className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
