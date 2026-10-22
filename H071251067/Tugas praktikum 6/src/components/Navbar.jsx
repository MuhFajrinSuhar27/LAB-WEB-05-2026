const menus = [
  { id: 1, nama: 'Beranda', href: '#beranda' },
  { id: 2, nama: 'Tentang', href: '#tentang' },
  { id: 3, nama: 'Keahlian', href: '#keahlian' },
  { id: 4, nama: 'Galeri', href: '#galeri' },
]

export default function Navbar() {
  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2">
      <nav
        aria-label="Navigasi utama"
        className="flex items-center justify-between rounded-full border-2 border-ink bg-paper/90 py-1.5 pl-2 pr-1.5 shadow-[4px_4px_0_0_var(--color-ink)] backdrop-blur sm:pl-3"
      >
        <a
          href="#beranda"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm text-marigold">
            SR
          </span>
          <span className="hidden sm:inline">Syarif R.</span>
        </a>

        <ul className="flex items-center gap-0.5 text-[13px] font-semibold sm:gap-1 sm:text-sm">
          {menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href}
                onClick={() => console.log(`${menu.nama} diklik`)}
                className="block rounded-full px-2.5 py-2 transition-colors hover:bg-marigold sm:px-4"
              >
                {menu.nama}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
