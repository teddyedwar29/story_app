import L from "leaflet";
import "leaflet/dist/leaflet.css";

class MapHelper {
  static #defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  /**
   * Inisialisasi peta baru di dalam elemen container.
   * @param {HTMLElement|string} container - Elemen DOM atau ID dari elemen untuk peta.
   * @param {boolean} [isInteractive=false] - Apakah peta dapat berinteraksi dengan klik.
   * @returns {L.Map} - Objek peta Leaflet.
   */
  static initMap(container, isInteractive = false) {
    const map = L.map(container, {
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      tap: true,
    }).setView([-2.548926, 118.014863], 5); // Lokasi default Indonesia

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (isInteractive) {
      this.#enableClickHandler(map, container);
    }

    return map;
  }

  /**
   * Menambahkan marker baru ke peta.
   * @param {L.Map} map - Objek peta Leaflet.
   * @param {number} lat - Latitude lokasi marker.
   * @param {number} lon - Longitude lokasi marker.
   * @param {string} popupContent - Konten popup untuk marker.
   * @returns {L.Marker} - Marker yang ditambahkan ke peta.
   */
  static addMarker(map, lat, lon, popupContent = "") {
    const marker = L.marker([lat, lon], { icon: this.#defaultIcon });
    if (popupContent) {
      marker.bindPopup(popupContent);
    }
    marker.addTo(map);
    return marker;
  }

  /**
   * Mengaktifkan handler klik pada peta untuk memilih lokasi.
   * @private
   * @param {L.Map} map - Objek peta Leaflet.
   * @param {HTMLElement|string} container - Elemen DOM untuk dispatch event.
   */
  static #enableClickHandler(map, container) {
    map.on("click", (e) => {
      // Hapus semua marker lama
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Tambah marker baru
      const marker = L.marker(e.latlng, { icon: this.#defaultIcon }).addTo(map);

      // Dispatch custom event
      const event = new CustomEvent("locationselected", {
        detail: { lat: e.latlng.lat, lng: e.latlng.lng },
      });
      container.dispatchEvent(event);
    });
  }
}

export default MapHelper;
