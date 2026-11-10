import { useState } from 'react'

function FormPesan({ jumlahItem, onKirim }) {
  const [nama, setNama] = useState('')
  const [meja, setMeja] = useState('')
  const [error, setError] = useState({ nama: '', meja: '', pesanan: '' })

  function handleSubmit(e) {
    e.preventDefault()

    const namaBersih = nama.trim()
    const mejaAngka = Number(meja)
    const errorBaru = { nama: '', meja: '', pesanan: '' }

    if (jumlahItem === 0) {
      errorBaru.pesanan = 'Pesanan masih kosong. Pilih menu terlebih dahulu.'
    }
    if (namaBersih.length < 2) {
      errorBaru.nama = 'Nama wajib diisi (minimal 2 huruf).'
    }
    if (meja.trim() === '' || !Number.isInteger(mejaAngka) || mejaAngka < 1) {
      errorBaru.meja = 'Nomor meja harus berupa angka bulat mulai dari 1.'
    }

    setError(errorBaru)

    if (errorBaru.pesanan || errorBaru.nama || errorBaru.meja) return

    onKirim(namaBersih)
    setNama('')
    setMeja('')
  }

  const kelasInput = (ada) =>
    'mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 ' +
    (ada
      ? 'border-red-300 focus:ring-red-100'
      : 'border-zinc-200 focus:border-zinc-400 focus:ring-zinc-100')

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-zinc-200 p-5">
      <h2 className="text-lg font-semibold text-zinc-900">Data Pemesan</h2>

      <div className="mt-4">
        <label htmlFor="nama" className="text-sm font-medium text-zinc-700">
          Nama
        </label>
        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className={kelasInput(error.nama)}
        />
        {error.nama && <p className="mt-1 text-xs text-red-600">{error.nama}</p>}
      </div>

      <div className="mt-4">
        <label htmlFor="meja" className="text-sm font-medium text-zinc-700">
          Nomor Meja
        </label>
        <input
          id="meja"
          type="text"
          inputMode="numeric"
          value={meja}
          onChange={(e) => setMeja(e.target.value)}
          placeholder="Contoh: 5"
          className={kelasInput(error.meja)}
        />
        {error.meja && <p className="mt-1 text-xs text-red-600">{error.meja}</p>}
      </div>

      {error.pesanan && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error.pesanan}
        </p>
      )}

      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        Kirim Pesanan
      </button>
    </form>
  )
}

export default FormPesan
