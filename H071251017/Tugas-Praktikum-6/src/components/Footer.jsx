const nama = 'Teguh Paniro Silitonga'
const tahun = new Date().getFullYear()

function Footer() {
  return (
    <footer className="bg-ink py-8 text-center text-sm text-white/80">
      <p>
        &copy; {tahun} {nama}. Hak cipta dilindungi.
      </p>
    </footer>
  )
}

export default Footer
