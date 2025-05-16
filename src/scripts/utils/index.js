/**
 * Memformat tanggal menjadi string yang lebih terbaca.
 * @param {string|Date} date - Tanggal yang akan diformat.
 * @param {string} [locale="en-US"] - Lokalisasi bahasa (default: "en-US").
 * @param {Object} [options={}] - Opsi tambahan untuk format tanggal.
 * @returns {string} - Tanggal yang sudah diformat.
 */
export function showFormattedDate(date, locale = "en-US", options = {}) {
  if (!date) {
    throw new Error("Tanggal tidak boleh kosong.");
  }

  const parsedDate = date instanceof Date ? date : new Date(date);

  return parsedDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

/**
 * Menunda eksekusi kode selama waktu tertentu.
 * @param {number} [time=1000] - Waktu dalam milidetik.
 * @returns {Promise<void>} - Promise yang selesai setelah waktu tertentu.
 */
export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
