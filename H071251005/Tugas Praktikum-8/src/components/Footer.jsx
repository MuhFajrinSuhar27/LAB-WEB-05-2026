export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8e0d4] bg-[#f0ebe2]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#766b5d] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-serif text-lg font-semibold text-[#27382f]">Pustaka Senja</p>
          <p className="mt-1 text-xs">Ruang kecil untuk membaca, bertumbuh, dan berbagi cerita.</p>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Pustaka Senja. Dibuat untuk komunitas pembaca.</p>
      </div>
    </footer>
  );
}
