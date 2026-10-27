import { useState } from "react";

function FormPesan({ jumlahPesanan, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [galat, setGalat] = useState({ nama: "", meja: "", pesanan: "" });

  function handleSubmit(e) {
    e.preventDefault();

    const namaBersih = nama.trim();
    const mejaBersih = meja.trim();
    const galatBaru = { nama: "", meja: "", pesanan: "" };

    if (jumlahPesanan === 0) {
      galatBaru.pesanan = "Pesanan masih kosong. Pilih menu terlebih dahulu.";
    }
    if (namaBersih === "") {
      galatBaru.nama = "Nama wajib diisi.";
    } else if (namaBersih.length < 2) {
      galatBaru.nama = "Nama minimal 2 karakter.";
    }
    if (mejaBersih === "") {
      galatBaru.meja = "Nomor meja wajib diisi.";
    } else if (!/^[1-9][0-9]*$/.test(mejaBersih)) {
      galatBaru.meja = "Nomor meja harus berupa angka bulat positif.";
    }

    setGalat(galatBaru);

    if (galatBaru.pesanan || galatBaru.nama || galatBaru.meja) {
      return; // ada yang salah, jangan kirim
    }

    onKirim(namaBersih, mejaBersih);
    setNama("");
    setMeja("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-amber-200"
    >
      <h2 className="text-lg font-semibold">Data Pemesan</h2>

      {galat.pesanan !== "" && (
        <p role="alert" className="rounded-lg bg-red-100 p-2 text-sm text-red-700">
          {galat.pesanan}
        </p>
      )}

      <div>
        <label htmlFor="nama" className="mb-1 block text-sm font-medium">
          Nama
        </label>
        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama Anda"
          className="w-full rounded-lg border border-amber-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {galat.nama !== "" && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {galat.nama}
          </p>
        )}
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
          className="w-full rounded-lg border border-amber-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {galat.meja !== "" && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {galat.meja}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-amber-800 px-4 py-2 font-medium text-white hover:bg-amber-900"
      >
        Kirim Pesanan
      </button>
    </form>
  );
}

export default FormPesan;
