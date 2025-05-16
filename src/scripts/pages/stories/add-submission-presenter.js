import StoryAPI from "../../data/api";
import Swal from "sweetalert2";

class AddStoryPresenter {
  #view = null;
  #stream = null;
  #selectedLocation = null;

  constructor(view) {
    this.#view = view;
  }

  async addStory(description, photo) {
    try {
      if (!this._validateAllFields(description, photo)) return;

      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("Token tidak ditemukan, silakan login kembali.");

      if (!(photo instanceof File)) throw new Error("Format foto tidak valid.");

      const data = {
        description,
        photo,
        ...(this.#selectedLocation && {
          lat: this.#selectedLocation.lat,
          lon: this.#selectedLocation.lng,
        }),
      };

      const response = await StoryAPI.addStory(data, token);
      if (response.error) throw new Error(response.message);

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Cerita berhasil ditambahkan!",
        timer: 1500,
        showConfirmButton: false,
      });

      window.location.hash = "#/stories";
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Gagal Menambahkan Cerita",
        text: error.message,
      });

      if (error.message.includes("Token")) {
        window.location.hash = "#/login";
      }
    }
  }

  _validateAllFields(description, photo) {
    const missingFields = [];

    if (!description || description.trim().length === 0)
      missingFields.push("deskripsi");
    if (!photo) {
      missingFields.push("foto");
    } else if (!(photo instanceof File)) {
      missingFields.push("foto (format tidak valid)");
    }
    if (!this.#selectedLocation) missingFields.push("lokasi");

    if (missingFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Data Belum Lengkap",
        text: `Mohon lengkapi: ${missingFields.join(", ")}`,
      });
      return false;
    }
    return true;
  }

  async startCamera() {
    try {
      await this.stopCamera();
      this.#stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      return this.#stream;
    } catch (error) {
      throw new Error("Tidak dapat mengakses kamera.");
    }
  }

  async stopCamera() {
    if (this.#stream) {
      this.#stream.getTracks().forEach((track) => track.stop());
      this.#stream = null;
    }
  }

  validateImage(file) {
    if (!(file instanceof File)) throw new Error("File tidak valid.");
    if (!file.type.startsWith("image/"))
      throw new Error("File harus berupa gambar.");
    if (file.size > 1024 * 1024)
      throw new Error("Ukuran file tidak boleh lebih dari 1MB.");
    return true;
  }

  setSelectedLocation(location) {
    this.#selectedLocation = location;
  }

  getSelectedLocation() {
    return this.#selectedLocation;
  }
}

export default AddStoryPresenter;
