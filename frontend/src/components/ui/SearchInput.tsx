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
        <div className={`flex items-center gap-4 ${className}`}>
            <FaMagnifyingGlass size={24} />
            <input
                className="w-full border-2 border-primary rounded-[50px] px-[1.6rem] py-[0.8rem] text-[1.6rem] placeholder:text-gray-400 focus:outline-none"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
