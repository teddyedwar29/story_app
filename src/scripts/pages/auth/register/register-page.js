import RegisterPresenter from "./register-presenter";

class RegisterPage {
  #presenter = null;

  constructor() {
    this.#presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
      <section class="auth container" id="mainContent">
        <h1 class="auth__title">Buat Akun</h1>
        
        <form id="registerForm" class="auth__form">
          <div class="form-group">
            <label for="name">
             Username
            </label>
            <input type="text" id="name" name="name" required>
          </div>

          <div class="form-group">
            <label for="email">
              Email
            </label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="form-group">
            <label for="password">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minlength="8"
              pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
              title="Kata sandi minimal 8 karakter, harus mengandung huruf dan angka"
            >
            <small class="form-help">
              <i class="fas fa-info-circle"></i> Sandi minimal 8 karakter dengan huruf dan angka
            </small>
          </div>

          <button type="submit" class="submit-button">
            Daftar Akun
          </button>

          <p class="auth__link">
           Sudah Mendaftar? <a href="#/login">Login disini</a>
          </p>
        </form>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      await this.#presenter.register(formData);
    });
  }
}

export default RegisterPage;
