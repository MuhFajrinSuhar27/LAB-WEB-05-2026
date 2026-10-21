const keahlian = ['HTML dan CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git dan GitHub', 'Desain UI']

function Skills() {
  return (
    <section id="keahlian" className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Keahlian</h2>
      <ul className="mt-8 flex flex-wrap gap-3">
        {keahlian.map((skill, index) => (
          <li
            key={index}
            className="rounded-full border-2 border-ink bg-coral/30 px-6 py-3 font-bold transition hover:-translate-y-1 hover:bg-coral"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Skills
