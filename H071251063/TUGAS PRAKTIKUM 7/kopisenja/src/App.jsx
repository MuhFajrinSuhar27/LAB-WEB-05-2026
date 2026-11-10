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

function App() {
  const [kategoriAktif, setKategoriAktif] = useState('Semua')
  const [pesanan, setPesanan] = useState([])
  const [nama, setNama] = useState('')
  const [nomorMeja, setNomorMeja] = useState('')
  const [pesanError, setPesanError] = useState('')
  const [detailMenu, setDetailMenu] = useState(null)
  const [pesanSukses, setPesanSukses] = useState('')

  const menuTampil = kategoriAktif === 'Semua'
    ? daftarMenu
    : daftarMenu.filter(
        (menu) => menu.kategori === kategoriAktif
      )

  const jumlahItem = pesanan.reduce(
    (total, item) => total + item.jumlah,
    0
  )

  const totalHarga = pesanan.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  )

  function tambahPesanan(menu) {
    if (!menu.tersedia) return

    setPesanan((pesananLama) => {
      const sudahAda = pesananLama.find(
        (item) => item.id === menu.id
      )

      if (sudahAda) {
        return pesananLama.map((item) =>
          item.id === menu.id
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
        )
      }

      return [...pesananLama, { ...menu, jumlah: 1 }]
    })

    setPesanError('')
    setPesanSukses('')
  }

  function kurangiPesanan(id) {
    setPesanan((pesananLama) =>
      pesananLama
        .map((item) =>
          item.id === id
            ? { ...item, jumlah: item.jumlah - 1 }
            : item
        )
        .filter((item) => item.jumlah > 0)
    )

    setPesanError('')
  }

  function kirimPesanan(event) {
    event.preventDefault()

    if (!nama.trim()) {
      setPesanError('Nama pelanggan wajib diisi.')
      return
    }

    if (!nomorMeja || Number(nomorMeja) < 1) {
      setPesanError('Masukkan nomor meja yang valid.')
      return
    }

    if (pesanan.length === 0) {
      setPesanError('Silakan pilih menu terlebih dahulu.')
      return
    }

    setPesanSukses(
      `Terima kasih, ${nama.trim()}! Pesanan untuk meja ${nomorMeja} berhasil dikirim.`
    )

    setPesanan([])
    setNama('')
    setNomorMeja('')
    setPesanError('')
    setDetailMenu(null)
  }

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-8">
        <section className="mb-8 rounded-2xl bg-amber-100 p-6 text-center sm:p-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-800">
            Selamat Datang
          </p>

          <h1 className="text-3xl font-bold text-amber-950 sm:text-4xl">
            Menu Kedai Kopi Senja
          </h1>

          <p className="mt-3 text-stone-600">
            Pilih menu dan pesan langsung dari meja.
          </p>

          <div className="mt-5 flex justify-center gap-8">
            <div>
              <p className="text-sm text-stone-600">Jumlah item</p>
              <p className="text-2xl font-bold text-amber-900">
                {jumlahItem}
              </p>
            </div>

            <div>
              <p className="text-sm text-stone-600">Total harga</p>
              <p className="text-2xl font-bold text-amber-900">
                Rp {totalHarga.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </section>

        {pesanSukses && (
          <div
            role="status"
            className="mb-6 rounded-xl bg-green-100 p-4 text-green-800"
          >
            {pesanSukses}
          </div>
        )}

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-amber-950">
            Menu Kami
          </h2>

          <div className="mb-6 flex flex-wrap gap-3">
            {['Semua', 'Kopi', 'Non-Kopi', 'Makanan'].map((kategori) => (
              <button
                key={kategori}
                onClick={() => setKategoriAktif(kategori)}
                className={`rounded-full px-5 py-2 font-medium transition ${
                  kategoriAktif === kategori
                    ? 'bg-amber-800 text-white'
                    : 'bg-white text-amber-900 hover:bg-amber-100'
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>

          <MenuList
            daftarMenu={menuTampil}
            onTambah={tambahPesanan}
            onLihatDetail={setDetailMenu}
          />
        </section>

        {detailMenu && (
          <section className="mb-8 rounded-2xl border border-amber-200 bg-white p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-amber-950">
                  Detail {detailMenu.nama}
                </h2>

                <p className="mt-2 text-stone-600">
                  {detailMenu.deskripsi}
                </p>

                <p className="mt-3 font-bold text-amber-900">
                  Rp {detailMenu.harga.toLocaleString('id-ID')}
                </p>

                <p className="mt-1 text-sm">
                  Status: {detailMenu.tersedia ? 'Tersedia' : 'Habis'}
                </p>

                {detailMenu.tersedia && (
                  <button
                    onClick={() => tambahPesanan(detailMenu)}
                    className="mt-4 rounded-lg bg-amber-800 px-5 py-2 text-white hover:bg-amber-900"
                  >
                    Tambah ke Pesanan
                  </button>
                )}
              </div>

              <button
                onClick={() => setDetailMenu(null)}
                className="rounded-lg bg-stone-100 px-3 py-2"
                aria-label="Tutup detail menu"
              >
                Tutup
              </button>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RingkasanPesanan
            pesanan={pesanan}
            onKurangi={kurangiPesanan}
            onTambah={tambahPesanan}
            totalHarga={totalHarga}
          />

          <FormPesan
            nama={nama}
            setNama={setNama}
            nomorMeja={nomorMeja}
            setNomorMeja={setNomorMeja}
            onSubmit={kirimPesanan}
            pesanError={pesanError}
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
