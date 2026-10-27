import { useState } from "react";
import Navbar from "./components/Navbar";
import MenuList from "./components/MenuList";
import RingkasanPesanan from "./components/RingkasanPesanan";
import FormPesan from "./components/FormPesan";
import Footer from "./components/Footer";

// Satu-satunya sumber data menu
const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function App() {
  // Pesanan disimpan sebagai [{ id, jumlah }]; jumlah & total dihitung dari sini
  const [pesanan, setPesanan] = useState([]);
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesananTerkirim, setPesananTerkirim] = useState(null);

  // Data turunan (bukan state tambahan)
  const itemPesanan = pesanan.map((p) => {
    const menu = dataMenu.find((m) => m.id === p.id);
    return {
      id: menu.id,
      nama: menu.nama,
      harga: menu.harga,
      jumlah: p.jumlah,
    };
  });
  const jumlahPesanan = itemPesanan.reduce((total, item) => total + item.jumlah, 0);
  const totalHarga = itemPesanan.reduce((total, item) => total + item.harga * item.jumlah, 0);

  function tambahPesanan(id) {
    const menu = dataMenu.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return; // menu habis tidak bisa dipesan

    setPesananTerkirim(null);
    setPesanan((sebelumnya) => {
      const sudahAda = sebelumnya.some((p) => p.id === id);
      if (sudahAda) {
        return sebelumnya.map((p) =>
          p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p
        );
      }
      return [...sebelumnya, { id, jumlah: 1 }];
    });
  }

  function kirimPesanan(nama, meja) {
    setPesananTerkirim({ nama, meja });
    setPesanan([]);
  }

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 text-stone-800">
      <Navbar jumlahPesanan={jumlahPesanan} totalHarga={totalHarga} />

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 p-4 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <MenuList
            daftarMenu={dataMenu}
            daftarKategori={daftarKategori}
            kategoriAktif={kategoriAktif}
            onUbahKategori={setKategoriAktif}
            onTambah={tambahPesanan}
          />
        </section>

        <aside className="space-y-6">
          {pesananTerkirim !== null && (
            <div
              role="status"
              className="rounded-xl border border-green-300 bg-green-100 p-4 text-green-800"
            >
              <p className="font-semibold">Terima kasih, {pesananTerkirim.nama}!</p>
              <p className="text-sm">
                Pesanan untuk meja {pesananTerkirim.meja} sudah kami terima dan
                segera disiapkan.
              </p>
            </div>
          )}

          <RingkasanPesanan
            itemPesanan={itemPesanan}
            jumlahPesanan={jumlahPesanan}
            totalHarga={totalHarga}
          />

          <FormPesan jumlahPesanan={jumlahPesanan} onKirim={kirimPesanan} />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default App;
