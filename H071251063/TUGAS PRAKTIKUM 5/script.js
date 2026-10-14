
const Daftaranggota = document.getElementById("Daftaranggota");
const Statusanggota = document.getElementById("Statusanggota");
const Erroranggota = document.getElementById("Erroranggota");

const Judultugas = document.getElementById("Judultugas");
const Statustugas = document.getElementById("Statustugas");
const Errortugas = document.getElementById("Errortugas");
const Daftartugas = document.getElementById("Daftartugas");
const Progrestugas = document.getElementById("Progrestugas");

const Caritugas = document.getElementById("Caritugas");
const Pesanpencarian = document.getElementById("Pesanpencarian");

const Formtugas = document.getElementById("Formtugas");
const Judulbaru = document.getElementById("Judulbaru");
const Errorform = document.getElementById("Errorform");
const Tombolsimpan = document.getElementById("Tombolsimpan");
const Notifikasi = document.getElementById("Notifikasi");

let anggotaTerpilih = null;
let tugas = [];
let tombolanggota = null;
let waktuNotifikasi;

async function Muatanggota() {
    Statusanggota.textContent = "Memuat anggota...";
    Erroranggota.textContent = "";

    try {
        const respons = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!respons.ok) {
            throw new Error("Gagal memuat anggota.");
        }

        const anggota = await respons.json();

        Statusanggota.textContent = "";
        Daftaranggota.innerHTML = "";

        anggota.forEach(function (orang) {
            const tombol = document.createElement("button");

            tombol.textContent = orang.name;
            tombol.className =
                "text-left p-3 rounded-lg border border-pink-200 hover:bg-pink-100 text-black";

            tombol.addEventListener("click", function () {
                pilihAnggota(orang, tombol);
            });

            Daftaranggota.appendChild(tombol);
        });
    } catch (error) {
        Statusanggota.textContent = "";
        Erroranggota.textContent =
            "Gagal memuat anggota. Periksa koneksi internet kamu.";
    }
}

async function pilihAnggota(orang, tombol) {
    anggotaTerpilih = orang;

    if (tombolanggota !== null) {
        tombolanggota.classList.remove(
            "bg-pink-500",
            "text-white"
        );
    }

    tombol.classList.add("bg-pink-500", "text-white");
    tombolanggota = tombol;

    Judultugas.textContent = "Tugas " + orang.name;
    Statustugas.textContent = "Memuat tugas...";
    Errortugas.textContent = "";
    Daftartugas.innerHTML = "";
    Caritugas.value = "";
    Pesanpencarian.textContent = "";
    Progrestugas.textContent = "Memuat progres...";

    try {
        const respons = await fetch(
            "https://jsonplaceholder.typicode.com/todos?userId=" +
            orang.id
        );

        if (!respons.ok) {
            throw new Error("Gagal mengambil data tugas.");
        }

        const dataTugas = await respons.json();

        if (anggotaTerpilih.id !== orang.id) {
            return;
        }

        tugas = dataTugas;

        Statustugas.textContent = "";
        tampilkanTugas();
        perbaruiProgres();
    } catch (error) {
        if (anggotaTerpilih.id !== orang.id) {
            return;
        }

        Statustugas.textContent = "";
        Errortugas.textContent =
            "Gagal memuat tugas. Silakan coba lagi.";
        Progrestugas.textContent = "Progres tidak tersedia.";
    }
}

function tampilkanTugas() {
    Daftartugas.innerHTML = "";
    Pesanpencarian.textContent = "";

    const katakunci = Caritugas.value.toLowerCase();

    const tugascocok = tugas.filter(function (item) {
        return item.title.toLowerCase().includes(katakunci);
    });

    tugas.forEach(function (item) {
        const kartu = document.createElement("div");

        kartu.className =
            "border border-pink-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3";

        const judul = document.createElement("p");
        judul.textContent = item.title;
        judul.className = "flex-1 break-words text-black";

        if (item.completed) {
            judul.classList.add("line-through", "text-gray-500");
        }

        const kelompoktombol = document.createElement("div");
        kelompoktombol.className = "flex flex-wrap gap-2";

        if (!item.completed) {
            const tombolselesai = document.createElement("button");

            tombolselesai.textContent = "Tandai selesai";
            tombolselesai.className =
                "bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700";

            tombolselesai.addEventListener("click", function () {
                item.completed = true;
                tampilkanTugas();
                perbaruiProgres();
            });

            kelompoktombol.appendChild(tombolselesai);
        }

        const tombolhapus = document.createElement("button");

        tombolhapus.textContent = "Hapus";
        tombolhapus.className =
            "bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700";

        tombolhapus.addEventListener("click", function () {
            tugas = tugas.filter(function (tugaslain) {
                return tugaslain !== item;
            });

            tampilkanTugas();
            perbaruiProgres();
        });

        kelompoktombol.appendChild(tombolhapus);

        kartu.appendChild(judul);
        kartu.appendChild(kelompoktombol);

        if (!item.title.toLowerCase().includes(katakunci)) {
            kartu.classList.add("hidden");
        }

        Daftartugas.appendChild(kartu);
    });

    if (tugascocok.length === 0 && tugas.length > 0) {
        Pesanpencarian.textContent =
            "Tidak ada tugas yang cocok.";
    } else if (tugas.length === 0) {
        Pesanpencarian.textContent = "Belum ada tugas.";
    }
}

function perbaruiProgres() {
    const jumlahselesai = tugas.filter(function (item) {
        return item.completed === true;
    }).length;

    const y = tugas.length - jumlahselesai;
    Progrestugas.textContent =
        jumlahselesai + " dari " + tugas.length + " tugas selesai " + y + " belum selesai";
}

Caritugas.addEventListener("input", function () {
    tampilkanTugas();
});

function simpantugas(judul) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const sudahAda = tugas.some(function (item) {
                return item.title.toLowerCase() === judul.toLowerCase();
            });

            if (sudahAda) {
                reject(
                    new Error("Tugas dengan judul tersebut sudah ada.")
                );
            } else {
                resolve({
                    title: judul,
                    completed: false
                });
            }
        }, 1000);
    });
}

Formtugas.addEventListener("submit", async function (event) {
    event.preventDefault();

    Errorform.textContent = "";
    Notifikasi.textContent = "";

    const judul = Judulbaru.value.trim();

    if (anggotaTerpilih === null) {
        Errorform.textContent =
            "Pilih anggota terlebih dahulu.";
        return;
    }

    if (judul.length < 8) {
        Errorform.textContent =
            "Judul tugas minimal 8 karakter.";
        return;
    }

    Tombolsimpan.disabled = true;

    try {
        Tombolsimpan.textContent = "Menyimpan...";

        const tugasbaru = await simpantugas(judul);

        tugas.push(tugasbaru);

        tampilkanTugas();
        perbaruiProgres();

        Judulbaru.value = "";

        Notifikasi.textContent =
            "Tugas berhasil ditambahkan.";

        clearTimeout(waktuNotifikasi);

        waktuNotifikasi = setTimeout(function () {
            Notifikasi.textContent = "";
        }, 3000);
    } catch (error) {
        Errorform.textContent = error.message;
    } finally {
        Tombolsimpan.textContent = "Simpan";
        Tombolsimpan.disabled = false;
    }
});

Muatanggota();
