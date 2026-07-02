"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FilePlus2, Download, Trash2, RefreshCw, Upload, GripVertical, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ImageFile { file: File; preview: string; id: string; }

export default function ImagesToPdfPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<"A4" | "Letter" | "Fit">("A4");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    onDrop: (accepted) => {
      const newImages = accepted.map((f) => ({ file: f, preview: URL.createObjectURL(f), id: Math.random().toString(36).slice(2) }));
      setImages((p) => [...p, ...newImages]);
      setPdfUrl(null);
    },
  });

  const remove = (id: string) => setImages((p) => p.filter((i) => i.id !== id));

  const handleConvert = async () => {
    if (!images.length) { toast.error("Add at least one image."); return; }
    setConverting(true);
    try {
      const pdf = await PDFDocument.create();
      for (const { file } of images) {
        const bytes = await file.arrayBuffer();
        const isJpeg = file.type === "image/jpeg";
        const img = isJpeg ? await pdf.embedJpg(bytes) : await pdf.embedPng(bytes);
        let w = img.width, h = img.height;
        if (pageSize === "A4") { const scale = Math.min(595 / w, 842 / h); w *= scale; h *= scale; }
        else if (pageSize === "Letter") { const scale = Math.min(612 / w, 792 / h); w *= scale; h *= scale; }
        const page = pdf.addPage([w, h]);
        page.drawImage(img, { x: 0, y: 0, width: w, height: h });
      }
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
      toast.success("PDF created successfully!");
    } catch {
      toast.error("Failed to create PDF. Please try again.");
    }
    setConverting(false);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#0d5f72]/15 border border-[#0d5f72]/30 flex items-center justify-center text-[#1a8fa8] mx-auto mb-4">
              <FilePlus2 size={26} />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-3">Images to PDF</h1>
            <p className="text-gray-400 max-w-lg mx-auto">Combine multiple images into a single PDF. Reorder images, choose page size. 100% private — runs in your browser.</p>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 mb-5">
            <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">Page Size</label>
            <div className="flex gap-2">
              {(["A4", "Letter", "Fit"] as const).map((s) => (
                <button key={s} onClick={() => setPageSize(s)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${pageSize === s ? "bg-[#0d5f72] border-[#0d5f72] text-white" : "border-white/10 text-gray-400 hover:border-[#0d5f72]/40 hover:text-white"}`}>
                  {s === "Fit" ? "Fit to Image" : s}
                </button>
              ))}
            </div>
          </div>

          {/* Dropzone */}
          <div {...getRootProps()} className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 mb-5 ${isDragActive ? "dropzone-active" : "border-white/10 hover:border-[#0d5f72]/50 hover:bg-[#0d5f72]/05"}`}>
            <input {...getInputProps()} />
            <Upload size={36} className="mx-auto text-gray-600 mb-4" />
            <p className="text-white font-semibold text-lg mb-1">Drop images here</p>
            <p className="text-gray-500 text-sm">or click to browse · JPG, PNG, WEBP</p>
          </div>

          {/* Image grid with remove */}
          {images.length > 0 && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-semibold text-sm">{images.length} image{images.length > 1 ? "s" : ""} · drag to reorder</p>
                <button onClick={() => { setImages([]); setPdfUrl(null); }} className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm">
                  <Trash2 size={14} /> Clear all
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((img, i) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-square bg-white/5">
                    <img src={img.preview} alt={img.file.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => remove(img.id)} className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                        <X size={13} />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 w-5 h-5 rounded-full bg-black/60 text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleConvert} disabled={converting || !images.length}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-[#0d5f72]/25 btn-teal">
              {converting ? <RefreshCw size={18} className="animate-spin-slow" /> : <FilePlus2 size={18} />}
              {converting ? "Creating PDF..." : "Create PDF"}
            </button>
            {pdfUrl && (
              <a href={pdfUrl} download="images.pdf" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#5ca823]/30 bg-[#5ca823]/10 text-[#a3e635] font-semibold hover:bg-[#5ca823]/20 transition-all duration-200">
                <Download size={18} /> Download PDF
              </a>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
