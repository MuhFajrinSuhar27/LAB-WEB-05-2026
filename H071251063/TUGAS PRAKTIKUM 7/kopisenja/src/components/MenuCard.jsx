function MenuCard({ menu, onTambah, onLihatDetail }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-xl font-bold text-amber-950">
          {menu.nama}
        </h2>

        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-900">
          {menu.kategori}
        </span>
      </div>

      <p className="mb-4 text-sm text-stone-600">
        {menu.deskripsi}
      </p>

      <p className="mb-4 text-lg font-bold text-amber-800">
        Rp {menu.harga.toLocaleString('id-ID')}
      </p>

      <p className={`mb-4 text-sm font-medium ${
        menu.tersedia ? 'text-green-700' : 'text-red-600'
      }`}>
        {menu.tersedia ? 'Tersedia' : 'Habis'}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onLihatDetail(menu)}
          className="flex-1 rounded-lg border border-amber-800 px-3 py-2 text-sm text-amber-900 hover:bg-amber-50"
        >
          Detail
        </button>

        <button
          onClick={() => onTambah(menu)}
          disabled={!menu.tersedia}
          className="flex-1 rounded-lg bg-amber-800 px-3 py-2 text-sm text-white hover:bg-amber-900 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          Tambah
        </button>
      </div>
    </div>
  )
}

export default MenuCard
