const keahlian = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS']

function Skills() {
  return (
    <section id="keahlian" className="scroll-mt-20 bg-white/60 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-pink-950 sm:text-3xl">Keahlian</h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {keahlian.map((skill, index) => (
            <li
              key={index}
              className="rounded-full border border-pink-200 bg-white px-5 py-2 text-sm font-semibold text-pink-700 shadow-sm shadow-pink-100 transition hover:-translate-y-1 hover:bg-pink-500 hover:text-white"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills