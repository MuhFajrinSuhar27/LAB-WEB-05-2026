
import MenuCard from './MenuCard'

function MenuList({ daftarMenu, onTambah, onLihatDetail }) {
  if (daftarMenu.length === 0) {
    return (
      <p className="col-span-full py-10 text-center text-stone-500">
        Tidak ada menu dalam kategori ini.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {daftarMenu.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          onTambah={onTambah}
          onLihatDetail={onLihatDetail}
        />
      ))}
    </div>
  )
}

export default MenuList
