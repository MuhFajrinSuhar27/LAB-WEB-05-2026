import Link from "next/link";
import { notFound } from "next/navigation";
import { getBukuById, getDaftarKategori } from "@/lib/queries";
import { parseId } from "@/lib/util";
import { ubahBuku } from "@/app/katalog/actions";
import FormBuku from "@/components/FormBuku";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit buku" };

export default async function EditBuku({ params }) {
  const { id } = await params;
  const idValid = parseId(id);
  if (!idValid) notFound();

  const [buku, kategori] = await Promise.all([getBukuById(idValid), getDaftarKategori()]);
  if (!buku) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <Link href={`/katalog/${buku.id}`} className="tautan text-sm text-muted">
        ← Kembali ke detail
      </Link>
      <p className="label mt-14">Edit</p>
      <h1 className="display mt-4 text-5xl">{buku.judul}</h1>

      <div className="mt-14">
        <FormBuku
          action={ubahBuku.bind(null, buku.id)}
          nilaiAwal={{
            judul: buku.judul,
            penulis: buku.penulis,
            kategori: buku.kategori,
            tahun: String(buku.tahun),
            tersedia: String(buku.tersedia),
            sinopsis: buku.sinopsis,
          }}
          kategoriSaran={kategori}
          labelTombol="Simpan perubahan"
          batalHref={`/katalog/${buku.id}`}
          idPratinjau={buku.id}
        />
      </div>
    </div>
  );
}
