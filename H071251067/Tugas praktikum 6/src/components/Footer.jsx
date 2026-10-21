const nama = 'Syarif Rahmatullah'
const tahun = 2026

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-10 text-center text-paper/80">
      <p className="font-display text-lg font-semibold">
        &copy; {tahun} {nama}. Hak cipta dilindungi.
      </p>
    </footer>
  )
}
