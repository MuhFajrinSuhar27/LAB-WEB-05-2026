"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuNavigasi = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Usulan Buku", href: "/usulan" },
  { label: "Kelola Buku", href: "/kelola-buku"},
];


export default function Navbar() {
  const pathname = usePathname();

  function isMenuAktif(href) {
    if (href === "/") return pathname === "/";
    // Detail /katalog/[id] tetap menandai menu Katalog sebagai aktif.
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  
  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e2d7] bg-[#fbf9f4]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href="/" className="group flex w-fit items-center gap-3" aria-label="Pustaka Senja - Beranda">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#27382f] text-sm font-bold tracking-wide text-[#f9ead0] shadow-sm transition group-hover:-rotate-3">
            PS
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-xl font-semibold tracking-tight text-[#26352d]">Pustaka Senja</span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a7762]">Ruang baca komunitas</span>
          </span>
        </Link>
      

        <nav aria-label="Navigasi utama" className="flex flex-wrap items-center gap-1 sm:gap-2">
          {menuNavigasi.map((menu) => {
            const aktif = isMenuAktif(menu.href);

            return (
              <Link
                key={menu.href}
                href={menu.href}
                aria-current={aktif ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  aktif
                    ? "bg-[#27382f] text-white shadow-sm"
                    : "text-[#655c50] hover:bg-[#eee8de] hover:text-[#27382f]"
                }`}
              >
                {menu.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
