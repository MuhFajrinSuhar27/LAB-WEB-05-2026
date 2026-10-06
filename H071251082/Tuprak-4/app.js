const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

const batasLulus = 75;

function hitungRataRata(nilai) {
    let jumlah = nilai.reduce(function (a, b) {
        return a + b;
    }, 0);
    return jumlah / nilai.length;
}

const tentukanStatus = (rataRata) => {
    if (rataRata >= batasLulus) {
        return "Lulus";
    } else {
        return "Tidak Lulus";
    }
};

const prosesData = function (data) {
    return data.map(function (praktikan) {
        let rataRata = hitungRataRata(praktikan.nilaiTugas);
        return {
            nama: praktikan.nama,
            nilaiTugas: praktikan.nilaiTugas,
            rataRata: rataRata,
            status: tentukanStatus(rataRata)
        };
    });
};

function buatKartu(p) {
    let warnaBadge;
    let warnaTepi;

    if (p.status == "Lulus") {
        warnaBadge = "bg-emerald-100 text-emerald-700";
        warnaTepi = "border-l-emerald-500";
    } else {
        warnaBadge = "bg-red-100 text-red-700";
        warnaTepi = "border-l-red-500";
    }

    let chipNilai = "";
    for (let i = 0; i < p.nilaiTugas.length; i++) {
        chipNilai = chipNilai +
            '<span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">Tugas ' + (i + 1) + ': ' + p.nilaiTugas[i] + '</span>';
    }

    return '<div class="group bg-white rounded-2xl shadow-md border border-slate-200 border-l-8 ' + warnaTepi + ' p-6 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 transition-all cursor-default">' +
        '<div class="flex items-center justify-between gap-3">' +
            '<div class="flex items-center gap-3">' +
                '<div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 text-xl font-bold flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">' + p.nama[0] + '</div>' +
                '<div>' +
                    '<p class="text-[10px] uppercase tracking-widest text-slate-400 font-semibold leading-none">Praktikan</p>' +
                    '<h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors">' + p.nama + '</h3>' +
                '</div>' +
            '</div>' +
            '<span class="' + warnaBadge + ' inline-block text-xs font-bold px-3 py-1.5 rounded-full group-hover:scale-110 transition-transform">' + p.status + '</span>' +
        '</div>' +
        '<div class="flex flex-wrap gap-2 mt-4">' + chipNilai + '</div>' +
        '<div class="flex items-center justify-between border-t border-slate-100 mt-5 pt-4">' +
            '<span class="text-sm font-semibold text-slate-500">Nilai Rata-Rata</span>' +
            '<span class="text-2xl font-extrabold text-slate-900">' + p.rataRata + '</span>' +
        '</div>' +
    '</div>';
}

function buatStat(judul, nilai, warna) {
    return '<div class="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:-translate-y-1 hover:shadow-md hover:border-indigo-200 transition-all cursor-default">' +
        '<p class="text-xs uppercase tracking-widest text-slate-400 font-semibold">' + judul + '</p>' +
        '<p class="text-3xl font-extrabold ' + warna + ' mt-1">' + nilai + '</p>' +
    '</div>';
}


let namaAslab = prompt("Masukkan Nama Praktikan").toLowerCase()
let akses = false

if (namaAslab == "naufal") {
    akses = true
}

if (akses) {
    let hasil = prosesData(dataPraktikan);

    let jumlahLulus = hasil.filter(function (p) {
        return p.status == "Lulus";
    }).length;
    let jumlahTidakLulus = hasil.length - jumlahLulus;
    let rataKelas = hitungRataRata(hasil.map(function (p) {
        return p.rataRata;
    }));

    let semuaKartu = "";
    for (let p of hasil) {
        semuaKartu = semuaKartu + buatKartu(p);
    }

    document.write(
        '<div class="max-w-4xl mx-auto my-14 bg-white rounded-2xl shadow-lg p-11">' +
            '<div class="flex items-start justify-between gap-4">' +
                '<div>' +
                    '<h1 class="text-4xl font-extrabold text-slate-900">Sistem Laporan Praktikum</h1>' +
                    '<p class="text-slate-500 mt-1">Evaluasi kelulusan berbasis JavaScript murni</p>' +
                '</div>' +
                '<div class="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-full pl-2 pr-5 py-2 hover:bg-indigo-100 hover:shadow-md transition-all cursor-default">' +
                    '<div class="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">' + namaAslab[0].toUpperCase() + '</div>' +
                    '<div>' +
                        '<p class="text-[10px] uppercase tracking-widest text-indigo-400 leading-none">Asisten Lab</p>' +
                        '<p class="text-sm font-bold text-indigo-900 capitalize">' + namaAslab + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<hr class="my-6 border-slate-200">' +
            '<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">' +
                buatStat("Total Praktikan", hasil.length, "text-slate-900") +
                buatStat("Lulus", jumlahLulus, "text-emerald-600") +
                buatStat("Tidak Lulus", jumlahTidakLulus, "text-red-600") +
                buatStat("Rata-Rata Kelas", rataKelas, "text-indigo-600") +
            '</div>' +
            '<div class="grid md:grid-cols-2 gap-5">' + semuaKartu + '</div>' +
        '</div>'
    );

    console.log(hasil);
} else {
    document.write(`
        <div class="max-w-4xl mx-auto mt-14 bg-white rounded-2xl shadow-lg p-11"> 
            <h1 class="text-4xl font-extrabold text-slate-900">Sistem Laporan Praktikum</h1> 
            <p class="text-slate-500 mt-1">Evaluasi kelulusan berbasis JavaScript murni</p>' 
            <hr class="my-6 border-slate-200"> 
            <div class="bg-red-50 border-l-4 border-red-500 rounded-sm px-6 py-4"> 
                <h2 class="text-xl font-semibold text-red-800">Akses Ditolak</h2> 
                <p class="text-red-600">Anda tidak memasukkan identitas asisten.</p> 
            </div> 
        </div>
    `);
}