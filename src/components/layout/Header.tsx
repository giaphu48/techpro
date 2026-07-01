import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tight text-black dark:text-white">
                    TechPro<span className="text-blue-600">.</span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                        Tính năng
                    </Link>
                    <Link href="#specs" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                        Thông số
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        href="#register"
                        className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </header>
    );
}