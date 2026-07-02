"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon, Download, Trash2, RefreshCw, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Format = "image/jpeg" | "image/png" | "image/webp";
const FORMATS: { value: Format; label: string; ext: string }[] = [
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
  { value: "image/png",  label: "PNG", ext: "png" },
  { value: "image/webp", label: "WEBP", ext: "webp" },
];

interface ConvertedFile { name: string; originalName: string; url: string; size: number; status: "done" | "error"; }

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

export default function ImageConverterPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("image/png");
  const [quality, setQuality] = useState(90);
  const [results, setResults] = useState<ConvertedFile[]>([]);
  const [converting, setConverting] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"] },
    onDrop: (accepted) => { setFiles((p) => [...p, ...accepted]); setResults([]); },
    maxSize: 20 * 1024 * 1024,
    onDropRejected: () => toast.error("File too large. Max 20MB per image."),
  });

  const convertFile = (file: File): Promise<ConvertedFile> =>
    new Promise((resolve) => {
      const ext = FORMATS.find((f) => f.value === format)!.ext;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d")!;
        if (format === "image/jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (!blob) { resolve({ name: file.name, originalName: file.name, url: "", size: 0, status: "error" }); return; }
            const url = URL.createObjectURL(blob);
            const baseName = file.name.replace(/\.[^/.]+$/, "");
            resolve({ name: `${baseName}.${ext}`, originalName: file.name, url, size: blob.size, status: "done" });
          },
          format,
          quality / 100,
        );
      };
      img.onerror = () => resolve({ name: file.name, originalName: file.name, url: "", size: 0, status: "error" });
      img.src = URL.createObjectURL(file);
    });

  const handleConvert = async () => {
    if (!files.length) { toast.error("Please add at least one image."); return; }
    setConverting(true);
    setResults([]);
    const converted = await Promise.all(files.map(convertFile));
    setResults(converted);
    setConverting(false);
    const ok = converted.filter((c) => c.status === "done").length;
    if (ok === converted.length) toast.success(`${ok} image${ok > 1 ? "s" : ""} converted!`);
    else toast.error(`${converted.length - ok} file(s) failed.`);
  };

  const downloadAll = () => {
    results.filter((r) => r.status === "done").forEach((r) => {
      const a = document.createElement("a"); a.href = r.url; a.download = r.name; a.click();
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-[#14788F]/15 border border-[#14788F]/30 flex items-center justify-center text-[#1a9ab5] mx-auto mb-4">
              <ImageIcon size={26} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Image Converter</h1>
            <p className="text-slate-500 max-w-lg mx-auto">Convert JPG, PNG, WEBP, GIF, BMP instantly. Batch convert multiple files. 100% private — processed in your browser.</p>
          </div>

          {/* Settings */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-5">
            <div className="flex flex-wrap gap-6 items-end">
              <div className="flex-1 min-w-[180px]">
                <label className="block text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Convert To</label>
                <div className="flex gap-2">
                  {FORMATS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFormat(f.value)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                        format === f.value
                          ? "bg-[#14788F] border-[#14788F] text-slate-900 shadow-lg shadow-[#14788F]/25"
                          : "border-slate-200 text-slate-500 hover:border-[#14788F]/40 hover:text-slate-900"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              {format === "image/jpeg" && (
                <div className="flex-1 min-w-[180px]">
                  <label className="block text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">
                    Quality — <span className="text-slate-900">{quality}%</span>
                  </label>
                  <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)}
                    className="w-full accent-teal-500" />
                </div>
              )}
            </div>
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 mb-5 ${
              isDragActive ? "dropzone-active" : "border-slate-200 hover:border-[#14788F]/50 hover:bg-[#14788F]/05"
            }`}
          >
            <input {...getInputProps()} />
            <Upload size={36} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-900 font-semibold text-lg mb-1">Drop images here</p>
            <p className="text-slate-500 text-sm">or click to browse · JPG, PNG, WEBP, GIF, BMP · Max 20MB each</p>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-900 font-semibold text-sm">{files.length} file{files.length > 1 ? "s" : ""} selected</p>
                <button onClick={() => { setFiles([]); setResults([]); }} className="text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm">
                  <Trash2 size={14} /> Clear all
                </button>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {files.map((f, i) => {
                  const r = results[i];
                  return (
                    <div key={i} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {r ? (r.status === "done"
                          ? <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                          : <AlertCircle size={16} className="text-red-400 shrink-0" />)
                          : <div className="w-4 h-4 rounded-full border-2 border-gray-600 shrink-0" />}
                        <span className="text-sm text-slate-700 truncate">{f.name}</span>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <span className="text-xs text-slate-400">{formatBytes(f.size)}</span>
                        {r?.status === "done" && (
                          <span className="text-xs text-green-500">{formatBytes(r.size)}</span>
                        )}
                        {r?.status === "done" && (
                          <a href={r.url} download={r.name} className="text-[#1a9ab5] hover:text-[#7ecfe0] transition-colors">
                            <Download size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleConvert}
              disabled={converting || !files.length}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-[#14788F]/25 btn-teal"
            >
              {converting ? <RefreshCw size={18} className="animate-spin-slow" /> : <ImageIcon size={18} />}
              {converting ? "Converting..." : "Convert Images"}
            </button>
            {results.some((r) => r.status === "done") && (
              <button onClick={downloadAll} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#5ca823]/30 bg-[#5ca823]/10 text-[#a3e635] font-semibold hover:bg-[#5ca823]/20 transition-all duration-200">
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
