const dataDiri = [
  { id: 1, label: 'Nama', nilai: 'Mukhsin' },
  { id: 2, label: 'Program Studi', nilai: 'Sistem Informasi' },
  { id: 3, label: 'Perguruan Tinggi', nilai: 'Universitas Hasanuddin' },
  { id: 4, label: 'Fokus Belajar', nilai: 'Web Development dan AI' },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-32 bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="section-kicker">Tentang saya</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-5xl">
            Rasa ingin tahu menjadi awal dari <span className="text-gradient">setiap karya.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Saya adalah mahasiswa Sistem Informasi yang tertarik pada cara teknologi membantu menyelesaikan masalah. Saat ini saya memperkuat dasar pemrograman, mempelajari pengembangan antarmuka web, dan membangun kebiasaan belajar melalui latihan kecil yang konsisten.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Bagi saya, proses belajar yang baik bukan hanya membuat sesuatu bisa berjalan, tetapi juga memahami alasan di balik setiap baris kode.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-[#fafaff] p-5 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-indigo-600">Ringkasan</p>
              <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Data Diri</h3>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-xl text-indigo-700" aria-hidden="true">✦</span>
          </div>
          <div className="mt-2 divide-y divide-slate-200/80">
            {dataDiri.map((item) => (
              <div key={item.id} className="grid gap-1 py-4 sm:grid-cols-[0.8fr_1.2fr] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
                <p className="text-sm font-extrabold leading-6 text-slate-900 sm:text-base">{item.nilai}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl bg-indigo-600 p-4 text-white sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-100">Tujuan saya</p>
            <p className="mt-2 text-sm font-semibold leading-6">Menjadi pengembang yang mampu membangun solusi teknologi yang berguna dan mudah digunakan.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
