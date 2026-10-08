const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] }
];
const BATAS_LULUS = 75;

const namaAsisten = prompt("Masukkan nama Anda:");

function hitungRataRata(daftarNilai) {
  if (daftarNilai.length === 0) {
    return 0;
  }
  const total = daftarNilai.reduce(function (jumlah, nilai) {
    return jumlah + nilai;
  }, 0);
  return total / daftarNilai.length;
}

function tentukanStatus(rataRata) {
  if (rataRata >= BATAS_LULUS) {
    return "Lulus";
  } else {
    return "Tidak Lulus";
  }
}

function prosesData(daftarPraktikan) {
  return daftarPraktikan.map(function (praktikan) {
    const rataRata = hitungRataRata(praktikan.nilaiTugas);
    return {
      nama: praktikan.nama,
      nilaiTugas: praktikan.nilaiTugas,
      rataRata: Number(rataRata.toFixed(2)),
      status: tentukanStatus(rataRata)
    };
  });
}

const gaya = `
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background: #f1f5f9;
    color: #09162aff;
    padding: 40px 16px;
  }
  .kartu-utama {
    max-width: 640px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 16px rgba(11, 18, 34, 0.08);
  }
  .kartu-utama h1 { font-size: 1.6rem; font-weight: 800; color: #0f172a; }
  .subjudul {
    font-size: 0.85rem;
    color: #64748b;
    padding-bottom: 18px;
    border-bottom: 1px solid #e2e8f0;
    margin-top: 4px;
    margin-bottom: 22px;
  }

  .info, .tolak {
    padding: 14px 16px;
    border-left: 4px solid;
    border-radius: 4px;
    margin-bottom: 22px;
  }
  .info { background: #eff6ff; border-color: #2563eb; color: #1e40af; }
  .tolak { background: #fef2f2; border-color: #b91c1c; color: #991b1b; margin-bottom: 0; }
  .info strong, .tolak strong { display: block; font-size: 1rem; }
  .info span, .tolak span { font-size: 0.85rem; opacity: 0.85; }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin-bottom: 14px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
  }
  .item:last-child { margin-bottom: 0; }
  .nama { font-weight: 700; }
  .rata { font-size: 0.85rem; color: #64748b; }

  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 999px;
  }
  .badge.lulus { background: #dcfce7; color: #15803d; }
  .badge.tidak { background: #fee2e2; color: #b91c1c; }

  @media (max-width: 480px) {
    .kartu-utama { padding: 22px; }
  }
</style>
`;

function buatBaris(praktikan) {
  const kelasBadge = praktikan.status === "Lulus" ? "lulus" : "tidak";

  return `
    <div class="item">
      <div>
        <div class="nama">${praktikan.nama}</div>
        <div class="rata">Rata-rata: ${praktikan.rataRata}</div>
      </div>
      <div class="badge ${kelasBadge}">${praktikan.status}</div>
    </div>
  `;
}

function tulisKepala() {
  document.write(gaya);
  document.write(`
    <div class="kartu-utama">
      <h1>Sistem Laporan Praktikum</h1>
      <div class="subjudul">Evaluasi kelulusan berbasis JavaScript murni</div>
  `);
}

function tulisPenutup() {
  document.write(`</div>`);
}


tulisKepala();

if (namaAsisten === null || namaAsisten.trim() === "") {
  document.write(`
    <div class="tolak">
      <strong>Akses Ditolak</strong>
      <span>Anda tidak memasukkan identitas asisten.</span>
    </div>
  `);
  console.log("Akses ditolak: identitas asisten kosong.");
} else {
  const hasilAkhir = prosesData(dataPraktikan);

  document.write(`
    <div class="info">
      <strong>Selamat datang Asisten ${namaAsisten.trim()}!</strong>
      <span>Berikut adalah laporan hasil evaluasi praktikum.</span>
    </div>
  `);

  hasilAkhir.forEach(function (praktikan) {
    document.write(buatBaris(praktikan));
  });

  console.log("Hasil akhir evaluasi praktikum:", hasilAkhir);
}

tulisPenutup();