"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";
import { parseId, validasiBuku } from "@/lib/util";

function segarkan(id) {
  revalidatePath("/");
  revalidatePath("/katalog");
  if (id) revalidatePath(`/katalog/${id}`);
}

export async function tambahBuku(_prev, formData) {
  const { values, errors } = validasiBuku(formData);
  if (Object.keys(errors).length > 0) return { values, errors };

  let idBaru;
  try {
    const { rows } = await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        values.judul,
        values.penulis,
        values.kategori,
        Number(values.tahun),
        values.tersedia === "true",
        values.sinopsis,
      ]
    );
    idBaru = rows[0].id;
  } catch (err) {
    console.error("[tambahBuku]", err.message);
    return { values, errors: { form: "Gagal menyimpan ke database. Coba lagi." } };
  }

  segarkan(idBaru);
  redirect(`/katalog/${idBaru}`);
}

export async function ubahBuku(id, _prev, formData) {
  const idValid = parseId(String(id));
  if (!idValid) return { values: {}, errors: { form: "ID buku tidak valid." } };

  const { values, errors } = validasiBuku(formData);
  if (Object.keys(errors).length > 0) return { values, errors };

  try {
    const hasil = await pool.query(
      `UPDATE buku
          SET judul = $1, penulis = $2, kategori = $3,
              tahun = $4, tersedia = $5, sinopsis = $6
        WHERE id = $7`,
      [
        values.judul,
        values.penulis,
        values.kategori,
        Number(values.tahun),
        values.tersedia === "true",
        values.sinopsis,
        idValid,
      ]
    );
    if (hasil.rowCount === 0)
      return { values, errors: { form: "Buku tidak ditemukan. Mungkin sudah dihapus." } };
  } catch (err) {
    console.error("[ubahBuku]", err.message);
    return { values, errors: { form: "Gagal menyimpan perubahan. Coba lagi." } };
  }

  segarkan(idValid);
  redirect(`/katalog/${idValid}`);
}

export async function hapusBuku(formData) {
  const id = parseId(String(formData.get("id") ?? ""));
  if (!id) redirect("/katalog");

  try {
    await pool.query(`DELETE FROM buku WHERE id = $1`, [id]);
  } catch (err) {
    console.error("[hapusBuku]", err.message);
    throw new Error("Gagal menghapus buku.");
  }

  segarkan(id);
  redirect("/katalog");
}
