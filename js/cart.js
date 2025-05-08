export function addToCart(productId) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>Added to cart!</span>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2000);
}

// Inject notification styles if not present
export function injectNotificationStyles() {
  if (document.getElementById("notification-style")) return;
  const style = document.createElement("style");
  style.id = "notification-style";
  style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-color);
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(120%);
        opacity: 0;
        transition: all 0.3s ease-out;
        z-index: 1000;
        box-shadow: 0 4px 15px var(--shadow-color);
    }
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    .notification i {
        color: var(--primary-color);
    }
  `;
  document.head.appendChild(style);
}
