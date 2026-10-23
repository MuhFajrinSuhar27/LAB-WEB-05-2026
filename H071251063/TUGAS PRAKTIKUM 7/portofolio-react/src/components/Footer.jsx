const nama = 'Puti Amelia Azzahra'
const tahun = new Date().getFullYear()

function Footer() {
  return (
    <footer className="border-t border-pink-200 bg-white/70 px-4 py-8 text-center text-sm text-pink-700">
      &copy; {tahun} {nama}. Semua hak dilindungi.
    </footer>
  )
}

export default Footer