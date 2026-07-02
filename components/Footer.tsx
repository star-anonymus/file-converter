import { Shield, Globe, Zap } from "lucide-react";
import ConvertRxLogo from "./ConvertRxLogo";

export default function Footer() {
  return (
    <footer className="border-t border-[#14788F]/12 bg-[#eaf4f7] py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="mb-3">
              <ConvertRxLogo size={30} />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">Free online file conversion tools. No signup, no watermarks, no limits. Built for everyone.</p>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold text-sm mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {[["Image Converter","/image-converter"],["Image Compressor","/image-compressor"],["Images to PDF","/images-to-pdf"],["PDF Merger","/pdf-merger"],["PDF to Word","/pdf-to-word"]].map(([l,h])=>(
                <li key={h}><a href={h} className="hover:text-[#14788F] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold text-sm mb-3">Why ConvertRX?</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {([["shield","100% Private — files never leave your browser"],["globe","Works on any device"],["zap","Instant conversion, no waiting"]] as const).map(([type, t], i)=>(
                <li key={i} className="flex items-start gap-2">
                  {type === "shield" && <Shield size={14} className="mt-0.5 shrink-0" style={{ color: "#5ca823" }} />}
                  {type === "globe"  && <Globe  size={14} className="mt-0.5 shrink-0" style={{ color: "#14788F" }} />}
                  {type === "zap"    && <Zap    size={14} className="mt-0.5 shrink-0" style={{ color: "#14788F" }} />}
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#14788F]/12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} ConvertRX. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Shield size={13} className="text-[#5ca823]" />
            <span className="text-[#5ca823] font-medium">Files processed locally</span> — never uploaded to any server
          </p>
        </div>
      </div>
    </footer>
  );
}
