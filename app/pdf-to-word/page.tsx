"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Download, X, Loader2, AlertCircle, CheckCircle2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PdfFile {
  file: File;
  status: "idle" | "converting" | "done" | "error";
  docxBlob?: Blob;
  errorMsg?: string;
  pageCount?: number;
}

export default function PdfToWordPage() {
  const [items, setItems] = useState<PdfFile[]>([]);
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const pdfs = accepted.filter((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    if (pdfs.length === 0) {
      toast.error("Please upload PDF files only.");
      return;
    }
    setItems((prev) => [
      ...prev,
      ...pdfs.map((f) => ({ file: f, status: "idle" as const })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const removeItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const convertAll = async () => {
    if (items.length === 0) return;
    setConverting(true);

    // Dynamically import heavy libs so they don't block initial page load
    const [{ default: pdfjsLib }, docx] = await Promise.all([
      import("pdfjs-dist"),
      import("docx"),
    ]);

    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;

    // Point pdf.js worker to the CDN build matching the installed version
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.status === "done") continue;

      setItems((prev) =>
        prev.map((it, idx) => (idx === i ? { ...it, status: "converting" } : it))
      );

      try {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pageCount = pdf.numPages;

        const docParagraphs: InstanceType<typeof Paragraph>[] = [
          // Title from filename
          new Paragraph({
            text: item.file.name.replace(/\.pdf$/i, ""),
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 300 },
          }),
        ];

        for (let p = 1; p <= pageCount; p++) {
          const page = await pdf.getPage(p);
          const textContent = await page.getTextContent();

          // Group text items into lines by approximate Y position
          const lineMap = new Map<number, string[]>();
          for (const item of textContent.items) {
            if (!("str" in item)) continue;
            const y = Math.round((item as { transform: number[]; str: string }).transform[5]);
            if (!lineMap.has(y)) lineMap.set(y, []);
            lineMap.get(y)!.push((item as { str: string }).str);
          }

          // Sort lines top-to-bottom (higher Y = higher on page in PDF coords)
          const sortedLines = Array.from(lineMap.entries())
            .sort((a, b) => b[0] - a[0])
            .map(([, words]) => words.join(" ").trim())
            .filter((l) => l.length > 0);

          if (pageCount > 1) {
            docParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `— Page ${p} —`,
                    color: "888888",
                    size: 18,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 200 },
              })
            );
          }

          for (const line of sortedLines) {
            // Heuristic: short lines with larger apparent font may be headings
            const isLikelyHeading = line.length < 80 && line === line.toUpperCase() && line.length > 3;
            docParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    bold: isLikelyHeading,
                    size: isLikelyHeading ? 26 : 22,
                  }),
                ],
                spacing: { after: isLikelyHeading ? 120 : 60 },
              })
            );
          }
        }

        const doc = new Document({
          creator: "ConvertRX",
          title: item.file.name.replace(/\.pdf$/i, ""),
          sections: [{ children: docParagraphs }],
        });

        const blob = await Packer.toBlob(doc);
        setItems((prev) =>
          prev.map((it, idx) =>
            idx === i ? { ...it, status: "done", docxBlob: blob, pageCount } : it
          )
        );
      } catch (err) {
        console.error(err);
        setItems((prev) =>
          prev.map((it, idx) =>
            idx === i ? { ...it, status: "error", errorMsg: "Conversion failed. The PDF may be scanned or image-only." } : it
          )
        );
      }
    }

    setConverting(false);
    toast.success("Conversion complete!");
  };

  const downloadOne = (item: PdfFile) => {
    if (!item.docxBlob) return;
    const url = URL.createObjectURL(item.docxBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.file.name.replace(/\.pdf$/i, ".docx");
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    items.filter((it) => it.status === "done").forEach(downloadOne);
  };

  const doneCount = items.filter((it) => it.status === "done").length;
  const idleCount = items.filter((it) => it.status === "idle").length;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
              <FileText size={26} className="text-indigo-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">PDF to Word</h1>
            <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
              Extract text from your PDF and save it as an editable <strong className="text-gray-300">.docx</strong> file.
              Works entirely in your browser — nothing is uploaded.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
              <AlertCircle size={12} />
              Text-based PDFs only — scanned/image PDFs cannot be extracted
            </div>
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 mb-6
              ${isDragActive
                ? "border-indigo-400 bg-indigo-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"}`}
          >
            <input {...getInputProps()} />
            <Upload size={28} className={`mx-auto mb-3 ${isDragActive ? "text-indigo-400" : "text-gray-500"}`} />
            <p className="text-gray-300 font-medium">
              {isDragActive ? "Drop your PDFs here" : "Drag & drop PDF files here"}
            </p>
            <p className="text-gray-600 text-sm mt-1">or click to browse</p>
          </div>

          {/* File list */}
          {items.length > 0 && (
            <div className="space-y-3 mb-6">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <FileText size={18} className="text-indigo-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.file.name}</p>
                    <p className="text-gray-600 text-xs mt-0.5">
                      {(item.file.size / 1024).toFixed(1)} KB
                      {item.pageCount ? ` · ${item.pageCount} page${item.pageCount > 1 ? "s" : ""}` : ""}
                    </p>
                  </div>

                  {/* Status */}
                  {item.status === "idle" && (
                    <span className="text-xs text-gray-500 shrink-0">Ready</span>
                  )}
                  {item.status === "converting" && (
                    <Loader2 size={16} className="text-indigo-400 animate-spin shrink-0" />
                  )}
                  {item.status === "done" && (
                    <div className="flex items-center gap-2 shrink-0">
                      <CheckCircle2 size={16} className="text-green-400" />
                      <button
                        onClick={() => downloadOne(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
                      >
                        <Download size={13} /> Download
                      </button>
                    </div>
                  )}
                  {item.status === "error" && (
                    <div className="flex items-center gap-1.5 text-red-400 text-xs shrink-0">
                      <AlertCircle size={14} /> Failed
                    </div>
                  )}

                  {item.status !== "converting" && (
                    <button onClick={() => removeItem(i)} className="text-gray-600 hover:text-gray-300 transition-colors shrink-0">
                      <X size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Error detail */}
          {items.some((it) => it.status === "error") && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 flex items-start gap-2">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <p>One or more files failed. This usually means the PDF is scanned (image-only) or password-protected. Only text-based PDFs can be converted.</p>
            </div>
          )}

          {/* Actions */}
          {items.length > 0 && (
            <div className="flex gap-3">
              {idleCount > 0 && (
                <button
                  onClick={convertAll}
                  disabled={converting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200"
                >
                  {converting ? (
                    <><Loader2 size={18} className="animate-spin" /> Converting…</>
                  ) : (
                    <><FileText size={18} /> Convert to Word</>
                  )}
                </button>
              )}
              {doneCount > 1 && (
                <button
                  onClick={downloadAll}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200"
                >
                  <Download size={16} /> Download All
                </button>
              )}
              <button
                onClick={() => setItems([])}
                className="px-4 py-3 rounded-xl border border-white/8 text-gray-500 hover:text-gray-300 hover:border-white/15 text-sm transition-all"
              >
                Clear
              </button>
            </div>
          )}

          {/* Info box */}
          <div className="mt-10 rounded-2xl border border-white/5 bg-white/[0.02] p-6 grid sm:grid-cols-3 gap-5 text-center">
            {[
              { emoji: "🔒", title: "100% Private", desc: "PDFs are processed locally in your browser. Never uploaded." },
              { emoji: "📝", title: "Editable Text", desc: "Get a real .docx file you can open and edit in Microsoft Word." },
              { emoji: "⚡", title: "Instant", desc: "No server queues. Conversion happens in seconds on your device." },
            ].map(({ emoji, title, desc }) => (
              <div key={title}>
                <div className="text-2xl mb-2">{emoji}</div>
                <p className="text-white font-semibold text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
