import MenuCard from "./MenuCard.jsx";

function MenuList({ menuList, kategori, onTambah }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">Menu {kategori}</h2>
      <div className="grid gap-4">
        {menuList.map((menu) => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            nama={menu.nama}
            harga={menu.harga}
            foto={menu.foto}
            bahan={menu.bahan}
            tersedia={menu.tersedia}
            deskripsi={menu.deskripsi}
            onTambah={onTambah}
          />
        ))}
      </div>
    </section>
  );
}

export default MenuList;