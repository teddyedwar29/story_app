export default class HomePage {
  // Fungsi untuk merender tampilan utama halaman
  async render() {
    return `
      <!-- Link untuk melewati konten utama dan langsung menuju cerita -->
      <div class="skip-link">
        <a href="#/stories" class="skip-to-content">Langsung ke bagian cerita</a>
      </div>

      <!-- Bagian utama konten halaman -->
      <section id="mainContent" class="container">
        <div class="home-content">
          <!-- Judul utama halaman -->
          <h1 class="home-title">Selamat Datang</h1>

          <!-- Call-to-action (CTA) untuk navigasi lebih lanjut -->
          <div class="cta-container">
            <!-- Tombol untuk mengakses daftar cerita yang tersedia -->
            <a href="#/stories" class="cta-button">
              <i class="fas fa-book"></i> Jelajahi Cerita
            </a>
            <!-- Tombol untuk menambahkan cerita baru -->
            <a href="#/stories/add" class="cta-button cta-button--primary">
              <i class="fas fa-plus"></i> Buat Cerita Baru
            </a>
          </div>
        </div>
      </section>
    `;
  }

  // Fungsi ini bisa digunakan untuk logika tambahan setelah halaman dirender
  async afterRender() {
    // Implementasikan logika lain jika diperlukan setelah halaman dirender
  }
}
