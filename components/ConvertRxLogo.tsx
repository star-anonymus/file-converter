"use client";
import { useId } from "react";

interface Props {
  iconOnly?: boolean;
  size?: number;
  className?: string;
}

export default function ConvertRxLogo({ iconOnly = false, size = 36, className = "" }: Props) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-z0-9]/gi, "");
  const tId = `ta${uid}`;
  const gId = `ga${uid}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Arrowhead markers — orient="auto" rotates them to match path direction */}
          <marker id={tId} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0,0 8,3 0,6" fill="#0d5f72" />
          </marker>
          <marker id={gId} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0,0 8,3 0,6" fill="#5ca823" />
          </marker>
        </defs>

        {/* Teal arc — top semicircle, drawn CCW (sweep=0) from left to right via top */}
        <path
          d="M 8 20 A 12 12 0 0 0 32 20"
          stroke="#0d5f72"
          strokeWidth="4"
          strokeLinecap="butt"
          fill="none"
          markerEnd={`url(#${tId})`}
        />

        {/* Green arc — bottom semicircle, drawn CW (sweep=1) from right to left via bottom */}
        <path
          d="M 32 20 A 12 12 0 0 1 8 20"
          stroke="#5ca823"
          strokeWidth="4"
          strokeLinecap="butt"
          fill="none"
          markerEnd={`url(#${gId})`}
        />

        {/* Document icon in center */}
        <rect x="14" y="12" width="12" height="16" rx="1.5" fill="white" stroke="#0d5f72" strokeWidth="1.2" />
        {/* Folded top-right corner */}
        <path d="M 22 12 L 26 16 L 22 16 Z" fill="#cde9f0" stroke="#0d5f72" strokeWidth="0.8" />
        {/* Document lines */}
        <line x1="16.5" y1="19" x2="23.5" y2="19" stroke="#0d5f72" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="16.5" y1="21.5" x2="23.5" y2="21.5" stroke="#0d5f72" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="16.5" y1="24" x2="21" y2="24" stroke="#5ca823" strokeWidth="0.9" strokeLinecap="round" />
        {/* Small convert arrow inside doc */}
        <line x1="16.5" y1="16" x2="20" y2="16" stroke="#5ca823" strokeWidth="1" strokeLinecap="round" />
        <polygon points="20,14.5 22,16 20,17.5" fill="#5ca823" />
      </svg>

      {!iconOnly && (
        <div className="leading-none select-none">
          <div className="font-extrabold text-[17px] tracking-tight leading-none">
            <span style={{ color: "#0d5f72" }}>CONVERT</span>
            <span style={{ color: "#5ca823" }}>RX</span>
          </div>
          <div className="text-[7.5px] font-bold tracking-[0.18em] mt-[3px]" style={{ color: "#5ca823" }}>
            FILE CONVERSION TOOLS
          </div>
        </div>
      )}
    </div>
  );
}
