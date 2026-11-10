import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

export default function TambahBuku() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-3xl font-bold text-indigo-950">Tambah Buku</h1>
      <p className="mb-6 mt-1 text-slate-600">Isi data buku baru untuk koleksi Pustaka Senja.</p>
      <FormBuku aksi={tambahBuku} labelTombol="Simpan Buku" />
    </section>
  );
}
