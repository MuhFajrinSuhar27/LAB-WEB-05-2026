const dataDiri = [
  { id: 1, label: 'Nama', nilai: 'Syarif Rahmatullah' },
  { id: 2, label: 'Domisili', nilai: 'Makassar, Sulawesi Selatan' },
  { id: 3, label: 'Pendidikan', nilai: 'Mahasiswa Teknologi Informasi' },
  { id: 4, label: 'Minat', nilai: 'Web development dan desain antarmuka' },
  { id: 5, label: 'Email', nilai: 'syarifrahmatullahrahmatullah@gmail.com' },
]

export default function About() {
  return (
    <section id="tentang" className="bg-sea px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Tentang saya
          </h2>
          <div className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed">
            <p>
              Saya sedang mendalami pengembangan web, terutama membangun
              antarmuka dengan React dan Tailwind CSS.
            </p>
            <p>
              Saya belajar paling cepat lewat proyek kecil dan berdiskusi dengan
              teman. Targetnya sederhana: menjadi frontend developer yang
              karyanya mudah dipakai orang lain.
            </p>
          </div>
        </div>

        <dl className="self-start rounded-3xl border-2 border-ink bg-paper shadow-[8px_8px_0_0_var(--color-ink)] lg:col-span-6">
          {dataDiri.map((item) => (
            <div
              key={item.id}
              className="grid gap-1 border-b-2 border-ink px-6 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-4"
            >
              <dt className="font-bold text-cobalt">{item.label}</dt>
              <dd className="break-words font-medium">{item.nilai}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
