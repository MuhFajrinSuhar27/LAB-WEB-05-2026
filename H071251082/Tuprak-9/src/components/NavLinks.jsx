"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/usulan", label: "Usulan" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1 text-sm font-medium">
      {menu.map((m) => {
        const aktif = m.href === "/" ? pathname === "/" : pathname.startsWith(m.href);
        return (
          <li key={m.href}>
            <Link
              href={m.href}
              aria-current={aktif ? "page" : undefined}
              className={`block rounded-full px-4 py-2 transition-all duration-200 ${
                aktif
                  ? "bg-ink text-paper shadow-xs"
                  : "text-muted hover:bg-paper-deep/70 hover:text-ink active:scale-95"
              }`}
            >
              {m.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
