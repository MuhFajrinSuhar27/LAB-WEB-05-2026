const daftarKeahlian = [
  'HTML & CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Git & GitHub',
  'Dasar Python',
]

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-32 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Keahlian</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-5xl">Hal yang saya pelajari</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">Berikut beberapa teknologi dan keterampilan yang sedang saya pelajari serta latih melalui tugas dan proyek sederhana.</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {daftarKeahlian.map((keahlian, index) => (
            <article key={index} className="skill-card group rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5 sm:p-5">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-700 transition group-hover:bg-indigo-600 group-hover:text-white">0{index + 1}</span>
              <h3 className="mt-4 text-xs font-extrabold leading-5 text-slate-800 sm:text-sm">{keahlian}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
