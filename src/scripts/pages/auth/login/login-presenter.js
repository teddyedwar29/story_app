import StoryAPI from "../../../data/api";
import Swal from "sweetalert2";

class LoginPresenter {
  #view = null;

  constructor(view) {
    this.#view = view;
  }

  async login(formData) {
    try {
      const credentials = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const result = await StoryAPI.login(credentials);

      if (result.error) {
        throw new Error(result.message);
      }

      // Simpan token ke localStorage
      localStorage.setItem("token", result.loginResult.token);

      // Tampilkan notifikasi sukses
      await Swal.fire({
        icon: "success",
        title: "Berhasil Masuk",
        text: "Mengalihkan ke halaman utama...",
        timer: 1500,
        showConfirmButton: false,
      });

      // Alihkan ke halaman utama
      window.location.hash = "#/";
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal Masuk",
        text: err.message,
      });
    }
  }
}

export default LoginPresenter;
