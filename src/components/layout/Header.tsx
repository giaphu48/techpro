'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { ShoppingCart, Menu, X, User, Heart, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function Header() {
    const pathname = usePathname();
    const { totalItems, setIsCartOpen } = useCart();
    const { user, logout, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { href: '/products', label: 'Sản phẩm' },
        { href: '/news', label: 'Tin tức' },
        { href: '/stores', label: 'Danh sách cửa hàng' },
        { href: '/contact', label: 'Liên hệ' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tight text-black dark:text-white z-50">
                    TechPro<span className="text-blue-600">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                if (link.href !== '/products') {
                                    e.preventDefault();
                                    toast.info('Tính năng đang được phát triển');
                                }
                            }}
                            className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2 sm:gap-4 z-50">
                    <ThemeToggle />

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Giỏ hàng"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {mounted && totalItems > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                                {totalItems > 99 ? '99+' : totalItems}
                            </span>
                        )}
                    </button>

                    {mounted && !isLoading ? (
                        user ? (
                            <div className="hidden sm:flex relative group">
                                <button className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                    <User className="w-4 h-4" />
                                    {user.name}
                                </button>

                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px] z-50">
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 flex flex-col gap-1 transform origin-top scale-95 group-hover:scale-100 transition-transform">
                                        <Link
                                            href="/favorites"
                                            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2.5 transition-colors"
                                        >
                                            <Heart className="w-4 h-4" />
                                            Đã thích
                                        </Link>
                                        <div className="h-px bg-gray-100 dark:bg-gray-800 my-1"></div>
                                        <button
                                            onClick={logout}
                                            className="px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg text-left transition-colors w-full flex items-center gap-2.5"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={pathname === '/auth' ? '/' : '/auth'}
                                className="hidden sm:inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
                            >
                                {pathname === '/auth' ? 'Về trang chủ' : 'Đăng nhập'}
                            </Link>
                        )
                    ) : (
                        <div className="hidden sm:inline-flex w-[100px] h-[36px] rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden"
                    >
                        <nav className="flex flex-col px-4 py-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => {
                                        if (link.href !== '/products') {
                                            e.preventDefault();
                                            toast.info('Tính năng đang được phát triển');
                                        } else {
                                            setIsMobileMenuOpen(false);
                                        }
                                    }}
                                    className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {mounted && !isLoading && user ? (
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-900 rounded-xl">
                                        <div className="p-1.5 bg-gray-200 dark:bg-zinc-800 rounded-lg">
                                            <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        </div>
                                        <span>Xin chào, {user.name}</span>
                                    </div>
                                    <Link
                                        href="/favorites"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-center rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Heart className="w-5 h-5" />
                                        Đã thích
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-center rounded-xl border border-red-500 px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href={pathname === '/auth' ? '/' : '/auth'}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-4 text-center rounded-full bg-black px-4 py-3 text-base font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
                                >
                                    {pathname === '/auth' ? 'Về trang chủ' : 'Đăng nhập / Đăng ký'}
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}