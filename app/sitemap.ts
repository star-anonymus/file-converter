import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://file-converter-tools.vercel.app";
  const routes = ["", "/image-converter", "/image-compressor", "/images-to-pdf", "/pdf-merger"];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.8 }));
}
