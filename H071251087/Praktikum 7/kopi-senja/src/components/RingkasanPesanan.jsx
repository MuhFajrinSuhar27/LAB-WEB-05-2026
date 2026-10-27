function RingkasanPesanan({ items, totalItem, totalHarga, onTambah, onKurangi }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-bold">Ringkasan Pesanan</h2>

      {items.length === 0 ? (
        <p className="text-sm text-stone-500">Belum ada pesanan.</p>
      ) : (
        <ul className="divide-y divide-stone-200">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <img
              src={item.foto}
              alt={item.nama}
              className="h-14 w-14 shrink-0 rounded-xl bg-stone-100 object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{item.nama}</p>
              <p className="text-sm text-stone-500">
                Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
             </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onKurangi(item.id)}
                className="h-7 w-7 rounded bg-stone-200 font-bold hover:bg-stone-300"
                aria-label={`Kurangi ${item.nama}`}
              >
                −
              </button>
              <span className="w-5 text-center">{item.jumlah}</span>
              <button
                type="button"
                onClick={() => onTambah(item.id)}
                className="h-7 w-7 rounded bg-custom-mint font-bold text-stone-900 hover:bg-stone-400"
                aria-label={`Tambah ${item.nama}`}
              >
                +
              </button>
            </div>
          </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex justify-between border-t border-stone-300 pt-3 font-semibold">
        <span>{totalItem} item</span>
        <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
      </div>
    </section>
  );
}

export default RingkasanPesanan;
