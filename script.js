// CATATAN KEAMANAN:
// Nama ibu kandung dan NIK adalah data pribadi sensitif. Jangan kumpulkan data ini jika tidak benar-benar diperlukan.
// Jangan meminta data sensitif lain seperti nomor rekening, PIN, OTP, password, atau informasi finansial dalam form ini.
// PERINGATAN: BOT_TOKEN akan terlihat oleh siapapun yang melihat source code halaman client-side ini.
// Disarankan hanya untuk penggunaan internal/skala kecil, atau gunakan backend proxy seperti Cloudflare Worker untuk skala besar.

const BOT_TOKEN = "8682315596:AAH_heRqxlYYpZU3zoV2pP30v6vc6uxfV-k";
const CHAT_ID = "-5389588901";

const form = document.getElementById("jobForm");
const submitBtn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");

function escapeMarkdown(value) {
  return String(value).replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

function showStatus(type, message) {
  statusBox.className = type ? `status ${type}` : "status";
  statusBox.textContent = message;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  const message = `*📩 Lamaran Baru — JobForm Connect*\n\n` +
    `👤 *Nama Lengkap:* ${escapeMarkdown(data.nama)}\n` +
    `👩 *Nama Ibu Kandung:* ${escapeMarkdown(data.namaIbu)}\n` +
    `🪪 *NIK:* ${escapeMarkdown(data.nik)}\n` +
    `🎂 *Umur:* ${escapeMarkdown(data.umur)} tahun\n` +
    `📅 *Tanggal Lahir:* ${escapeMarkdown(data.tanggalLahir)}\n` +
    `📍 *Tempat Lahir:* ${escapeMarkdown(data.tempatLahir)}\n` +
    `🏫 *Asal Sekolah:* ${escapeMarkdown(data.asalSekolah)}\n` +
    `📱 *No HP/WhatsApp:* ${escapeMarkdown(data.noHp)}\n` +
    `🎓 *Pendidikan Terakhir:* ${escapeMarkdown(data.pendidikanTerakhir)}\n` +
    `📚 *Pendidikan Saat Ini:* ${escapeMarkdown(data.pendidikanSaatIni)}`;

  submitBtn.disabled = true;
  submitBtn.textContent = "Mengirim...";
  showStatus("", "");

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.description || "Gagal mengirim data ke Telegram.");
    }

    showStatus("success", "Lamaran berhasil dikirim. Terima kasih!");
    form.reset();
    document.getElementById("pendidikanSaatIni").value = "-";
  } catch (error) {
    showStatus("error", "Maaf, lamaran gagal dikirim. Periksa BOT_TOKEN/CHAT_ID atau koneksi internet Anda.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim Lamaran";
  }
});
