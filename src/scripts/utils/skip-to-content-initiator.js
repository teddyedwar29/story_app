/**
 * Modul SkipToContentInitiator
 * Menyediakan fitur "Skip to Content" yang mendukung aksesibilitas pengguna keyboard dan pembaca layar.
 * Cocok untuk aplikasi SPA agar pengguna dapat langsung fokus ke konten utama.
 */
const SkipToContentInitiator = {
  /**
   * Inisialisasi komponen dengan konfigurasi opsional.
   * @param {Object} config - Konfigurasi inisialisasi.
   * @param {string} config.skipLinkId - ID untuk elemen skip link.
   * @param {string} config.mainContentId - ID dari elemen konten utama.
   */
  init({
    skipLinkId = "skip-to-content",
    mainContentId = "main-content",
  } = {}) {
    this._injectSkipLink(skipLinkId, mainContentId);
    this._injectStyles();
    this._bindEvent(skipLinkId, mainContentId);
  },

  /**
   * Menambahkan elemen skip link ke halaman jika belum ada.
   * @param {string} skipLinkId - ID dari link.
   * @param {string} mainContentId - ID dari konten utama.
   */
  _injectSkipLink(skipLinkId, mainContentId) {
    if (document.getElementById(skipLinkId)) return;

    const link = document.createElement("a");
    link.id = skipLinkId;
    link.href = `#${mainContentId}`;
    link.textContent = "Skip to content";
    link.className = "skip-to-content";
    link.setAttribute("aria-label", "Langsung ke konten utama");

    document.body.insertBefore(link, document.body.firstChild);
  },

  /**
   * Menambahkan gaya untuk memastikan skip link tampil saat fokus.
   */
  _injectStyles() {
    if (document.getElementById("skip-to-content-style")) return;

    const style = document.createElement("style");
    style.id = "skip-to-content-style";
    style.textContent = `
      .skip-to-content {
        position: absolute;
        top: -40px;
        left: 0;
        background-color: #1e90ff;
        color: #fff;
        padding: 10px 16px;
        text-decoration: none;
        z-index: 10000;
        font-weight: 600;
        border-radius: 0 0 6px 0;
        transition: top 0.3s ease;
      }

      .skip-to-content:focus,
      .skip-to-content:focus-visible {
        top: 0;
        outline: 3px solid #ffdd57;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  },

  /**
   * Menambahkan event listener untuk memfokuskan elemen utama saat skip link diklik.
   * @param {string} skipLinkId - ID link.
   * @param {string} mainContentId - ID konten utama.
   */
  _bindEvent(skipLinkId, mainContentId) {
    document.addEventListener("click", (e) => {
      if (e.target.id === skipLinkId) {
        e.preventDefault();
        const mainEl = document.getElementById(mainContentId);
        if (mainEl) {
          if (!mainEl.hasAttribute("tabindex")) {
            mainEl.setAttribute("tabindex", "-1");
          }
          mainEl.focus({ preventScroll: false });
          mainEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    this._observeContentChange(mainContentId);
  },

  /**
   * Memastikan atribut tabindex tetap ada saat konten utama berubah (SPA).
   * @param {string} mainContentId - ID elemen konten utama.
   */
  _observeContentChange(mainContentId) {
    const observer = new MutationObserver(() => {
      const content = document.getElementById(mainContentId);
      if (content && !content.hasAttribute("tabindex")) {
        content.setAttribute("tabindex", "-1");
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
};

export default SkipToContentInitiator;
