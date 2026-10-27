const perkenalan =
  'Saya mahasiswa semester 3 pendidikan Sistem Informasi tertarik pada pengembangan web, basis data, serta desain antarmuka.'

const dataDiri = [
  { id: 1, label: 'Nama', value: 'Puti Amelia Azzahra' },
  { id: 2, label: 'Universitas', value: 'Universitas Hasanuddin' },
  { id: 3, label: 'Fakultas', value: 'MIPA' },
  { id: 4, label: 'Program Studi', value: 'Sistem Informasi' },
]

function About() {
  return (
    <section id="tentang" className="scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-pink-950 sm:text-3xl">Tentang Saya</h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />

        <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
          <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{perkenalan}</p>

          <dl className="divide-y divide-pink-100 rounded-2xl border border-pink-100 bg-white p-4 shadow-lg shadow-pink-100">
            {dataDiri.map((item) => (
              <div key={item.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between">
                <dt className="text-sm font-semibold text-pink-600">{item.label}</dt>
                <dd className="text-sm text-slate-800 sm:text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default About