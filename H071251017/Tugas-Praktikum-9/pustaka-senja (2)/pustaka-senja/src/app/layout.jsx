import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja",
  description: "Ruang baca dan perpustakaan komunitas Pustaka Senja.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-indigo-50/60 text-slate-800 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
