import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Pustaka Senja | Ruang Baca Komunitas",
  description: "Temukan bacaan baru, jelajahi katalog, dan bagikan usulan buku di Pustaka Senja.",
};

export default function RootLayout({children}) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-[#fbf9f4] text-[#29352e] antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-7 sm:px-8 sm:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

