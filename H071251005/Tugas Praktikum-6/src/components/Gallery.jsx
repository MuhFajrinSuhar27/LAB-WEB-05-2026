import fotoBelajar from '../assets/gallery/belajar-koding.jpg'
import fotoProfil from '../assets/gallery/ilustrasi-profil.jpg'
import fotoKreatif from '../assets/gallery/ruang-kreatif.svg'
import fotoWeb from '../assets/gallery/eksplorasi-web.svg'

const daftarFoto = [
  {
    id: 'belajar-koding',
    gambar: fotoBelajar,
    judul: 'Momen Belajar',
    keterangan: 'Membangun kebiasaan belajar dan mencoba hal baru.',
    alt: 'Ilustrasi seseorang sedang belajar di depan komputer',
  },
  {
    id: 'ilustrasi-profil',
    gambar: fotoProfil,
    judul: 'Identitas Visual',
    keterangan: 'Ilustrasi profil yang digunakan pada portofolio ini.',
    alt: 'Ilustrasi karakter berambut hitam dengan pakaian formal',
  },
  {
    id: 'ruang-kreatif',
    gambar: fotoKreatif,
    judul: 'Ruang Kreatif',
    keterangan: 'Tempat ide, logika, dan eksperimen bertemu.',
    alt: 'Ilustrasi meja kerja dengan laptop berisi kode pemrograman',
  },
  {
    id: 'eksplorasi-web',
    gambar: fotoWeb,
    judul: 'Eksplorasi Web',
    keterangan: 'Latihan menyusun antarmuka yang jelas dan responsif.',
    alt: 'Ilustrasi rancangan antarmuka website pada layar',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-32 bg-white px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">Galeri</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-5xl">Catatan perjalanan</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">Beberapa visual tentang proses belajar, eksplorasi teknologi, dan pengembangan ide digital.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {daftarFoto.map((foto) => (
            <article key={foto.id} className="gallery-card group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#fafaff] transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_48px_rgba(40,37,90,0.10)]">
              <div className="overflow-hidden bg-indigo-50">
                <img src={foto.gambar} alt={foto.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-extrabold text-slate-950">{foto.judul}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{foto.keterangan}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
