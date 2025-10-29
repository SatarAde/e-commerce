const products = [
  { id: 1, name: "Wireless Headphones", price: 59.99, image: "wirelessheadphone.webp" },
  { id: 2, name: "Smart Watch", price: 129.99, image: "smartwatch.webp" },
  { id: 3, name: "Bluetooth Speaker", price: 39.99, image: "bluetoothspeaker.webp" },
  { id: 4, name: "Laptop Stand", price: 79.99, image: "laptopstand.webp" },
  { id: 5, name: "Wireless Mouse", price: 9.99, image: "wirelessmouse.webp" },
  { id: 6, name: "Wireless Keyboard", price: 99.99, image: "wirelesskeyboard.webp" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render featured products
function renderFeatured() {
  const container = document.getElementById("featured-products");
  if (!container) return;
  const featured = products.slice(0, 3);
  featured.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Render all products
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  cart.push(product);
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Render cart items
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      container.appendChild(div);
    });
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalElem = document.getElementById("cart-total");
  if (totalElem) totalElem.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function clearCart() {
  cart = [];
  updateCartCount();
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("checkout-message").textContent = "✅ Thank you for your purchase!";
  clearCart();
}

// Event listeners
window.onload = () => {
  updateCartCount();
  renderFeatured();
  renderProducts();
  renderCart();

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) clearBtn.addEventListener("click", clearCart);

  const checkoutBtn = document.getElementById("checkout");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
};
