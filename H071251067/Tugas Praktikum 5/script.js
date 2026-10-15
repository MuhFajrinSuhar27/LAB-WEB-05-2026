const API = "https://jsonplaceholder.typicode.com";


const statusAnggota = document.getElementById("status-anggota");
const errorAnggota = document.getElementById("error-anggota");
const daftarAnggota = document.getElementById("daftar-anggota");

const judulTugas = document.getElementById("judul-tugas");
const ringkasan = document.getElementById("ringkasan");
const statusTugas = document.getElementById("status-tugas");
const errorTugas = document.getElementById("error-tugas");
const daftarTugas = document.getElementById("daftar-tugas");
const pesanKosong = document.getElementById("pesan-kosong");

const formTugas = document.getElementById("form-tugas");
const inputJudul = document.getElementById("input-judul");
const tombolSimpan = document.getElementById("tombol-simpan");
const errorForm = document.getElementById("error-form");
const inputCari = document.getElementById("input-cari");
const notifikasi = document.getElementById("notifikasi");



let daftarItem = [];
let anggotaTerpilihId = null;
let tombolAnggotaTerpilih = null;
let permintaanTerakhir = 0;
let timerNotifikasi = null;


const KELAS_SELESAI = ["line-through", "text-gray-400"];
const KELAS_TOMBOL_ANGGOTA = [
  "text-left", "px-3", "py-2", "rounded-lg", "border", "border-slate-200",
  "text-sm", "hover:bg-indigo-50", "transition",
];
const KELAS_AKTIF = ["bg-indigo-600", "text-white", "border-indigo-600", "font-semibold"];

function tampilkan(el, teks) {
  el.textContent = teks;
  el.classList.remove("hidden");
}

function sembunyikan(el) {
  el.textContent = "";
  el.classList.add("hidden");
}

function perbaruiRingkasan() {
  const total = daftarItem.length;
  const selesai = daftarItem.filter((t) => t.completed).length;
  ringkasan.textContent = `${selesai} dari ${total} tugas selesai`;
}

function terapkanFilter() {
  const kataKunci = inputCari.value.trim().toLowerCase();
  let terlihat = 0;

  daftarItem.forEach((item) => {
    const cocok = item.title.toLowerCase().includes(kataKunci);
    if (cocok) {
      item.el.classList.remove("hidden");
      terlihat++;
    } else {
      item.el.classList.add("hidden");
    }
  });

  if (anggotaTerpilihId === null) {
    sembunyikan(pesanKosong);
  } else if (daftarItem.length === 0) {
    tampilkan(pesanKosong, "Belum ada tugas.");
  } else if (terlihat === 0) {
    tampilkan(pesanKosong, "Tidak ada tugas yang cocok.");
  } else {
    sembunyikan(pesanKosong);
  }
}

function tandaiSelesaiTampilan(item) {
  item.titleEl.classList.add(...KELAS_SELESAI);
}


function buatItemTugas(data) {
  const item = { title: data.title, completed: data.completed, el: null, titleEl: null };

  const li = document.createElement("li");
  li.className = "border border-slate-200 rounded-lg px-3 py-2";

  const baris = document.createElement("div");
  baris.className = "flex items-center gap-2";

  const judul = document.createElement("span");
  judul.className = "flex-1 text-sm";
  judul.textContent = data.title;

  baris.appendChild(judul);

  item.el = li;
  item.titleEl = judul;

  if (item.completed) {
    tandaiSelesaiTampilan(item);
  } else {
    const tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.className =
      "text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.addEventListener("click", () => {
      item.completed = true;
      tandaiSelesaiTampilan(item);
      tombolSelesai.remove();
      perbaruiRingkasan();
    });
    baris.appendChild(tombolSelesai);
  }

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.className = "text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200";
  tombolHapus.textContent = "Hapus";
  tombolHapus.addEventListener("click", () => {
    item.el.remove();
    daftarItem = daftarItem.filter((t) => t !== item);
    perbaruiRingkasan();
    terapkanFilter();
  });
  baris.appendChild(tombolHapus);

  li.appendChild(baris);
  return item;
}

function tambahItemKeDaftar(data) {
  const item = buatItemTugas(data);
  daftarItem.push(item);
  daftarTugas.appendChild(item.el);
  return item;
}

async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";
  sembunyikan(errorAnggota);

  try {
    const response = await fetch(`${API}/users`);
    if (!response.ok) {
      throw new Error(`Server menjawab dengan status ${response.status}.`);
    }
    const anggota = await response.json();

    anggota.forEach((a) => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.classList.add(...KELAS_TOMBOL_ANGGOTA);
      tombol.textContent = a.name;
      tombol.addEventListener("click", () => pilihAnggota(a, tombol));
      daftarAnggota.appendChild(tombol);
    });
  } catch (error) {
    tampilkan(errorAnggota, `Gagal memuat anggota: ${error.message}`);
  } finally {
    statusAnggota.textContent = "";
  }
}


async function pilihAnggota(anggota, tombol) {
  
  if (tombolAnggotaTerpilih) {
    tombolAnggotaTerpilih.classList.remove(...KELAS_AKTIF);
  }
  tombol.classList.add(...KELAS_AKTIF);
  tombolAnggotaTerpilih = tombol;
  anggotaTerpilihId = anggota.id;

  const nomorPermintaan = ++permintaanTerakhir;

  judulTugas.textContent = `Tugas ${anggota.name}`;
  daftarTugas.innerHTML = "";
  daftarItem = [];
  inputCari.value = "";
  sembunyikan(errorTugas);
  sembunyikan(errorForm);
  sembunyikan(pesanKosong);
  ringkasan.textContent = "";
  tampilkan(statusTugas, "Memuat tugas...");

  try {
    const response = await fetch(`${API}/todos?userId=${anggota.id}`);
    if (!response.ok) {
      throw new Error(`Server menjawab dengan status ${response.status}.`);
    }
    const todos = await response.json();

    if (nomorPermintaan !== permintaanTerakhir) return; // sudah ada pilihan lebih baru

    todos.forEach((t) => tambahItemKeDaftar({ title: t.title, completed: t.completed }));
    perbaruiRingkasan();
    terapkanFilter();
  } catch (error) {
    if (nomorPermintaan !== permintaanTerakhir) return;
    ringkasan.textContent = "";
    tampilkan(errorTugas, `Gagal memuat tugas: ${error.message}`);
  } finally {
    if (nomorPermintaan === permintaanTerakhir) {
      sembunyikan(statusTugas);
    }
  }
}


inputCari.addEventListener("input", terapkanFilter);


function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const kembar = daftarItem.some(
        (t) => t.title.trim().toLowerCase() === judul.toLowerCase()
      );
      if (kembar) {
        reject(new Error("Tugas dengan judul yang sama sudah ada."));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi(pesan) {
  clearTimeout(timerNotifikasi);
  tampilkan(notifikasi, pesan);
  timerNotifikasi = setTimeout(() => sembunyikan(notifikasi), 3000);
}

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault();
  sembunyikan(errorForm);

  if (anggotaTerpilihId === null) {
    tampilkan(errorForm, "Pilih anggota terlebih dahulu.");
    return;
  }

  const judul = inputJudul.value.trim();
  if (judul.length < 5) {
    tampilkan(errorForm, "Judul tugas minimal 5 karakter.");
    return;
  }

  const anggotaSaatSimpan = anggotaTerpilihId;
  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);

    if (anggotaSaatSimpan !== anggotaTerpilihId) return; // anggota sudah berganti

    tambahItemKeDaftar(tugasBaru);
    perbaruiRingkasan();
    terapkanFilter();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    tampilkan(errorForm, error.message);
  } finally {
    tombolSimpan.disabled = false;
    tombolSimpan.textContent = "Simpan";
  }
});

inputJudul.addEventListener("input", () => sembunyikan(errorForm));


muatAnggota();
