"use client";

import { useState } from "react";

const gayaInput =
  "w-full rounded-2xl border border-line/80 bg-white/90 px-4 py-3 text-base text-ink outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-aksen focus:bg-white focus:ring-4 focus:ring-aksen/15 shadow-2xs";

export default function Usulan() {
  const [terkirim, setTerkirim] = useState(null);

  function kirim(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setTerkirim({ judul: data.get("judul"), nama: data.get("nama") });
    e.currentTarget.reset();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pt-16">
      <p className="label flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-aksen" aria-hidden="true" />
        Usulan Koleksi
      </p>
      <h1 className="display masuk mt-4 text-[clamp(3rem,7vw,5.5rem)]">
        Ada buku yang
        <br />
        ingin kami simpan?
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        Beritahu kami judul yang menurut Anda layak masuk rak Pustaka Senja.
      </p>

      {terkirim && (
        <div
          role="status"
          className="mt-8 rounded-2xl border border-aksen/40 bg-aksen/10 p-5 pl-6 text-sm text-ink backdrop-blur-sm"
        >
          <p className="font-serif text-lg font-medium text-aksen">Usulan Diterima!</p>
          <p className="mt-1 text-muted">
            Terima kasih, <strong>{terkirim.nama}</strong>. Usulan judul “<strong>{terkirim.judul}</strong>” sudah kami catat dalam antrean pertimbangan koleksi.
          </p>
        </div>
      )}

      <form
        onSubmit={kirim}
        className="mt-10 space-y-8 rounded-3xl border border-line/80 bg-white/70 p-6 shadow-[0_16px_36px_-16px_rgba(26,26,24,0.08)] backdrop-blur-md sm:p-10"
      >
        <div>
          <label htmlFor="nama" className="label mb-2 block font-medium">
            Nama Anda
          </label>
          <input
            id="nama"
            name="nama"
            required
            className={gayaInput}
            placeholder="Nama lengkap atau panggilan"
          />
        </div>
        <div>
          <label htmlFor="judul" className="label mb-2 block font-medium">
            Judul buku yang diusulkan
          </label>
          <input
            id="judul"
            name="judul"
            required
            className={gayaInput + " font-serif text-xl sm:text-2xl"}
            placeholder="Judul buku"
          />
        </div>
        <div>
          <label htmlFor="alasan" className="label mb-2 block font-medium">
            Alasan rekomendasi
          </label>
          <textarea
            id="alasan"
            name="alasan"
            rows={4}
            className={gayaInput + " resize-y leading-relaxed"}
            placeholder="Mengapa buku ini layak dibaca bersama?"
          />
        </div>
        <button type="submit" className="btn">
          Kirim usulan <span className="panah">→</span>
        </button>
      </form>
    </div>
  );
}
