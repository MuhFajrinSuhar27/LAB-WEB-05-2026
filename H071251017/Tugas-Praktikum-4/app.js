// Data awal praktikan
const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [43, 47, 46] },
  { nama: "Suno", nilaiTugas: [80, 85, 90] },
  { nama: "Teguh", nilaiTugas: [85, 90, 90] }
];

/*LOGIKA PROGRAM */

const BATAS_LULUS = 75;
const KODE_ASISTEN = "ASLAB123"; 
const MAKS_PERCOBAAN = 3;

// 1. Verifikasi Asisten Lab dengan prompt()
function verifikasiAsisten() {
  for (let i = 1; i <= MAKS_PERCOBAAN; i++) {
    const input = prompt(
      "Verifikasi Asisten Lab\nMasukkan kode asisten (percobaan " + i + " dari " + MAKS_PERCOBAAN + "):"
    );

    if (input === null) {
      return false; // pengguna menekan Cancel
    }
    if (input.trim() === KODE_ASISTEN) {
      return true;
    }
    alert("Kode salah. Silakan coba lagi.");
  }
  return false;
}

// 2. Fungsi pemrosesan data
function hitungRataRata(nilaiTugas) {
  if (nilaiTugas.length === 0) {
    return 0;
  }
  const total = nilaiTugas.reduce((jumlah, nilai) => jumlah + nilai, 0);
  return Number((total / nilaiTugas.length).toFixed(1));
}

function tentukanStatus(rataRata) {
  return rataRata >= BATAS_LULUS ? "Lulus" : "Tidak Lulus";
}

function tentukanPredikat(rataRata) {
  if (rataRata >= 85) return "A";
  if (rataRata >= 75) return "B";
  if (rataRata >= 60) return "C";
  return "D";
}

function prosesData(daftar) {
  return daftar.map(function (praktikan) {
    const rataRata = hitungRataRata(praktikan.nilaiTugas);
    return {
      nama: praktikan.nama,
      nilaiTugas: praktikan.nilaiTugas,
      rataRata: rataRata,
      predikat: tentukanPredikat(rataRata),
      status: tentukanStatus(rataRata)
    };
  });
}

// 3. Fungsi pembuat tampilan (document.write)
const gayaHalaman = `
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", system-ui, sans-serif;
    background: #eef2f1;
    color: #14232b;
    padding: 32px 20px 48px;
  }
  .wadah { max-width: 1040px; margin: 0 auto; }
  header { margin-bottom: 28px; }
  header h1 { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; }
  header p { margin-top: 6px; color: #4b6069; max-width: 60ch; line-height: 1.5; }
  .ringkasan {
    display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px;
  }
  .ringkasan div {
    flex: 1 1 160px; background: #fff; border: 1px solid #d3dddb;
    border-radius: 10px; padding: 14px 16px;
  }
  .ringkasan strong { display: block; font-size: 1.7rem; margin-bottom: 2px; }
  .ringkasan span { font-size: 0.85rem; color: #4b6069; }
  .grid {
    display: grid; gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
  .kartu {
    background: #fff; border: 1px solid #d3dddb; border-left-width: 6px;
    border-radius: 10px; padding: 18px;
  }
  .kartu.lulus { border-left-color: #0f766e; }
  .kartu.gagal { border-left-color: #b4332e; }
  .atas { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .atas h2 { font-size: 1.25rem; }
  .atas small { color: #4b6069; }
  .lencana {
    font-size: 0.8rem; font-weight: 600; padding: 4px 10px; border-radius: 999px;
  }
  .lulus .lencana { background: #d5efeb; color: #0b5750; }
  .gagal .lencana { background: #f8dcda; color: #8c2420; }
  .rata { margin: 16px 0 6px; display: flex; align-items: baseline; gap: 8px; }
  .rata b { font-size: 2.2rem; line-height: 1; }
  .rata span { color: #4b6069; font-size: 0.9rem; }
  .batang { position: relative; height: 10px; background: #e3eae8; border-radius: 999px; }
  .isi { height: 100%; border-radius: 999px; }
  .lulus .isi { background: #0f766e; }
  .gagal .isi { background: #b4332e; }
  .garis {
    position: absolute; top: -4px; bottom: -4px; width: 2px; background: #14232b;
    left: ${BATAS_LULUS}%;
  }
  .keterangan { margin-top: 6px; font-size: 0.75rem; color: #4b6069; }
  .tugas { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
  .tugas span {
    background: #eef2f1; border-radius: 6px; padding: 5px 9px; font-size: 0.82rem;
  }
  .ditolak {
    max-width: 460px; margin: 15vh auto 0; background: #fff;
    border: 1px solid #d3dddb; border-left: 6px solid #b4332e;
    border-radius: 10px; padding: 24px;
  }
  .ditolak h1 { font-size: 1.3rem; margin-bottom: 8px; }
  .ditolak p { color: #4b6069; line-height: 1.5; }
</style>
`;

function buatKartu(hasil) {
  const kelas = hasil.status === "Lulus" ? "lulus" : "gagal";
  const chipTugas = hasil.nilaiTugas
    .map(function (nilai, indeks) {
      return "<span>Tugas " + (indeks + 1) + ": <b>" + nilai + "</b></span>";
    })
    .join("");

  return `
    <article class="kartu ${kelas}">
      <div class="atas">
        <div>
          <h2>${hasil.nama}</h2>
          <small>Predikat ${hasil.predikat}</small>
        </div>
        <span class="lencana">${hasil.status}</span>
      </div>
      <div class="rata"><b>${hasil.rataRata}</b><span>rata-rata nilai</span></div>
      <div class="batang">
        <div class="isi" style="width: ${hasil.rataRata}%"></div>
        <div class="garis"></div>
      </div>
      <div class="keterangan">Garis hitam = batas lulus (${BATAS_LULUS})</div>
      <div class="tugas">${chipTugas}</div>
    </article>
  `;
}

function tampilkanLaporan(hasilAkhir) {
  const jumlahLulus = hasilAkhir.filter(function (h) {
    return h.status === "Lulus";
  }).length;
  const jumlahGagal = hasilAkhir.length - jumlahLulus;
  const rataKelas = hitungRataRata(
    hasilAkhir.map(function (h) {
      return h.rataRata;
    })
  );

  document.write(gayaHalaman);
  document.write(`
    <div class="wadah">
      <header>
        <h1>Laporan Evaluasi Praktikum</h1>
        <p>Rata-rata nilai tugas setiap praktikan. Praktikan lulus jika rata-rata minimal ${BATAS_LULUS}.</p>
      </header>
      <section class="ringkasan">
        <div><strong>${hasilAkhir.length}</strong><span>Total praktikan</span></div>
        <div><strong>${jumlahLulus}</strong><span>Lulus</span></div>
        <div><strong>${jumlahGagal}</strong><span>Tidak lulus</span></div>
        <div><strong>${rataKelas}</strong><span>Rata-rata kelas</span></div>
      </section>
      <section class="gr
      id">
        ${hasilAkhir.map(buatKartu).join("")}
      </section>
    </div>
  `);
}

function tampilkanAksesDitolak() {
  document.write(gayaHalaman);
  document.write(`
    <div class="ditolak">
      <h1>Akses ditolak</h1>
      <p>Verifikasi Asisten Lab gagal. Muat ulang halaman (F5) dan masukkan kode yang benar.</p>
    </div>
  `);
}

// 4. Alur utama program
if (verifikasiAsisten()) {
  const hasilAkhir = prosesData(dataPraktikan);
  tampilkanLaporan(hasilAkhir);
  console.log(hasilAkhir);
} else {
  tampilkanAksesDitolak();
}