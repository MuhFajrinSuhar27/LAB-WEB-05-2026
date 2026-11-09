import {ambilSemuaBuku} from "@/lib/buku";
import {connection} from "next/server";

export default async function HalamanUjiDatabase(){
    await connection();
    try{
        const daftarBuku = await ambilSemuaBuku();
        return (
            <div className="space-y-5">
                <h1 className="text-3xl font-bold">
                    Pengujian Database Pustaka Senja
                </h1>
                <p className="text-green-700 font-semibold">
                    berhasil mengambil {daftarBuku.length} buku dari database.
                </p>
                <div className="space-y-3">
                    {daftarBuku.map((buku) => (
                        <div
                            key={buku.id}
                            className="rounded-xl border bg-white p-4"
                        >
                            <h2 className="text-lg font-bold">
                                {buku.judul}
                            </h2>


                            <p> ID: {buku.id}</p>
                            <p> Penulis: {buku.penulis}</p>
                            <p> Kategori: {buku.kategori}</p>
                            <p> Tahun: {buku.tahun}</p>

                            <p>
                                Status: {buku.tersedia ? 'Tersedia' : 'Tidak tersedia'}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

        );
    }catch (kesalahan){
        console.error('Terjadi kesalahan saat mengambil data buku:', kesalahan);
        return(
            <div>
                <h1>Gagal Mengambil Data</h1>
                <p>Terjadi kesalahan saat mengambil data buku dari database.</p>
            </div>
        )
    }
}


 