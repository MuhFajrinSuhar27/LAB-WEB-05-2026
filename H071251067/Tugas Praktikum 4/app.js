
const dataPraktikan = [
  { nama: "Budi", nilaiTugas: [80, 85, 90] },
  { nama: "Siti", nilaiTugas: [60, 60, 60] },
  { nama: "Andi", nilaiTugas: [90, 90, 90] },
  { nama: "Dewi", nilaiTugas: [75, 75, 75] },
  { nama: "Eko", nilaiTugas: [45, 45, 45] }
];
const BATAS_LULUS = 75;

function verifikasiAsisten() {
  const input = prompt("Verifikasi Asisten Lab\nMasukkan nama asisten:");

  
  if (input === null || input.trim() === "") {
    return null;
  }
  return input.trim();
}


function hitungRataRata(daftarNilai) {
  const total = daftarNilai.reduce((jumlah, nilai) => jumlah + nilai, 0);
  return Number((total / daftarNilai.length));
}

function tentukanPredikat(rataRata) {
  if (rataRata >= 85) return "A";
  else if (rataRata >= 75) return "B";
  else if (rataRata >= 60) return "C";
  else if (rataRata >= 50) return "D";
  else return "E";
}
function prosesData(data) {
  return data.map(function (praktikan) {
    const rataRata = hitungRataRata(praktikan.nilaiTugas);
    return {
      nama: praktikan.nama,
      nilaiTugas: praktikan.nilaiTugas,
      rataRata: rataRata,
      predikat: tentukanPredikat(rataRata),
      status: rataRata >= BATAS_LULUS ? "Lulus" : "Tidak Lulus"
    };
  });
}


function buatGaya() {
  return `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Figtree:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --kertas: #eef3ef;
      --tinta: #0f2f2e;
      --tinta-muda: #4d6664;
      --garis: #cfdcd5;
      --lulus: #1b8a5a;
      --lulus-bg: #dcf3e6;
      --gagal: #c6432b;
      --gagal-bg: #fbe3dd;
      --penanda: #f0a43a;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Figtree', system-ui, sans-serif;
      color: var(--tinta);
      background-color: var(--kertas);
      background-image:
        linear-gradient(var(--garis) 1px, transparent 1px),
        linear-gradient(90deg, var(--garis) 1px, transparent 1px);
      background-size: 28px 28px;
      min-height: 100vh;
      line-height: 1.5;
    }
    .wadah { max-width: 1080px; margin: 0 auto; padding: 48px 20px 64px; }
    .kepala { margin-bottom: 32px; }
    .kepala h1 {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-weight: 800;
      font-size: clamp(2rem, 5vw, 3.4rem);
      line-height: 1.05;
      max-width: 14ch;
    }
    .kepala p { margin-top: 12px; color: var(--tinta-muda); max-width: 56ch; }

    .ringkasan { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px; margin-bottom: 36px; }
    .ringkasan div {
      background: var(--tinta);
      color: #fff;
      border-radius: 14px;
      padding: 18px 20px;
    }
    .ringkasan strong { display: block; font-family: 'Bricolage Grotesque', sans-serif; font-size: 2.1rem; line-height: 1.1; }
    .ringkasan span { font-size: .9rem; color: #b9d0cb; }

    .daftar { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .kartu {
      background: #fff;
      border: 2px solid var(--tinta);
      border-radius: 18px;
      padding: 22px;
      box-shadow: 6px 6px 0 var(--tinta);
    }
    .kartu-atas { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
    .kartu h2 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.5rem; }
    .lencana { display: inline-block; margin-top: 6px; padding: 3px 12px; border-radius: 99px; font-weight: 600; font-size: .85rem; }
    .lulus .lencana { background: var(--lulus-bg); color: var(--lulus); }
    .gagal .lencana { background: var(--gagal-bg); color: var(--gagal); }
    .predikat {
      width: 58px; height: 58px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      border-radius: 14px;
      font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 1.9rem;
      color: #fff;
    }
    .lulus .predikat { background: var(--lulus); }
    .gagal .predikat { background: var(--gagal); }

    .rata { margin-top: 20px; display: flex; align-items: baseline; gap: 8px; }
    .rata strong { font-family: 'Bricolage Grotesque', sans-serif; font-size: 2.6rem; line-height: 1; }
    .rata span { color: var(--tinta-muda); font-size: .9rem; }

    .bar { position: relative; height: 12px; margin-top: 14px; background: var(--kertas); border-radius: 99px; }
    .isi { height: 100%; border-radius: 99px; }
    .lulus .isi { background: var(--lulus); }
    .gagal .isi { background: var(--gagal); }
    .batas { position: absolute; top: -5px; bottom: -5px; left: 75%; width: 3px; background: var(--penanda); border-radius: 2px; }
    .ket-batas { margin-top: 8px; font-size: .78rem; color: var(--tinta-muda); text-align: right; padding-right: calc(25% - 38px); }

    .tugas { margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
    .tugas span { background: var(--kertas); border-radius: 8px; padding: 4px 10px; font-size: .85rem; font-weight: 500; }

    .kunci { max-width: 420px; margin: 18vh auto 0; background: #fff; border: 2px solid var(--tinta); border-radius: 18px; padding: 32px; box-shadow: 6px 6px 0 var(--gagal); }
    .kunci h1 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.8rem; }
    .kunci p { margin-top: 10px; color: var(--tinta-muda); }

    .kaki { margin-top: 40px; font-size: .85rem; color: var(--tinta-muda); }
    @media (max-width: 480px) { .kartu { padding: 18px; } }
  </style>`;
}

function buatKartu(praktikan) {
  const kelas = praktikan.status === "Lulus" ? "lulus" : "gagal";
  const daftarNilai = praktikan.nilaiTugas
    .map(function (nilai, indeks) {
      return "<span>Tugas " + (indeks + 1) + ": " + nilai + "</span>";
    })
    .join("");

  return `
  <article class="kartu ${kelas}">
    <div class="kartu-atas">
      <div>
        <h2>${praktikan.nama}</h2>
        <span class="lencana">${praktikan.status}</span>
      </div>
      <div class="predikat">${praktikan.predikat}</div>
    </div>
    <div class="rata"><strong>${praktikan.rataRata}</strong><span>rata-rata nilai</span></div>
    <div class="bar">
      <div class="isi" style="width:${praktikan.rataRata}%"></div>
      <div class="batas"></div>
    </div>
    <div class="ket-batas">batas lulus ${BATAS_LULUS}</div>
    <div class="tugas">${daftarNilai}</div>
  </article>`;
}

function buatRingkasan(hasil) {
  const jumlahLulus = hasil.filter(function (p) { return p.status === "Lulus"; }).length;
  const jumlahGagal = hasil.length - jumlahLulus;
  const rataKelas = hitungRataRata(hasil.map(function (p) { return p.rataRata; }));

  return `
  <section class="ringkasan">
    <div><strong>${hasil.length}</strong><span>Praktikan dinilai</span></div>
    <div><strong>${jumlahLulus}</strong><span>Lulus</span></div>
    <div><strong>${jumlahGagal}</strong><span>Tidak lulus</span></div>
    <div><strong>${rataKelas}</strong><span>Rata-rata kelas</span></div>
  </section>`;
}

function tampilkanLaporan(hasil, namaAsisten) {
  document.write(buatGaya());
  document.write('<main class="wadah">');
  document.write(`
    <header class="kepala">
      <h1>Laporan Evaluasi Praktikum</h1>
      <p>Asisten lab: <strong>${namaAsisten}</strong>. Nilai tiap praktikan dihitung dari rata-rata nilai tugas. Praktikan lulus jika rata-rata mencapai ${BATAS_LULUS} atau lebih.</p>
    </header>`);
  document.write(buatRingkasan(hasil));
  document.write('<section class="daftar">');
  hasil.forEach(function (praktikan) {
    document.write(buatKartu(praktikan));
  });
  document.write("</section>");
  document.write('<p class="kaki">Data lengkap tersedia di konsol browser.</p>');
  document.write("</main>");
}

function tampilkanAksesDitolak() {
  document.write(buatGaya());
  document.write(`
    <main class="kunci">
      <h1>Error: nama asisten kosong</h1>
      <p>Nama asisten wajib diisi untuk membuka laporan. Muat ulang halaman lalu masukkan nama Anda.</p>
    </main>`);
}
const namaAsisten = verifikasiAsisten();

if (namaAsisten !== null) {
  const hasilAkhir = prosesData(dataPraktikan);

  tampilkanLaporan(hasilAkhir, namaAsisten);
  console.log("Hasil akhir evaluasi praktikum:");
  console.log(hasilAkhir);
} else {
  console.error("Error: nama asisten tidak boleh kosong.");
  tampilkanAksesDitolak();
}
