import { useState } from 'react'

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, jumlahDipesan, onTambah }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false)

  return (
    <li
      className={
        'flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 ' +
        (tersedia ? '' : 'opacity-50')
      }
    >
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{kategori}</p>
      <h3 className="mt-1 text-lg font-semibold text-zinc-900">{nama}</h3>
      <p className="text-sm text-zinc-500">Rp {harga.toLocaleString('id-ID')}</p>

      {detailTerbuka && <p className="mt-3 text-sm text-zinc-500">{deskripsi}</p>}

      <div className="mt-auto flex items-center justify-between gap-2 pt-5">
        <button
          type="button"
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          className="text-sm text-zinc-500 transition hover:text-zinc-900"
        >
          {detailTerbuka ? 'Tutup detail' : 'Lihat detail'}
        </button>

        <button
          type="button"
          onClick={() => onTambah(id)}
          disabled={!tersedia}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
        >
          {tersedia ? `Tambah${jumlahDipesan > 0 ? ` (${jumlahDipesan})` : ''}` : 'Habis'}
        </button>
      </div>
    </li>
  )
}

export default MenuCard
