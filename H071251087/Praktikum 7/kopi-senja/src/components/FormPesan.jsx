import { useState } from "react";

function FormPesan({ jumlahItem, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [errorNama, setErrorNama] = useState("");
  const [errorMeja, setErrorMeja] = useState("");
  const [errorPesanan, setErrorPesanan] = useState("");
  const [terkirim, setTerkirim] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const namaBersih = nama.trim();
    const mejaBersih = meja.trim();

    const pesanNama = namaBersih === "" ? "Nama wajib diisi." : "";
    let pesanMeja = "";
    if (mejaBersih === "") {
      pesanMeja = "Nomor meja wajib diisi.";
    } else if (!/^\d+$/.test(mejaBersih) || Number(mejaBersih) < 1) {
      pesanMeja = "Nomor meja harus berupa angka lebih dari 0.";
    }
    const pesanPesanan =
      jumlahItem === 0 ? "Pesanan masih kosong. Pilih menu terlebih dahulu." : "";

    setErrorNama(pesanNama);
    setErrorMeja(pesanMeja);
    setErrorPesanan(pesanPesanan);

    if (pesanNama || pesanMeja || pesanPesanan) {
      setTerkirim(false);
      return;
    }

    console.log("Pesanan dikirim:", { nama: namaBersih, meja: Number(mejaBersih) });
    setTerkirim(true);
    setNama("");
    setMeja("");
    onKirim();
  }

  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-bold">Data Pemesan</h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <div>
          <label htmlFor="nama" className="mb-1 block text-sm font-medium">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama pelanggan"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errorNama && <p className="mt-1 text-sm text-red-600">{errorNama}</p>}
        </div>

        <div>
          <label htmlFor="meja" className="mb-1 block text-sm font-medium">
            Nomor Meja
          </label>
          <input
            id="meja"
            type="text"
            inputMode="numeric"
            value={meja}
            onChange={(e) => setMeja(e.target.value)}
            placeholder="Contoh: 5"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errorMeja && <p className="mt-1 text-sm text-red-600">{errorMeja}</p>}
        </div>

        {errorPesanan && (
          <p className="rounded-lg bg-red-50 p-2 text-sm text-red-600">
            {errorPesanan}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-stone-900 py-2 font-semibold text-amber-50 hover:bg-stone-700"
        >
          Kirim Pesanan
        </button>
      </form>

      {terkirim && (
        <p className="mt-3 rounded-lg bg-green-50 p-2 text-sm text-green-700">
          Terima kasih, pesanan Anda sudah terkirim!
        </p>
      )}
    </section>
  );
}

export default FormPesan;
