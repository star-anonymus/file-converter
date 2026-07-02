import type { NextConfig } from "next";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

// Copy the pdf.js worker to public/ so it's served as a static asset.
// This avoids relying on a CDN that may not have the installed version.
try {
  const src = join(process.cwd(), "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
  const dest = join(process.cwd(), "public/pdf.worker.min.mjs");
  if (existsSync(src)) copyFileSync(src, dest);
} catch {
  console.warn("[next.config] Could not copy pdf.js worker to public/");
}

const nextConfig: NextConfig = {};
export default nextConfig;
