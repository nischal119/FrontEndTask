import { themeToggle } from "./dom.js";

export function initThemeToggle() {
  if (!themeToggle) return;
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
  });
}
