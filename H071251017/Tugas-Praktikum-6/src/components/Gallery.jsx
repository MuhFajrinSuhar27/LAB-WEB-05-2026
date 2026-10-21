import foto1 from '../assets/gallery/me_and_my_mom.jpeg'
import foto2 from '../assets/gallery/WhatsApp Image 2026-10-21 at 10.58.39.jpeg'
import foto3 from '../assets/gallery/WhatsApp Image 2026-10-21 at 10.58.40.jpeg'
import foto4 from '../assets/gallery/WhatsApp Image 2026-10-21 at 10.58.39 (1).jpeg'

const daftarFoto = [
  { id: 1, src: foto1, judul: 'Me and My Mom' },
  { id: 2, src: foto2, judul: 'Project Team 4' },
  { id: 3, src: foto3, judul: 'My Selfie' },
  { id: 4, src: foto4, judul: 'Photobooth' },
]

function Gallery() {
  return (
    <section id="galeri" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Galeri</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {daftarFoto.map((foto) => (
            <figure key={foto.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-paper">
              <img src={foto.src} alt={foto.judul} className="aspect-square w-full object-cover" />
              <figcaption className="p-3 text-sm font-medium">{foto.judul}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
