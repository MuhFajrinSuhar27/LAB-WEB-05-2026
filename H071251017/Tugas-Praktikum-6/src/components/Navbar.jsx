const namaLogo = 'Teguh Paniro Silitonga'

const menuItems = [
  { id: 1, label: 'Beranda', target: '#beranda' },
  { id: 2, label: 'Tentang', target: '#tentang' },
  { id: 3, label: 'Keahlian', target: '#keahlian' },
  { id: 4, label: 'Galeri', target: '#galeri' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-3 sm:flex-row sm:justify-between">
        <a href="#beranda" className="font-display text-xl font-extrabold text-ink">
          {namaLogo}
        </a>
        <ul className="flex flex-wrap justify-center gap-1 text-sm font-medium">
          {menuItems.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.target}
                onClick={() => console.log(menu.label)}
                className="rounded-full px-4 py-2 transition hover:bg-sea hover:text-white focus-visible:outline-2 focus-visible:outline-sea"
              >
                {menu.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
