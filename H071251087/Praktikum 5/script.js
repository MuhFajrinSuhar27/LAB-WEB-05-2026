const API = "https://jsonplaceholder.typicode.com";

// ---------- Elemen ----------
const statusAnggota = document.getElementById("status-anggota");
const daftarAnggota = document.getElementById("daftar-anggota");
const panelTugas = document.getElementById("panel-tugas");
const judulTugas = document.getElementById("judul-tugas");
const ringkasan = document.getElementById("ringkasan");
const statusTugas = document.getElementById("status-tugas");
const formTambah = document.getElementById("form-tambah");
const inputJudul = document.getElementById("input-judul");
const tombolSimpan = document.getElementById("tombol-simpan");
const errorForm = document.getElementById("error-form");
const notifikasi = document.getElementById("notifikasi");
const inputCari = document.getElementById("input-cari");
const daftarTugas = document.getElementById("daftar-tugas");
const pesanKosong = document.getElementById("pesan-kosong");

// ---------- State ----------
// Tiap item: { title, completed, el }
let tugasSaatIni = [];
let permintaanTerakhir = 0; // mencegah respons lama menimpa respons baru
let timerNotifikasi = null;

const KELAS_SELESAI = ["line-through", "text-neutral-500"];

// ---------- Helper status (loading / error) ----------
function tampilkanStatus(el, pesan, jenis) {
  el.textContent = pesan;
  el.classList.remove("hidden", "text-gray-400", "text-red-400");
  el.classList.add(jenis === "error" ? "text-red-400" : "text-gray-400");
}

function sembunyikanStatus(el) {
  el.textContent = "";
  el.classList.add("hidden");
}

// ---------- F1: Daftar anggota ----------
async function ambilAnggota() {
  tampilkanStatus(statusAnggota, "Memuat anggota...", "loading");
  try {
    const respons = await fetch(`${API}/users`);
    if (!respons.ok) {
      throw new Error(`Server mengembalikan status ${respons.status}`);
    }
    const anggota = await respons.json();

    daftarAnggota.innerHTML = "";
    anggota.forEach((user) => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.textContent = user.name;
      tombol.className =
        "anggota-btn border border-neutral-700 rounded-full px-3 py-1 text-sm bg-neutral-800 text-white hover:bg-neutral-700";
      tombol.addEventListener("click", () => pilihAnggota(user, tombol));
      daftarAnggota.appendChild(tombol);
    });
    sembunyikanStatus(statusAnggota);
  } catch (error) {
    tampilkanStatus(
      statusAnggota,
      `Gagal memuat anggota: ${error.message}`,
      "error"
    );
  }
}

// ---------- F2: Tugas anggota ----------
async function pilihAnggota(user, tombol) {
  // Penanda: hanya satu anggota yang aktif
  document.querySelectorAll(".anggota-btn").forEach((b) => b.classList.remove("aktif"));
  tombol.classList.add("aktif");

  panelTugas.classList.remove("hidden");
  judulTugas.textContent = `Tugas ${user.name}`;

  // Reset tampilan sebelum memuat
  daftarTugas.innerHTML = "";
  tugasSaatIni = [];
  ringkasan.textContent = "";
  pesanKosong.classList.add("hidden");
  inputCari.value = "";
  errorForm.textContent = "";

  const idPermintaan = ++permintaanTerakhir;
  tampilkanStatus(statusTugas, "Memuat tugas...", "loading");

  try {
    const respons = await fetch(`${API}/todos?userId=${user.id}`);
    if (!respons.ok) {
      throw new Error(`Server mengembalikan status ${respons.status}`);
    }
    const todos = await respons.json();

    // Abaikan jika sudah ada klik anggota lain setelah ini
    if (idPermintaan !== permintaanTerakhir) return;

    daftarTugas.innerHTML = "";
    tugasSaatIni = [];
    todos.forEach((todo) => {
      tambahkanKeDaftar({ title: todo.title, completed: todo.completed });
    });

    sembunyikanStatus(statusTugas);
    perbaruiRingkasan();
    terapkanPencarian();
  } catch (error) {
    if (idPermintaan !== permintaanTerakhir) return;
    tampilkanStatus(statusTugas, `Gagal memuat tugas: ${error.message}`, "error");
  }
}

function buatItemTugas(tugas) {
  const li = document.createElement("li");
  li.className = "flex items-center gap-2 border border-neutral-700 rounded-lg px-3 py-2";

  const judul = document.createElement("span");
  judul.className = "flex-1";
  judul.textContent = tugas.title;
  if (tugas.completed) judul.classList.add(...KELAS_SELESAI);
  li.appendChild(judul);

  // F5: tombol Tandai selesai (hanya untuk yang belum selesai)
  if (!tugas.completed) {
    const tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.className =
      "text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700";
    tombolSelesai.addEventListener("click", () => {
      judul.classList.add(...KELAS_SELESAI);
      tugas.completed = true;
      tombolSelesai.remove();
      perbaruiRingkasan();
    });
    li.appendChild(tombolSelesai);
  }

  // F5: tombol Hapus
  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.textContent = "Hapus";
  tombolHapus.className =
    "text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700";
  tombolHapus.addEventListener("click", () => {
    li.remove();
    tugasSaatIni = tugasSaatIni.filter((t) => t !== tugas);
    perbaruiRingkasan();
    terapkanPencarian();
  });
  li.appendChild(tombolHapus);

  return li;
}

function tambahkanKeDaftar(tugas) {
  tugas.el = buatItemTugas(tugas);
  tugasSaatIni.push(tugas);
  daftarTugas.appendChild(tugas.el);
}

function perbaruiRingkasan() {
  const total = tugasSaatIni.length;
  const selesai = tugasSaatIni.filter((t) => t.completed).length;
  const tugasBelum = total - selesai;
  ringkasan.textContent = `${selesai} dari ${total} tugas selesai ${tugasBelum} yang belum selesai.`;
}

// ---------- F3: Pencarian ----------
function terapkanPencarian() {
  const kataKunci = inputCari.value.toLowerCase();
  let adaYangCocok = false;

  tugasSaatIni.forEach((tugas) => {
    if (tugas.title.toLowerCase().includes(kataKunci)) {
      tugas.el.classList.remove("hidden");
      adaYangCocok = true;
    } else {
      tugas.el.classList.add("hidden");
    }
  });

  if (tugasSaatIni.length > 0 && !adaYangCocok) {
    pesanKosong.classList.remove("hidden");
  } else {
    pesanKosong.classList.add("hidden");
  }
}

inputCari.addEventListener("input", terapkanPencarian);

// ---------- F4: Tambah tugas ----------
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sudahAda = tugasSaatIni.some(
        (t) => t.title.toLowerCase() === judul.toLowerCase()
      );
      if (sudahAda) {
        reject(new Error(`Tugas "${judul}" sudah ada di daftar.`));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi(pesan) {
  notifikasi.textContent = pesan;
  notifikasi.classList.remove("hidden");
  clearTimeout(timerNotifikasi);
  timerNotifikasi = setTimeout(() => {
    notifikasi.classList.add("hidden");
  }, 5000);
}

formTambah.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorForm.textContent = "";

  const judul = inputJudul.value.trim();
  if (judul.length < 5) {
    errorForm.textContent = "Judul tugas minimal 5 karakter.";
    return;
  }

  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);
    tambahkanKeDaftar(tugasBaru);
    perbaruiRingkasan();
    terapkanPencarian();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    errorForm.textContent = error.message;
  } finally {
    tombolSimpan.textContent = "Simpan";
    tombolSimpan.disabled = false;
  }
});

// ---------- Mulai ----------
ambilAnggota();