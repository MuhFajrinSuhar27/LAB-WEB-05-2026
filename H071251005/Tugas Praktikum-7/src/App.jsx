import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import MenuList from './components/MenuList.jsx';
import RingkasanPesanan from './components/RingkasanPesanan.jsx';
import FormPesan from './components/FormPesan.jsx';
import Footer from './components/Footer.jsx';
import formatRupiah from './utils/formatRupiah.js';


// Memuat semua foto .jpg dalam folder secara otomatis (tanpa 9 import manual).
// File diurutkan menurut nama 01 sampai 09, lalu dipasangkan ke id menu 1 sampai 9.


const gambarMenu = Object.entries(
  import.meta.glob('./assets/foto-menu-kopi-senja/*.jpg', {
    eager: true,
    query: '?url',
    import: 'default'
  })
).sort(([pathA], [pathB]) => pathA.localeCompare(pathB)).map(([, url]) => url);


export default function App() {
  // Satu sumber data menu: seluruh sembilan menu ditulis hanya di App.jsx.
  const menus = [
    { id: 1, nama: 'Kopi Susu',   kategori: 'Kopi',     harga: 18000, tersedia: true, deskripsi: 'Espresso dengan susu segar dan gula aren.' },
    { id: 2, nama: 'Americano',   kategori: 'Kopi',     harga: 15000, tersedia: true, deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.' },
    { id: 3, nama: 'Cappuccino',  kategori: 'Kopi',     harga: 22000, tersedia: true, deskripsi: 'Espresso, susu panas, dan busa susu tebal.' },
    { id: 4, nama: 'Matcha Latte',kategori: 'Non-Kopi', harga: 24000, tersedia: true, deskripsi: 'Teh hijau matcha dengan susu.' },
    { id: 5, nama: 'Teh Tarik',   kategori: 'Non-Kopi', harga: 14000, tersedia: false, deskripsi: 'Teh susu yang ditarik hingga berbusa.' },
    { id: 6, nama: 'Cokelat Panas',kategori: 'Non-Kopi',harga: 20000, tersedia: true, deskripsi: 'Cokelat pekat dengan susu hangat.' },
    { id: 7, nama: 'Roti Bakar',  kategori: 'Makanan',  harga: 16000, tersedia: true, deskripsi: 'Roti tebal dengan selai cokelat dan keju.' },
    { id: 8, nama: 'Pisang Goreng',kategori: 'Makanan', harga: 12000, tersedia: false, deskripsi: 'Pisang goreng renyah dengan taburan keju.' },
    { id: 9, nama: 'Nasi Goreng',  kategori: 'Makanan', harga: 25000, tersedia: true, deskripsi: 'Nasi goreng kampung dengan telur mata sapi.' }
  ].map((menu) => ({ ...menu, gambar: gambarMenu[menu.id - 1] }));

  const [kategoriAktif, setKategoriAktif] = useState('Semua');
  const [pesanan, setPesanan] = useState([]);
  const [menuTerpilih, setMenuTerpilih] = useState(null);
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [nomorMeja, setNomorMeja] = useState('');
  const [pesanError, setPesanError] = useState('');
  const [pesanSukses, setPesanSukses] = useState('');

  // Nilai ringkasan dihitung dari state pesanan agar tidak ada total ganda.
  const jumlahItem = pesanan.reduce((jumlah, item) => jumlah + item.jumlah, 0);
  const totalHarga = pesanan.reduce((total, item) => {
    const menu = menus.find((dataMenu) => dataMenu.id === item.menuId);
    return total + (menu ? menu.harga * item.jumlah : 0);
  }, 0);
  const menuDitampilkan = kategoriAktif === 'Semua'? menus : menus.filter((menu) => menu.kategori === kategoriAktif);


  function handleTambah(menuId) {
    const menu = menus.find((dataMenu) => dataMenu.id === menuId);
    if (!menu || !menu.tersedia) return;

    setPesanan((pesananSebelumnya) => {
      const sudahAda = pesananSebelumnya.some((item) => item.menuId === menuId);
      if (sudahAda) {
        return pesananSebelumnya.map((item) =>
          item.menuId === menuId ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      }
      return [...pesananSebelumnya, { menuId, jumlah: 1 }];
    });
    setPesanError('');
    setPesanSukses('');
  }



  function handleKurangi(menuId) {
    setPesanan((pesananSebelumnya) => pesananSebelumnya
      .map((item) => item.menuId === menuId ? { ...item, jumlah: item.jumlah - 1 } : item)
      .filter((item) => item.jumlah > 0)
    );
    setPesanSukses('');
  }

  function handleHapus(menuId) {
    setPesanan((pesananSebelumnya) => pesananSebelumnya.filter((item) => item.menuId !== menuId));
    setPesanSukses('');
  }

  function handleKirimPesanan(event) {
    event.preventDefault();
    if (!namaPelanggan.trim()) {
      setPesanError('Nama pemesan belum diisi. Silakan masukkan nama terlebih dahulu.');
      return;
    }
    if (!nomorMeja || !Number.isInteger(Number(nomorMeja)) || Number(nomorMeja) < 1) {
      setPesanError('Nomor meja harus berupa angka bulat minimal 1.');
      return;
    }
    if (pesanan.length === 0) {
      setPesanError('Pesanan masih kosong. Tambahkan minimal satu menu terlebih dahulu.');
      return;
    }
    setPesanSukses(`Terima kasih, ${namaPelanggan.trim()}! Pesanan untuk meja ${nomorMeja} berhasil dikirim. Silakan tunggu, pesanan sedang kami siapkan.`);
    setPesanError('');
    setNamaPelanggan('');
    setNomorMeja('');
    setPesanan([]);
  }


  return (
    <div className="min-h-screen bg-coffee-50">
      <Navbar
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        jumlahItem={jumlahItem}
        totalHarga={totalHarga}
      />

      <main id="beranda" className="mx-auto max-w-7xl px-5 pb-10 pt-7 sm:px-8 sm:pt-10">
        <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-coffee-900 px-6 py-9 text-white shadow-soft sm:px-10 sm:py-12 lg:px-14">
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-12 h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute bottom-[-85px] right-[22%] h-48 w-48 rounded-full bg-coffee-700/40 blur-2xl" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-100">✦ Selamat datang di Kedai Kopi Senja</span>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Temukan rasa,<br /><span className="font-serif font-medium italic text-amber-200">nikmati senja.</span></h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-coffee-100/80 sm:text-base">Pilih minuman dan makanan favoritmu langsung dari meja. Kami siapkan setiap pesanan dengan sepenuh hati.</p>
            <a href="#menu" className="focus-ring mt-7 inline-flex items-center gap-3 rounded-xl bg-amber-200 px-5 py-3 text-sm font-extrabold text-coffee-900 transition hover:bg-amber-100">Jelajahi menu <span aria-hidden="true">↓</span></a>
          </div>
          <div className="absolute bottom-5 right-8 hidden rotate-[-8deg] text-[116px] opacity-20 lg:block" aria-hidden="true">☕</div>
          <div className="absolute bottom-8 right-24 hidden h-24 w-24 rounded-full border border-amber-100/20 lg:block" />
        </section>

        {pesanSukses && (
          <div role="status" className="mb-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800 shadow-sm">
            <span className="text-xl">✓</span>
            <div><p className="font-extrabold">Pesanan berhasil dikirim!</p><p className="mt-1 leading-relaxed">{pesanSukses}</p></div>
            <button type="button" onClick={() => setPesanSukses('')} aria-label="Tutup pemberitahuan" className="ml-auto rounded-lg px-2 py-1 font-bold hover:bg-emerald-100">×</button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <MenuList
            menus={menuDitampilkan}
            pesanan={pesanan}
            onTambah={handleTambah}
            onLihatDetail={setMenuTerpilih}
          />

          <aside className="space-y-5 lg:sticky lg:top-32">
            <RingkasanPesanan
              menus={menus}
              pesanan={pesanan}
              jumlahItem={jumlahItem}
              totalHarga={totalHarga}
              onTambah={handleTambah}
              onKurangi={handleKurangi}
              onHapus={handleHapus}
            />
            <FormPesan
              namaPelanggan={namaPelanggan}
              nomorMeja={nomorMeja}
              onNamaChange={(nilai) => { setNamaPelanggan(nilai); setPesanError(''); setPesanSukses(''); }}
              onMejaChange={(nilai) => { setNomorMeja(nilai); setPesanError(''); setPesanSukses(''); }}
              onSubmit={handleKirimPesanan}
              pesanError={pesanError}
            />
          </aside>
        </div>
      </main>

      <Footer />

      {menuTerpilih && (
        <div
          role="presentation"
          onClick={() => setMenuTerpilih(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-coffee-900/60 p-5 backdrop-blur-sm"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="judul-detail-menu"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-cream p-7 shadow-2xl"
          >
            <button type="button" onClick={() => setMenuTerpilih(null)} aria-label="Tutup detail menu" className="focus-ring absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-coffee-100 text-lg font-bold text-coffee-800 hover:bg-coffee-200">×</button>
            <div className="flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-coffee-100 to-[#ead6c1] text-7xl">
              {menuTerpilih.kategori === 'Kopi' ? '☕' : menuTerpilih.kategori === 'Non-Kopi' ? '🍵' : '🍽️'}
            </div>
            <p className="eyebrow mt-6">{menuTerpilih.kategori}</p>
            <h2 id="judul-detail-menu" className="mt-1 text-2xl font-extrabold text-coffee-900">{menuTerpilih.nama}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-500">{menuTerpilih.deskripsi}</p>
            <div className="mt-6 flex items-center justify-between gap-3 border-t border-coffee-100 pt-5">
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Harga</p><p className="mt-1 text-lg font-extrabold text-coffee-800">{formatRupiah(menuTerpilih.harga)}</p></div>
              {menuTerpilih.tersedia ? (
                <button type="button" onClick={() => { handleTambah(menuTerpilih.id); setMenuTerpilih(null); }} className="focus-ring rounded-xl bg-coffee-800 px-5 py-3 text-sm font-bold text-white hover:bg-coffee-700">+ Tambah pesanan</button>
              ) : (
                <span className="rounded-xl bg-stone-100 px-4 py-3 text-xs font-bold text-stone-400">Sedang habis</span>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
