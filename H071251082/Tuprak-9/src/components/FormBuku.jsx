"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import CoverBuku from "@/components/CoverBuku";

const kosong = {
  judul: "",
  penulis: "",
  kategori: "",
  tahun: "",
  tersedia: "true",
  sinopsis: "",
};

function Medan({ label, nama, galat, children, petunjuk }) {
  return (
    <div>
      <label htmlFor={nama} className="label mb-2 block font-medium">
        {label}
      </label>
      <div>{children}</div>
      {petunjuk && !galat && <p className="mt-2 text-xs text-muted">{petunjuk}</p>}
      {galat && (
        <p id={`${nama}-galat`} className="mt-2 text-xs font-medium text-galat">
          {galat}
        </p>
      )}
    </div>
  );
}

const gayaInput =
  "w-full rounded-2xl border border-line/80 bg-white/90 px-4 py-3 text-base text-ink outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-aksen focus:bg-white focus:ring-4 focus:ring-aksen/15 shadow-2xs";

export default function FormBuku({
  action,
  nilaiAwal = kosong,
  kategoriSaran = [],
  labelTombol,
  batalHref,
  idPratinjau,
}) {
  const [state, formAction, pending] = useActionState(action, {
    values: nilaiAwal,
    errors: {},
  });
  const v = state.values && Object.keys(state.values).length ? state.values : nilaiAwal;
  const e = state.errors ?? {};

  const [pv, setPv] = useState({
    judul: v.judul,
    penulis: v.penulis,
    kategori: v.kategori,
  });

  function saatMengetik(ev) {
    const f = new FormData(ev.currentTarget);
    setPv({
      judul: String(f.get("judul") ?? ""),
      penulis: String(f.get("penulis") ?? ""),
      kategori: String(f.get("kategori") ?? ""),
    });
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
      <form
        action={formAction}
        onInput={saatMengetik}
        noValidate
        className="space-y-8 rounded-3xl border border-line/80 bg-white/70 p-6 shadow-[0_16px_36px_-16px_rgba(26,26,24,0.08)] backdrop-blur-md sm:p-10"
      >
        {e.form && (
          <p
            role="alert"
            className="rounded-xl border border-galat/30 bg-red-50 p-4 text-sm font-medium text-galat"
          >
            {e.form}
          </p>
        )}

        <Medan label="Judul Buku" nama="judul" galat={e.judul}>
          <input
            id="judul"
            name="judul"
            defaultValue={v.judul}
            maxLength={150}
            aria-invalid={!!e.judul}
            aria-describedby={e.judul ? "judul-galat" : undefined}
            className={gayaInput + " font-serif text-xl sm:text-2xl"}
            placeholder="Judul buku"
          />
        </Medan>

        <div className="grid gap-6 sm:grid-cols-2">
          <Medan label="Penulis" nama="penulis" galat={e.penulis}>
            <input
              id="penulis"
              name="penulis"
              defaultValue={v.penulis}
              maxLength={100}
              aria-invalid={!!e.penulis}
              aria-describedby={e.penulis ? "penulis-galat" : undefined}
              className={gayaInput}
              placeholder="Nama penulis"
            />
          </Medan>

          <Medan label="Kategori" nama="kategori" galat={e.kategori}>
            <input
              id="kategori"
              name="kategori"
              list="saran-kategori"
              defaultValue={v.kategori}
              maxLength={50}
              aria-invalid={!!e.kategori}
              aria-describedby={e.kategori ? "kategori-galat" : undefined}
              className={gayaInput}
              placeholder="Mis. Novel"
            />
            <datalist id="saran-kategori">
              {kategoriSaran.map((k) => (
                <option key={k} value={k} />
              ))}
            </datalist>
          </Medan>

          <Medan label="Tahun Terbit" nama="tahun" galat={e.tahun}>
            <input
              id="tahun"
              name="tahun"
              inputMode="numeric"
              defaultValue={v.tahun}
              maxLength={4}
              aria-invalid={!!e.tahun}
              aria-describedby={e.tahun ? "tahun-galat" : undefined}
              className={gayaInput}
              placeholder="2024"
            />
          </Medan>

          <Medan label="Status Ketersediaan" nama="tersedia" galat={e.tersedia}>
            <select
              id="tersedia"
              name="tersedia"
              defaultValue={v.tersedia}
              className={gayaInput + " cursor-pointer"}
            >
              <option value="true">Tersedia</option>
              <option value="false">Sedang dipinjam</option>
            </select>
          </Medan>
        </div>

        <Medan
          label="Sinopsis Ringkas"
          nama="sinopsis"
          galat={e.sinopsis}
          petunjuk="Minimal 20 karakter."
        >
          <textarea
            id="sinopsis"
            name="sinopsis"
            rows={6}
            defaultValue={v.sinopsis}
            maxLength={2000}
            aria-invalid={!!e.sinopsis}
            aria-describedby={e.sinopsis ? "sinopsis-galat" : undefined}
            className={gayaInput + " resize-y leading-relaxed"}
            placeholder="Ringkasan singkat isi buku..."
          />
        </Medan>

        <div className="flex items-center gap-6 pt-3">
          <button type="submit" disabled={pending} className="btn">
            {pending ? "Menyimpan…" : labelTombol}
            {!pending && <span className="panah">→</span>}
          </button>
          <Link
            href={batalHref}
            className="tautan text-sm font-medium text-muted hover:text-ink"
          >
            Batal
          </Link>
        </div>
      </form>

      <aside
        className="hidden self-start rounded-3xl border border-line/80 bg-white/70 p-6 shadow-[0_14px_32px_-14px_rgba(26,26,24,0.08)] backdrop-blur-md lg:sticky lg:top-28 lg:block"
        aria-hidden="true"
      >
        <p className="label mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-aksen" />
          Pratinjau sampul
        </p>
        <div className="buku3d mx-auto max-w-[15rem]">
          <div className="badan">
            <CoverBuku
              buku={{
                id: idPratinjau,
                judul: pv.judul.trim() || "Judul buku",
                penulis: pv.penulis.trim() || "Penulis",
                kategori: pv.kategori.trim() || "Novel",
              }}
              besar
            />
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-muted">
          Sampul generatif otomatis diperbarui saat Anda mengetik
        </p>
      </aside>
    </div>
  );
}
