import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://file-converter-inky.vercel.app"),
  title: { default: "ConvertRX — Free File Conversion Tools", template: "%s | ConvertRX" },
  description: "Convert images, compress files, merge PDFs, convert PDF to Word — 100% free, no signup, no watermarks. Works instantly in your browser.",
  keywords: ["file converter", "image converter", "pdf to word", "compress image", "jpg to png", "free online tool", "ConvertRX"],
  openGraph: {
    type: "website",
    title: "ConvertRX — Free File Conversion Tools",
    description: "Convert images, compress files, merge PDFs — free, instant, no signup.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ConvertRX — Free File Conversion Tools" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 antialiased min-h-screen">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid rgba(20,120,143,0.2)",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            },
            success: { iconTheme: { primary: "#5ca823", secondary: "#fff" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
