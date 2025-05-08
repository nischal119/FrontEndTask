export function initSmoothScroll() {
  function smoothScrollHandler(e) {
    const target = e.target.closest("a, button");
    if (!target) return;
    if (
      target.tagName === "A" &&
      target.getAttribute("href") &&
      target.getAttribute("href").startsWith("#")
    ) {
      const section = document.querySelector(target.getAttribute("href"));
      if (section) {
        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
  document.addEventListener("click", smoothScrollHandler, true);
}
