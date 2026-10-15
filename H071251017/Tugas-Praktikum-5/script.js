"use strict";

const BASE_URL = "https://jsonplaceholder.typicode.com";

/* ---------- Elemen ---------- */
const elDaftarAnggota = document.getElementById("daftar-anggota");
const elStatusAnggota = document.getElementById("status-anggota");
const elUlangAnggota = document.getElementById("ulang-anggota");
const elPetunjuk = document.getElementById("petunjuk");

const elBagianTugas = document.getElementById("bagian-tugas");
const elJudulTugas = document.getElementById("judul-tugas");
const elRingkasan = document.getElementById("ringkasan");
const elBarProgres = document.getElementById("bar-progres");
const elCari = document.getElementById("cari");
const elForm = document.getElementById("form-tugas");
const elInputJudul = document.getElementById("input-judul");
const elBtnSimpan = document.getElementById("btn-simpan");
const elErrorForm = document.getElementById("error-form");
const elStatusTugas = document.getElementById("status-tugas");
const elUlangTugas = document.getElementById("ulang-tugas");
const elDaftarTugas = document.getElementById("daftar-tugas");
const elKosong = document.getElementById("kosong");
const elNotif = document.getElementById("notif");

/* ---------- State ---------- */
let anggotaAktif = null;       // { id, name }
let tombolAnggota = [];        // [{ id, el }]
let daftarTugas = [];          // [{ judul, selesai, el, elJudul, elIndikator, btnSelesai }]
let tugasSiap = false;         // true setelah tugas selesai dimuat
let nomorPermintaan = 0;       // untuk mengabaikan respons lama
let sedangMenyimpan = false;
let timerNotif = null;

/* ---------- Kelas Tailwind penanda ---------- */
const KELAS_TOMBOL_ANGGOTA =
  "shrink-0 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 " +
  "disabled:cursor-not-allowed disabled:opacity-60";
const KELAS_NONAKTIF = ["border-slate-200", "bg-white", "text-slate-600", "hover:bg-slate-50"];
const KELAS_AKTIF = ["border-indigo-300", "bg-indigo-50", "text-indigo-700", "font-semibold"];
const KELAS_JUDUL_BELUM = ["text-slate-800"];
const KELAS_JUDUL_SELESAI = ["line-through", "text-gray-400"];

/* ---------- Helper tampilan ---------- */
function pesanDariError(error) {
  if (error instanceof TypeError) {
    return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
  }
  return error.message;
}

// Menampilkan atau menyembunyikan teks status. jenis: "loading" | "error"
function setStatus(elTeks, teks, jenis) {
  elTeks.textContent = teks;
  elTeks.classList.toggle("hidden", teks === "");
  elTeks.classList.toggle("text-red-600", jenis === "error");
  elTeks.classList.toggle("text-slate-500", jenis !== "error");
}

function setErrorForm(teks) {
  elErrorForm.textContent = teks;
  elErrorForm.classList.toggle("hidden", teks === "");
}

function setFormAktif(aktif) {
  elInputJudul.disabled = !aktif;
  elBtnSimpan.disabled = !aktif;
  elCari.disabled = !aktif;
}

function setTombolAnggotaAktif(aktif) {
  tombolAnggota.forEach((t) => {
    t.el.disabled = !aktif;
  });
}

/* ---------- F1: Daftar anggota ---------- */
async function muatAnggota() {
  elUlangAnggota.classList.add("hidden");
  setStatus(elStatusAnggota, "Memuat anggota...", "loading");

  try {
    const respons = await fetch(`${BASE_URL}/users`);
    if (!respons.ok) {
      throw new Error(`Gagal memuat anggota (status ${respons.status}).`);
    }
    const users = await respons.json();

    setStatus(elStatusAnggota, "", "loading"); // hapus teks "Memuat anggota..."
    elDaftarAnggota.innerHTML = "";
    tombolAnggota = [];
    users.forEach((user, indeks) => buatTombolAnggota(user, indeks + 1));
  } catch (error) {
    setStatus(elStatusAnggota, pesanDariError(error), "error");
    elUlangAnggota.classList.remove("hidden");
  }
}

function buatTombolAnggota(user, nomor) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = KELAS_TOMBOL_ANGGOTA;
  tombol.classList.add(...KELAS_NONAKTIF);

  const elNomor = document.createElement("span");
  elNomor.className = "rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500";
  elNomor.textContent = String(nomor).padStart(2, "0");

  const elNama = document.createElement("span");
  elNama.className = "whitespace-nowrap";
  elNama.textContent = user.name;

  tombol.appendChild(elNomor);
  tombol.appendChild(elNama);
  tombol.addEventListener("click", () => pilihAnggota(user, tombol));

  elDaftarAnggota.appendChild(tombol);
  tombolAnggota.push({ id: user.id, el: tombol });
}

/* ---------- F2: Tugas anggota ---------- */
function tandaiAnggotaAktif(tombolDipilih) {
  tombolAnggota.forEach((t) => {
    if (t.el === tombolDipilih) {
      t.el.classList.remove(...KELAS_NONAKTIF);
      t.el.classList.add(...KELAS_AKTIF);
      t.el.setAttribute("aria-pressed", "true");
    } else {
      t.el.classList.remove(...KELAS_AKTIF);
      t.el.classList.add(...KELAS_NONAKTIF);
      t.el.setAttribute("aria-pressed", "false");
    }
  });
}

async function pilihAnggota(user, tombol) {
  if (sedangMenyimpan) return;

  anggotaAktif = user;
  const nomorIni = ++nomorPermintaan;

  tandaiAnggotaAktif(tombol);
  elPetunjuk.classList.add("hidden");
  elBagianTugas.classList.remove("hidden");
  elJudulTugas.textContent = `Tugas ${user.name}`;

  // Bersihkan tampilan lama
  elDaftarTugas.innerHTML = "";
  daftarTugas = [];
  tugasSiap = false;
  elCari.value = "";
  elInputJudul.value = "";
  setErrorForm("");
  elRingkasan.textContent = "";
  elBarProgres.style.width = "0%";
  elKosong.classList.add("hidden");
  elUlangTugas.classList.add("hidden");
  setFormAktif(false);
  setStatus(elStatusTugas, "Memuat tugas...", "loading");

  try {
    const respons = await fetch(`${BASE_URL}/todos?userId=${user.id}`);
    if (!respons.ok) {
      throw new Error(`Gagal memuat tugas (status ${respons.status}).`);
    }
    const todos = await respons.json();

    if (nomorIni !== nomorPermintaan) return; // sudah pindah ke anggota lain

    setStatus(elStatusTugas, "", "loading");
    todos.forEach((todo) => {
      const item = buatItemTugas(todo.title, todo.completed);
      elDaftarTugas.appendChild(item.el);
      daftarTugas.push(item);
    });
    tugasSiap = true;
    setFormAktif(true);
    perbaruiRingkasan();
    terapkanFilter();
  } catch (error) {
    if (nomorIni !== nomorPermintaan) return;
    setStatus(elStatusTugas, pesanDariError(error), "error");
    elUlangTugas.classList.remove("hidden");
  }
}

function buatItemTugas(judul, selesai) {
  const li = document.createElement("li");
  li.className = "flex items-center gap-3 border-b border-slate-100 px-5 py-3";

  const elIndikator = document.createElement("span");
  elIndikator.className =
    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 text-xs text-white";

  const elJudul = document.createElement("span");
  elJudul.className = "min-w-0 flex-1 break-words text-sm";
  elJudul.textContent = judul;

  const item = { judul, selesai, el: li, elJudul, elIndikator, btnSelesai: null };

  li.appendChild(elIndikator);
  li.appendChild(elJudul);

  if (selesai) {
    tampilkanSelesai(item);
  } else {
    elJudul.classList.add(...KELAS_JUDUL_BELUM);

    const btnSelesai = document.createElement("button");
    btnSelesai.type = "button";
    btnSelesai.textContent = "Tandai selesai";
    btnSelesai.className =
      "shrink-0 rounded-md border border-emerald-300 px-2.5 py-1 text-xs font-medium text-emerald-700 " +
      "hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300";
    btnSelesai.addEventListener("click", () => tandaiSelesai(item));
    item.btnSelesai = btnSelesai;
    li.appendChild(btnSelesai);
  }

  const btnHapus = document.createElement("button");
  btnHapus.type = "button";
  btnHapus.textContent = "Hapus";
  btnHapus.className =
    "shrink-0 rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 " +
    "hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300";
  btnHapus.addEventListener("click", () => hapusTugas(item));
  li.appendChild(btnHapus);

  return item;
}

function tampilkanSelesai(item) {
  item.elJudul.classList.remove(...KELAS_JUDUL_BELUM);
  item.elJudul.classList.add(...KELAS_JUDUL_SELESAI);
  item.elIndikator.classList.remove("border-slate-300");
  item.elIndikator.classList.add("border-emerald-600", "bg-emerald-600");
  item.elIndikator.textContent = "✓";
}

function perbaruiRingkasan() {
  const total = daftarTugas.length;
  const selesai = daftarTugas.filter((t) => t.selesai).length;
  elRingkasan.textContent = `${selesai} dari ${total} tugas selesai`;
  elBarProgres.style.width = total === 0 ? "0%" : `${(selesai / total) * 100}%`;
  perbaruiPesanKosong();
}

/* ---------- F5: Tandai selesai & hapus ---------- */
function tandaiSelesai(item) {
  item.selesai = true;
  tampilkanSelesai(item);
  if (item.btnSelesai) {
    item.btnSelesai.remove();
    item.btnSelesai = null;
  }
  perbaruiRingkasan();
}

function hapusTugas(item) {
  item.el.remove();
  daftarTugas = daftarTugas.filter((t) => t !== item);
  perbaruiRingkasan();
}

/* ---------- F3: Pencarian ---------- */
function terapkanFilter() {
  const kataKunci = elCari.value.trim().toLowerCase();
  daftarTugas.forEach((item) => {
    if (item.judul.toLowerCase().includes(kataKunci)) {
      item.el.classList.remove("hidden");
    } else {
      item.el.classList.add("hidden");
    }
  });
  perbaruiPesanKosong();
}

function perbaruiPesanKosong() {
  if (!tugasSiap) {
    elKosong.classList.add("hidden");
    return;
  }
  if (daftarTugas.length === 0) {
    elKosong.textContent = "Belum ada tugas. Tambahkan lewat form di atas.";
    elKosong.classList.remove("hidden");
    return;
  }
  const adaTampil = daftarTugas.some((t) => !t.el.classList.contains("hidden"));
  if (adaTampil) {
    elKosong.classList.add("hidden");
  } else {
    elKosong.textContent = "Tidak ada tugas yang cocok.";
    elKosong.classList.remove("hidden");
  }
}

/* ---------- F4: Tambah tugas ---------- */
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sudahAda = daftarTugas.some(
        (t) => t.judul.toLowerCase() === judul.toLowerCase()
      );
      if (sudahAda) {
        reject(new Error(`Tugas "${judul}" sudah ada di daftar.`));
        return;
      }
      resolve({ title: judul, completed: false });
    }, 1000);
  });
}

async function tanganiSubmit(event) {
  event.preventDefault();
  if (sedangMenyimpan || !tugasSiap) return;

  const judul = elInputJudul.value.trim();
  setErrorForm("");

  if (judul.length < 8) {
    setErrorForm(
      judul.length === 0
        ? "Judul tugas tidak boleh kosong."
        : "Judul tugas minimal 8 karakter."
    );
    return;
  }

  sedangMenyimpan = true;
  elBtnSimpan.disabled = true;
  elBtnSimpan.textContent = "Menyimpan...";
  setTombolAnggotaAktif(false);

  try {
    const tugasBaru = await simpanTugas(judul);

    const item = buatItemTugas(tugasBaru.title, tugasBaru.completed);
    elDaftarTugas.prepend(item.el);
    daftarTugas.unshift(item);

    elInputJudul.value = "";
    elCari.value = ""; // supaya tugas baru langsung terlihat
    terapkanFilter();
    perbaruiRingkasan();
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    setErrorForm(error.message);
  } finally {
    sedangMenyimpan = false;
    elBtnSimpan.disabled = false;
    elBtnSimpan.textContent = "Simpan";
    setTombolAnggotaAktif(true);
  }
}

function tampilkanNotifikasi(teks) {
  clearTimeout(timerNotif);
  elNotif.textContent = teks;
  elNotif.classList.remove("hidden");
  timerNotif = setTimeout(() => {
    elNotif.classList.add("hidden");
    elNotif.textContent = "";
  }, 3000);
}

/* ---------- Pasang event ---------- */
elCari.addEventListener("input", terapkanFilter);
elForm.addEventListener("submit", tanganiSubmit);
elInputJudul.addEventListener("input", () => setErrorForm(""));
elUlangAnggota.addEventListener("click", muatAnggota);
elUlangTugas.addEventListener("click", () => {
  if (anggotaAktif) {
    const t = tombolAnggota.find((x) => x.id === anggotaAktif.id);
    if (t) pilihAnggota(anggotaAktif, t.el);
  }
});

/* ---------- Mulai ---------- */
muatAnggota();