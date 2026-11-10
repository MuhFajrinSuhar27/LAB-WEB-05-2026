export function parseId(raw) {
  if (typeof raw !== "string" || !/^\d{1,9}$/.test(raw)) return null;
  const n = Number(raw);
  return n > 0 ? n : null;
}

export function validasiBuku(formData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunRaw = String(formData.get("tahun") ?? "").trim();
  const status = String(formData.get("tersedia") ?? "");
  const sinopsis = String(formData.get("sinopsis") ?? "").trim();

  const errors = {};
  const tahunMaks = new Date().getFullYear() + 1;

  if (!judul) errors.judul = "Judul wajib diisi.";
  else if (judul.length > 150) errors.judul = "Maksimal 150 karakter.";

  if (!penulis) errors.penulis = "Penulis wajib diisi.";
  else if (penulis.length > 100) errors.penulis = "Maksimal 100 karakter.";

  if (!kategori) errors.kategori = "Kategori wajib diisi.";
  else if (kategori.length > 50) errors.kategori = "Maksimal 50 karakter.";

  if (!/^\d{3,4}$/.test(tahunRaw)) errors.tahun = "Tahun harus berupa angka bulat.";
  else if (Number(tahunRaw) < 1000 || Number(tahunRaw) > tahunMaks)
    errors.tahun = `Tahun harus antara 1000 dan ${tahunMaks}.`;

  if (status !== "true" && status !== "false")
    errors.tersedia = "Pilih status ketersediaan.";

  if (!sinopsis) errors.sinopsis = "Sinopsis wajib diisi.";
  else if (sinopsis.length < 20) errors.sinopsis = "Minimal 20 karakter.";
  else if (sinopsis.length > 2000) errors.sinopsis = "Maksimal 2000 karakter.";

  return {
    values: { judul, penulis, kategori, tahun: tahunRaw, tersedia: status, sinopsis },
    errors,
  };
}
