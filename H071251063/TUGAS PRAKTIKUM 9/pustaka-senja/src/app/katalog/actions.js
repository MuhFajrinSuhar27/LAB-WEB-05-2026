"use server";

import pool from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

// FUNGSI MENYIMPAN GAMBAR
async function simpanGambar(file) {
  if (!file || file.size === 0) {
    return null;
  }

  const tipeGambar = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };

  const ekstensi = tipeGambar[file.type];

  if (!ekstensi) {
    throw new Error("Format gambar harus JPG, PNG, atau WEBP.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Ukuran gambar maksimal 5 MB.");
  }

  const namaFile = `${randomUUID()}${ekstensi}`;

  const folderGambar = path.join(
    process.cwd(),
    "public",
    "images"
  );

  await mkdir(folderGambar, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(
    path.join(folderGambar, namaFile),
    buffer
  );

  return `/images/${namaFile}`;
}

// ==========================================
// CREATE - TAMBAH BUKU
// ==========================================

export async function tambahBuku(formData) {
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "true";
  const sinopsis = formData.get("sinopsis")?.trim();

  const fileDepan = formData.get("gambar");
  const fileBelakang = formData.get("gambar_belakang");

  if (!judul || !penulis || !kategori || !sinopsis) {
    throw new Error("Semua data buku wajib diisi.");
  }

  if (!Number.isInteger(tahun) || tahun < 1000 || tahun > 2027) {
    throw new Error("Tahun terbit harus antara 1000 sampai 2027.");
  }

  const daftarKategori = [
    "Teknologi",
    "Fiksi",
    "Pengembangan Diri",
  ];

  if (!daftarKategori.includes(kategori)) {
    throw new Error("Kategori tidak valid.");
  }

  // Memeriksa buku duplikat
  const bukuDuplikat = await pool.query(
    `SELECT id
     FROM buku
     WHERE LOWER(TRIM(judul::TEXT)) = LOWER(TRIM($1::TEXT))
     AND LOWER(TRIM(penulis::TEXT)) = LOWER(TRIM($2::TEXT))`,
    [judul, penulis]
  );

  if (bukuDuplikat.rowCount > 0) {
    throw new Error(
      "Buku dengan judul dan penulis tersebut sudah terdaftar."
    );
  }

  // Menyimpan gambar
  const gambar = await simpanGambar(fileDepan);
  const gambarBelakang = await simpanGambar(fileBelakang);

  // Menambahkan data ke database
  await pool.query(
    `INSERT INTO buku
      (judul, penulis, kategori, tahun, tersedia, sinopsis, gambar, gambar_belakang)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      judul,
      penulis,
      kategori,
      tahun,
      tersedia,
      sinopsis,
      gambar,
      gambarBelakang,
    ]
  );

  revalidatePath("/");
  revalidatePath("/katalog");

  redirect("/katalog");
}

// ==========================================
// UPDATE - EDIT BUKU
// ==========================================

export async function ubahBuku(formData) {
  const id = formData.get("id");
  const judul = formData.get("judul")?.trim();
  const penulis = formData.get("penulis")?.trim();
  const kategori = formData.get("kategori");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "true";
  const sinopsis = formData.get("sinopsis")?.trim();

  const fileDepan = formData.get("gambar");
  const fileBelakang = formData.get("gambar_belakang");

  if (!id || !judul || !penulis || !kategori || !sinopsis) {
    throw new Error("Semua data buku wajib diisi.");
  }

  if (!Number.isInteger(tahun) || tahun < 1000 || tahun > 2027) {
    throw new Error("Tahun harus antara 1000 sampai 2027.");
  }

  const daftarKategori = [
    "Teknologi",
    "Fiksi",
    "Pengembangan Diri",
  ];

  if (!daftarKategori.includes(kategori)) {
    throw new Error("Kategori tidak valid.");
  }

  // Memeriksa apakah buku tersedia
  const dataLama = await pool.query(
    `SELECT gambar, gambar_belakang
     FROM buku
     WHERE id = $1`,
    [id]
  );

  if (dataLama.rowCount === 0) {
    throw new Error("Buku tidak ditemukan.");
  }

  // Menggunakan gambar lama sebagai nilai awal
  let gambar = dataLama.rows[0].gambar;
  let gambarBelakang = dataLama.rows[0].gambar_belakang;

  // Memeriksa duplikat, kecuali buku yang sedang diedit
  const bukuDuplikat = await pool.query(
    `SELECT id
     FROM buku
     WHERE LOWER(TRIM(judul::TEXT)) = LOWER(TRIM($1::TEXT))
     AND LOWER(TRIM(penulis::TEXT)) = LOWER(TRIM($2::TEXT))
     AND id <> $3`,
    [judul, penulis, id]
  );

  if (bukuDuplikat.rowCount > 0) {
    throw new Error(
      "Judul dan penulis tersebut sudah digunakan oleh buku lain."
    );
  }

  // Mengganti sampul depan jika ada file baru
  if (fileDepan && fileDepan.size > 0) {
    gambar = await simpanGambar(fileDepan);
  }

  // Mengganti sampul belakang jika ada file baru
  if (fileBelakang && fileBelakang.size > 0) {
    gambarBelakang = await simpanGambar(fileBelakang);
  }

  // Memperbarui data buku
  const result = await pool.query(
    `UPDATE buku
     SET judul = $1,
         penulis = $2,
         kategori = $3,
         tahun = $4,
         tersedia = $5,
         sinopsis = $6,
         gambar = $7,
         gambar_belakang = $8
     WHERE id = $9
     RETURNING id`,
    [
      judul,
      penulis,
      kategori,
      tahun,
      tersedia,
      sinopsis,
      gambar,
      gambarBelakang,
      id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("Buku tidak ditemukan.");
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);

  redirect("/katalog");
}

// ==========================================
// DELETE - HAPUS BUKU
// ==========================================

export async function hapusBuku(id) {
  if (!id) {
    throw new Error("ID buku tidak valid.");
  }

  const result = await pool.query(
    "DELETE FROM buku WHERE id = $1 RETURNING id",
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error("Buku tidak ditemukan.");
  }

  revalidatePath("/");
  revalidatePath("/katalog");

  redirect("/katalog");
}
