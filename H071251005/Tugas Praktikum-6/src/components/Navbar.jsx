const daftarMenu = [
  { id: 1, nama: 'Beranda', tujuan: '#home' },
  { id: 2, nama: 'Tentang', tujuan: '#about' },
  { id: 3, nama: 'Keahlian', tujuan: '#skills' },
  { id: 4, nama: 'Galeri', tujuan: '#gallery' },
  { id: 5, nama: 'Kontak', tujuan: '#footer' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_12px_40px_rgba(35,31,57,0.09)] backdrop-blur-xl sm:rounded-full sm:px-6">
        <a href="#home" className="shrink-0 text-lg font-black tracking-tight text-slate-950 sm:text-xl">
          mukhsin<span className="text-gradient">.dev</span>
        </a>
        <div className="flex w-full flex-wrap items-center justify-center gap-1 sm:w-auto sm:justify-end">
          {daftarMenu.map((menu) => (
            <a
              key={menu.id}
              href={menu.tujuan}
              onClick={() => console.log(`Menu diklik: ${menu.nama}`)}
              className="rounded-full px-3 py-2 text-xs font-bold text-slate-600 transition duration-200 hover:bg-indigo-50 hover:text-indigo-700 sm:px-3.5 sm:text-sm"
            >
              {menu.nama}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
