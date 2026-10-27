const daftarTautanFooter = [
  { id: 1, nama: 'Beranda', tujuan: '#home' },
  { id: 2, nama: 'Tentang', tujuan: '#about' },
  { id: 3, nama: 'Keahlian', tujuan: '#skills' },
  { id: 4, nama: 'Galeri', tujuan: '#gallery' },
]

export default function Footer() {
  return (
    <footer id="footer" className="scroll-mt-28 px-4 pb-4 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-slate-950 px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <a href="#home" className="text-2xl font-black tracking-tight">mukhsin<span className="text-indigo-300">.dev</span></a>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">Terus belajar, berani mencoba, dan bertumbuh melalui teknologi.</p>
          </div>
          <nav aria-label="Navigasi footer" className="flex flex-wrap justify-center gap-x-4 gap-y-3">
            {daftarTautanFooter.map((tautan) => (
              <a key={tautan.id} href={tautan.tujuan} className="text-xs font-semibold text-slate-300 transition hover:text-white sm:text-sm">{tautan.nama}</a>
            ))}
          </nav>
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Mukhsin. Hak cipta dilindungi.</p>
          <a href="#home" className="font-bold text-indigo-200 transition hover:text-white">Kembali ke atas ↑</a>
        </div>
      </div>
    </footer>
  )
}
