import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} TechPro. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <Link href="#" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                        Chính sách bảo mật
                    </Link>
                    <Link href="#" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                        Điều khoản dịch vụ
                    </Link>
                </div>
            </div>
        </footer>
    );
}