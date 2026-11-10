"use client";

import { useEffect, useRef, useState } from "react";
import { paletDari } from "@/lib/palet";


function Motif({ kategori, p }) {
  switch ((kategori ?? "").toLowerCase()) {
    case "novel":
      return (
        <>
          <circle cx="100" cy="150" r="50" fill={p.aksen} />
          <rect x="0" y="150" width="200" height="150" fill={p.bg} />
          <rect x="0" y="150" width="200" height="1.5" fill={p.fg} opacity="0.5" />
          <rect x="52" y="166" width="96" height="2" fill={p.aksen} opacity="0.7" />
          <rect x="72" y="178" width="56" height="2" fill={p.aksen} opacity="0.5" />
          <rect x="86" y="190" width="28" height="2" fill={p.aksen} opacity="0.35" />
        </>
      );
    case "filsafat":
      return (
        <>
          {[26, 46, 66, 86].map((r, i) => (
            <circle
              key={r}
              cx="100"
              cy="125"
              r={r}
              fill="none"
              stroke={p.fg}
              strokeWidth="1.4"
              opacity={0.75 - i * 0.14}
            />
          ))}
          <circle cx="100" cy="125" r="8" fill={p.aksen} />
        </>
      );
    case "pengembangan diri":
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={28 + i * 30}
              y={200 - (i + 1) * 28}
              width="22"
              height={(i + 1) * 28}
              fill={p.aksen}
              opacity={0.45 + i * 0.13}
            />
          ))}
        </>
      );
    case "sejarah":
      return (
        <>
          <path d="M30 205 V125 a30 30 0 0 1 60 0 V205 Z" fill={p.aksen} opacity="0.55" />
          <path d="M110 205 V95 a30 30 0 0 1 60 0 V205 Z" fill={p.aksen} />
          <rect x="20" y="205" width="160" height="2" fill={p.fg} opacity="0.6" />
        </>
      );
    default:
      return (
        <>
          {Array.from({ length: 24 }, (_, i) => (
            <circle
              key={i}
              cx={40 + (i % 6) * 24}
              cy={70 + Math.floor(i / 6) * 24}
              r={i % 5 === 0 ? 5 : 2.2}
              fill={i % 5 === 0 ? p.aksen : p.fg}
              opacity={i % 5 === 0 ? 1 : 0.5}
            />
          ))}
        </>
      );
  }
}

export default function CoverBuku({ buku, besar = false, className = "" }) {
  const p = paletDari(buku);

  const daftarSumber = buku.sampul ? (besar ? buku.sampul.besar : buku.sampul.kecil) : [];
  const [indeks, setIndeks] = useState(0);
  const sumber = daftarSumber[indeks];

  const imgRef = useRef(null);
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setIndeks((i) => i + 1);
  }, [sumber]);

  return (
    <div
      className={`sampul relative aspect-[2/3] w-full overflow-hidden ${className}`}
      style={{ background: p.bg, color: p.fg }}
      role="img"
      aria-label={`Sampul ${buku.judul}, ${buku.penulis}`}
    >
      <svg
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <Motif kategori={buku.kategori} p={p} />
      </svg>
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-black/20" />
      <div className="relative flex h-full flex-col justify-between p-4 pl-6">
        <p
          className="font-mono uppercase tracking-[0.14em] opacity-80"
          style={{ fontSize: besar ? "0.72rem" : "0.6rem" }}
        >
          {buku.penulis}
        </p>
        <p
          className="font-serif leading-[1.08] tracking-tight"
          style={{ fontSize: besar ? "2rem" : "1.2rem" }}
        >
          {buku.judul}
        </p>
      </div>

      {sumber && (
        <img
          key={sumber}
          ref={imgRef}
          src={sumber}
          alt=""
          loading={besar ? "eager" : "lazy"}
          referrerPolicy="no-referrer"
          onError={() => setIndeks((i) => i + 1)}
          className="absolute inset-0 h-full w-full bg-paper-deep object-cover"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[9%] bg-gradient-to-r from-black/30 via-white/10 to-transparent"
      />
    </div>
  );
}
