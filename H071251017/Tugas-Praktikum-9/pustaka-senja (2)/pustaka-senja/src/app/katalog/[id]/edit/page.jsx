import Link from "next/link";
import FormBuku from "@/components/FormBuku";
import { ubahBuku } from "@/app/katalog/actions";
import { getBukuById } from "@/lib/buku";

export default async function EditBuku({ params }) {
  const { id } = await params;
  const buku = await getBukuById(id);

  if (!buku) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-2xl font-bold text-indigo-950">Buku tidak ditemukan</h1>
        <p className="mt-2 text-slate-600">Buku yang ingin diedit tidak ada di database.</p>
        <Link
          href="/katalog"
          className="mt-6 inline-block rounded-md bg-indigo-950 px-5 py-3 font-medium text-white hover:bg-indigo-800"
        >
          Kembali ke Katalog
        </Link>
      </section>
    );
  }

  const nilaiAwal = {
    judul: buku.judul,
    penulis: buku.penulis,
    kategori: buku.kategori,
    tahun: String(buku.tahun),
    tersedia: String(buku.tersedia),
    sinopsis: buku.sinopsis,
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-3xl font-bold text-indigo-950">Edit Buku</h1>
      <p className="mb-6 mt-1 text-slate-600">Ubah data buku lalu simpan.</p>
      {/* bind: id buku "dikunci" sebagai argumen pertama Server Action */}
      <FormBuku aksi={ubahBuku.bind(null, buku.id)} nilaiAwal={nilaiAwal} labelTombol="Simpan Perubahan" />
    </section>
  );
}
