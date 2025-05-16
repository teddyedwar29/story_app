import auth from "../utils/middleware";

class Navbar {
  static init() {
    // Memperbarui tampilan navigasi saat halaman dimuat atau hash berubah
    this._updateNavigation();

    // Menambahkan event listener untuk memperbarui navigasi ketika URL berubah
    window.addEventListener("hashchange", () => {
      this._updateNavigation();
    });
  }

  static _updateNavigation() {
    const navList = document.getElementById("nav-list"); // Menentukan elemen nav-list
    const isLoggedIn = auth.checkLoggedIn(); // Mengecek apakah pengguna sudah login

    // Menyusun elemen navigasi berdasarkan status login
    navList.innerHTML = `
      <ul class="nav-list">
      ${
        isLoggedIn
          ? `
        <!-- Navigasi untuk pengguna yang sudah login -->
        <li><a href="#/stories"><i class="fas fa-book"></i> Cerita</a></li>
        <li><a href="#/stories/add"><i class="fas fa-plus"></i> Tambah Cerita</a></li>
        <li><a href="#/about"><i class="fas fa-info-circle"></i> Tentang</a></li>
        <li><a href="#" id="logoutButton"><i class="fas fa-sign-out-alt"></i> Keluar</a></li>
      `
          : `
        <!-- Navigasi untuk pengguna yang belum login -->
        <li><a href="#/login">Login</a></li>
        <li><a href="#/register">Register</a></li>
        <li><a href="#/about">Tentang</a></li>
      `
      }
      </ul>
    `;

    // Menambahkan event listener untuk tombol logout jika pengguna sudah login
    if (isLoggedIn) {
      const logoutButton = document.getElementById("logoutButton");
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault(); 
        localStorage.removeItem("token"); // Menghapus token dari localStorage
        window.location.hash = "#/login"; // Mengarahkan pengguna ke halaman login
      });
    }
  }
}

export default Navbar;
