"use client";

import { useState } from "react";

const formAwal = {
  namaPengusul: "",
  judulBuku: "",
  kategori: "",
  alasan: "",
};

export default function UsulanPage() {
  const [formData, setFormData] = useState(formAwal);
  const [daftarUsulan, setDaftarUsulan] = useState([]);
  const [pesan, setPesan] = useState("");
  const [jenisPesan, setJenisPesan] = useState("info");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((dataSebelumnya) => ({
      ...dataSebelumnya,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // trim() memastikan input yang hanya berisi spasi dianggap kosong.
    const dataBersih = {
      namaPengusul: formData.namaPengusul.trim(),
      judulBuku: formData.judulBuku.trim(),
      kategori: formData.kategori.trim(),
      alasan: formData.alasan.trim(),
    };

    const adaKolomKosong = Object.values(dataBersih).some((nilai) => nilai === "");

    if (adaKolomKosong) {
      setJenisPesan("error");
      setPesan("Periksa kembali formulir. Semua kolom wajib diisi sebelum usulan dikirim.");
      return;
    }

    const usulanBaru = {
      id: `${Date.now()}-${dataBersih.judulBuku}`,
      ...dataBersih,
    };

    setDaftarUsulan((usulanSebelumnya) => [usulanBaru, ...usulanSebelumnya]);
    setFormData(formAwal);
    setJenisPesan("success");
    setPesan(`Terima kasih, ${dataBersih.namaPengusul}. Usulan buku berhasil dikirim!`);
  }

  return (
    <div className="space-y-9">
      <section className="rounded-[2rem] bg-[#27382f] px-6 py-9 text-white sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c99b]">Suara pembaca</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Bantu kami memilih cerita berikutnya.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#d9d7cb]">Ada buku yang ingin kamu baca, tetapi belum tersedia di rak kami? Ceritakan kepada kami melalui formulir berikut.</p>
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-[#e9e2d7] bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a27b4d]">Formulir usulan</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#29382f]">Usulkan sebuah buku</h2>
            <p className="mt-2 text-sm leading-6 text-[#817666]">Lengkapi seluruh kolom agar usulanmu dapat kami catat.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="namaPengusul" className="mb-2 block text-sm font-semibold text-[#514b42]">Nama Pengusul</label>
              <input
                id="namaPengusul"
                name="namaPengusul"
                type="text"
                value={formData.namaPengusul}
                onChange={handleChange}
                placeholder="Masukkan nama kamu"
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition placeholder:text-[#b4aa9b] focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              />
            </div>

            <div>
              <label htmlFor="judulBuku" className="mb-2 block text-sm font-semibold text-[#514b42]">Judul Buku yang Diusulkan</label>
              <input
                id="judulBuku"
                name="judulBuku"
                type="text"
                value={formData.judulBuku}
                onChange={handleChange}
                placeholder="Contoh: The Pragmatic Programmer"
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition placeholder:text-[#b4aa9b] focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              />
            </div>

            <div>
              <label htmlFor="kategori" className="mb-2 block text-sm font-semibold text-[#514b42]">Kategori</label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm text-[#29382f] outline-none transition focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              >
                <option value="">Pilih kategori buku</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Pengembangan Diri">Pengembangan Diri</option>
              </select>
            </div>

            <div>
              <label htmlFor="alasan" className="mb-2 block text-sm font-semibold text-[#514b42]">Alasan Usulan</label>
              <textarea
                id="alasan"
                name="alasan"
                rows={5}
                value={formData.alasan}
                onChange={handleChange}
                placeholder="Ceritakan mengapa buku ini layak ada di Pustaka Senja..."
                className="w-full resize-y rounded-2xl border border-[#e5ded3] bg-[#fdfcf9] px-4 py-3 text-sm leading-6 text-[#29382f] outline-none transition placeholder:text-[#b4aa9b] focus:border-[#859681] focus:ring-4 focus:ring-[#859681]/15"
              />
            </div>

            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#27382f] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#3c5547]">
              Kirim usulan <span aria-hidden="true">→</span>
            </button>

            {pesan && (
              <p role="status" aria-live="polite" className={`rounded-2xl px-4 py-3 text-sm leading-6 ${jenisPesan === "success" ? "border border-[#c9dfcf] bg-[#f0f8f1] text-[#356a45]" : jenisPesan === "error" ? "border border-[#efd0c9] bg-[#fff5f2] text-[#9b4f43]" : "bg-[#f3eee6] text-[#776d60]"}`}>
                {pesan}
              </p>
            )}
          </form>
        </section>

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-[#e9e2d7] bg-[#f3eee6] p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl text-[#a27b4d]" aria-hidden="true">✳</span>
            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#29382f]">Kenapa usulanmu berarti?</h2>
            <p className="mt-3 text-sm leading-7 text-[#776d60]">Setiap pembaca punya minat dan sudut pandang yang berbeda. Usulanmu membantu Pustaka Senja menghadirkan koleksi yang lebih dekat dengan kebutuhan komunitas.</p>
          </div>

          <div className="rounded-[2rem] border border-[#e9e2d7] bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a27b4d]">Catatan sesi ini</p>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#29382f]">Usulan terkirim</h2>
              </div>
              <span className="flex h-10 min-w-10 items-center justify-center rounded-full bg-[#edf2eb] px-3 font-serif text-lg font-semibold text-[#45634d]">{daftarUsulan.length}</span>
            </div>

            {daftarUsulan.length === 0 ? (
              <p className="mt-5 rounded-2xl bg-[#f8f6f1] p-4 text-sm leading-6 text-[#8a8072]">Belum ada usulan. Setelah formulir berhasil dikirim, judul buku akan muncul di bagian ini.</p>
            ) : (
              <ul className="mt-5 space-y-3">
                {daftarUsulan.map((usulan) => (
                  <li key={usulan.id} className="rounded-2xl bg-[#f8f6f1] p-4">
                    <p className="font-serif text-lg font-semibold text-[#29382f]">{usulan.judulBuku}</p>
                    <p className="mt-1 text-xs text-[#887d6e]">{usulan.kategori} · Diusulkan oleh {usulan.namaPengusul}</p>
                    <p className="mt-2 text-sm leading-6 text-[#71685c]">{usulan.alasan}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-[11px] leading-5 text-[#9b9081]">Daftar ini disimpan dalam state selama halaman berjalan. Data akan kembali kosong ketika halaman dimuat ulang.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
