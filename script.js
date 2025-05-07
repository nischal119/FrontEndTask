// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    reviews: 124,
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation and 40-hour battery life.",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 399.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.7,
    reviews: 89,
    description:
      "Stay connected and track your fitness with our latest smart watch. Water-resistant and features a stunning AMOLED display.",
  },
  {
    id: 3,
    name: "Designer Backpack",
    price: 129.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.6,
    reviews: 56,
    description:
      "Stylish and functional backpack with multiple compartments. Perfect for work, travel, or everyday use.",
  },
  {
    id: 4,
    name: "Wireless Earbuds Pro",
    price: 199.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.9,
    reviews: 215,
    description:
      "True wireless earbuds with active noise cancellation and premium sound quality. Includes wireless charging case.",
  },
  {
    id: 5,
    name: "Classic Denim Jacket",
    price: 89.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    reviews: 78,
    description:
      "Timeless denim jacket with modern fit. Perfect for layering in any season.",
  },
  {
    id: 6,
    name: "Bestselling Novel",
    price: 24.99,
    category: "books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.7,
    reviews: 342,
    description:
      "Award-winning novel that has captured readers worldwide. Available in hardcover and paperback.",
  },
];

// DOM Elements
const productsContainer = document.querySelector(".products-grid");
const featuredGrid = document.querySelector(".featured-grid");
const searchInput = document.querySelector(".search-input");
const categoryFilter = document.querySelector(".category-filter");
const sortSelect = document.querySelector(".sort-select");
const gridViewBtn = document.querySelector(".grid-view");
const listViewBtn = document.querySelector(".list-view");
const themeToggle = document.getElementById("theme-toggle");

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

// View Toggle
function switchView(view) {
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

if (gridViewBtn && listViewBtn) {
  gridViewBtn.addEventListener("click", () => switchView("grid"));
  listViewBtn.addEventListener("click", () => switchView("list"));
}

// Filter and Sort Functions
function filterProducts() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const category = categoryFilter ? categoryFilter.value : "all";
  const sortBy = sortSelect ? sortSelect.value : "";

  let filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  if (sortBy) {
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  return filtered;
}

// Render Products
function renderProducts(products, container) {
  if (!container) return;

  const isListView = container.classList.contains("list-view");

  if (products.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products
    .map((product) =>
      isListView
        ? `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-rating">
            ${generateStars(product.rating)}
            <span>(${product.reviews})</span>
          </div>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
        </div>
        <div class="product-actions">
          <button onclick="addToCart(${product.id})" class="add-to-cart">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    `
        : `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-overlay">
            <button onclick="addToCart(${product.id})" class="add-to-cart">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-rating">
            ${generateStars(product.rating)}
            <span>(${product.reviews})</span>
          </div>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
        </div>
      </div>
    `
    )
    .join("");
}

// Generate Star Rating
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

// Add to Cart Animation
function addToCart(productId) {
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

// Event Listeners
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  if (productsContainer) {
    renderProducts(products, productsContainer);
  }

  if (featuredGrid) {
    renderProducts(products.slice(0, 4), featuredGrid);
  }
});

// Add notification styles
const style = document.createElement("style");
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

// Carousel Infinite & Smooth Scroll
const carouselTrack = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const slides = document.querySelectorAll(".carousel-slide");
let currentSlide = 0;

function scrollToSlide(index) {
  if (!carouselTrack || slides.length === 0) return;
  const slide = slides[index];
  if (slide) {
    slide.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }
}

function nextCarouselSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  scrollToSlide(currentSlide);
}

function prevCarouselSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  scrollToSlide(currentSlide);
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", prevCarouselSlide);
  nextBtn.addEventListener("click", nextCarouselSlide);
}

// Smooth page scroll for anchor and button clicks
function smoothScrollHandler(e) {
  const target = e.target.closest("a, button");
  if (!target) return;

  // For anchor links to sections
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

// Clear Filter Button Functionality
const clearFilterBtn = document.getElementById("clearFilterBtn");
if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "all";
    if (sortSelect) sortSelect.value = "";
    renderProducts(products, productsContainer);
  });
}
