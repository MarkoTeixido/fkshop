import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

interface NavbarProps {
    navLinks: { name: string; href: string }[];
}

export default function Navbar({ navLinks }: NavbarProps) {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            href={link.href}
                            className={cn(
                                "text-sm font-bold tracking-widest hover:text-primary transition-colors",
                                pathname === link.href ? "text-primary" : "text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Search Bar */}
            <div className="relative group hidden xl:block">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-40 focus:w-64 transition-all"
                />
            </div>
        </div>
    );
}
