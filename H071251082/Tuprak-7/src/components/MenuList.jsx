import MenuCard from './MenuCard'

function MenuList({
  daftarMenu,
  daftarKategori,
  kategoriAktif,
  pesanan,
  onPilihKategori,
  onTambah,
}) {
  return (
    <section className="lg:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-zinc-900">Menu</h2>

        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1">
          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              type="button"
              onClick={() => onPilihKategori(kategori)}
              className={
                'rounded-md px-3 py-1.5 text-sm font-medium transition ' +
                (kategori === kategoriAktif
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900')
              }
            >
              {kategori}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {daftarMenu.map((menu) => {
          const dipesan = pesanan.find((p) => p.id === menu.id)
          return (
            <MenuCard
              key={menu.id}
              id={menu.id}
              nama={menu.nama}
              kategori={menu.kategori}
              harga={menu.harga}
              tersedia={menu.tersedia}
              deskripsi={menu.deskripsi}
              jumlahDipesan={dipesan ? dipesan.jumlah : 0}
              onTambah={onTambah}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default MenuList
