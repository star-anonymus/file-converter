"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ConvertRxLogo from "./ConvertRxLogo";

const links = [
  { href: "/image-converter", label: "Image Converter" },
  { href: "/image-compressor", label: "Compressor" },
  { href: "/images-to-pdf", label: "Images → PDF" },
  { href: "/pdf-merger", label: "PDF Merger" },
  { href: "/pdf-to-word", label: "PDF → Word" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070e14]/85 backdrop-blur-xl border-b border-[#14788F]/20">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <ConvertRxLogo size={34} />
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#14788F]/15 transition-all duration-200">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="/" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-200 btn-teal">
          All Tools
        </a>
        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-[#0a1720]/95 backdrop-blur-xl border-t border-[#14788F]/15 px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#14788F]/15 transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
