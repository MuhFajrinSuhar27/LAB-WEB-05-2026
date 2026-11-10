"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Beranda", path: "/" },
  { label: "Katalog", path: "/katalog" },
  { label: "Usulan Buku", path: "/usulan" },
];

export default function Navbar() {
  const pathname = usePathname();

  // Beranda hanya aktif jika persis "/", menu lain aktif juga untuk sub-halaman
  // (contoh: /katalog/4 tetap menandai Katalog).
  const isAktif = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-10 bg-indigo-950 text-indigo-50 shadow-md">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Pustaka <span className="text-amber-300">Senja</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm font-medium">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={isAktif(item.path) ? "page" : undefined}
                className={
                  "rounded-md px-3 py-2 transition-colors " +
                  (isAktif(item.path)
                    ? "bg-amber-300 text-indigo-950"
                    : "text-indigo-100 hover:bg-indigo-900")
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
