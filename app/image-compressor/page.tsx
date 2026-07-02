"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileDown, Download, Trash2, RefreshCw, Upload, CheckCircle2, TrendingDown } from "lucide-react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CompressedFile { name: string; url: string; originalSize: number; compressedSize: number; savings: number; }

function formatBytes(b: number) {
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [maxSizeMB, setMaxSizeMB] = useState(1);
  const [results, setResults] = useState<CompressedFile[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    onDrop: (accepted) => { setFiles((p) => [...p, ...accepted]); setResults([]); },
    maxSize: 30 * 1024 * 1024,
    onDropRejected: () => toast.error("File too large. Max 30MB per image."),
  });

  const handleCompress = async () => {
    if (!files.length) { toast.error("Please add at least one image."); return; }
    setCompressing(true); setResults([]); setProgress(0);
    const out: CompressedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      try {
        const compressed = await imageCompression(f, { maxSizeMB, useWebWorker: true, initialQuality: quality / 100 });
        const url = URL.createObjectURL(compressed);
        const savings = Math.round((1 - compressed.size / f.size) * 100);
        out.push({ name: f.name, url, originalSize: f.size, compressedSize: compressed.size, savings });
      } catch {
        out.push({ name: f.name, url: "", originalSize: f.size, compressedSize: 0, savings: 0 });
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setResults(out);
    setCompressing(false);
    const totalSaved = out.reduce((a, r) => a + (r.originalSize - r.compressedSize), 0);
    toast.success(`Saved ${formatBytes(totalSaved)} total!`);
  };

  const downloadAll = () => results.filter((r) => r.url).forEach((r) => { const a = document.createElement("a"); a.href = r.url; a.download = `compressed_${r.name}`; a.click(); });
  const totalSavings = results.length ? Math.round(results.reduce((a, r) => a + r.savings, 0) / results.length) : 0;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#5ca823]/15 border border-[#5ca823]/30 flex items-center justify-center text-[#5ca823] mx-auto mb-4">
              <FileDown size={26} />
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-3">Image Compressor</h1>
            <p className="text-gray-400 max-w-lg mx-auto">Reduce image file size without noticeable quality loss. Batch process multiple images. Private — runs in your browser.</p>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 mb-5 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
                Quality — <span className="text-white">{quality}%</span>
                <span className="ml-2 text-gray-600 normal-case font-normal">({quality >= 80 ? "High" : quality >= 60 ? "Medium" : "Low"})</span>
              </label>
              <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full accent-[#5ca823]" />
              <div className="flex justify-between text-xs text-gray-600 mt-1"><span>Smaller file</span><span>Better quality</span></div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
                Max Output Size — <span className="text-white">{maxSizeMB} MB</span>
              </label>
              <input type="range" min={0.1} max={5} step={0.1} value={maxSizeMB} onChange={(e) => setMaxSizeMB(+e.target.value)} className="w-full accent-[#5ca823]" />
              <div className="flex justify-between text-xs text-gray-600 mt-1"><span>0.1 MB</span><span>5 MB</span></div>
            </div>
          </div>

          {/* Dropzone */}
          <div {...getRootProps()} className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 mb-5 ${isDragActive ? "dropzone-active" : "border-white/10 hover:border-[#5ca823]/50 hover:bg-[#5ca823]/05"}`}>
            <input {...getInputProps()} />
            <Upload size={36} className="mx-auto text-gray-600 mb-4" />
            <p className="text-white font-semibold text-lg mb-1">Drop images here</p>
            <p className="text-gray-500 text-sm">or click to browse · JPG, PNG, WEBP · Max 30MB each</p>
          </div>

          {/* Progress */}
          {compressing && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white font-medium">Compressing...</span>
                <span className="text-sm font-bold" style={{ color: "#5ca823" }}>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full progress-bar transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <TrendingDown size={18} className="text-green-400" />
                  <span className="text-white font-semibold">Average savings: <span className="text-green-400">{totalSavings}%</span></span>
                </div>
                <button onClick={() => { setFiles([]); setResults([]); }} className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm">
                  <Trash2 size={14} /> Clear
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/3 rounded-xl px-4 py-3 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                      <span className="text-sm text-gray-300 truncate">{r.name}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-gray-600 line-through">{formatBytes(r.originalSize)}</span>
                      <span className="text-xs text-green-400 font-semibold">{formatBytes(r.compressedSize)}</span>
                      <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold">-{r.savings}%</span>
                      {r.url && <a href={r.url} download={`compressed_${r.name}`} className="text-[#5ca823] hover:text-[#a3e635] transition-colors"><Download size={15} /></a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={handleCompress} disabled={compressing || !files.length}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-[#5ca823]/20 btn-green">
              {compressing ? <RefreshCw size={18} className="animate-spin-slow" /> : <FileDown size={18} />}
              {compressing ? "Compressing..." : "Compress Images"}
            </button>
            {results.some((r) => r.url) && (
              <button onClick={downloadAll} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#0d5f72]/30 bg-[#0d5f72]/10 text-[#7ecfe0] font-semibold hover:bg-[#0d5f72]/20 transition-all duration-200">
                <Download size={18} /> Download All
              </button>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
