# NPM Generator: create-skripsi-ubsi

Template LaTeX mutakhir untuk penulisan **Proposal, Laporan PKL/Magang, dan Skripsi** mahasiswa **S1 Teknologi Informasi, Universitas Bina Sarana Informatika (UBSI)**. 

Bukan sekadar *template* mati, ini adalah sistem generator cerdas berbasis NPM (NodeJS) yang akan membuatkan repositori penulisan Anda 100% *clean*, terstruktur otomatis, dan mematuhi Pedoman Penyusunan Tugas Akhir UBSI terbaru (format margin, cover, hingga halaman persetujuan dan e-Materai).

---

## Fitur Utama
- **Generasi Interaktif (NPM CLI)**: Pilih topik laporan Anda di terminal, dan sisa file yang tidak terpakai akan otomatis dihapus.
- **Super Modular**: Kerangka isi sudah dibagikan per Bab & Sub-bab secara presisi berdasarkan variasi topik Skripsi.
- **Auto-Fill Data Diri**: Cukup isi form di `identitas.tex` 1 kali, dan data (Nama, NIM, Judul) akan otomatis tercetak di halaman *Cover*, Lembar Pengesahan, Pernyataan Keaslian, Lembar Konsultasi, dll.
- **Auto-Compiler**: Lupakan tombol kompilasi yang rumit, cukup jalankan *script* bawaan.
- **Daftar Pustaka Mendeley**: Terintegrasi otomatis dengan `pustaka.bib` untuk sitasi format APA v7.

---

## Prasyarat (Requirements)

Keunggulan utama *package* ini adalah **0 Dependencies** untuk *script* NPM-nya. Saya menggunakan modul bawaan NodeJS murni sehingga proses *install* dan *generate* sangat ringan dan secepat kilat tanpa perlu mengunduh `node_modules` yang berat.

Namun, untuk menjalankan sistem ini, komputer Anda harus menginstal dua perangkat lunak gratis berikut:

1. **NodeJS** (Minimal versi 14+)
   Digunakan untuk menjalankan perintah `npx` (Node Package Execute).
   * Download Resmi: [https://nodejs.org/](https://nodejs.org/) (Pilih versi LTS - *Long Term Support*). Tersedia untuk Windows, macOS, dan Linux.

2. **Distribusi LaTeX**
   Digunakan sebagai mesin *compiler* untuk merender format kode `.tex` menjadi file PDF. Pastikan `pdflatex` dan `bibtex` ter-instal dan dikenali oleh OS Anda. Silakan unduh sesuai sistem operasi Anda:
   * **Windows**: Disarankan menggunakan **MiKTeX** ([https://miktex.org/download](https://miktex.org/download)).
   * **macOS**: Wajib menggunakan **MacTeX** ([https://tug.org/mactex/](https://tug.org/mactex/)).
   * **Ubuntu / Linux**: Bisa menggunakan TeX Live. Buka terminal dan ketik: `sudo apt-get install texlive-full`. (Atau pelajari lebih lanjut di [https://tug.org/texlive/](https://tug.org/texlive/)).

---

## Cara Penggunaan (NPM)

Anda bisa meng-inisialisasi template ini tanpa perlu mengunduh file `.zip`. Cukup gunakan NodeJS!

1. Buka Terminal/CMD Anda.
2. Ketik perintah berikut:
   ```bash
   npx create-skripsi-ubsi
   ```
3. CLI akan menanyakan nama folder *project* Anda (contoh: `skripsi-saya`).
4. Pilih tipe laporan yang ingin dikerjakan:
   - `[1]` PKL - Proyek Inovasi Perangkat Lunak
   - `[2]` PKL - Analisa Program Berbasis Mobile
   - `[3]` PKL - Jaringan Komputer
   - `[4]` PKL - Analisis Sistem
   - `[5]` Skripsi - Perancangan Program Science
   - `[6]` Skripsi - Penelitian Ilmiah
   - `[7]` Skripsi - Jaringan Komputer
   - `[8]` Skripsi - Aplikasi StartUp
5. Selesai! Masuk ke dalam folder *project* tersebut:
   ```bash
   cd skripsi-saya
   ```

---

## Ketentuan Per Outline

Setiap outline Tugas Akhir (Skripsi) memiliki ketentuan khusus yang harus dipenuhi oleh mahasiswa:

| Kode | Nama Outline | Metode | Luaran Wajib | Catatan Khusus |
| :--- | :--- | :--- | :--- | :--- |
| **156** | Perancangan Program Science | Individu | Publikasi Artikel Ilmiah, BAST Karya | Surat riset optional (tergantung kasus) |
| **138** | Penelitian Ilmiah | Individu | Publikasi Artikel Ilmiah, BAST Karya | Wajib melakukan riset |
| **137** | Jaringan Komputer | Individu | Publikasi Artikel Ilmiah, BAST Karya | Surat keterangan riset **WAJIB ASLI** dengan stempel basah, skema jaringan dari simulator |
| **158** | Aplikasi StartUp | Kelompok (maks. 2) | Publikasi Artikel Ilmiah, BAST Karya | Aplikasi wajib terbit di Google Play Store, membuat & mempresentasikan Pitchdeck |

### Luaran Wajib Semua Outline
- **Publikasi Artikel Ilmiah**
- **Berita Acara Serah Terima Karya (BAST Karya)**

### Catatan Penting
- **Outline 158 (Aplikasi StartUp)**: Maksimal dikerjakan oleh 2 orang dalam kelompok (bukan individu). Aplikasi yang dibangun wajib terdaftar dan dipublikasikan di Google Play Store. Mahasiswa juga wajib menyusun dan mempresentasikan Pitchdeck (gambaran umum rencana bisnis startup) saat sidang. Bab III (Tinjauan StartUp) wajib mendetailkan 9 komponen Business Model Canvas (BMC) secara utuh.
- **Outline 137 (Jaringan Komputer)**: Surat Keterangan Riset wajib asli (memiliki kop surat resmi, ditandatangani, dan dibubuhi stempel basah perusahaan). Skema jaringan berjalan dan jaringan usulan wajib menggunakan simulator jaringan (Packet Tracer, GNS3, atau sejenisnya) dan dilarang digambar secara manual. Mahasiswa wajib mempresentasikan simulasi pengujian awal dan akhir secara live di hadapan dewan penguji.

---

## Cara Kompilasi (Melihat Hasil PDF)

Di dalam repositori Anda yang baru saja digenerate, sudah tersedia file *auto-compiler*. Pastikan Anda sudah menginstal **TeX Live / MiKTeX** di laptop Anda.

- **Untuk Pengguna Mac / Linux:**
  Jalankan perintah ini di terminal:
  ```bash
  ./compile.sh
  ```
- **Untuk Pengguna Windows:**
  Klik 2x pada file `compile.bat`, atau ketikkan `compile.bat` di CMD/PowerShell.

*Script* akan otomatis menjalankan serangkaian proses `pdflatex` -> `bibtex` -> `pdflatex` 2x agar halaman daftar isi dan daftar pustaka Anda rata dan sempurna. Hasilnya dapat langsung dilihat pada file `main.pdf`.

---

## Cara Mengisi Konten

1. **Mengubah Data Diri & Judul:**
   Buka file `identitas.tex` dan isikan nama, NIM, judul, nama pembimbing, dan tanggal sidang Anda.
2. **Menulis Bab:**
   Buka folder `outlines/` dan pilih bab yang ingin dikerjakan (contoh `bab1.tex`). Tulis isi di bawah *header* `\section{...}`.
3. **Mengisi Daftar Pustaka:**
   Buka Mendeley, lalu pilih "Export" dan simpan sebagai `pustaka.bib`. Gantikan file `pustaka.bib` yang ada di repositori Anda dengan file baru tersebut.
4. **Merubah Abstrak & Persembahan:**
   Terdapat di dalam folder `bagian-awal/`.

---
*Dikembangkan secara eksklusif untuk kemudahan mahasiswa Fakultas Teknik dan Informatika UBSI.*
