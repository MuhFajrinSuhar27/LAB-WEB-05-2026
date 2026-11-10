function Navbar({ jumlahItem, totalHarga }) {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">Kedai Kopi Senja</h1>
        <p className="text-sm text-zinc-500">
          <span className="font-medium text-zinc-900">{jumlahItem}</span> pesanan
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-medium text-zinc-900">
            Rp {totalHarga.toLocaleString('id-ID')}
          </span>
        </p>
      </div>
    </header>
  )
}

export default Navbar
