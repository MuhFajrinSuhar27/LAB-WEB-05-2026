export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-indigo-200">
      <div className="mx-auto max-w-5xl px-5 py-6 text-sm">
        <p className="font-semibold text-indigo-50">Pustaka Senja</p>
        <p>Ruang baca dan perpustakaan komunitas dekat kampus.</p>
        <p className="mt-2 text-indigo-300">
          &copy; {new Date().getFullYear()} Pustaka Senja. Dikelola oleh Nabila.
        </p>
      </div>
    </footer>
  );
}
