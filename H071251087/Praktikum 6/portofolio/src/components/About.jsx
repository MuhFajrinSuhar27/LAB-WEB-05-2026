function About() {

  const dataDiri = [
    { id: 1, label: "Nama", nilai: "Aisyah" },
    { id: 2, label: "Status", nilai: "Mahasiswi" },
    { id: 3, label: "Program Studi", nilai: "Sistem Informasi" },
    { id: 4, label: "Universitas", nilai: "Universitas Hasanuddin" },
    { id: 5, label: "Email", nilai: "aisyahnurat@gmail.com" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="mb-6 text-center text-3xl font-bold text-white">
        Tentang Saya
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-slate-300">
        Saya adalah seorang mahasiswi yang sedang mempelajari dunia web.
        Lewat praktikum, saya belajar HTML, CSS, JavaScript, hingga React untuk
        membuat antarmuka yang interaktif.
      </p>
      <dl className="grid gap-4 sm:grid-cols-2">
        {dataDiri.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-700 bg-slate-800 p-4"
          >
            <dt className="text-sm text-pink-400">{item.label}</dt>
            <dd className="font-medium text-white">{item.nilai}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default About;
