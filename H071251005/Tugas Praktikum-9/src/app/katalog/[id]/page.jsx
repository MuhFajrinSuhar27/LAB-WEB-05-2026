import {connection} from "next/server";
import {ambilBukuBerdasarkanId} from "@/lib/buku";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ambilSampulBuku } from "@/data/sampulBuku";
import TombolHapus from "@/components/TombolHapus";
import { hapusBuku } from "@/app/katalog/action";

export default async function DetailBukuPage({ params }) {
  await connection();
  // Pada App Router versi baru, params diterima sebagai Promise.
  const { id } = await params;
  const buku = await ambilBukuBerdasarkanId(id);


  if (!buku) {
    notFound();
  }
  const gambarSampul = ambilSampulBuku(buku);

  return (
    <div className="space-y-8">
      <Link href="/katalog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f796b] transition hover:text-[#27382f]">
        <span aria-hidden="true">←</span> Kembali ke katalog
      </Link>

      <article className="grid overflow-hidden rounded-[2rem] border border-[#e9e2d7] bg-white shadow-[0_18px_55px_-35px_rgba(53,45,34,0.28)] lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex min-h-[360px] items-center justify-center bg-[#eee8de] p-8 sm:p-12">
          <div className="relative aspect-[3/4] w-full max-w-[270px] overflow-hidden rounded-xl bg-[#f3eee6] shadow-2xl shadow-[#594d3b]/25">
            {gambarSampul ? (
              <Image
                src={gambarSampul}
                alt={`Sampul buku ${buku.judul}`}
                fill
                className="object-contain"
                sizes="270px"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[#817666]">
                Sampul buku belum tersedia.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a27b4d]">Detail koleksi · Buku {buku.id}</p>
          <span className="mt-5 w-fit rounded-full bg-[#f3eee6] px-3 py-1.5 text-xs font-semibold text-[#746752]">{buku.kategori}</span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-[#29382f] sm:text-5xl">{buku.judul}</h2>
          <p className="mt-3 text-base text-[#817666]">Oleh {buku.penulis}</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#f7f4ee] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#968a78]">Tahun terbit</p>
              <p className="mt-2 font-serif text-2xl font-semibold text-[#29382f]">{buku.tahun}</p>
            </div>
            <div className="rounded-2xl bg-[#f7f4ee] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#968a78]">Ketersediaan</p>
              <p className={`mt-2 text-sm font-semibold ${buku.tersedia ? "text-[#397451]" : "text-[#a65d53]"}`}>{buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}</p>
            </div>
          </div>

          <div className="mt-9 border-t border-[#eee8df] pt-7">
            <h3 className="font-serif text-2xl font-semibold text-[#29382f]">Tentang buku ini</h3>
            <p className="mt-3 text-sm leading-8 text-[#71685c]">{buku.sinopsis}</p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={`/katalog/${buku.id}/edit`} className="inline-flex w-fit items-center justify-center rounded-full bg-[#27382f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3c5547]">
              Edit Buku
            </Link>
            <TombolHapus id={buku.id} judul={`buku ${buku.judul}`} action={hapusBuku} />
            <Link href="/katalog" className="inline-flex w-fit items-center justify-center rounded-full border border-[#e5ded3] px-6 py-3 text-sm font-semibold text-[#665d51] transition hover:bg-[#f8f6f1]">
              Kembali ke katalog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
