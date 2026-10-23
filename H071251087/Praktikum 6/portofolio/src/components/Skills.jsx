function Skills() {
  // TODO: sesuaikan dengan keahlianmu
  const skills = ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React"];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="mb-6 text-center text-3xl font-bold text-white">
        Keahlian
      </h2>
      <ul className="flex flex-wrap justify-center gap-3">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="rounded-full bg-pink-500/20 px-5 py-2 font-medium text-pink-300 ring-1 ring-pink-500/50"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
