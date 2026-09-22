# JobForm Connect

Portal form lamaran kerja online dengan desain modern, minimalis, dan profesional. Data lamaran dikirim langsung ke Telegram.

## 🎯 Fitur

- ✅ Form lamaran kerja lengkap dengan validasi
- ✅ Integrasi dengan Telegram Bot API
- ✅ Desain responsive (mobile-friendly)
- ✅ Tampilan profesional dengan tema biru-putih
- ✅ Validasi input otomatis sebelum submit

## 📋 Field yang Tersedia

- Nama Lengkap
- Nama Ibu Kandung
- NIK (16 digit)
- Umur
- Tanggal Lahir
- Tempat Lahir
- Asal Sekolah
- No HP/WhatsApp
- Pendidikan Terakhir (SMP/SMA/D3/S1/S2/S3)
- Pendidikan Saat Ini

## 🚀 Cara Menggunakan

1. Clone repository ini:
   ```bash
   git clone https://github.com/USERNAME/jobform-connect.git
   cd jobform-connect
   ```

2. Buat bot Telegram dan dapatkan `BOT_TOKEN`:
   - Buka [@BotFather](https://t.me/BotFather) di Telegram
   - Kirim `/newbot` dan ikuti instruksi
   - Salin token yang diberikan

3. Dapatkan `CHAT_ID`:
   - Buka bot Anda dan kirim pesan apapun
   - Buka `https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates`
   - Cari `"chat":{"id":` untuk mendapatkan chat ID

4. Edit file `script.js` dan isi konfigurasi:
   ```javascript
   const BOT_TOKEN = "ISI_BOT_TOKEN_ANDA";
   const CHAT_ID = "ISI_CHAT_ID_ANDA";
   ```

5. Buka `index.html` di browser

## ⚠️ Catatan Keamanan

- **BOT_TOKEN terlihat di source code** karena aplikasi ini berjalan di client-side
- Hanya gunakan untuk **penggunaan internal/skala kecil**
- Untuk produksi/skala besar, gunakan **backend proxy** (contoh: Cloudflare Worker) agar token tidak terekspos
- **NIK dan Nama Ibu Kandung** adalah data sensitif, gunakan hanya jika diperlukan
- Jangan meminta data seperti nomor rekening, PIN, OTP, atau password

## 🛠️ Teknologi

- HTML5
- CSS3 (dengan custom properties)
- Vanilla JavaScript
- Telegram Bot API

## 📁 Struktur File

```
jobform-connect/
├── index.html      # Struktur HTML form
├── style.css       # Styling dan desain
├── script.js       # Logika JavaScript & integrasi Telegram
└── README.md       # Dokumentasi
```

## 📄 Lisensi

MIT License - Bebas digunakan untuk keperluan pribadi atau komersial.

## 🤝 Kontribusi

Pull request dan saran perbaikan sangat diterima!

---

Dibuat dengan ❤️ untuk memudahkan proses rekrutmen
