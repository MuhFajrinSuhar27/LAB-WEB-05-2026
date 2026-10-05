const dataPraktikan = [
    {nama: "Budi", nilaiTugas: [85, 90, 78]},
    {nama: "Siti", nilaiTugas: [92, 88, 95]},
    {nama: "Andi", nilaiTugas: [75, 80, 70]},
    {nama: "Rina", nilaiTugas: [88, 92, 85]},
    {nama: "Dewi", nilaiTugas: [90, 85, 88]}
];

const batasKelulusan = 75;

const namaAsisten = prompt("Masukkan nama asisten Lab: ");

const aksesDiberikan = namaAsisten !== null && namaAsisten.trim() !== "";

function hitungRataRata(nilaiTugas){
    let total = 0;
    for(let i = 0; i < nilaiTugas.length; i++){
        total += nilaiTugas[i];
    }
    return total / nilaiTugas.length;
}


function tentukanStatus(rataRata){
    if(rataRata >= batasKelulusan){
        return "Lulus";
    } else {
        return "Tidak Lulus";
    }
}


function tentukanKeterangan(rataRata){
    if(rataRata >= 90){
        return "Sangat Baik";
    }else if(rataRata >= 80){
        return "Baik";
    }else if(rataRata >= 70){
        return "Cukup";
    }else{
        return "Kurang";
    }
}

function prosesData(data){
    const hasil = [];
    for(let i = 0; i < data.length; i++){
        const praktikan = data[i];
        const rataRata = hitungRataRata(praktikan.nilaiTugas);
        const status = tentukanStatus(rataRata);
        const keterangan = tentukanKeterangan(rataRata);
        const dataHasil = {
            nama: praktikan.nama,
            nilaiTugas: praktikan.nilaiTugas,
            rataRata: rataRata,
            status: status,
            keterangan: keterangan
        };
        hasil.push(dataHasil);
    }
    return hasil;
}



if(!aksesDiberikan){document.write(`
    <section class="card">
        <div class="title">
           <div class="title-icon"> 
                <i class="fa-solid fa-file-lines"></i>
           </div> 
           <div> 
                <h1>Sistem Laporan Praktikum</h1>
                <p>Evaluasi kelulusan berbasis JavaScript murni</p>
           </div>
        </div>

        <div class="access-danied"> 
            <h2> Akses Ditolak</h2>
            <p>Maaf, Anda tidak memasukkan identitas asisten Lab</p>
        </div>
    </section>`

);



}else{
    const hasilEvaluasi = prosesData(dataPraktikan);
    console.log("Nama Asisten Lab:", namaAsisten);
    console.log("Hasil Evaluasi:", hasilEvaluasi);

    document.write(`
    <section class="card">
        <div class="header">
            <div class="title">
                <div class="title-icon">
                    <i class="fa-solid fa-file-lines"></i>
                </div>
                <div>
                    <h1>Detail Hasil Evaluasi Praktikum</h1>
                    <p>Rekapitulasi nilai berdasarkan data tugas.</p>
                </div>
            </div>
            
            <div class="limit"> Batas Kelulusan: <strong>${batasKelulusan}</strong> </div>
        </div>



        <div class="assisten">
            Asisten Lab: <strong>${namaAsisten}</strong>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Praktikan</th>
                        <th>Tugas 1</th>
                        <th>Tugas 2</th>
                        <th>Tugas 3</th>
                        <th>Rata-rata</th>
                        <th>Status</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
            <tbody>
    `);

    for(let i = 0; i < hasilEvaluasi.length; i++){
        const data = hasilEvaluasi[i];
        let statusClass = "";
        if(data.status === "Lulus"){
            statusClass = "lulus";
        }else{
            statusClass = "tidak-lulus";
        }

        let hasil = parseInt(data.rataRata);

        document.write(`
            <tr>
                <td>${i + 1}</td>
                <td>${data.nama}</td>
                <td>${data.nilaiTugas[0]}</td>
                <td>${data.nilaiTugas[1]}</td>
                <td>${data.nilaiTugas[2]}</td>
                <td class="average">${hasil}</td>
                <td><span class="${statusClass}">${data.status}</span></td>
                <td>${data.keterangan}</td>
            </tr>
        `);
}
 document.write(` 
            </tbody>
        </table>
    </div>

    <div class="info">
        <i class="fa-solid fa-circle-info"></i>
        Terus semangat untuk menjadi praktikan yang patuh sama senior!
    </div>
    </section>
    `);
}

