// Pemetaan judul buku ke file sampul di folder public/sampul-buku.
// Pencocokan menggunakan judul, bukan ID PostgreSQL, karena ID di database
// bisa berbeda jika data sebelumnya pernah dihapus atau ditambahkan ulang.

const daftarSampul = {
  "clean code": "/sampul-buku/clean%20code.png",
  "designing data intensive applications": "/sampul-buku/data-intensive-applicaton.png",
  "refactoring": "/sampul-buku/Refactoring.png",
  "laut bercerita": "/sampul-buku/laut%20bercerita.png",
  "bumi manusia": "/sampul-buku/bumi%20manusia.png",
  "cantik itu luka": "/sampul-buku/cantik%20itu%20luka.png",
  "atomic habits": "/sampul-buku/atomic%20habits.png",
  "deep work": "/sampul-buku/deep%20work.png",
  "filosofi teras": "/sampul-buku/filosofis%20teras.png",
};

function normalisasiJudul(judul) {
  return String(judul ?? "")
    .toLocaleLowerCase("id-ID")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function ambilSampulBuku(buku) {
  const kunciJudul = normalisasiJudul(buku?.judul);
  return daftarSampul[kunciJudul] ?? null;
}
