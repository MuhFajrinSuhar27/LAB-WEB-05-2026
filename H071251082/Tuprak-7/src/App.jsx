import { useState } from 'react'
import Navbar from './components/Navbar'
import MenuList from './components/MenuList'
import RingkasanPesanan from './components/RingkasanPesanan'
import FormPesan from './components/FormPesan'
import Footer from './components/Footer'

const daftarMenu = [
  { id: 1, nama: 'Kopi Susu', kategori: 'Kopi', harga: 18000, tersedia: true, deskripsi: 'Espresso dengan susu segar dan gula aren.' },
  { id: 2, nama: 'Americano', kategori: 'Kopi', harga: 15000, tersedia: true, deskripsi: 'Espresso dengan air panas, rasa kuat dan bersih.' },
  { id: 3, nama: 'Cappuccino', kategori: 'Kopi', harga: 22000, tersedia: true, deskripsi: 'Espresso, susu panas, dan busa susu tebal.' },
  { id: 4, nama: 'Matcha Latte', kategori: 'Non-Kopi', harga: 24000, tersedia: true, deskripsi: 'Teh hijau matcha dengan susu.' },
  { id: 5, nama: 'Teh Tarik', kategori: 'Non-Kopi', harga: 14000, tersedia: false, deskripsi: 'Teh susu yang ditarik hingga berbusa.' },
  { id: 6, nama: 'Cokelat Panas', kategori: 'Non-Kopi', harga: 20000, tersedia: true, deskripsi: 'Cokelat pekat dengan susu hangat.' },
  { id: 7, nama: 'Roti Bakar', kategori: 'Makanan', harga: 16000, tersedia: true, deskripsi: 'Roti tebal dengan selai cokelat dan keju.' },
  { id: 8, nama: 'Pisang Goreng', kategori: 'Makanan', harga: 12000, tersedia: false, deskripsi: 'Pisang goreng renyah dengan taburan keju.' },
  { id: 9, nama: 'Nasi Goreng', kategori: 'Makanan', harga: 25000, tersedia: true, deskripsi: 'Nasi goreng kampung dengan telur mata sapi.' },
]

const daftarKategori = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan']

function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [pesanan, setPesanan] = useState([])
  const [namaTerkirim, setNamaTerkirim] = useState('')

  const menuTampil =
    kategoriAktif === 'Semua'
      ? daftarMenu
      : daftarMenu.filter((menu) => menu.kategori === kategoriAktif)

  const itemPesanan = pesanan.map((p) => {
    const menu = daftarMenu.find((m) => m.id === p.id)
    return { id: p.id, nama: menu.nama, harga: menu.harga, jumlah: p.jumlah }
  })

  const jumlahItem = itemPesanan.reduce((sum, item) => sum + item.jumlah, 0)
  const totalHarga = itemPesanan.reduce((sum, item) => sum + item.harga * item.jumlah, 0)

  function tambahPesanan(id) {
    const menu = daftarMenu.find((m) => m.id === id)
    if (!menu || !menu.tersedia) return

    setNamaTerkirim('')
    setPesanan((prev) => {
      const sudahAda = prev.some((p) => p.id === id)
      if (sudahAda) {
        return prev.map((p) => (p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p))
      }
      return [...prev, { id, jumlah: 1 }]
    })
  }

  function kurangiPesanan(id) {
    setPesanan((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0),
    )
  }

  function kosongkanPesanan() {
  setPesanan([])
  }

  function kirimPesanan(nama) {
    setNamaTerkirim(nama)
    setPesanan([])
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-800">
      <Navbar jumlahItem={jumlahItem} totalHarga={totalHarga} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4">
        <section className="py-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Pesan lebih praktis di sini!
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-500">
            Pilih menu, isi nomor meja, dan pesananmu langsung kami siapkan.
          </p>
        </section>

        <div className="grid gap-10 pb-16 lg:grid-cols-3">
          <MenuList
            daftarMenu={menuTampil}
            daftarKategori={daftarKategori}
            kategoriAktif={kategoriAktif}
            pesanan={pesanan}
            onPilihKategori={setKategoriAktif}
            onTambah={tambahPesanan}
          />

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            {namaTerkirim !== '' && (
              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
              >
                <p className="font-semibold">Terima kasih, {namaTerkirim}!</p>
                <p className="text-sm">Pesananmu sudah kami terima dan segera disiapkan.</p>
              </div>
            )}

            <RingkasanPesanan
              itemPesanan={itemPesanan}
              jumlahItem={jumlahItem}
              totalHarga={totalHarga}
              onTambah={tambahPesanan}
              onKurangi={kurangiPesanan}
              onKosongkan={kosongkanPesanan}
            />

            <FormPesan jumlahItem={jumlahItem} onKirim={kirimPesanan} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App