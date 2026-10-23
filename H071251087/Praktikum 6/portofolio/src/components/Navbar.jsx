function Navbar() {
  const menu = ["Home", "About", "Skills", "Gallery"];

  const handleClick = (nama) => {
    console.log(`Menu ${nama} diklik!`);
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-700 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-3 sm:flex-row">
        <h2 className="text-xl font-bold text-pink-400">Profil Pribadi</h2>
        <ul className="flex gap-2 text-sm sm:gap-4 sm:text-base">
          {menu.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(item)}
                className="rounded-full px-3 py-1 text-slate-200 transition hover:bg-pink-500 hover:text-white"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;