import MenuCard from "./MenuCard";

function MenuList({
  daftarMenu,
  daftarKategori,
  kategoriAktif,
  onUbahKategori,
  onTambah,
}) {
  const menuTampil =
    kategoriAktif === "Semua"
      ? daftarMenu
      : daftarMenu.filter((menu) => menu.kategori === kategoriAktif);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => onUbahKategori(kategori)}
            className={
              "rounded-full px-4 py-2 text-sm font-medium transition " +
              (kategori === kategoriAktif
                ? "bg-amber-800 text-white"
                : "bg-white text-amber-900 ring-1 ring-amber-300 hover:bg-amber-100")
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {menuTampil.map((menu) => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            nama={menu.nama}
            kategori={menu.kategori}
            harga={menu.harga}
            tersedia={menu.tersedia}
            deskripsi={menu.deskripsi}
            onTambah={onTambah}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuList;
