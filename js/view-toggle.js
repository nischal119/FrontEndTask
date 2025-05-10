import { productsContainer, gridViewBtn, listViewBtn } from "./dom.js";

function switchView(view) {
  if (!productsContainer) return;
  if (view === "grid") {
    productsContainer.classList.remove("list-view");

    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  } else {
    productsContainer.classList.add("list-view");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  }
}

export function initViewToggle() {
  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener("click", () => switchView("grid"));
    listViewBtn.addEventListener("click", () => switchView("list"));
  }
}
