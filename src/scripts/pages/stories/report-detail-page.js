import DetailStoryPresenter from "./report-detail-presenter";
import { showFormattedDate } from "../../utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

class DetailStoryPage {
  #presenter;
  #markerIcon;

  constructor() {
    this.#presenter = new DetailStoryPresenter(this);
    this.#markerIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  async render() {
    return `
      <a href="#main-content" class="skip-link">Lewati ke konten utama</a>
      <section class="story-detail container">
        <a href="#/stories" class="back-link">&laquo; Kembali</a>
        <div id="storyContent" class="story-detail__body">
          <div id="main-content" class="loading" tabindex="-1">Memuat detail cerita...</div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const hash = window.location.hash;
    const storyId = hash.split("/")[2];
    const container = document.getElementById("storyContent");

    try {
      const story = await this.#presenter.getStoryDetail(storyId);

      container.innerHTML = `
        <h1 id="main-content" tabindex="-1" class="story-title">${
          story.name
        }</h1>
        <p class="story-date">${showFormattedDate(story.createdAt)}</p>
        <img src="${story.photoUrl}" alt="Foto milik ${
        story.name
      }" class="story-image" />
        <p class="story-description">${story.description}</p>
        ${story.lat && story.lon ? this._renderMapSection(story) : ""}
      `;

      if (story.lat && story.lon) {
        const mapElement = document.getElementById("map");
        this.#presenter.initializeMap(mapElement);
        this.#presenter.centerMap(story.lat, story.lon);
        this.#presenter.placeMarker(
          story.lat,
          story.lon,
          this._getPopupHTML(story)
        );
      }

      const mainContent = document.getElementById("main-content");
      if (mainContent && window.location.hash.includes("#main-content")) {
        mainContent.focus();
      }
    } catch (err) {
      container.innerHTML = `
        <div id="main-content" class="error-message" tabindex="-1">
          Tidak dapat menampilkan cerita. ${err.message}
        </div>
      `;
    }
  }

  _renderMapSection(story) {
    return `
      <div class="map-section">
        <h2>Lokasi Cerita</h2>
        <div class="coordinates">
          <i class="fas fa-map-marker-alt"></i>
          Latitude: <span>${story.lat.toFixed(6)}</span>,
          Longitude: <span>${story.lon.toFixed(6)}</span>
        </div>
        <div id="map" class="story-map"></div>
      </div>
    `;
  }

  _getPopupHTML(story) {
    return `
      <div class="popup-info">
        <h3>${story.name}</h3>
        <img src="${story.photoUrl}" alt="Foto ${
      story.name
    }" style="max-width: 200px;" />
        <p>${story.description}</p>
        <p><strong>Koordinat:</strong><br>Lat: ${story.lat.toFixed(
          6
        )}<br>Lng: ${story.lon.toFixed(6)}</p>
      </div>
    `;
  }

  async destroy() {
    if (this.#presenter && typeof this.#presenter.removeMap === "function") {
      this.#presenter.removeMap();
    } else {
      console.warn("removeMap method is not defined.");
    }
  }
}

export default DetailStoryPage;
