
function RingkasanPesanan({ pesanan, onKurangi, onTambah, totalHarga }) {
  const jumlahItem = pesanan.reduce(
    (total, item) => total + item.jumlah,
    0
  )

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-amber-950">
        Semua Pesanan
      </h2>

      {pesanan.length === 0 ? (
        <p className="text-sm text-stone-500">
          Belum ada pesanan.
        </p>
      ) : (
        <div className="space-y-4">
          {pesanan.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3"
            >
              <div>
                <p className="font-semibold">{item.nama}</p>
                <p className="text-sm text-stone-500">
                  Rp {item.harga.toLocaleString('id-ID')} × {item.jumlah}
                </p>
                <p className="text-sm font-medium text-amber-800">
                  Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onKurangi(item.id)}
                  className="rounded-lg bg-stone-100 px-3 py-1"
                  aria-label={`Kurangi ${item.nama}`}
                >
                  −
                </button>

                <span>{item.jumlah}</span>

                <button
                  type="button"
                  onClick={() => onTambah(item)}
                  className="rounded-lg bg-amber-100 px-3 py-1"
                  aria-label={`Tambah ${item.nama}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex justify-between border-t border-stone-200 pt-4">
        <span className="text-stone-600">Jumlah item</span>
        <span className="font-semibold">{jumlahItem}</span>
      </div>

      <div className="mt-3 flex justify-between text-lg font-bold text-amber-950">
        <span>Total</span>
        <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
      </div>
    </section>
  )
}

export default RingkasanPesanan
