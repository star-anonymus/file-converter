import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import {
  ImageIcon, FileDown, FilePlus2, Layers, FileText,
  Shield, Zap, Globe, Star, ArrowRight, Check,
  Upload, Download, Settings2, Users,
} from "lucide-react";

const tools = [
  {
    href: "/image-converter",
    icon: ImageIcon,
    color: "teal",
    title: "Image Converter",
    description: "Convert between JPG, PNG, WEBP, GIF, BMP — instantly in your browser. Batch convert multiple files at once.",
    tags: ["JPG", "PNG", "WEBP", "GIF", "BMP"],
    popular: true,
  },
  {
    href: "/image-compressor",
    icon: FileDown,
    color: "green",
    title: "Image Compressor",
    description: "Reduce image file size without visible quality loss. Perfect for websites, email, and social media.",
    tags: ["Lossless", "Lossy", "Batch"],
    popular: true,
  },
  {
    href: "/pdf-to-word",
    icon: FileText,
    color: "teal",
    title: "PDF to Word",
    description: "Extract text from any PDF and download it as an editable .docx Word file. 100% free, no upload needed.",
    tags: ["PDF→DOCX", "Editable", "Batch"],
    popular: true,
  },
  {
    href: "/images-to-pdf",
    icon: FilePlus2,
    color: "green",
    title: "Images to PDF",
    description: "Combine multiple images into a single PDF. Drag to reorder, choose page size and orientation.",
    tags: ["JPG→PDF", "PNG→PDF", "Multi-page"],
    popular: false,
  },
  {
    href: "/pdf-merger",
    icon: Layers,
    color: "teal",
    title: "PDF Merger",
    description: "Merge multiple PDF files into one. Drag to reorder pages before combining.",
    tags: ["Merge", "Reorder", "Download"],
    popular: false,
  },
];

const colorMap: Record<string, { card: string; icon: string; badge: string; tag: string; arrow: string; bar: string }> = {
  teal: {
    card:  "border-[#14788F]/18 hover:border-[#14788F]/50 hover:shadow-[0_12px_36px_rgba(20,120,143,0.12)]",
    icon:  "bg-[#14788F]/10 text-[#14788F]",
    badge: "bg-[#14788F]/10 text-[#14788F] font-semibold",
    tag:   "bg-[#14788F]/08 text-[#14788F] border-[#14788F]/20",
    arrow: "text-[#14788F]",
    bar:   "from-[#14788F] to-[#5ca823]",
  },
  green: {
    card:  "border-[#5ca823]/18 hover:border-[#5ca823]/50 hover:shadow-[0_12px_36px_rgba(92,168,35,0.12)]",
    icon:  "bg-[#5ca823]/10 text-[#5ca823]",
    badge: "bg-[#5ca823]/10 text-[#5ca823] font-semibold",
    tag:   "bg-[#5ca823]/08 text-[#5ca823] border-[#5ca823]/20",
    arrow: "text-[#5ca823]",
    bar:   "from-[#5ca823] to-[#14788F]",
  },
};

const stats = [
  { num: "5+",   label: "Conversion Tools", icon: ImageIcon, color: "teal" },
  { num: "100%", label: "Browser-Based",    icon: Shield,    color: "green" },
  { num: "0MB",  label: "Data Uploaded",    icon: Globe,     color: "teal" },
  { num: "∞",    label: "Always Free",      icon: Star,      color: "green" },
];

const formats = [
  {
    emoji: "📷", name: "JPG / JPEG",
    bestFor: ["Photographs", "Social media images", "Web images"],
    size: "Small",
    caveat: "No transparent background support.",
  },
  {
    emoji: "🖼️", name: "PNG",
    bestFor: ["Logos & graphics", "Screenshots", "Transparent backgrounds"],
    size: "Larger",
    caveat: "Not ideal for photographs at small sizes.",
  },
  {
    emoji: "⚡", name: "WEBP",
    bestFor: ["Web images", "Modern browsers", "Fast-loading sites"],
    size: "Very Small",
    caveat: "Limited support in older software.",
  },
  {
    emoji: "🎞️", name: "GIF",
    bestFor: ["Animations", "Simple graphics", "Memes & reactions"],
    size: "Medium",
    caveat: "Maximum 256 colours per frame.",
  },
  {
    emoji: "🗃️", name: "BMP",
    bestFor: ["Uncompressed storage", "Windows compatibility", "Print workflows"],
    size: "Very Large",
    caveat: "No compression — large file sizes.",
  },
  {
    emoji: "📄", name: "PDF",
    bestFor: ["Documents & reports", "Print-ready files", "Universal sharing"],
    size: "Varies",
    caveat: "Use PDF to Word to extract editable text.",
  },
];

const sizeBadgeColor: Record<string, string> = {
  "Small":      "bg-[#5ca823]/10 text-[#5ca823]",
  "Larger":     "bg-amber-50 text-amber-600",
  "Very Small": "bg-[#5ca823]/15 text-[#5ca823]",
  "Medium":     "bg-amber-50 text-amber-600",
  "Very Large": "bg-red-50 text-red-500",
  "Varies":     "bg-slate-100 text-slate-500",
};

const personas = [
  { emoji: "👩‍💻", title: "Web Developers",   desc: "Convert images to WEBP for faster load times. Optimise assets directly in the browser." },
  { emoji: "📸", title: "Photographers",     desc: "Batch convert RAW outputs to web-ready JPG or PNG without expensive software." },
  { emoji: "🎓", title: "Students",           desc: "Convert PDFs to Word documents for easy editing. Merge lecture PDFs into one file." },
  { emoji: "📱", title: "Content Creators",  desc: "Resize and convert images for Instagram, YouTube, TikTok — all in one place." },
];

const whyFeatures = [
  { icon: Shield, title: "100% Private",          desc: "Files are processed in your browser using local compute. Nothing is ever sent to any server." },
  { icon: Zap,    title: "Lightning Fast",         desc: "Conversion happens in milliseconds using optimised browser APIs." },
  { icon: Globe,  title: "No Software Required",  desc: "Works on any device with a modern browser. Chrome, Firefox, Safari, Edge." },
  { icon: Star,   title: "No Quality Loss",        desc: "Smart algorithms preserve maximum quality while achieving target formats." },
  { icon: Check,  title: "No Limits",             desc: "No file size restrictions, no daily limits, no paid tiers. Convert as much as you need." },
  { icon: Users,  title: "Built for Everyone",    desc: "Clean, intuitive interface designed for all skill levels." },
];

const faqItems = [
  {
    q: "Is ConvertRX really free?",
    a: "Yes, completely free. No paid plans, no watermarks, no daily limits. Every tool on ConvertRX is free to use as much as you want, forever.",
  },
  {
    q: "Are my files safe? Do you store them?",
    a: "Your files never leave your device. ConvertRX processes everything locally in your browser using JavaScript and Canvas APIs. We have no servers that receive your files.",
  },
  {
    q: "What's the maximum file size I can convert?",
    a: "There's no hard limit enforced by us — it depends on your device's memory. Most devices handle files up to 500MB comfortably. Very large files (>1GB) may be slow depending on your computer's RAM.",
  },
  {
    q: "Can I convert multiple files at once?",
    a: "Yes! The Image Converter and Image Compressor support batch processing. Select multiple files at once and they'll all be converted together.",
  },
  {
    q: "What's the difference between JPG and WEBP?",
    a: "WEBP is a modern format developed by Google that achieves 25–35% smaller file sizes than JPG at equivalent visual quality. It's ideal for web use. JPG has broader compatibility, including older software and some social media platforms.",
  },
  {
    q: "Can ConvertRX convert scanned PDFs to Word?",
    a: "The PDF to Word tool extracts selectable text from PDFs. If your PDF is a scanned image (no selectable text), the tool won't be able to extract content — you'd need OCR (Optical Character Recognition) software for that.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── SECTION 1: HERO ── */}
        <section className="relative overflow-hidden bg-white pt-32 pb-24 px-6">
          {/* Dot grid */}
          <div className="hero-pattern absolute inset-0 z-0 pointer-events-none" />
          {/* Teal orb */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#14788F]/10 blur-[120px] pointer-events-none" />
          {/* Green orb */}
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#5ca823]/08 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#14788F]/20 shadow-sm text-[#14788F] text-xs font-bold mb-6">
              ✦ 5 Free Tools · No Upload Required · Works Offline
            </div>

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-slate-900">
              Convert Any File,<br />
              <span className="gradient-text">In Seconds.</span>
            </h1>

            {/* Sub */}
            <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Professional-grade file conversion — images, PDFs, and more. Processes entirely in your browser. No uploads, no accounts, no limits.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="#tools"
                className="btn-teal px-8 py-4 rounded-2xl text-base font-bold inline-flex items-center gap-2 shadow-lg shadow-[#14788F]/25 hover:shadow-xl hover:shadow-[#14788F]/30 transition-all"
              >
                Start Converting <ArrowRight size={18} />
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-2xl text-base font-semibold border border-slate-200 text-slate-600 hover:border-[#14788F]/40 hover:text-[#14788F] transition-all bg-white"
              >
                See How It Works
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["5 Conversion Tools", "No File Upload", "100% Free Forever", "Works Offline"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5ca823]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: STATS STRIP ── */}
        <section className="bg-[#eaf4f7] border-y border-[#14788F]/12 py-10 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#14788F]/12">
            {stats.map(({ num, label, icon: Icon, color }) => (
              <div key={label} className="stat-pill">
                <Icon
                  size={28}
                  className={`mx-auto mb-1 ${color === "teal" ? "text-[#14788F]" : "text-[#5ca823]"}`}
                />
                <span className="text-4xl font-black text-[#14788F]">{num}</span>
                <span className="text-sm text-slate-500 font-medium text-center">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: TOOLS GRID ── */}
        <section id="tools" className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <span className="inline-flex gap-2 items-center text-xs font-bold text-[#14788F] bg-[#14788F]/08 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                Our Tools
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Everything You Need to Convert</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-base">
                Five powerful tools covering the most common file conversion needs — all free, all browser-based.
              </p>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((tool) => {
                const c = colorMap[tool.color];
                const Icon = tool.icon;
                return (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className={`group relative rounded-2xl border bg-white p-7 flex flex-col gap-5 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${c.card}`}
                  >
                    {/* Accent bar */}
                    <div className={`absolute top-0 left-6 right-6 h-[3px] rounded-b-full bg-gradient-to-r ${c.bar}`} />

                    {/* Popular badge */}
                    {tool.popular && (
                      <span className={`absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full ${c.badge}`}>Popular</span>
                    )}

                    {/* Icon */}
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center w-14 h-14 ${c.icon}`}>
                      <Icon size={24} />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h2 className="text-slate-900 font-bold text-lg mb-2">{tool.title}</h2>
                      <p className="text-slate-500 text-sm leading-relaxed">{tool.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <span key={tag} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${c.tag}`}>{tag}</span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className={`text-sm font-semibold ${c.arrow} flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200`}>
                      Open Tool →
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: HOW IT WORKS ── */}
        <section id="how-it-works" className="bg-[#eaf4f7] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <span className="inline-flex gap-2 items-center text-xs font-bold text-[#14788F] bg-[#14788F]/08 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                Simple Process
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-base">Convert files in 3 simple steps</p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting lines (desktop only) */}
              <div className="hidden md:block absolute top-6 left-[calc(33.33%+16px)] right-[calc(33.33%+16px)] border-t-2 border-dashed border-[#14788F]/25 z-0" />

              {[
                { num: "1", icon: Upload,    title: "Upload Your File",       desc: "Drag and drop or click to select any image or PDF from your device. No size limits, no registration needed." },
                { num: "2", icon: Settings2, title: "Choose Your Settings",   desc: "Select output format, quality, and options. Smart defaults mean you can skip this step entirely." },
                { num: "3", icon: Download,  title: "Download Instantly",     desc: "Your converted file downloads to your device immediately. Processing happens locally — files never touch our servers." },
              ].map(({ num, icon: Icon, title, desc }) => (
                <div key={num} className="relative z-10 bg-white rounded-2xl p-7 border border-[#14788F]/12 card-shadow flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="step-num">{num}</div>
                    <div className="w-10 h-10 bg-[#14788F]/10 rounded-xl flex items-center justify-center">
                      <Icon size={20} className="text-[#14788F]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: FORMAT GUIDE ── */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <span className="inline-flex gap-2 items-center text-xs font-bold text-[#14788F] bg-[#14788F]/08 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                Format Guide
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Supported Formats</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-base">Everything you need to know about file formats</p>
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formats.map(({ emoji, name, bestFor, size, caveat }) => (
                <div key={name} className="format-card flex flex-col gap-4">
                  {/* Title */}
                  <div className="inline-flex items-center gap-2 bg-[#14788F]/08 text-[#14788F] font-bold text-sm px-3 py-1.5 rounded-full self-start">
                    <span>{emoji}</span> {name}
                  </div>

                  {/* Best for */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Best for</p>
                    <ul className="space-y-1">
                      {bestFor.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check size={13} className="text-[#5ca823] shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#14788F]/08">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sizeBadgeColor[size]}`}>
                      {size} file size
                    </span>
                    <span className="text-xs text-slate-400 text-right max-w-[55%] leading-snug">{caveat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: WHO IS IT FOR ── */}
        <section className="bg-[#eaf4f7] py-20 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-flex gap-2 items-center text-xs font-bold text-[#14788F] bg-[#14788F]/08 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                Use Cases
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Who Uses ConvertRX?</h2>
              <p className="text-slate-500 max-w-xl mx-auto text-base">Built for everyone — no technical knowledge needed</p>
            </div>

            {/* Persona cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {personas.map(({ emoji, title, desc }) => (
                <div key={title} className="bg-white border border-[#14788F]/14 rounded-2xl p-6 text-center card-shadow">
                  <div className="text-4xl mb-3">{emoji}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: WHY CONVERTX ── */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-flex gap-2 items-center text-xs font-bold text-[#14788F] bg-[#14788F]/08 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                Why Us
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Why Choose ConvertRX?</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyFeatures.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="border border-[#14788F]/12 rounded-2xl p-6 bg-white card-shadow flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#14788F]/10 text-[#14788F]">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 8: FAQ ── */}
        <section className="bg-[#eaf4f7] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-flex gap-2 items-center text-xs font-bold text-[#14788F] bg-[#14788F]/08 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                FAQ
              </span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <FAQSection items={faqItems} />
          </div>
        </section>

        {/* ── SECTION 9: CTA BANNER ── */}
        <section className="cta-gradient py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white border border-white/25 text-xs font-bold mb-6">
              Free Forever
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
              Start Converting Your Files Today
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              No signup. No software. No limits. Just fast, free file conversion right in your browser.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="#tools"
                className="px-8 py-4 rounded-2xl text-base font-bold bg-white text-[#14788F] inline-flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg"
              >
                Start Converting Now →
              </a>
              <a
                href="#tools"
                className="px-8 py-4 rounded-2xl text-base font-semibold border border-white/40 text-white hover:bg-white/10 transition-all"
              >
                View All Tools
              </a>
            </div>

            {/* Trust strip */}
            <p className="mt-10 text-white/60 text-sm">
              5 tools available · Files stay on your device · 100% free
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
