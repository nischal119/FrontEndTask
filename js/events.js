import { products } from "./data.js";
import {
  productsContainer,
  featuredGrid,
  searchInput,
  categoryFilter,
  sortSelect,
  clearFilterBtn,
} from "./dom.js";
import { initThemeToggle } from "./theme.js";
import { initViewToggle } from "./view-toggle.js";
import { filterProducts } from "./filter.js";
import { renderProducts } from "./render.js";
import { debounce } from "./utils.js";
import { addToCart, injectNotificationStyles } from "./cart.js";
import { initSmoothScroll } from "./smooth-scroll.js";

window.addToCart = addToCart;

function initFilterEvents() {
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(() => {
        renderProducts(filterProducts(), productsContainer);
      }, 300)
    );
  }
  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      renderProducts(filterProducts(), productsContainer);
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      renderProducts(filterProducts(), productsContainer);
    });
  }
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (sortSelect) sortSelect.value = "";
      renderProducts(products, productsContainer);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectNotificationStyles();
  initThemeToggle();
  initViewToggle();
  initFilterEvents();
  initSmoothScroll();
  if (productsContainer) {
    renderProducts(products, productsContainer);
  }
  if (featuredGrid) {
    renderProducts(products.slice(0, 4), featuredGrid);
  }
});
