const menus = [
  { id: 1, label: 'Beranda', href: '#beranda' },
  { id: 2, label: 'Tentang', href: '#tentang' },
  { id: 3, label: 'Keahlian', href: '#keahlian' },
  { id: 4, label: 'Galeri', href: '#galeri' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-pink-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-between sm:px-6">
        <a href="#beranda" className="text-xl font-extrabold tracking-tight text-pink-600">
          MEL
        </a>

        <ul className="flex flex-wrap justify-center gap-1 text-sm font-medium sm:gap-2">
          {menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href}
                onClick={() => console.log(menu.label)}
                className="rounded-full px-3 py-1.5 text-pink-900 transition hover:bg-pink-100 hover:text-pink-600"
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