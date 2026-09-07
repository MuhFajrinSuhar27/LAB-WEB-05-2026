# LAB-WEB-05-2026

Selamat datang di repositori **LAB-WEB-05-2026**! Repositori ini digunakan untuk tempat pengumpulan tugas praktikum mata kuliah Praktikum Pemrograman Web Unhas 2026. 

---

## 📌 Cara Pengumpulan (Tugas Pertama)

Ikuti langkah-langkah berikut khusus untuk pengumpulan tugas pertama kali:

**1. Fork Repositori**
Di kanan atas halaman repositori ini, klik tombol **"Fork"** -> **"Create a new fork"** untuk membuat salinan repositori ini ke akun GitHub pribadimu.

<img width="618" height="162" alt="image" src="https://github.com/user-attachments/assets/00dadcf2-db52-436f-b39d-5897f4eb75ae" />


<br>
<br>
<br>

**2. Kloning Repositori**
Klik pada bagian tombol hijau **"Code"** dan salin URL dari repositori hasil *fork* milikmu. Buka terminal/CMD di foldermu dan ketik:

```bash
git clone <url-repositori-hasil-fork>
```

**3. Buat Cabang (Branch) Baru**
Masuk ke direktori repositori yang telah di-kloning, lalu buat *branch* sesuai NIM masing-masing:

```bash
cd LAB-WEB-05-2026
git checkout -b H071251nnn  # Ganti dengan NIM masing-masing
```

**4. Masuk ke Folder NIM**
Masuk ke folder yang sudah disiapkan sesuai NIM-mu:

```bash
cd H071251nnn  # Ganti dengan NIM masing-masing
```

**5. Lakukan Perubahan & Tambah File**
Mulai kerjakan atau pindahkan file tugasmu ke dalam folder NIM tersebut. Setelah selesai, tambahkan file tugas dengan perintah:

```bash
git add .
```

**6. Commit Perubahan**
Lakukan *commit* dengan pesan yang deskriptif:

```bash
git commit -m "Tugas Praktikum 1 | H071251nnn"  # Sesuaikan tugas dan NIM
```
*(Catatan: Gunakan `git status` untuk mengecek status file).*

**7. Push ke GitHub**
Dorong (*push*) cabang baru tersebut ke repositori GitHub milikmu:

```bash
git push -u origin H071251nnn  # Ganti dengan NIM masing-masing
```

**8. Buka Pull Request**
Di halaman repositori GitHub akunmu, klik tautan *Pull Request* yang muncul untuk mengirimkan tugasmu ke repositori utama ini.

---

## 🚀 Pengumpulan Tugas Minggu Berikutnya (Tugas 2, 3, dst)

Mulai minggu kedua, langkahnya lebih singkat. **Jangan** melakukan *Fork* atau *Clone* ulang.

**1. Buka terminal** di dalam folder `LAB-WEB-05-2026` yang sudah ada di laptopmu.

**2. Pindah ke branch NIM-mu** (**tanpa** `-b` karena *branch* sudah ada):

```bash
git checkout H071251nnn
```

**3. Masuk ke foldermu dan pastikan status repositori aman:**

```bash
cd H071251nnn
```
*(catatan: gunakan `git status` untuk mengecek apakah kamu berada di branch NIM-mu dan tidak ada error ).*


**4. Buat folder baru** untuk tugas minggu ini di dalam folder NIM-mu (misalnya: Tugas-Praktikum-2), lalu masukkan atau pindahkan file tugas yang sudah kamu kerjakan ke dalam folder tersebut.

**5. Setelah selesai, simpan dan kirim kode:**

```bash
git add .
git commit -m "Tugas Praktikum 2 | NIM"
git push origin H071251nnn
```

**6. Buka Pull Request** baru di GitHub menuju repositori utama.
