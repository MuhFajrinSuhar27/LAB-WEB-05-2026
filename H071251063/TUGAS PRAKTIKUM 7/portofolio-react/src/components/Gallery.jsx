import foto1 from '../assets/gallery/mel.jpg'
import foto2 from '../assets/gallery/mel2.jpg'
import foto3 from '../assets/gallery/mel3.jpg'
import foto4 from '../assets/gallery/mel4.jpg'

const galeri = [
  { id: 1, src: foto1, judul: 'Bisa dipanggil Amel/Puti' },
  { id: 2, src: foto2, judul: 'Alumni SMA KARTIKA XX-1 MAKASSAR' },
  { id: 3, src: foto3, judul: 'SINTARA25' },
  { id: 4, src: foto4, judul: 'Aktif kepanitiaan saat SMA' },
]

function Gallery() {
  return (
    <section id="galeri" className="scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-pink-950 sm:text-3xl">Galeri</h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galeri.map((foto) => (
            <figure
              key={foto.id}
              className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-lg shadow-pink-100"
            >
              <img
                src={foto.src}
                alt={foto.judul}
                className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <figcaption className="px-4 py-3 text-sm font-medium text-pink-900">{foto.judul}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery