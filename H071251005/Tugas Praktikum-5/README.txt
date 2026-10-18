================================================================================
                    LuxTask Dashboard
                  Aplikasi Pengelolaan Tugas Tim
================================================================================

DAFTAR ISI:
1. Pengertian Aplikasi
2. Cara Mengekstrak File ZIP
3. Cara Membuka di Visual Studio Code
4. Cara Menjalankan dengan Live Server
5. Fitur-Fitur Aplikasi
6. Cara Menguji Setiap Fitur
7. Persyaratan Internet
8. Catatan Penting Tentang Penyimpanan Data

================================================================================
1. PENGERTIAN APLIKASI
================================================================================

LuxTask Dashboard adalah aplikasi web untuk mengelola tugas anggota tim.
Aplikasi ini menampilkan:

- Daftar anggota tim yang diambil dari API
- Tugas-tugas setiap anggota
- Statistik penyelesaian tugas
- Progress bar untuk melihat persentase penyelesaian
- Fitur pencarian tugas
- Fitur penambahan tugas baru
- Fitur penandaan tugas selesai
- Fitur penghapusan tugas

Aplikasi ini dibangun dengan:
- HTML5 (struktur halaman)
- CSS (styling dan responsivitas)
- JavaScript Vanilla (fungsionalitas interaktif)
- Tailwind CSS CDN (framework CSS)

================================================================================
2. CARA MENGEKSTRAK FILE ZIP
================================================================================

Jika Anda menerima file "LuxTaskDashboard.zip":

Di Windows:
1. Klik kanan pada file LuxTaskDashboard.zip
2. Pilih "Extract All" atau "Ekstrak Semua"
3. Pilih lokasi penyimpanan (misalnya Desktop atau Documents)
4. Klik "Extract"
5. Folder "LuxTaskDashboard" akan muncul di lokasi tersebut

Di Mac:
1. Klik dua kali file LuxTaskDashboard.zip
2. Folder "LuxTaskDashboard" akan otomatis diekstrak

Di Linux:
1. Buka terminal
2. Gunakan perintah: unzip LuxTaskDashboard.zip
3. Folder "LuxTaskDashboard" akan muncul

Setelah diekstrak, Anda akan memiliki folder dengan struktur:

    LuxTaskDashboard/
    ├── index.html
    ├── script.js
    └── README.txt

================================================================================
3. CARA MEMBUKA DI VISUAL STUDIO CODE
================================================================================

1. Buka Visual Studio Code (atau install terlebih dahulu dari https://code.visualstudio.com)
2. Klik File → Open Folder (atau Ctrl+K, Ctrl+O)
3. Navigasi ke folder "LuxTaskDashboard" yang sudah diekstrak
4. Klik "Open" untuk membuka folder di VS Code
5. Di sisi kiri, Anda akan melihat file-file:
   - index.html
   - script.js
   - README.txt

Struktur folder sudah siap untuk dijalankan.

================================================================================
4. CARA MENJALANKAN DENGAN LIVE SERVER
================================================================================

Live Server adalah ekstensi VS Code yang memudahkan Anda menjalankan aplikasi
dengan refresh otomatis.

LANGKAH 1: Instal Ekstensi Live Server
1. Di VS Code, buka bagian Extensions (Ctrl+Shift+X)
2. Cari "Live Server"
3. Cari yang dibuat oleh "Ritwick Dey"
4. Klik "Install"

LANGKAH 2: Jalankan Aplikasi
1. Buka file "index.html" di VS Code
2. Klik kanan pada file index.html
3. Pilih "Open with Live Server"
   (Atau gunakan shortcut Alt+L, Alt+O)
4. Browser Anda akan otomatis membuka halaman di:
   http://127.0.0.1:5500

Jika browser tidak terbuka otomatis, buka browser Anda dan ketik:
   http://localhost:5500

LANGKAH 3: Aplikasi Sudah Berjalan
- Halaman akan menampilkan LuxTask Dashboard
- Jika Anda mengubah file, halaman akan refresh otomatis
- Tutup terminal atau klik tombol stop di VS Code untuk menghentikan server

================================================================================
5. FITUR-FITUR APLIKASI
================================================================================

A. MENAMPILKAN DAFTAR ANGGOTA (Fitur F1)
   - Saat halaman dibuka, aplikasi mengambil daftar anggota dari API
   - Anggota ditampilkan di sidebar sebelah kiri
   - Klik nama anggota untuk memilihnya
   - Anggota yang dipilih akan memiliki background merah dan garis merah

B. MENAMPILKAN TUGAS ANGGOTA (Fitur F2)
   - Setelah memilih anggota, tugas-tugasnya akan dimuat
   - Tugas ditampilkan dalam daftar dengan status "Belum Selesai" atau "Selesai"
   - Statistik akan diperbarui sesuai tugas anggota yang dipilih
   - Progress bar menunjukkan persentase penyelesaian

C. PENCARIAN TUGAS (Fitur F3)
   - Di bagian atas, ada kotak "Cari Tugas"
   - Ketik kata kunci untuk mencari tugas berdasarkan judul
   - Tugas yang tidak cocok akan disembunyikan
   - Jika tidak ada hasil, pesan "Tidak ada tugas yang cocok" akan muncul
   - Bersihkan pencarian untuk menampilkan semua tugas lagi

D. MENAMBAH TUGAS BARU (Fitur F4)
   - Di sebelah kotak pencarian, ada form "Judul Tugas"
   - Masukkan judul tugas minimal 5 karakter
   - Klik tombol "Simpan"
   - Selama menyimpan, tombol akan berubah menjadi "Menyimpan..."
   - Jika berhasil, pesan "Tugas berhasil ditambahkan." akan muncul
   - Jika judul sudah ada, pesan error akan ditampilkan
   - Tugas baru akan muncul di daftar

E. MENANDAI TUGAS SELESAI (Fitur F5)
   - Setiap tugas yang belum selesai memiliki tombol "Tandai Selesai"
   - Klik tombol untuk menandai tugas selesai
   - Tugas akan ditampilkan dengan coret (line-through) dan warna abu-abu
   - Tombol "Tandai Selesai" akan hilang
   - Statistik dan progress bar akan diperbarui

F. MENGHAPUS TUGAS
   - Setiap tugas memiliki tombol "Hapus"
   - Klik tombol untuk menghapus tugas
   - Tugas akan dihapus dari daftar
   - Statistik akan diperbarui

================================================================================
6. CARA MENGUJI SETIAP FITUR
================================================================================

PENGUJIAN FITUR F1 (Menampilkan Anggota):
1. Buka aplikasi
2. Amati sidebar sebelah kiri
3. Pastikan minimal 10 anggota tertampil (dari API)
4. Periksa bahwa pesan "Memuat anggota..." hilang setelah data dimuat

PENGUJIAN FITUR F2 (Menampilkan Tugas Anggota):
1. Klik pada salah satu nama anggota di sidebar
2. Pastikan nama anggota memiliki highlight merah
3. Amati bahwa daftar tugas berubah sesuai anggota yang dipilih
4. Periksa bahwa statistik (Total Tugas, Tugas Selesai, dll) diperbarui
5. Klik anggota yang berbeda dan periksa bahwa daftar tugas berubah

PENGUJIAN FITUR F3 (Pencarian Tugas):
1. Pilih seorang anggota
2. Di kotak "Cari Tugas", ketik kata kunci pencarian
3. Amati bahwa hanya tugas yang sesuai yang tertampil
4. Hapus teks pencarian dan pastikan semua tugas muncul kembali
5. Coba pencarian dengan huruf kapital dan huruf kecil (case-insensitive)

PENGUJIAN FITUR F4 (Menambah Tugas):
1. Pilih seorang anggota
2. Di form "Judul Tugas", ketik judul kurang dari 5 karakter
3. Klik "Simpan" dan pastikan pesan error muncul
4. Ketik judul dengan minimal 5 karakter
5. Klik "Simpan" dan amati tombol berubah ke "Menyimpan..."
6. Tunggu hingga notifikasi "Tugas berhasil ditambahkan." muncul
7. Pastikan tugas baru muncul di daftar
8. Coba menambah tugas dengan judul yang sama dan pastikan error muncul

PENGUJIAN FITUR F5 (Tandai Selesai dan Hapus):
1. Pilih seorang anggota
2. Klik tombol "Tandai Selesai" pada salah satu tugas
3. Pastikan tugas menjadi berteks coret dan berwarna abu-abu
4. Pastikan tombol "Tandai Selesai" hilang
5. Periksa bahwa progress bar dan statistik diperbarui
6. Klik tombol "Hapus" pada salah satu tugas
7. Pastikan tugas dihapus dari daftar
8. Periksa bahwa statistik dan progress bar diperbarui

PENGUJIAN NOTIFIKASI:
1. Saat menambah tugas, pesan notifikasi harus muncul di sudut kanan atas
2. Notifikasi akan hilang otomatis setelah 3 detik

PENGUJIAN RESPONSIVITAS:
1. Buka aplikasi di desktop (browser window lebar)
2. Amati layout dengan sidebar di kiri dan area kerja di kanan
3. Resize browser window menjadi lebih sempit (tablet size)
4. Sidebar akan berubah posisi dan layout disesuaikan
5. Uji pada ukuran mobile (gunakan DevTools - F12, pilih device mobile)

================================================================================
7. PERSYARATAN INTERNET
================================================================================

Aplikasi ini membutuhkan koneksi internet untuk berfungsi karena:

1. Tailwind CSS dimuat dari CDN (Content Delivery Network)
   - CDN: cdn.tailwindcss.com
   
2. Data anggota dan tugas diambil dari API publik
   - API: jsonplaceholder.typicode.com
   - Endpoint 1: /users (untuk daftar anggota)
   - Endpoint 2: /todos?userId=ID (untuk tugas anggota)

Jika internet terputus:
- Tailwind CSS tidak akan dimuat → styling akan hilang
- Data anggota tidak akan tampil → pesan error akan muncul
- Tugas tidak akan dimuat → pesan error akan muncul

Untuk bekerja offline, Anda perlu:
1. Download Tailwind CSS dan letakkan file CSS di folder proyek
2. Ganti CDN dengan referensi file lokal di index.html

Namun untuk penggunaan normal, koneksi internet yang stabil sangat disarankan.

================================================================================
8. CATATAN PENTING TENTANG PENYIMPANAN DATA
================================================================================

PENTING: Tugas yang ditambahkan TIDAK disimpan secara permanen!

Semua tugas yang Anda tambahkan atau ubah (tandai selesai, hapus) hanya
tersimpan SEMENTARA saat halaman dibuka. Ketika Anda:

1. Menutup tab browser
2. Refresh halaman (F5 atau Ctrl+R)
3. Menutup aplikasi

Data perubahan akan hilang dan kembali ke kondisi awal.

Ini adalah fitur yang disengaja karena:
- Aplikasi ini adalah simulasi pembelajaran
- API JSONPlaceholder hanya untuk membaca data, bukan menyimpan
- Untuk menyimpan data permanen, diperlukan backend/database khusus

Jika Anda ingin mencoba fitur lagi, cukup refresh halaman dan data akan
kembali ke kondisi awal.

================================================================================
9. TROUBLESHOOTING
================================================================================

MASALAH: Halaman tidak menampilkan styling (hanya teks putih, tidak rapi)
SOLUSI:
- Periksa koneksi internet Anda
- Tunggu beberapa detik agar Tailwind CSS selesai dimuat
- Coba refresh halaman (Ctrl+R)

MASALAH: Daftar anggota tidak muncul
SOLUSI:
- Periksa koneksi internet
- Buka DevTools (F12) dan lihat tab Console untuk pesan error
- Coba refresh halaman

MASALAH: Tugas tidak tampil setelah memilih anggota
SOLUSI:
- Periksa koneksi internet
- Pastikan anggota yang dipilih memiliki tugas di API
- Buka DevTools dan periksa Network tab

MASALAH: Tombol tidak merespons
SOLUSI:
- Pastikan JavaScript diaktifkan di browser Anda
- Coba refresh halaman
- Coba browser yang berbeda

================================================================================
10. KONTAK DAN SUPPORT
================================================================================

Aplikasi ini dibuat untuk keperluan pembelajaran (Tugas Praktikum Bab 5).

Jika Anda menemukan bug atau ada pertanyaan:
1. Periksa kembali file index.html dan script.js
2. Pastikan struktur folder benar
3. Periksa kembali bagian Troubleshooting di atas

================================================================================

Terima kasih telah menggunakan LuxTask Dashboard!

Selamat belajar! 🚀

================================================================================
