import foto1 from "../assets/gallery/foto1.png";
import foto2 from "../assets/gallery/foto2.png";
import foto3 from "../assets/gallery/foto3.png";
import foto4 from "../assets/gallery/foto4.png";

function Gallery() {

  const galeriFoto = [
    { id: 1, src: foto1, judul: "Landing Page Tandu Tea" },
    { id: 2, src: foto2, judul: "Sistem Evaluasi Praktikum" },
    { id: 3, src: foto3, judul: "Progress Board" },
    { id: 4, src: foto4, judul: "Jejak Proyek" },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="mb-6 text-center text-3xl font-bold text-white">Galeri Proyek</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galeriFoto.map((foto) => (
          <figure
            key={foto.id}
            className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800"
          >
            <img
              src={foto.src}
              alt={foto.judul}
              className="aspect-square w-full object-cover transition hover:scale-105"
            />
            <figcaption className="p-2 text-center text-sm text-slate-300">
              {foto.judul}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
