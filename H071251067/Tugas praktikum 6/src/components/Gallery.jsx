import kegiatanKampus from '../assets/gallery/berkebun.jpeg'
import proyekWeb from '../assets/gallery/bersepeda.jpeg'
import komunitas from '../assets/gallery/nyawit-wowo.jpeg'
import liburan from '../assets/gallery/Bilyard.jpeg'

const galeri = [
  { id: 1, src: kegiatanKampus, judul: 'Berkebun', kelas: 'col-span-2 row-span-2' },
  { id: 2, src: proyekWeb, judul: 'Bersepeda', kelas: 'row-span-2' },
  { id: 3, src: komunitas, judul: 'Nyawit Wowo', kelas: '' },
  { id: 4, src: liburan, judul: 'Bilyard', kelas: '' },
]

function Gallery() {
  return (
    <section id="galeri" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          Galeri
        </h2>

        <div className="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-4 sm:auto-rows-[15rem] sm:gap-6 lg:grid-cols-4">
          {galeri.map((foto) => (
            <figure
              key={foto.id}
              className={`relative overflow-hidden rounded-3xl border-2 border-ink bg-sea ${foto.kelas}`}
            >
              <img
                src={foto.src}
                alt={foto.judul}
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-bold">
                {foto.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Gallery;
