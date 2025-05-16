import LoginPresenter from "./login-presenter";

class LoginPage {
  #presenter = null;

  constructor() {
    this.#presenter = new LoginPresenter(this);
  }

  async render() {
    return `
      <section class="auth" id="mainContent">
        <h1 class="auth__title">Masuk</h1>
       
        <form class="auth__form" id="loginForm">
          <div class="form-group">
            <label for="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autocomplete="email"
            >
          </div>

          <div class="form-group">
            <label for="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autocomplete="current-password"
            >
          </div>

          <div class="spinner"></div>
         
          <button type="submit" class="submit-button">
          Login
          </button>
        </form>

        <p class="auth__link">
          Belum memiliki akun? <a href="#/register">Daftar di sini</a>
        </p>
      </section>
    `;
  }

  async afterRender() {
    const loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      loginForm.classList.add("loading");

      const data = new FormData(loginForm);
      await this.#presenter.login(data);

      loginForm.classList.remove("loading");
    });
  }
}

export default LoginPage;
