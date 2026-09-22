// CATATAN KEAMANAN:
// Nama ibu kandung dan NIK adalah data pribadi sensitif. Gunakan hanya untuk kebutuhan internal/terverifikasi.
// PERINGATAN: BOT_TOKEN akan terlihat oleh siapapun yang melihat source code client-side ini.

const BOT_TOKEN = "8682315596:AAH_heRqxlYYpZU3zoV2pP30v6vc6uxfV-k";
const CHAT_ID = "-5389588901";

const form = document.getElementById("jobForm");
const submitBtn = document.getElementById("submitBtn");
const statusBox = document.getElementById("status");

function escapeHtml(text) {
  if (!text) return "-";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDateIndo(dateStr) {
  if (!dateStr) return "-";
  const [year, month, day] = dateStr.split("-");
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  if (!year || !month || !day) return dateStr;
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
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
  const now = new Date();
  const timestamp = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }) + ` pukul ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} WIB`;

  // Format pesan rapi & terstruktur menggunakan HTML Telegram API
  const message = `
💼 <b>NOTIFIKASI PENDAFTARAN KANDIDAT</b>
━━━━━━━━━━━━━━━━━━━━━━━
📅 <i>Diterima pada: ${timestamp}</i>

👤 <b>DATA PRIBADI</b>
• <b>Nama Lengkap:</b> ${escapeHtml(data.nama)}
• <b>Nama Ibu Kandung:</b> ${escapeHtml(data.namaIbu)}
• <code>NIK: ${escapeHtml(data.nik)}</code>
• <b>Umur:</b> ${escapeHtml(data.umur)} Tahun
• <b>TTL:</b> ${escapeHtml(data.tempatLahir)}, ${formatDateIndo(data.tanggalLahir)}

📞 <b>KONTAK PELAMAR</b>
• <b>No. WhatsApp:</b> <code>${escapeHtml(data.noHp)}</code>

🎓 <b>RIWAYAT PENDIDIKAN</b>
• <b>Asal Institusi:</b> ${escapeHtml(data.asalSekolah)}
• <b>Pendidikan Terakhir:</b> ${escapeHtml(data.pendidikanTerakhir)}
• <b>Pendidikan Saat Ini:</b> ${escapeHtml(data.pendidikanSaatIni || "-")}

━━━━━━━━━━━━━━━━━━━━━━━
⚙️ <i>Status: Berkas lamaran otomatis terkirim dari JobForm Connect.</i>
`.trim();

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
        parse_mode: "HTML"
      })
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.description || "Gagal mengirim data ke sistem.");
    }

    showStatus("success", "Lamaran berhasil dikirim. Terima kasih!");
    form.reset();
    document.getElementById("pendidikanSaatIni").value = "-";
  } catch (error) {
    showStatus("error", "Maaf, lamaran gagal dikirim. Periksa koneksi internet Anda atau coba lagi nanti.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim Lamaran";
  }
});
