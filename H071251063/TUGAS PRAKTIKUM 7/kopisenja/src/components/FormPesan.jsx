
function FormPesan({
  nama,
  setNama,
  nomorMeja,
  setNomorMeja,
  onSubmit,
  pesanError,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-xl font-bold text-amber-950">
        Data Pemesan
      </h2>

      <div className="mb-4">
        <label
          htmlFor="nama"
          className="mb-2 block text-sm font-medium"
        >
          Nama pelanggan
        </label>

        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama kamu"
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-700"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="nomorMeja"
          className="mb-2 block text-sm font-medium"
        >
          Nomor meja
        </label>

        <input
          id="nomorMeja"
          type="number"
          min="1"
          value={nomorMeja}
          onChange={(e) => setNomorMeja(e.target.value)}
          placeholder="Masukkan nomor meja"
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-700"
        />
      </div>

      {pesanError && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {pesanError}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white hover:bg-amber-900"
      >
        Kirim Pesanan
      </button>
    </form>
  )
}

export default FormPesan
