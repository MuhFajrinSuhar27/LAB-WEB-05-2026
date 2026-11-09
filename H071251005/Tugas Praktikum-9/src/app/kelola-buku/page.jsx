import Link from "next/link";
import { connection } from "next/server";
import { ambilSemuaBuku } from "@/lib/buku";
import { hapusBuku, tambahBuku } from "@/app/katalog/action";
import TombolHapus from "@/components/TombolHapus";

export default async function KelolaBukuPage() {
  await connection();
  const daftarBuku = await ambilSemuaBuku();

  return (
    <div className="space-y-9">
      <section className="rounded-[2rem] bg-[#27382f] px-6 py-9 text-white sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c99b]">
          Administrasi koleksi
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          Kelola Buku
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d9d7cb]">
          Tambahkan koleksi baru, perbarui informasi buku, atau hapus buku yang
          tidak lagi tersedia. Semua perubahan disimpan ke PostgreSQL.
        </p>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#e9e2d7] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a27b4d]">
            Create · Tambah data
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#29382f]">
            Tambahkan buku baru
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#817666]">
            Lengkapi seluruh informasi berikut untuk memasukkan buku ke katalog.
          </p>

          <form action={tambahBuku} className="mt-7 space-y-5">
            <div>
              <label htmlFor="judul" className="mb-2 block text-sm font-semibold text-[#514b42]">
                Judul Buku
              </label>
              <input
                id="judul"
                name="judul"
                type="text"
                required
                maxLength={255}
                placeholder="Masukkan judul buku"
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition placeholder:text-[#b4aa9b] focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              />
            </div>

            <div>
              <label htmlFor="penulis" className="mb-2 block text-sm font-semibold text-[#514b42]">
                Penulis
              </label>
              <input
                id="penulis"
                name="penulis"
                type="text"
                required
                maxLength={150}
                placeholder="Nama penulis"
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition placeholder:text-[#b4aa9b] focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              />
            </div>


            <div>
              <label htmlFor="kategori" className="mb-2 block text-sm font-semibold text-[#514b42]">
                Kategori
              </label>
              <select
                id="kategori"
                name="kategori"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              >
                <option value="" disabled>Pilih kategori</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label htmlFor="tahun" className="mb-2 block text-sm font-semibold text-[#514b42]">
                Tahun Terbit
              </label>
              <input
                id="tahun"
                name="tahun"
                type="number"
                min="1"
                max="9999"
                step="1"
                required
                placeholder="Contoh: 2024"
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition placeholder:text-[#b4aa9b] focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              />
            </div>

            <div>
              <label htmlFor="tersedia" className="mb-2 block text-sm font-semibold text-[#514b42]">
                Status Ketersediaan
              </label>
              <select
                id="tersedia"
                name="tersedia"
                defaultValue="true"
                required
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              >
                <option value="true">Tersedia</option>
                <option value="false">Sedang Dipinjam</option>
              </select>
            </div>

            <div>
              <label htmlFor="sinopsis" className="mb-2 block text-sm font-semibold text-[#514b42]">
                Sinopsis
              </label>
              <textarea
                id="sinopsis"
                name="sinopsis"
                rows={5}
                required
                placeholder="Tuliskan ringkasan isi buku"
                className="w-full resize-y rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm leading-6 text-[#29382f] outline-none transition placeholder:text-[#b4aa9b] focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#27382f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3c5547]"
            >
              Simpan Buku
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-[#e9e2d7] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a27b4d]">
                Read · Update · Delete
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#29382f]">
                Daftar koleksi
              </h2>
            </div>
            <span className="rounded-full bg-[#f3eee6] px-4 py-2 text-sm font-semibold text-[#6d604f]">
              {daftarBuku.length} buku
            </span>
          </div>

          {daftarBuku.length === 0 ? (
            <p className="mt-6 rounded-2xl bg-[#f8f6f1] p-5 text-sm leading-6 text-[#817666]">
              Belum ada buku di database. Tambahkan buku melalui formulir di sebelah kiri.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-[#eee8df]">
              {daftarBuku.map((buku) => (
                <li key={buku.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-serif text-lg font-semibold text-[#29382f]">
                      {buku.judul}
                    </p>
                    <p className="mt-1 text-sm text-[#817666]">
                      {buku.penulis} · {buku.kategori} · {buku.tahun}
                    </p>
                    <p className={`mt-1 text-xs font-semibold ${buku.tersedia ? "text-[#397451]" : "text-[#a65d53]"}`}>
                      {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/katalog/${buku.id}/edit`}
                      className="inline-flex items-center justify-center rounded-full bg-[#27382f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3c5547]"
                    >
                      Edit
                    </Link>
                    <TombolHapus id={buku.id} judul={`buku ${buku.judul}`} action={hapusBuku} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/katalog"
            className="mt-6 inline-flex text-sm font-semibold text-[#526b59] underline decoration-[#bdc9b9] underline-offset-4 transition hover:text-[#27382f]"
          >
            Lihat katalog lengkap →
          </Link>
        </div>
      </section>
    </div>
  );
}
