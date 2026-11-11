import { notFound } from "next/navigation";
import pool from "@/lib/db";
import FormBuku from "@/components/FormBuku";
import { ubahBuku } from "@/app/katalog/actions";

export const dynamic = "force-dynamic";

export default async function EditBukuPage({ params }) {
  const { id } = await params;

  if (!/^\d{1,9}$/.test(id)) notFound();

  const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
  const buku = rows[0];
  if (!buku) notFound();

  return (
    <section className="max-w-lg mx-auto bg-custom-soft-pink border border-custom-sage rounded-2xl p-6 shadow-lg">
      <h1 className="text-2xl text-custom-maroon font-bold mb-1">Edit Buku</h1>
      <p className="text-stone-800 text-sm mb-6">
        Ubah data buku &quot;{buku.judul}&quot;.
      </p>
      <FormBuku
        action={ubahBuku}
        buku={buku}
        labelSimpan="Simpan Perubahan"
        batalHref={`/katalog/${buku.id}`}
      />
    </section>
  );
}
