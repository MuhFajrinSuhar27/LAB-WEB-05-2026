// ============================================
// VARIABEL GLOBAL
// ============================================

let daftarAnggota = [];
let anggotaTerpilih = null;
let daftarTugas = [];

const API_URL_ANGGOTA = 'https://jsonplaceholder.typicode.com/users';
const DURASI_NOTIFIKASI = 3000;

// ============================================
// F1: AMBIL DAN TAMPILKAN DAFTAR ANGGOTA
// ============================================

async function ambilDaftarAnggota() {
    try {
        const elemenDaftarAnggota = document.getElementById('daftarAnggota');
        const pesanErrorAnggota = document.getElementById('pesanErrorAnggota');


        // Tampilkan loading
        elemenDaftarAnggota.innerHTML = '';
        const pesanMuatan = document.createElement('li');
        pesanMuatan.className = 'pesan-muatan';
        pesanMuatan.textContent = 'Memuat anggota...';
        elemenDaftarAnggota.appendChild(pesanMuatan);



        // Ambil data dari API
        const tanggapan = await fetch(API_URL_ANGGOTA);


        if (!tanggapan.ok) {
            throw new Error('Gagal mengambil data anggota');
        }

        const data = await tanggapan.json();
        daftarAnggota = data;


        // Kosongkan dan tampilkan daftar anggota
        elemenDaftarAnggota.innerHTML = '';
        pesanErrorAnggota.style.display = 'none';

        
        daftarAnggota.forEach((anggota) => {
            const itemAnggota = document.createElement('li');
            itemAnggota.className = 'item-anggota';
            itemAnggota.textContent = anggota.name;
            itemAnggota.dataset.anggotaId = anggota.id;

            itemAnggota.addEventListener('click', () => {
                pilihAnggota(anggota);
            });

            elemenDaftarAnggota.appendChild(itemAnggota);
        });

        // Perbarui statistik total anggota
        const elemenTotalAnggota = document.getElementById('totalAnggota');
        elemenTotalAnggota.textContent = daftarAnggota.length;

    } catch (kesalahan) {
        console.error('Error:', kesalahan);
        const elemenDaftarAnggota = document.getElementById('daftarAnggota');
        const pesanErrorAnggota = document.getElementById('pesanErrorAnggota');

        elemenDaftarAnggota.innerHTML = '';
        pesanErrorAnggota.textContent = 'Gagal memuat daftar anggota. Periksa koneksi internet Anda.';
        pesanErrorAnggota.style.display = 'block';
    }
}



// ============================================
// FUNGSI PILIH ANGGOTA
// ============================================


async function pilihAnggota(anggota) {
    anggotaTerpilih = anggota;

    // Update tampilan anggota terpilih di sidebar
    const semuaItemAnggota = document.querySelectorAll('.item-anggota');
    semuaItemAnggota.forEach((item) => {
        item.classList.remove('terpilih');
    });

    const itemTerpilih = document.querySelector(`[data-anggota-id="${anggota.id}"]`);
    if (itemTerpilih) {
        itemTerpilih.classList.add('terpilih');
    }

    // Update header info anggota
    const infoAnggotaTerpilih = document.getElementById('infoAnggotaTerpilih');
    infoAnggotaTerpilih.innerHTML = '';
    const pesanAnggota = document.createElement('div');
    pesanAnggota.className = 'anggota-terpilih-info';
    pesanAnggota.textContent = `Anggota terpilih: ${anggota.name}`;
    infoAnggotaTerpilih.appendChild(pesanAnggota);

    // Ambil tugas anggota
    await ambilTugasAnggota(anggota.id);

    // Tampilkan panel progres
    const panelProgres = document.getElementById('panelProgres');
    panelProgres.style.display = 'block';
}

// ============================================
// F2: AMBIL DAN TAMPILKAN TUGAS ANGGOTA
// ============================================

async function ambilTugasAnggota(idAnggota) {
    try {
        const kontainerDaftarTugas = document.getElementById('kontainerDaftarTugas');
        
        // Tampilkan loading
        kontainerDaftarTugas.innerHTML = '';
        const pesanMuatan = document.createElement('div');
        pesanMuatan.className = 'pesan-muatan';
        pesanMuatan.textContent = 'Memuat tugas...';
        kontainerDaftarTugas.appendChild(pesanMuatan);

        // Ambil data tugas dari API
        const tanggapan = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${idAnggota}`);

        if (!tanggapan.ok) {
            throw new Error('Gagal mengambil data tugas');
        }


        const data = await tanggapan.json();
        daftarTugas = data;


        // Kosongkan dan tampilkan daftar tugas
        kontainerDaftarTugas.innerHTML = '';
        tampilkanDaftarTugas();


        // Perbarui statistik
        perbaruiStatistik();
        

    } catch (kesalahan) {
        console.error('Error:', kesalahan);
        const kontainerDaftarTugas = document.getElementById('kontainerDaftarTugas');
        kontainerDaftarTugas.innerHTML = '';
        
        const pesanError = document.createElement('div');
        pesanError.className = 'pesan-error-anggota';
        pesanError.style.margin = '0';
        pesanError.textContent = 'Gagal memuat tugas. Periksa koneksi internet Anda.';
        kontainerDaftarTugas.appendChild(pesanError);
    }
}

// ============================================
// FUNGSI TAMPILKAN DAFTAR TUGAS
// ============================================


function tampilkanDaftarTugas() {
    const kontainerDaftarTugas = document.getElementById('kontainerDaftarTugas');

    if (daftarTugas.length === 0) {
        kontainerDaftarTugas.innerHTML = '';
        const pesanKosong = document.createElement('div');
        pesanKosong.className = 'pesan-belum-ada-tugas';
        pesanKosong.textContent = 'Belum ada tugas untuk anggota ini.';
        kontainerDaftarTugas.appendChild(pesanKosong);
        return;
    }

    kontainerDaftarTugas.innerHTML = '';
    const daftarTugasElement = document.createElement('div');
    daftarTugasElement.className = 'daftar-tugas';

    daftarTugas.forEach((tugas) => {
        const itemTugas = buatItemTugas(tugas);
        daftarTugasElement.appendChild(itemTugas);
    });

    kontainerDaftarTugas.appendChild(daftarTugasElement);
}


// ============================================
// FUNGSI BUAT ITEM TUGAS
// ============================================


function buatItemTugas(tugas) {
    const itemTugas = document.createElement('div');
    itemTugas.className = 'item-tugas';
    itemTugas.dataset.tugasId = tugas.id;

    const kontenTugas = document.createElement('div');
    kontenTugas.className = 'konten-tugas';

    const infoTugas = document.createElement('div');
    infoTugas.className = 'info-tugas';

    const judulTugas = document.createElement('div');
    judulTugas.className = 'judul-tugas';
    if (tugas.completed) {
        judulTugas.classList.add('selesai');
    }
    judulTugas.textContent = tugas.title;

    const labelStatus = document.createElement('div');
    labelStatus.className = 'label-status';
    if (tugas.completed) {
        labelStatus.classList.add('selesai');
        labelStatus.textContent = 'Selesai';
    } else {
        labelStatus.classList.add('belum-selesai');
        labelStatus.textContent = 'Belum Selesai';
    }

    infoTugas.appendChild(judulTugas);
    infoTugas.appendChild(labelStatus);

    const aksiTugas = document.createElement('div');
    aksiTugas.className = 'aksi-tugas';

    // Tombol Tandai Selesai (hanya jika belum selesai)
    if (!tugas.completed) {
        const tombolTandaiSelesai = document.createElement('button');
        tombolTandaiSelesai.className = 'tombol-aksi tombol-tandai-selesai';
        tombolTandaiSelesai.textContent = 'Tandai Selesai';
        tombolTandaiSelesai.addEventListener('click', () => {
            tandaiTugasSelesai(tugas);
        });
        aksiTugas.appendChild(tombolTandaiSelesai);
    }


    // Tombol Hapus
    const tombolHapus = document.createElement('button');
    tombolHapus.className = 'tombol-aksi tombol-hapus';
    tombolHapus.textContent = 'Hapus';
    tombolHapus.addEventListener('click', () => {
        hapusTugas(tugas.id);
    });
    aksiTugas.appendChild(tombolHapus);

    kontenTugas.appendChild(infoTugas);
    kontenTugas.appendChild(aksiTugas);
    itemTugas.appendChild(kontenTugas);

    return itemTugas;
}


// ============================================
// F5: TANDAI TUGAS SELESAI
// ============================================

function tandaiTugasSelesai(tugas) {
    const indexTugas = daftarTugas.findIndex((t) => t.id === tugas.id);
    if (indexTugas !== -1) {
        daftarTugas[indexTugas].completed = true;
        tampilkanDaftarTugas();
        perbaruiStatistik();
        cariTugas();
    }
}

// ============================================
// F5: HAPUS TUGAS
// ============================================

function hapusTugas(idTugas) {
    daftarTugas = daftarTugas.filter((tugas) => tugas.id !== idTugas);
    tampilkanDaftarTugas();
    perbaruiStatistik();
    cariTugas();
}

// ============================================
// FUNGSI PERBARUI STATISTIK
// ============================================

function perbaruiStatistik() {
    const elemenTotalTugas = document.getElementById('totalTugas');
    const elemenTugasSelesai = document.getElementById('tugasSelesai');
    const elemenTugasBelumSelesai = document.getElementById('tugasBelumSelesai');
    const elemenNamaAnggotaProgres = document.getElementById('namaAnggotaProgres');
    const elemenInfoProgres = document.getElementById('infoProgres');
    const elemenProgressBar = document.getElementById('progressBar');
    const elemenPersentaseProgres = document.getElementById('persentaseProgres');

    if (!anggotaTerpilih) {
        elemenTotalTugas.textContent = '-';
        elemenTugasSelesai.textContent = '-';
        elemenTugasBelumSelesai.textContent = '-';
        return;
    }

    const jumlahSeluruhTugas = daftarTugas.length;
    const jumlahTugasSelesai = daftarTugas.filter((tugas) => tugas.completed).length;
    const jumlahTugasBelumSelesai = jumlahSeluruhTugas - jumlahTugasSelesai;
    const persentase = jumlahSeluruhTugas > 0 ? Math.round((jumlahTugasSelesai / jumlahSeluruhTugas) * 100) : 0;

    elemenTotalTugas.textContent = jumlahSeluruhTugas;
    elemenTugasSelesai.textContent = jumlahTugasSelesai;
    elemenTugasBelumSelesai.textContent = jumlahTugasBelumSelesai;

    elemenNamaAnggotaProgres.textContent = anggotaTerpilih.name;
    elemenInfoProgres.textContent = `${jumlahTugasSelesai} dari ${jumlahSeluruhTugas} tugas selesai`;
    elemenProgressBar.style.width = `${persentase}%`;
    elemenPersentaseProgres.textContent = `${persentase}% Selesai`;
}

// ============================================
// F3: PENCARIAN TUGAS
// ============================================

function cariTugas() {
    const masukanPencarian = document.getElementById('masukanPencarian');
    const kataPencarian = masukanPencarian.value.trim().toLowerCase();

    const semuaItemTugas = document.querySelectorAll('.item-tugas');

    let adaTugasYangTampil = false;

    semuaItemTugas.forEach((itemTugas) => {
        const judulTugas = itemTugas.querySelector('.judul-tugas');
        const teksJudul = judulTugas.textContent.toLowerCase();

        if (teksJudul.includes(kataPencarian)) {
            itemTugas.classList.remove('hidden');
            adaTugasYangTampil = true;
        } else {
            itemTugas.classList.add('hidden');
        }
    });

    // Tampilkan pesan jika tidak ada hasil
    const daftarTugasContainer = document.querySelector('.daftar-tugas');
    const pesanKosongPencarian = document.getElementById('pesanKosongPencarian');

    if (!adaTugasYangTampil && daftarTugasContainer && daftarTugas.length > 0) {
        if (!pesanKosongPencarian) {
            const pesan = document.createElement('div');
            pesan.className = 'pesan-kosong-pencarian';
            pesan.id = 'pesanKosongPencarian';
            pesan.textContent = 'Tidak ada tugas yang cocok dengan pencarian Anda.';
            daftarTugasContainer.parentElement.appendChild(pesan);
        } else {
            pesanKosongPencarian.style.display = 'block';
        }
    } else if (pesanKosongPencarian) {
        pesanKosongPencarian.style.display = 'none';
    }
}

// ============================================
// F4: SIMPAN TUGAS DENGAN PROMISE
// ============================================

function simpanTugas(judulTugas) {
    return new Promise((penuhi, tolak) => {
        setTimeout(() => {
            // Validasi: periksa duplikasi
            const judulTugasLower = judulTugas.toLowerCase();
            const adaDuplikasi = daftarTugas.some(
                (tugas) => tugas.title.toLowerCase() === judulTugasLower
            );

            if (adaDuplikasi) {
                tolak(new Error('Judul tugas sudah digunakan dalam daftar ini.'));
                return;
            }

            // Buat tugas baru
            const tugasBaru = {
                id: daftarTugas.length > 0 ? Math.max(...daftarTugas.map((t) => t.id)) + 1 : 1,
                title: judulTugas,
                completed: false,
                userId: anggotaTerpilih.id
            };

            daftarTugas.push(tugasBaru);
            penuhi(tugasBaru);
        }, 1000);
    });
}

// ============================================
// FUNGSI TAMPILKAN NOTIFIKASI
// ============================================

function tampilkanNotifikasi(pesan, tipe = 'berhasil') {
    const notifikasi = document.createElement('div');
    notifikasi.className = `notifikasi ${tipe}`;
    notifikasi.textContent = pesan;

    document.body.appendChild(notifikasi);

    setTimeout(() => {
        notifikasi.remove();
    }, 3000);
}

// ============================================
// EVENT LISTENER FORMULIR TAMBAH TUGAS
// ============================================

const formTambahTugas = document.getElementById('formTambahTugas');
const inputJudulTugas = document.getElementById('inputJudulTugas');
const tombolSimpan = document.getElementById('tombolSimpan');
const pesanValidasi = document.getElementById('pesanValidasi');


formTambahTugas.addEventListener('submit', async (kejadian) => {
    kejadian.preventDefault();

    if (!anggotaTerpilih) {
        tampilkanNotifikasi('Pilih anggota terlebih dahulu.', 'error');
        return;
    }

    let judulTugas = inputJudulTugas.value.trim();

    // Validasi: minimal 5 karakter
    if (judulTugas.length < 5) {
        pesanValidasi.textContent = 'Judul tugas harus minimal 5 karakter.';
        pesanValidasi.classList.add('tampil');
        return;
    }

    pesanValidasi.classList.remove('tampil');

    // Cegah pengiriman berulang
    tombolSimpan.disabled = true;
    tombolSimpan.textContent = 'Menyimpan...';

    try {
        const tugasBaru = await simpanTugas(judulTugas);

        // Perbarui tampilan
        tampilkanDaftarTugas();
        perbaruiStatistik();
        cariTugas();

        // Kosongkan input
        inputJudulTugas.value = '';

        // Tampilkan notifikasi sukses
        tampilkanNotifikasi('Tugas berhasil ditambahkan.', 'berhasil');

    } catch (kesalahan) {
        pesanValidasi.textContent = kesalahan.message;
        pesanValidasi.classList.add('tampil');
        tampilkanNotifikasi(kesalahan.message, 'error');
    } finally {
        tombolSimpan.disabled = false;
        tombolSimpan.textContent = 'Simpan';
    }
});

// ============================================
// EVENT LISTENER PENCARIAN TUGAS
// ============================================

const masukanPencarian = document.getElementById('masukanPencarian');
masukanPencarian.addEventListener('input', cariTugas);

// ============================================
// INISIALISASI HALAMAN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    ambilDaftarAnggota();
});
