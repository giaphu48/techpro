import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "vietnamese"],
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
      className={`${inter.variable} ${robotoMono.variable} scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}