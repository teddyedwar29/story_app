export default class AboutPage {
  async render() {
    return `
      <section id="mainContent" class="about container">
        <div class="about-content" role="main">
          
          <h1 class="about-title">
            Tentang
          </h1>

          <div class="about-description">
            <p>
              APP Story adalah aplikasi dimana kita bisa post berbagi cerita kesiapapun dari seluruh dunia.
            </p>
          </div>

          <div class="about-features">
            <ul>
              <li>
                <i class="fas fa-book-open" aria-hidden="true"></i>
                <div>
                  <h3>Berbagi Cerita</h3>
                </div>
              </li>
              <li>
                <i class="fas fa-camera" aria-hidden="true"></i>
                <div>
                  <h3>Upload Gambar</h3>
                </div>
              </li>
              <li>
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <h3>Cek Lokasi</h3>
                </div>
              </li>

            </ul>
          </div>

          <div class="about-credits">
            <h2>Dibuat Oleh</h2>
            <p>
              <i class="fas fa-user" aria-hidden="true"></i>
              Teddy Edwar
            </p>
          </div>

        </div>
      </section>
    `;
  }

  async afterRender() {
    // Tambahkan logika setelah render di sini jika diperlukan
  }
}
