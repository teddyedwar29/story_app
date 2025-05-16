import StoryAPI from "../../data/api";
import Swal from "sweetalert2";
import L from "leaflet";
import MapHelper from "../../utils/map";

class DetailStoryPresenter {
  #viewInstance = null;
  #leafletMap = null;

  constructor(viewInstance) {
    this.#viewInstance = viewInstance;
  }

  async getStoryDetail(storyId) {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("Token tidak tersedia");
      }

      const result = await StoryAPI.getStoryById(storyId, authToken);
      if (result.error) {
        throw new Error(result.message);
      }

      return result.story;
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Kesalahan Saat Memuat Cerita",
        text: err.message,
      });

      if (err.message === "Token tidak tersedia") {
        window.location.hash = "#/login";
      }

      throw err;
    }
  }

  initializeMap(mapContainer) {
    this.#leafletMap = MapHelper.initMap(mapContainer, false);
  }

  centerMap(lat, lng) {
    if (this.#leafletMap) {
      this.#leafletMap.setView([lat, lng], 13);
    }
  }

  placeMarker(lat, lng, popupHtml) {
    if (this.#leafletMap) {
      MapHelper.addMarker(this.#leafletMap, lat, lng, popupHtml);
    }
  }

  removeMap() {
    if (this.#leafletMap) {
      this.#leafletMap.remove();
      this.#leafletMap = null;
    }
  }
}

export default DetailStoryPresenter;
