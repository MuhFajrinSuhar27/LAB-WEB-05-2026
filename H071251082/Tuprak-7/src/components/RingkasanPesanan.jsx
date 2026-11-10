function RingkasanPesanan({itemPesanan,jumlahItem,totalHarga,onTambah,onKurangi,onKosongkan,}) {
  return (
    <section className="rounded-xl border border-zinc-200 p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">Pesanan</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500">{jumlahItem} item</span>
          {itemPesanan.length > 0 && (
            <button
              type="button"
              onClick={onKosongkan}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-1 py-1 text-sm font-medium text-red-600 transition duration-200 hover:border-red-600 hover:bg-red-600 hover:text-white active:scale-95"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {itemPesanan.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-400">Belum ada pesanan.</p>
      ) : (
        <ul className="mt-3 divide-y divide-zinc-100">
          {itemPesanan.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium text-zinc-900">{item.nama}</p>
                <p className="text-xs text-zinc-500">
                  Rp {item.harga.toLocaleString('id-ID')} × {item.jumlah}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onKurangi(item.id)}
                  aria-label={`Kurangi ${item.nama}`}
                  className="h-7 w-7 rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-medium">{item.jumlah}</span>
                <button
                  type="button"
                  onClick={() => onTambah(item.id)}
                  aria-label={`Tambah ${item.nama}`}
                  className="h-7 w-7 rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-baseline justify-between border-t border-zinc-100 pt-4">
        <p className="text-sm text-zinc-500">Total</p>
        <p className="text-lg font-semibold text-zinc-900">
          Rp {totalHarga.toLocaleString('id-ID')}
        </p>
      </div>
    </section>
  )
}

export default RingkasanPesanan