import { cn } from "@/lib/utils";

/**
 * Abstract stand-in for each host application's canvas. Purely decorative,
 * drawn with our own geometry so nothing here implies vendor artwork.
 */
const art: Record<string, React.ReactNode> = {
  blender: (
    <>
      <g stroke="currentColor" strokeWidth="1.1" fill="none" className="text-mint/70">
        <path d="M96 98 160 62l64 36-64 36-64-36Z" />
        <path d="M96 98v44l64 36 64-36v-44" />
        <path d="M160 134v44" />
      </g>
      <g stroke="currentColor" strokeWidth="1" fill="none" className="text-mint/30">
        <path d="M120 70v44l40 22 40-22V70" />
        <path d="M120 114 160 92l40 22" />
      </g>
      <g fill="currentColor" className="text-mint">
        <circle cx="96" cy="98" r="2.6" />
        <circle cx="224" cy="98" r="2.6" />
        <circle cx="160" cy="178" r="2.6" />
      </g>
    </>
  ),
  rhino: (
    <>
      <g stroke="currentColor" strokeWidth="1.2" fill="none" className="text-mint/70">
        <path d="M60 150c28-58 68-86 120-86s72 26 92 74" />
        <path d="M60 168c32-44 70-66 114-66s68 20 88 58" />
      </g>
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="3 4" className="text-mint/35">
        <path d="M60 110h200M60 190h200M120 74v140M200 74v140" />
      </g>
      <g fill="currentColor" className="text-mint">
        <circle cx="60" cy="150" r="3" />
        <circle cx="180" cy="64" r="3" />
        <circle cx="272" cy="138" r="3" />
      </g>
    </>
  ),
  freecad: (
    <>
      <g stroke="currentColor" strokeWidth="1.1" fill="none" className="text-mint/70">
        <path d="M92 84h116v92H92z" />
        <path d="M92 84l26-20h116l-26 20M208 84l26-20v92l-26 20" />
        <rect x="92" y="118" width="116" height="24" />
      </g>
      <g stroke="currentColor" strokeWidth="1" className="text-mint/45">
        <path d="M78 176h24M90 164v24" strokeLinecap="round" />
        <path d="M60 84v92" />
      </g>
      <g fill="currentColor" className="text-mint/60">
        <circle cx="150" cy="130" r="7" />
      </g>
    </>
  ),
  qgis: (
    <>
      <g stroke="currentColor" strokeWidth="1" fill="none" className="text-mint/35">
        <path d="M40 78h240M40 122h240M40 166h240M96 52v148M160 52v148M224 52v148" />
      </g>
      <g stroke="currentColor" strokeWidth="1.3" fill="none" className="text-mint/70">
        <path d="M56 158c22-14 30-40 52-46s34 18 56 10 30-34 60-30" />
      </g>
      <g fill="currentColor" className="text-mint/25">
        <path d="M108 74h96v60h-96z" />
      </g>
      <g fill="currentColor" className="text-mint">
        <circle cx="108" cy="74" r="2.6" />
        <circle cx="204" cy="134" r="2.6" />
      </g>
    </>
  ),
  opencv: (
    <>
      <g stroke="currentColor" strokeWidth="1.1" fill="none" className="text-mint/45">
        <path d="M40 78h240M40 122h240M40 166h240M96 52v148M160 52v148M224 52v148" />
      </g>
      <g stroke="currentColor" strokeWidth="1.4" fill="none" className="text-mint">
        <rect x="84" y="76" width="70" height="66" rx="2" />
        <rect x="176" y="112" width="60" height="54" rx="2" />
      </g>
      <g stroke="currentColor" strokeWidth="1" fill="none" className="text-mint/60">
        <path d="M84 142l30-26 22 20 18-16" />
      </g>
      <g fill="currentColor" className="text-mint">
        <circle cx="134" cy="92" r="2.6" />
        <circle cx="226" cy="128" r="2.6" />
      </g>
      <g className="text-mint/70" fill="currentColor">
        <rect x="70" y="62" width="18" height="4" rx="2" />
        <text x="70" y="196" fontSize="11" fontFamily="var(--font-geist-mono)">
          conf 0.94
        </text>
      </g>
    </>
  ),
};

export function HostViewport({ software, className }: { software: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      fill="none"
    >
      {art[software.toLowerCase()] ?? art.blender}
    </svg>
  );
}
