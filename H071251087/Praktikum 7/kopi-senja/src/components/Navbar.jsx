import logo from "../assets/logo-128px.png";

function Navbar({
  daftarKategori,
  kategoriAktif,
  onPilihKategori,
  totalItem,
  totalHarga,
}) {
  return (
    <header className="sticky top-0 z-10 bg-amber-50 text-stone-600 shadow">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo Kopi Senja" className="h-10 w-10 rounded-full object-cover" />
          <h1 className="text-xl font-bold">Kedai Kopi Senja</h1>
        </div>

        <nav className="flex gap-2">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              type="button"
              onClick={() => onPilihKategori(kategori)}
              className={
                kategori === kategoriAktif
                  ? "rounded-full bg-custom-mint px-4 py-1.5 text-sm font-semibold text-stone-900"
                  : "rounded-full bg-stone-700 px-4 py-1.5 text-sm text-amber-50 hover:bg-stone-600"
              }
            >
              {kategori}
            </button>
          ))}
        </nav>

        <p className="text-sm">
          Pesanan: <span className="font-bold">{totalItem}</span> item · Total:{" "}
          <span className="font-bold">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </p>
      </div>
    </header>
  );
}

export default Navbar;
