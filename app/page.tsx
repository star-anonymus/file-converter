import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConvertRxLogo from "@/components/ConvertRxLogo";
import { ImageIcon, FileDown, FilePlus2, Layers, Shield, Zap, Globe, Star } from "lucide-react";

const tools = [
  {
    href: "/image-converter",
    icon: ImageIcon,
    color: "blue",
    title: "Image Converter",
    description: "Convert between JPG, PNG, WEBP, GIF, BMP — instantly in your browser. Batch convert multiple files at once.",
    tags: ["JPG", "PNG", "WEBP", "GIF", "BMP"],
    popular: true,
  },
  {
    href: "/image-compressor",
    icon: FileDown,
    color: "violet",
    title: "Image Compressor",
    description: "Reduce image file size without visible quality loss. Perfect for websites, email, and social media.",
    tags: ["Lossless", "Lossy", "Batch"],
    popular: true,
  },
  {
    href: "/images-to-pdf",
    icon: FilePlus2,
    color: "emerald",
    title: "Images to PDF",
    description: "Combine multiple images into a single PDF. Drag to reorder, choose page size and orientation.",
    tags: ["JPG→PDF", "PNG→PDF", "Multi-page"],
    popular: false,
  },
  {
    href: "/pdf-merger",
    icon: Layers,
    color: "orange",
    title: "PDF Merger",
    description: "Merge multiple PDF files into one. Drag to reorder pages before combining.",
    tags: ["Merge", "Reorder", "Download"],
    popular: false,
  },
];

const colorMap: Record<string, { border: string; bg: string; icon: string; badge: string; tag: string }> = {
  blue:    { border: "hover:border-blue-500/50",    bg: "group-hover:bg-blue-500/10",    icon: "text-blue-400",    badge: "bg-blue-500/10 text-blue-300",    tag: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
  violet:  { border: "hover:border-violet-500/50",  bg: "group-hover:bg-violet-500/10",  icon: "text-violet-400",  badge: "bg-violet-500/10 text-violet-300",  tag: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
  emerald: { border: "hover:border-emerald-500/50", bg: "group-hover:bg-emerald-500/10", icon: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-300", tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  orange:  { border: "hover:border-orange-500/50",  bg: "group-hover:bg-orange-500/10",  icon: "text-orange-400",  badge: "bg-orange-500/10 text-orange-300",  tag: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
};

const features = [
  { icon: Shield, title: "100% Private", desc: "Files are processed in your browser. Nothing is uploaded to any server." },
  { icon: Zap,    title: "Instant",      desc: "No waiting, no queues. Conversion happens in seconds on your device." },
  { icon: Globe,  title: "Free Forever", desc: "No signup, no subscription, no watermarks. Always free." },
  { icon: Star,   title: "High Quality", desc: "Smart algorithms preserve quality while reducing size." },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <ConvertRxLogo size={56} />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0d5f72]/40 bg-[#0d5f72]/10 text-[#7ecfe0] text-sm font-medium mb-6">
              <Shield size={14} /> 100% Free · No Signup · Files Stay on Your Device
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Convert Any File<br />
              <span className="gradient-text">Instantly & Free</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Professional-grade file conversion tools — images, PDFs, and more. Works entirely in your browser. No uploads, no accounts, no limits.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid sm:grid-cols-2 gap-5 mb-20">
            {tools.map((tool) => {
              const c = colorMap[tool.color];
              const Icon = tool.icon;
              return (
                <a key={tool.href} href={tool.href} className={`group relative rounded-2xl border border-white/8 bg-white/[0.02] p-7 tool-card flex flex-col gap-5 ${c.border} transition-all duration-300`}>
                  {tool.popular && (
                    <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>Popular</span>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${c.icon} transition-colors duration-300 ${c.bg}`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white font-bold text-xl mb-2">{tool.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span key={tag} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${c.tag}`}>{tag}</span>
                    ))}
                  </div>
                  <div className={`text-sm font-semibold ${c.icon} flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200`}>
                    Open Tool <span>→</span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Features */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Why Choose ConvertRX?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
