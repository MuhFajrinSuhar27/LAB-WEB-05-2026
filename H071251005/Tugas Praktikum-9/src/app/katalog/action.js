"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Mengambil dan membersihkan data dari form.
function ambilDataBuku(formData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunInput = String(formData.get("tahun") ?? "").trim();
  const statusInput = String(formData.get("tersedia") ?? "");
  const sinopsis = String(formData.get("sinopsis") ?? "").trim();

  return {
    judul,
    penulis,
    kategori,
    tahun: Number(tahunInput),
    tersedia: statusInput === "true",
    statusValid: statusInput === "true" || statusInput === "false",
    sinopsis,
  };
}

function validasiBuku(data) {
  return Boolean(
    data.judul &&
      data.penulis &&
      data.kategori &&
      Number.isInteger(data.tahun) &&
      data.tahun >= 1 &&
      data.tahun <= 9999 &&
      data.statusValid &&
      data.sinopsis
  );
}

// CREATE: menyimpan buku baru ke PostgreSQL.
export async function tambahBuku(formData) {
  const data = ambilDataBuku(formData);

  if (!validasiBuku(data)) {
    throw new Error("Data buku tidak lengkap atau tidak valid. Periksa kembali formulir.");
  }

  await pool.query(
    `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      data.judul,
      data.penulis,
      data.kategori,
      data.tahun,
      data.tersedia,
      data.sinopsis,
    ]
  );

  revalidatePath("/katalog");
  revalidatePath("/");
  revalidatePath("/kelola-buku");
  redirect("/katalog");
}

// UPDATE: hanya mengubah buku dengan ID yang dikirim dari form.
export async function ubahBuku(formData) {
  const id = Number(formData.get("id"));
  const data = ambilDataBuku(formData);

  if (!Number.isInteger(id) || id <= 0 || !validasiBuku(data)) {
    throw new Error("ID atau data buku tidak valid. Periksa kembali formulir.");
  }

  const hasil = await pool.query(
    `UPDATE buku
     SET judul = $1,
         penulis = $2,
         kategori = $3,
         tahun = $4,
         tersedia = $5,
         sinopsis = $6
     WHERE id = $7`,
    [
      data.judul,
      data.penulis,
      data.kategori,
      data.tahun,
      data.tersedia,
      data.sinopsis,
      id,
    ]
  );

  if (hasil.rowCount === 0) {
    throw new Error("Buku yang ingin diubah tidak ditemukan.");
  }

  revalidatePath("/katalog");
  revalidatePath("/");
  revalidatePath("/kelola-buku");
  revalidatePath(`/katalog/${id}`);
  redirect(`/katalog/${id}`);
}

// DELETE: hanya menghapus buku dengan ID yang dipilih.
export async function hapusBuku(formData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("ID buku tidak valid.");
  }

  const hasil = await pool.query("DELETE FROM buku WHERE id = $1", [id]);

  if (hasil.rowCount === 0) {
    throw new Error("Buku yang ingin dihapus tidak ditemukan.");
  }

  revalidatePath("/katalog");
  revalidatePath("/");
  revalidatePath("/kelola-buku");
  revalidatePath(`/katalog/${id}`);
  redirect("/katalog");
}
