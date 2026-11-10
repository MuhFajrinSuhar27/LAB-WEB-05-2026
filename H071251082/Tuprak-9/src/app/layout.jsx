import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "Ruang Baca Pustaka Senja",
    template: "%s — Pustaka Senja",
  },
  description:
    "Ruang baca kecil untuk koleksi yang dibaca perlahan. Katalog buku Pustaka Senja.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
