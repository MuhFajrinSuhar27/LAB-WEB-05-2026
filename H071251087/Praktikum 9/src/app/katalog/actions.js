"use server";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

// Membaca isi form lalu memvalidasinya. Mengembalikan null jika tidak valid.
function bacaBuku(formData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "true";
  const sinopsis = String(formData.get("sinopsis") ?? "").trim();

  const valid =
    judul &&
    judul.length <= 150 &&
    penulis &&
    penulis.length <= 100 &&
    sinopsis &&
    daftarKategori.includes(kategori) &&
    Number.isInteger(tahun) &&
    tahun >= 1000 &&
    tahun <= new Date().getFullYear();

  if (!valid) return null;
  return { judul, penulis, kategori, tahun, tersedia, sinopsis };
}

// Nilai isian dikembalikan ke form agar tidak hilang saat ada pesan error
function nilaiForm(formData) {
  const hasil = {};
  for (const k of ["judul", "penulis", "kategori", "tahun", "tersedia", "sinopsis"]) {
    hasil[k] = String(formData.get(k) ?? "");
  }
  return hasil;
}

// Hasil gagal untuk ditampilkan di form. ts membuat form dimuat ulang dengan isian terakhir.
function galat(error, formData) {
  return { error, values: nilaiForm(formData), ts: Date.now() };
}

// Buku dianggap kembar jika judul DAN penulis sama (tanpa membedakan huruf besar/kecil)
async function sudahAda(judul, penulis, kecualiId = null) {
  const { rows } = await pool.query(
    "SELECT 1 FROM buku WHERE LOWER(judul) = LOWER($1) AND LOWER(penulis) = LOWER($2) AND ($3::int IS NULL OR id <> $3::int) LIMIT 1",
    [judul, penulis, kecualiId]
  );
  return rows.length > 0;
}

const TIPE_FOTO = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
const BATAS_FOTO = 3 * 1024 * 1024; // 3 MB

const adaFile = (file) => file && typeof file !== "string" && file.size > 0;

// Mengembalikan pesan error jika foto yang dipilih tidak boleh dipakai
function cekFoto(file, nama) {
  if (!adaFile(file)) return null;
  if (!TIPE_FOTO[file.type]) return `Foto ${nama} harus berformat PNG, JPG, atau WebP.`;
  if (file.size > BATAS_FOTO) return `Foto ${nama} terlalu besar (maksimal 3 MB).`;
  return null;
}

// Hanya file hasil unggahan (/uploads/...) yang boleh dihapus; foto bawaan tidak disentuh
async function hapusFoto(pathFoto) {
  if (!pathFoto || !pathFoto.startsWith("/uploads/")) return;
  try {
    await unlink(path.join(process.cwd(), "public", "uploads", path.basename(pathFoto)));
  } catch {}
}

// Menyimpan foto ke public/uploads. Tanpa file baru, path lama dipertahankan.
async function simpanFoto(file, pathLama = null) {
  if (!adaFile(file)) return pathLama;
  const folder = path.join(process.cwd(), "public", "uploads");
  await mkdir(folder, { recursive: true });
  const nama = `${Date.now()}-${randomUUID().slice(0, 8)}.${TIPE_FOTO[file.type]}`;
  await writeFile(path.join(folder, nama), Buffer.from(await file.arrayBuffer()));
  await hapusFoto(pathLama);
  return `/uploads/${nama}`;
}

// ID dari form harus berupa angka bulat positif
function idValid(id) {
  return /^\d{1,9}$/.test(id);
}

export async function tambahBuku(stateLama, formData) {
  const buku = bacaBuku(formData);
  if (!buku) {
    return galat("Data belum lengkap atau tidak valid. Periksa kembali isian form.", formData);
  }
  if (await sudahAda(buku.judul, buku.penulis)) {
    return galat(`Buku "${buku.judul}" karya ${buku.penulis} sudah ada di katalog.`, formData);
  }

  const errorFoto =
    cekFoto(formData.get("cover"), "tampak depan") ||
    cekFoto(formData.get("belakang"), "tampak belakang");
  if (errorFoto) return galat(errorFoto, formData);

  const cover = await simpanFoto(formData.get("cover"));
  const belakang = await simpanFoto(formData.get("belakang"));

  await pool.query(
    "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis, cover, belakang) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [buku.judul, buku.penulis, buku.kategori, buku.tahun, buku.tersedia, buku.sinopsis, cover, belakang]
  );

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}

export async function ubahBuku(stateLama, formData) {
  const id = String(formData.get("id") ?? "");
  const buku = bacaBuku(formData);
  if (!idValid(id)) return galat("ID buku tidak valid.", formData);
  if (!buku) {
    return galat("Data belum lengkap atau tidak valid. Periksa kembali isian form.", formData);
  }
  if (await sudahAda(buku.judul, buku.penulis, Number(id))) {
    return galat(`Buku "${buku.judul}" karya ${buku.penulis} sudah ada di katalog.`, formData);
  }

  const errorFoto =
    cekFoto(formData.get("cover"), "tampak depan") ||
    cekFoto(formData.get("belakang"), "tampak belakang");
  if (errorFoto) return galat(errorFoto, formData);

  // Foto lama dipertahankan kecuali ada file baru yang dipilih
  const { rows } = await pool.query("SELECT cover, belakang FROM buku WHERE id = $1", [id]);
  if (!rows[0]) return galat("Buku tidak ditemukan.", formData);
  const cover = await simpanFoto(formData.get("cover"), rows[0].cover);
  const belakang = await simpanFoto(formData.get("belakang"), rows[0].belakang);

  await pool.query(
    "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6, cover = $7, belakang = $8 WHERE id = $9",
    [buku.judul, buku.penulis, buku.kategori, buku.tahun, buku.tersedia, buku.sinopsis, cover, belakang, id]
  );

  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath(`/katalog/${id}`);
  redirect(`/katalog/${id}`);
}

export async function hapusBuku(formData) {
  const id = String(formData.get("id") ?? "");
  if (!idValid(id)) return;

  const { rows } = await pool.query("DELETE FROM buku WHERE id = $1 RETURNING cover, belakang", [id]);
  if (rows[0]) {
    await hapusFoto(rows[0].cover);
    await hapusFoto(rows[0].belakang);
  }

  revalidatePath("/");
  revalidatePath("/katalog");
  redirect("/katalog");
}