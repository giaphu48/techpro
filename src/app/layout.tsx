import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "TechPro - Tai nghe chính hãng",
  description: "Khám phá bộ sưu tập tai nghe chính hãng với chất lượng âm thanh vượt trội.",
  openGraph: {
    title: "TechPro - Tai nghe chính hãng",
    description:
      "Khám phá bộ sưu tập tai nghe chính hãng với chất lượng âm thanh vượt trội.",
    url: "https://techpro-deploy.vercel.app/",
    siteName: "TechPro",
    images: [
      {
        url: "https://res.cloudinary.com/dlzfacstr/image/upload/v1782921657/sony-ult-wear_kd0xqi.png",
        width: 1200,
        height: 630,
        alt: "TechPro - Tai nghe chính hãng",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechPro - Tai nghe chính hãng",
    description:
      "Khám phá bộ sưu tập tai nghe chính hãng với chất lượng âm thanh vượt trội.",
    images: ["https://res.cloudinary.com/dlzfacstr/image/upload/v1782921657/sony-ult-wear_kd0xqi.png"],
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
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="bottom-right" richColors theme="system" />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}