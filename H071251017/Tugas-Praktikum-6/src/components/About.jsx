const perkenalan =
  'Saya mahasiswa semester tiga yang sedang mendalami pengembangan web dengan React. Saya suka mengubah ide menjadi halaman yang bisa langsung dipakai, dan terus belajar lewat proyek-proyek kecil.'

const dataDiri = [
  { id: 1, label: 'Nama', nilai: 'Teguh Paniro Silitonga' },
  { id: 2, label: 'Program Studi',  nilai: 'Sistem Informasi' },
  { id: 3, label: 'Asal Kota', nilai: 'Makassar' },
  { id: 4, label: 'Email', nilai: 'teguhsilitonga657@gmail.com' },
  { id: 5, label: 'Hobi', nilai: 'Nonton Film' },
]

function About() {
  return (
    <section id="tentang" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Tentang Saya</h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink/75">{perkenalan}</p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
          {dataDiri.map((item) => (
            <div key={item.id} className="rounded-2xl border border-ink/10 bg-paper p-5">
              <dt className="text-sm font-medium text-sea">{item.label}</dt>
              <dd className="mt-1 text-lg font-bold break-words">{item.nilai}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
