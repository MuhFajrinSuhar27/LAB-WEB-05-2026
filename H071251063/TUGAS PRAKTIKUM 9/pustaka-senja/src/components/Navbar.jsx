
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { nama: "Beranda", link: "/" },
    { nama: "Katalog", link: "/katalog" },
    { nama: "Usulan Buku", link: "/usulan" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo dan Nama */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl text-purple-500">♧</span>
          <span className="text-xl font-bold text-purple-800">
            Pustaka Senja
          </span>
        </Link>

        {/* Menu Navigasi */}
        <div className="flex items-center gap-2">
          {menu.map((item) => {
            const aktif =
              item.link === "/"
                ? pathname === "/"
                : pathname === item.link ||
                  pathname.startsWith(item.link + "/");

            return (
              <Link
                key={item.link}
                href={item.link}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  aktif
                    ? "bg-purple-200 text-purple-800"
                    : "text-purple-700 hover:bg-pink-100"
                }`}
              >
                {item.nama}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}
