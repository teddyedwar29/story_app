import StoryAPI from "../../../data/api";
import Swal from "sweetalert2";

class RegisterPresenter {
  #view = null;

  constructor(view) {
    this.#view = view;
  }

  async register(formData) {
    try {
      const user = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const result = await StoryAPI.register(user);

      if (result.error) {
        throw new Error(result.message);
      }

      // Tampilkan pesan sukses
      await Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil",
        text: "Silakan masuk menggunakan akun Anda",
        timer: 1500,
        showConfirmButton: false,
      });

      // Arahkan ke halaman login
      window.location.hash = "#/login";
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Pendaftaran Gagal",
        text: err.message,
      });
    }
  }
}

export default RegisterPresenter;
