const dataPraktikan = [
    {nama: "Angel", nilaiTugas: [85, 90, 91]},
    {nama: "Efa", nilaiTugas: [55, 63, 48]},
    {nama: "Neiva", nilaiTugas: [69, 75, 80]},
    {nama: "Raissa", nilaiTugas: [92, 95, 89]},
    {nama: "Shisi", nilaiTugas: [75, 67, 71]}
];

const namaAsisten = prompt("Masukkan nama Asisten Lab: ");

function hitungHasil(data) {
    return data.map(p => {
        const total = p.nilaiTugas.reduce((total, nilai) => total + nilai, 0);
        const rataRata = total / p.nilaiTugas.length;
        return {
            nama: p.nama,
            rataRata: rataRata,
            status: rataRata >= 75 ? "Lulus" : "Tidak Lulus"
        };
    });
}

const hasilAkhir = hitungHasil(dataPraktikan);
console.log(hasilAkhir);

if (namaAsisten) {
    let daftar = "";

    for (let h of hasilAkhir) {
    
        let x = parseInt(h.rataRata)
        const warna = h.status === "Lulus" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700";
        daftar += `
            <div class="flex justify-between items-center p-4 border border-slate-100 rounded-xl shadow-sm">
                <div>
                    <h2 class="font-bold text-slate-800">${h.nama}</h2>
                    <p class="text-xs text-slate-400 mt-1"> Rata-rata: ${x}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${warna}">${h.status}</span>
            </div>`;
    }

    document.write(`
        <div class="min-h-screen bg-purple-50 flex justify-center py-10">
            <div class="bg-white w-full max-w-xl p-8 rounded-2xl shadow-lg">
                <h1 class="text-3xl font-extrabold text-slate-800">Sistem Laporan Praktikum</h1>
                <p class="text-slate-400 text-sm mb-6 pb-6 border-b">Evaluasi kelulusan berbasis JavaScript murni</p>

                <div class="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-xl mb-6">
                    <p class="text-blue-900">Selamat datang Asisten <b>${namaAsisten}</b>!</p>
                    <p class="text-blue-600 text-sm">Berikut adalah laporan hasil evaluasi praktikum.</p>
                </div>

                <div class="space-y-4">${daftar}</div>
            </div>
        </div>
    `);
} else {
    document.write(`<h2 class="text-center text-rose-600 font-bold mt-10">Akses Ditolak!</h2>`);
}