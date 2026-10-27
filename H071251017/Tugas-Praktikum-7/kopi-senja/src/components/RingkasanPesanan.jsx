function RingkasanPesanan({ itemPesanan, jumlahPesanan, totalHarga }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-amber-200">
      <h2 className="mb-3 text-lg font-semibold">Ringkasan Pesanan</h2>

      {itemPesanan.length === 0 ? (
        <p className="text-sm text-stone-500">Belum ada pesanan.</p>
      ) : (
        <ul className="divide-y divide-amber-100">
          {itemPesanan.map((item) => (
            <li key={item.id} className="flex justify-between gap-2 py-2 text-sm">
              <span>
                {item.nama} × {item.jumlah}
              </span>
              <span className="font-medium">
                Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 border-t border-amber-200 pt-3 text-sm">
        <p className="flex justify-between">
          <span>Jumlah pesanan</span>
          <span className="font-semibold">{jumlahPesanan} item</span>
        </p>
        <p className="flex justify-between">
          <span>Total harga</span>
          <span className="font-semibold">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </p>
      </div>
    </section>
  );
}

export default RingkasanPesanan;
