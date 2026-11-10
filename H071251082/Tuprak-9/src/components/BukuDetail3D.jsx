"use client";

import { useEffect, useState } from "react";
import CoverBuku from "@/components/CoverBuku";

export default function BukuDetail3D({ buku }) {
  const [mode, setMode] = useState("tutup");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMode("buka");
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  function toggleMode(next) {
    setMode(next);
  }

  const rotasiSampul =
    mode === "penuh" ? "-rotate-y-[120deg]" : mode === "buka" ? "-rotate-y-[38deg]" : "rotate-y-0";

  const rotasiWadah =
    mode === "penuh"
      ? "rotate-y-[12deg] -translate-x-4"
      : mode === "buka"
      ? "-rotate-y-[14deg] translate-y-0"
      : "rotate-y-0";

  return (
    <div className="flex flex-col items-center">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[17rem] select-none [perspective:1400px] sm:max-w-[19rem]">
        <div
          className={`relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] ${rotasiWadah}`}
        >
          <div
            className="absolute inset-0 rounded-r-md border border-line/60 bg-[#fbf7ee] shadow-[0_20px_35px_-10px_rgba(0,0,0,0.3)] overflow-hidden"
            style={{ transform: "translateZ(-8px)" }}
            aria-hidden="true"
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-4 border-l border-line/40"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, #f3ede2 0px, #f3ede2 2px, #e4dac7 2px, #e4dac7 3.5px)",
                boxShadow: "inset 2px 0 4px rgba(0,0,0,0.12)",
              }}
            />
            <div
              className="absolute left-0 right-4 bottom-0 h-3 border-t border-line/40"
              style={{
                background:
                  "repeating-linear-gradient(to right, #f3ede2 0px, #f3ede2 2px, #e4dac7 2px, #e4dac7 3.5px)",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
              }}
            />

            <div className="absolute inset-0 right-4 flex flex-col justify-between p-5 pl-7 bg-gradient-to-r from-[#e8decb] via-[#faf6ee] to-[#faf6ee]">
              <div>
                <div className="flex items-center justify-between border-b border-line/60 pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted/80">
                    Pustaka Senja
                  </span>
                  <span className="font-mono text-[9px] text-muted/70">hlm. 1</span>
                </div>

                <div className="mt-4">
                  <span className="label text-[10px] text-aksen">{buku.kategori}</span>
                  <h3 className="mt-1 font-serif text-lg font-bold leading-tight text-ink">
                    {buku.judul}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{buku.penulis}</p>
                </div>

                <div className="mt-4">
                  <span className="h-px w-8 bg-aksen/40 block mb-2" />
                  <p className="font-serif text-[11px] leading-relaxed text-ink/80 italic line-clamp-6">
                    “{buku.sinopsis}”
                  </p>
                </div>
              </div>

              <div className="border-t border-line/50 pt-2 flex items-center justify-between text-[10px] font-mono text-muted/70">
                <span>Terbit: {buku.tahun}</span>
                <span>{buku.tersedia ? "● Tersedia" : "○ Dipinjam"}</span>
              </div>
            </div>

            <div
              className={`absolute top-0 left-[35%] w-3.5 bg-aksen shadow-[2px_3px_6px_rgba(0,0,0,0.35)] transition-all duration-700 ${
                mode === "penuh" ? "h-[75%]" : "h-[60%]"
              }`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)",
                transformOrigin: "top center",
              }}
            />
          </div>

          <div
            className={`relative h-full w-full origin-left transition-transform duration-700 ease-out [transform-style:preserve-3d] ${rotasiSampul}`}
          >
            <div className="h-full w-full [backface-visibility:hidden]">
              <CoverBuku buku={buku} besar />

              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                  mode !== "tutup" ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.05) 55%, transparent 75%)",
                }}
              />
            </div>

            <div
              className="absolute inset-0 h-full w-full rounded-l-md border border-line/60 bg-[#eee5d3] p-5 shadow-inner [backface-visibility:hidden] [transform:rotateY(180deg)]"
              aria-hidden="true"
            >
              <div className="flex h-full flex-col justify-between border border-line/40 p-4">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-7 w-7 rounded-full border border-aksen/40 flex items-center justify-center text-aksen text-xs font-serif">
                    ❦
                  </div>
                  <p className="font-serif text-sm font-semibold tracking-wide text-ink">
                    {buku.judul}
                  </p>
                  <p className="font-mono text-[10px] text-muted mt-1">{buku.penulis}</p>
                </div>
                <div className="text-center text-[10px] font-mono text-muted/60">
                  Pustaka Senja · Ruang Baca
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-full border border-line bg-paper/80 p-1 shadow-xs">
        <button
          type="button"
          onClick={() => toggleMode("tutup")}
          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
            mode === "tutup"
              ? "bg-ink text-paper shadow-xs"
              : "text-muted hover:bg-paper-deep hover:text-ink"
          }`}
          title="Tutup sampul buku"
        >
          📕 Tutup
        </button>

        <button
          type="button"
          onClick={() => toggleMode("buka")}
          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
            mode === "buka"
              ? "bg-aksen text-paper shadow-xs"
              : "text-muted hover:bg-paper-deep hover:text-ink"
          }`}
          title="Buka buku sebagian"
        >
          📖 Buka
        </button>

        <button
          type="button"
          onClick={() => toggleMode("penuh")}
          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
            mode === "penuh"
              ? "bg-ink text-paper shadow-xs"
              : "text-muted hover:bg-paper-deep hover:text-ink"
          }`}
          title="Buka buku penuh"
        >
          📖📖 Baca Isi
        </button>
      </div>

      <p className="mt-2 text-[11px] font-mono text-muted/70">
        Klik tombol di atas untuk mengubah posisi buku
      </p>
    </div>
  );
}
