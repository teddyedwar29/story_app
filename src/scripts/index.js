// CSS Imports
import "../styles/styles.css";

// Page Imports
import App from "./pages/app";
import Navbar from "./components/navbar";


// Utility Imports
import SkipToContentInitiator from "./utils/skip-to-content-initiator";

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize Skip to Content feature
  SkipToContentInitiator.init({
    skipLinkId: "skip-to-content",
    mainContentId: "main-content", // Ensure your main content has this ID
  });

  // Create App instance
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  // Initialize Navbar
  Navbar.init();


  // Render the initial page
  await app.renderPage();

  // Listen for hash changes and render the new page
  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
