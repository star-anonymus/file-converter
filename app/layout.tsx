import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://file-converter-tools.vercel.app"),
  title: { default: "FileConvert — Free Online File Converter", template: "%s | FileConvert" },
  description: "Convert images, compress files, merge PDFs, and more — 100% free, no signup, no watermarks. Works instantly in your browser.",
  keywords: ["file converter", "image converter", "pdf converter", "compress image", "jpg to png", "free online tool"],
  openGraph: {
    type: "website",
    title: "FileConvert — Free Online File Converter",
    description: "Convert images, compress files, merge PDFs — free, instant, no signup.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "FileConvert — Free Online File Converter" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0a0f1e] text-white antialiased min-h-screen">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" },
            success: { iconTheme: { primary: "#22c55e", secondary: "#0f172a" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#0f172a" } },
          }}
        />
      </body>
    </html>
  );
}
