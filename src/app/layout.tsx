import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechPro - Giải pháp công nghệ đột phá",
  description: "Khám phá sản phẩm công nghệ thế hệ mới với hiệu năng vượt trội và thiết kế đỉnh cao. Đăng ký nhận thông tin ngay hôm nay.",
  openGraph: {
    title: "TechPro - Giải pháp công nghệ đột phá",
    description: "Khám phá sản phẩm công nghệ thế hệ mới với hiệu năng vượt trội và thiết kế đỉnh cao.",
    url: "https://techpro.example.com",
    siteName: "TechPro",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechPro - Giải pháp công nghệ đột phá",
    description: "Khám phá sản phẩm công nghệ thế hệ mới với hiệu năng vượt trội và thiết kế đỉnh cao.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}