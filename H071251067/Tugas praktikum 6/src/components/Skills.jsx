const skills = [
  'HTML & CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Git & GitHub',
  'Desain UI',
]

export default function Skills() {
  return (
    <section
      id="keahlian"
      className="overflow-hidden bg-ink py-24 text-paper"
    >
      <h2 className="mx-auto max-w-6xl px-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
        Keahlian
      </h2>

      <div className="mt-14 overflow-x-auto motion-reduce:overflow-x-scroll">
        <div className="marquee-track flex w-max animate-marquee hover:[animation-play-state:paused]">
          <ul className="flex shrink-0 items-center">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center">
                <span
                  className={`px-8 font-display text-5xl font-extrabold tracking-tight sm:text-7xl ${
                    index % 2 === 1
                      ? 'text-transparent [-webkit-text-stroke:2px_var(--color-paper)]'
                      : ''
                  }`}
                >
                  {skill}
                </span>
                <span aria-hidden="true" className="text-4xl text-marigold">
                  ✦
                </span>
              </li>
            ))}
          </ul>

          <ul aria-hidden="true" className="flex shrink-0 items-center">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center">
                <span
                  className={`px-8 font-display text-5xl font-extrabold tracking-tight sm:text-7xl ${
                    index % 2 === 1
                      ? 'text-transparent [-webkit-text-stroke:2px_var(--color-paper)]'
                      : ''
                  }`}
                >
                  {skill}
                </span>
                <span className="text-4xl text-marigold">✦</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
