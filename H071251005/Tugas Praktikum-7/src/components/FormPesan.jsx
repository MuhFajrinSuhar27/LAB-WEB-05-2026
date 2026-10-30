import React from 'react';
export default function FormPesan({ namaPelanggan, nomorMeja, onNamaChange, onMejaChange, onSubmit, pesanError }) {
  return (
    <section className="rounded-3xl border border-coffee-100 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-5">
        <p className="eyebrow">Satu langkah lagi</p>
        <h2 className="mt-1 text-xl font-extrabold tracking-tight text-coffee-900">Data pemesan</h2>
        <p className="mt-1 text-xs leading-relaxed text-stone-500">Isi data agar pesanan bisa kami antarkan ke mejamu.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="nama-pelanggan" className="mb-2 block text-xs font-bold text-coffee-800">Nama pemesan</label>
          <input
            id="nama-pelanggan"
            name="namaPelanggan"
            type="text"
            value={namaPelanggan}
            onChange={(event) => onNamaChange(event.target.value)}
            placeholder="Contoh: Dimas"
            autoComplete="name"
            className="focus-ring w-full rounded-xl border border-coffee-200 bg-coffee-50/50 px-4 py-3 text-sm text-coffee-900 placeholder:text-stone-400"
          />
        </div>
        <div>
          <label htmlFor="nomor-meja" className="mb-2 block text-xs font-bold text-coffee-800">Nomor meja</label>
          <input
            id="nomor-meja"
            name="nomorMeja"
            type="number"
            min="1"
            step="1"
            value={nomorMeja}
            onChange={(event) => onMejaChange(event.target.value)}
            placeholder="Contoh: 5"
            className="focus-ring w-full rounded-xl border border-coffee-200 bg-coffee-50/50 px-4 py-3 text-sm text-coffee-900 placeholder:text-stone-400"
          />
        </div>

        {pesanError && (
          <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium leading-relaxed text-rose-700">{pesanError}</div>
        )}

        <button type="submit" className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-coffee-800 px-5 py-3.5 text-sm font-extrabold text-white shadow-md shadow-coffee-900/10 transition hover:bg-coffee-700">
          Kirim pesanan <span aria-hidden="true">→</span>
        </button>
        <p className="text-center text-[10px] leading-relaxed text-stone-400">Pastikan nama, nomor meja, dan pesanan sudah benar.</p>
      </form>
    </section>
  );
}
