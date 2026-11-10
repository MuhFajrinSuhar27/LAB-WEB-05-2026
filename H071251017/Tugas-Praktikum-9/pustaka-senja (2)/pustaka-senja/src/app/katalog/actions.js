"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { idValid } from "@/lib/buku";

const DAFTAR_KATEGORI = ["Teknologi", "Fiksi", "Pengembangan Diri"];

// Validasi data form. Mengembalikan { error } atau { data }.
function validasiForm(formData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunTeks = String(formData.get("tahun") ?? "").trim();
  const statusTeks = String(formData.get("tersedia") ?? "");
  const sinopsis = String(formData.get("sinopsis") ?? "").trim();

  if (!judul || !penulis || !kategori || !tahunTeks || !sinopsis) {
    return { error: "Semua kolom wajib diisi." };
  }
  if (judul.length > 200) return { error: "Judul maksimal 200 karakter." };
  if (penulis.length > 150) return { error: "Penulis maksimal 150 karakter." };
  if (!DAFTAR_KATEGORI.includes(kategori)) {
    return { error: "Kategori tidak valid." };
  }
  if (!/^\d{4}$/.test(tahunTeks)) {
    return { error: "Tahun terbit harus berupa 4 digit angka." };
  }
  const tahun = Number(tahunTeks);
  const tahunMaks = new Date().getFullYear() + 1;
  if (tahun < 1000 || tahun > tahunMaks) {
    return { error: `Tahun terbit harus antara 1000 dan ${tahunMaks}.` };
  }
  if (statusTeks !== "true" && statusTeks !== "false") {
    return { error: "Status ketersediaan tidak valid." };
  }

  return {
    data: { judul, penulis, kategori, tahun, tersedia: statusTeks === "true", sinopsis },
  };
}

// CREATE
export async function tambahBuku(formData) {
  const hasil = validasiForm(formData);
  if (hasil.error) return { error: hasil.error };
  const { judul, penulis, kategori, tahun, tersedia, sinopsis } = hasil.data;

  try {
    await pool.query(
      "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
      [judul, penulis, kategori, tahun, tersedia, sinopsis]
    );
  } catch (err) {
    console.error("Gagal menambah buku:", err.message);
    return { error: "Terjadi kesalahan pada database. Coba lagi." };
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}

// UPDATE
export async function ubahBuku(id, formData) {
  if (!idValid(id)) return { error: "ID buku tidak valid." };
  const hasil = validasiForm(formData);
  if (hasil.error) return { error: hasil.error };
  const { judul, penulis, kategori, tahun, tersedia, sinopsis } = hasil.data;

  let jumlahBaris;
  try {
    const res = await pool.query(
      "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
      [judul, penulis, kategori, tahun, tersedia, sinopsis, Number(id)]
    );
    jumlahBaris = res.rowCount;
  } catch (err) {
    console.error("Gagal mengubah buku:", err.message);
    return { error: "Terjadi kesalahan pada database. Coba lagi." };
  }

  if (jumlahBaris === 0) return { error: "Buku tidak ditemukan." };

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  redirect(`/katalog/${id}`);
}

// DELETE
export async function hapusBuku(id, kembaliKeKatalog = false) {
  if (!idValid(id)) return { error: "ID buku tidak valid." };

  try {
    await pool.query("DELETE FROM buku WHERE id = $1", [Number(id)]);
  } catch (err) {
    console.error("Gagal menghapus buku:", err.message);
    return { error: "Terjadi kesalahan pada database. Coba lagi." };
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  if (kembaliKeKatalog) redirect("/katalog");
  return { sukses: true };
}
