# Architecture Decision Record (ADR)

## 1. Document Class
- **Decision**: Menggunakan class `report` atau custom class `.cls` khusus UBSI jika banyak customisasi yang diperlukan. Saat ini dimulai dengan class `report`.
- **Rationale**: Class `report` paling cocok untuk dokumen dengan bab (`\chapter`), cocok untuk skripsi/magang.

## 2. Compiler Engine
- **Decision**: XeLaTeX.
- **Rationale**: Mendukung penggunaan font TrueType/OpenType secara native (seperti Times New Roman), yang seringkali merupakan kewajiban dari kampus di Indonesia.

## 3. Modular File Structure
- **Decision**: Memisahkan setiap bab dan bagian (abstrak, cover) ke dalam file `.tex` terpisah yang kemudian di-include.
- **Rationale**: Menghindari satu file `main.tex` yang terlalu besar, memudahkan navigasi, serta meminimalkan conflict saat menggunakan version control.

## 4. Bibliography Management
- **Decision**: Menggunakan `biber` dan `biblatex` (atau package lain sesuai panduan).
- **Rationale**: Standard industri modern di ekosistem LaTeX.

## Assumptions to Validate
- Apakah UBSI mensyaratkan format sitasi APA, IEEE, atau Harvard?
- **Next Validation Action**: Verifikasi format sitasi (Daftar Pustaka) yang diminta oleh pedoman UBSI.
