import StoriesPresenter from "./stories-presenter";
import { showFormattedDate } from "../../utils";
import MapHelper from "../../utils/map";

class StoryListPage {
  #controller = null;
  #leaflet = null;
  #activeMarkers = [];

  constructor() {
    this.#controller = new StoriesPresenter(this);
  }

  async render() {
    return `
      <section id="mainContent" class="stories container" tabindex="-1">
        <h1 class="stories__title">Lihat Cerita</h1>
        
        <div id="stories" class="stories__list"></div>
        
        <div class="stories__pagination">
          <button id="prevPage" class="pagination-button"><i class="fas fa-chevron-left"></i> Sebelumnya</button>
          <span id="pageInfo" class="pagination-info">Halaman 1</span>
          <button id="nextPage" class="pagination-button">Selanjutnya <i class="fas fa-chevron-right"></i></button>
        </div>
        
        <div id="map" class="stories__map"></div>
        

      </section>
    `;
  }

  async afterRender() {
    const storyListElement = document.querySelector("#stories");
    const mapElement = document.querySelector("#map");
    const prevBtn = document.querySelector("#prevPage");
    const nextBtn = document.querySelector("#nextPage");
    const pageStatus = document.querySelector("#pageInfo");

    this.#leaflet = MapHelper.initMap(mapElement, false);

    const displayStories = async (pageNum) => {
      try {
        const result = await this.#controller.loadStories(pageNum);
        if (!result) return;

        const { stories, hasMore, currentPage } = result;
        storyListElement.innerHTML = "";

        // Bersihkan marker sebelumnya
        this.#activeMarkers.forEach((marker) => marker.remove());
        this.#activeMarkers = [];

        // Tampilkan setiap cerita & marker jika ada koordinat
        stories.forEach((item) => {
          storyListElement.innerHTML += this._generateStoryCard(item);

          if (item.lat && item.lon) {
            const marker = MapHelper.addMarker(
              this.#leaflet,
              item.lat,
              item.lon,
              this._generatePopupContent(item)
            );
            this.#activeMarkers.push(marker);
          }
        });

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = !hasMore;
        pageStatus.textContent = `Halaman ${currentPage}`;
      } catch (err) {
        console.error(err);
        storyListElement.innerHTML = `<div class="error-message">Tidak dapat memuat cerita</div>`;
      }
    };

    // Load halaman awal
    await displayStories(1);

    // Event pagination
    prevBtn.addEventListener("click", async () => {
      const current = this.#controller.getCurrentPage();
      if (current > 1) await displayStories(current - 1);
    });

    nextBtn.addEventListener("click", async () => {
      const current = this.#controller.getCurrentPage();
      await displayStories(current + 1);
    });

    // Skip to content focus management
    const mainEl = document.getElementById("mainContent");
    if (mainEl && window.location.hash === "#mainContent") {
      mainEl.focus();
    }
  }

  _generateStoryCard(item) {
    return `
      <article class="story-item">
        <img src="${item.photoUrl}" alt="Foto dari ${
      item.name
    }" class="story-item__image">
        <div class="story-item__content">
          <h2 class="story-item__title">${item.name}</h2>
          <p class="story-item__description">${item.description}</p>
          <p class="story-item__date"><i class="far fa-calendar-alt"></i> ${showFormattedDate(
            item.createdAt
          )}</p>
          <a href="#/stories/${item.id}" class="read-more-button">
            Selengkapnya <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  }

  _generatePopupContent(item) {
    return `
      <div class="popup-content">
        <h3>${item.name}</h3>
        <img src="${item.photoUrl}" alt="Foto dari ${item.name}" style="max-width: 200px;">
        <p>${item.description}</p>
      </div>
    `;
  }

  async destroy() {
    if (this.#leaflet) {
      this.#leaflet.remove();
      this.#leaflet = null;
    }
  }
}

export default StoryListPage;
