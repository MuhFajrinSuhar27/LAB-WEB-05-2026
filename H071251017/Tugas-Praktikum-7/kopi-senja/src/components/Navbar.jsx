function Navbar({ jumlahPesanan, totalHarga }) {
  return (
    <header className="sticky top-0 z-10 bg-amber-900 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <h1 className="text-xl font-bold">☕ Kedai Kopi Senja</h1>
        <div className="text-right text-sm">
          <p>
            Pesanan: <span className="font-semibold">{jumlahPesanan}</span> item
          </p>
          <p>
            Total:{" "}
            <span className="font-semibold">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
