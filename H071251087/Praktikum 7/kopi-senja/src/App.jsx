import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";
import KopiSusu from "./assets/menu-kopi-susu.png";
import Americano from "./assets/menu-americano.png";
import Cappucino from "./assets/menu-cappucino.png";
import MatchaLatte from "./assets/menu-matcha-latte.png";
import TehTarik from "./assets/menu-teh-tarik.png";
import CokelatPanas from "./assets/menu-cokelat-panas.png";
import RotiBakar from "./assets/menu-roti-bakar.png";
import PisangGoreng from "./assets/menu-pisang-goreng.png";
import NasiGoreng from "./assets/menu-nasi-goreng.png";

const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren.",
    foto: KopiSusu,
    bahan: ["Espresso", "Susu segar", "Gula aren", "Es batu"]
  },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih.",
    foto: Americano,
    bahan: ["Espresso", "Air panas", "Es batu"]
  },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal.",
    foto: Cappucino,
    bahan: ["Espresso", "Susu panas", "Busa susu"]
  },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu.",
    foto: MatchaLatte,
    bahan: ["Bubuk matcha", "Susu", "Gula", "Es batu"]
  },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa.",
    foto: TehTarik,
    bahan: ["Teh hitam", "Susu kental manis", "Air panas"]
  },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat.",
    foto: CokelatPanas,
    bahan: ["Cokelat pekat", "Susu hangat", "Gula"]
  },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju.",
    foto: RotiBakar,
    bahan: ["Roti tebal", "Selai cokelat", "Keju", "Mentega"]
  },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju.",
    foto: PisangGoreng,
    bahan: ["Pisang", "Tepung", "Minyak goreng", "Keju"]
  },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi.",
    foto: NasiGoreng,
    bahan: ["Nasi", "Telur", "Kerupuk", "Bawang merah", "Bawang putih", "Kecap manis"]
  },
];

const daftarKategori = ["Kopi", "Non-Kopi", "Makanan"];

function App() {
  // Satu state untuk kategori, satu state untuk pesanan (hanya id + jumlah)
  const [kategoriAktif, setKategoriAktif] = useState("Kopi");
  const [pesanan, setPesanan] = useState([]);

  // Nilai turunan: dihitung dari state, bukan disimpan di state baru
  const itemPesanan = pesanan.map((p) => {
    const menu = dataMenu.find((m) => m.id === p.id);
    return { ...menu, jumlah: p.jumlah };
  });
  const totalItem = itemPesanan.reduce((sum, item) => sum + item.jumlah, 0);
  const totalHarga = itemPesanan.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0
  );

  const menuTampil = dataMenu.filter((m) => m.kategori === kategoriAktif);

  function tambahPesanan(id) {
    const menu = dataMenu.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return;

    setPesanan((lama) => {
      const sudahAda = lama.some((p) => p.id === id);
      if (sudahAda) {
        return lama.map((p) =>
          p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p
        );
      }
      return [...lama, { id, jumlah: 1 }];
    });
  }

  function kurangiPesanan(id) {
    setPesanan((lama) =>
      lama
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0)
    );
  }

  function kosongkanPesanan() {
    setPesanan([]);
  }

  return (
    <div className="min-h-screen bg-custom-cream text-stone-800">
      <Navbar
        daftarKategori={daftarKategori}
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        totalItem={totalItem}
        totalHarga={totalHarga}
      />

      <main className="mx-auto grid max-w-6xl gap-6 p-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MenuList
            menuList={menuTampil}
            kategori={kategoriAktif}
            onTambah={tambahPesanan}
          />
        </div>

        <div className="space-y-6">
          <RingkasanPesanan
            items={itemPesanan}
            totalItem={totalItem}
            totalHarga={totalHarga}
            onTambah={tambahPesanan}
            onKurangi={kurangiPesanan}
          />
          <FormPesan
            jumlahItem={totalItem}
            onKirim={kosongkanPesanan}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
