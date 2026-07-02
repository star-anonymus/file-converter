"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Layers, Download, Trash2, RefreshCw, Upload, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PdfFile { file: File; id: string; pages?: number; }
function formatBytes(b: number) { if (b < 1048576) return (b / 1024).toFixed(1) + " KB"; return (b / 1048576).toFixed(1) + " MB"; }

export default function PdfMergerPage() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: async (accepted) => {
      const withPages = await Promise.all(accepted.map(async (f) => {
        try { const buf = await f.arrayBuffer(); const doc = await PDFDocument.load(buf); return { file: f, id: Math.random().toString(36).slice(2), pages: doc.getPageCount() }; }
        catch { return { file: f, id: Math.random().toString(36).slice(2) }; }
      }));
      setPdfs((p) => [...p, ...withPages]);
      setMergedUrl(null);
    },
    onDropRejected: () => toast.error("Please upload PDF files only."),
  });

  const remove = (id: string) => setPdfs((p) => p.filter((f) => f.id !== id));
  const moveUp = (i: number) => { if (i === 0) return; const a = [...pdfs]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; setPdfs(a); };
  const moveDown = (i: number) => { if (i === pdfs.length - 1) return; const a = [...pdfs]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; setPdfs(a); };

  const handleMerge = async () => {
    if (pdfs.length < 2) { toast.error("Add at least 2 PDF files."); return; }
    setMerging(true);
    try {
      const merged = await PDFDocument.create();
      for (const { file } of pdfs) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      setMergedUrl(URL.createObjectURL(blob));
      toast.success(`Merged ${pdfs.length} PDFs successfully!`);
    } catch {
      toast.error("Failed to merge PDFs. Files may be encrypted.");
    }
    setMerging(false);
  };

  const totalPages = pdfs.reduce((a, p) => a + (p.pages ?? 0), 0);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#5ca823]/15 border border-[#5ca823]/30 flex items-center justify-center text-[#5ca823] mx-auto mb-4">
              <Layers size={26} />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-3">PDF Merger</h1>
            <p className="text-gray-400 max-w-lg mx-auto">Combine multiple PDF files into one. Reorder using the arrows before merging. Runs entirely in your browser.</p>
          </div>

          {/* Dropzone */}
          <div {...getRootProps()} className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 mb-5 ${isDragActive ? "dropzone-active" : "border-white/10 hover:border-[#5ca823]/50 hover:bg-[#5ca823]/05"}`}>
            <input {...getInputProps()} />
            <Upload size={36} className="mx-auto text-gray-600 mb-4" />
            <p className="text-white font-semibold text-lg mb-1">Drop PDF files here</p>
            <p className="text-gray-500 text-sm">or click to browse · PDF files only</p>
          </div>

          {/* PDF list */}
          {pdfs.length > 0 && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-semibold text-sm">{pdfs.length} PDF{pdfs.length > 1 ? "s" : ""} · {totalPages} pages total</p>
                  <p className="text-gray-600 text-xs mt-0.5">Use arrows to reorder before merging</p>
                </div>
                <button onClick={() => { setPdfs([]); setMergedUrl(null); }} className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm">
                  <Trash2 size={14} /> Clear all
                </button>
              </div>
              <div className="space-y-2">
                {pdfs.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3 bg-white/3 rounded-xl px-4 py-3">
                    <span className="w-7 h-7 rounded-lg bg-[#5ca823]/15 text-[#5ca823] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{p.file.name}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{formatBytes(p.file.size)}{p.pages ? ` · ${p.pages} page${p.pages > 1 ? "s" : ""}` : ""}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => moveUp(i)} disabled={i === 0} className="w-7 h-7 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-all flex items-center justify-center text-xs font-bold">↑</button>
                      <button onClick={() => moveDown(i)} disabled={i === pdfs.length - 1} className="w-7 h-7 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-all flex items-center justify-center text-xs font-bold">↓</button>
                      <button onClick={() => remove(p.id)} className="w-7 h-7 rounded-lg bg-white/5 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center"><X size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleMerge} disabled={merging || pdfs.length < 2}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-[#5ca823]/20 btn-green">
              {merging ? <RefreshCw size={18} className="animate-spin-slow" /> : <Layers size={18} />}
              {merging ? "Merging..." : `Merge ${pdfs.length} PDFs`}
            </button>
            {mergedUrl && (
              <a href={mergedUrl} download="merged.pdf" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#0d5f72]/30 bg-[#0d5f72]/10 text-[#7ecfe0] font-semibold hover:bg-[#0d5f72]/20 transition-all duration-200">
                <Download size={18} /> Download Merged PDF
              </a>
            )}
          </div>
          {pdfs.length === 1 && <p className="text-amber-400 text-xs mt-3 flex items-center gap-1.5">⚠ Add at least one more PDF to enable merging.</p>}

        </div>
      </main>
      <Footer />
    </>
  );
}
