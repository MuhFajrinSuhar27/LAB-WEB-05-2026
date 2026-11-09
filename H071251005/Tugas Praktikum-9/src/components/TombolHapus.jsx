"use client";

export default function TombolHapus({ id, action, judul = "buku ini" }) {
  function konfirmasiHapus(event) {
    const disetujui = window.confirm(
      `Apakah kamu yakin ingin menghapus ${judul}? Data yang dihapus tidak dapat dikembalikan.`
    );

    if (!disetujui) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={konfirmasiHapus}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full border border-[#e7c8c1] bg-white px-5 py-2.5 text-sm font-semibold text-[#a34f43] transition hover:bg-[#fff3f0]"
      >
        hapus
      </button>
    </form>
  );
}
