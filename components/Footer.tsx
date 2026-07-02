import { Zap, Shield, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center"><Zap size={14} className="text-white" /></div>
              <span className="font-bold gradient-text">FileConvert</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">Free online file conversion tools. No signup, no watermarks, no limits. Built for everyone.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {[["Image Converter","/image-converter"],["Image Compressor","/image-compressor"],["Images to PDF","/images-to-pdf"],["PDF Merger","/pdf-merger"]].map(([l,h])=>(
                <li key={h}><a href={h} className="hover:text-blue-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Why FileConvert?</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              {([["shield","100% Private — files never leave your browser"],["globe","Works on any device"],["zap","Instant conversion, no waiting"]] as const).map(([type, t], i)=>(
                <li key={i} className="flex items-start gap-2">
                  {type === "shield" && <Shield size={14} className="text-blue-400 mt-0.5 shrink-0" />}
                  {type === "globe" && <Globe size={14} className="text-blue-400 mt-0.5 shrink-0" />}
                  {type === "zap" && <Zap size={14} className="text-blue-400 mt-0.5 shrink-0" />}
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} FileConvert. All rights reserved.</p>
          <p className="flex items-center gap-1.5"><Shield size={13} className="text-green-500" /><span className="text-green-500 font-medium">Files processed locally</span> — never uploaded to any server</p>
        </div>
      </div>
    </footer>
  );
}
