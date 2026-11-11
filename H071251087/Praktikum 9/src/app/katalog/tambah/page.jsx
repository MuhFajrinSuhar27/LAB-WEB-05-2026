import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

export default function TambahBukuPage() {
  return (
    <section className="max-w-lg mx-auto bg-custom-soft-pink border border-slate-800 rounded-2xl p-6 shadow-lg">
      <h1 className="text-2xl text-custom-maroon font-bold mb-1">Tambah Buku</h1>
      <p className="text-stone-800 text-sm mb-6">
        Tambahkan buku baru ke koleksi Pustaka Senja.
      </p>
      <FormBuku
        action={tambahBuku}
        labelSimpan="Simpan Buku"
        batalHref="/katalog"
      />
    </section>
  );
}
