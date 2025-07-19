
  // Initialize cart
  let cart = [];

  // Add to cart button click
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = parseInt(this.dataset.price);
      const image = this.dataset.image;

      // Get the quantity input near this button
      const quantityInput = this.parentElement.querySelector(".qty-input");
      const quantity = parseInt(quantityInput.value);

      // Check if item already exists in cart
      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ id, name, price, image, quantity });
      }

      updateCartCount();
      updateCartDropdown();
    });
  });

  // Quantity increase/decrease buttons
  document.querySelectorAll(".increase-qty").forEach(button => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector(".qty-input");
      input.value = parseInt(input.value) + 1;
    });
  });

  document.querySelectorAll(".decrease-qty").forEach(button => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector(".qty-input");
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });

  // Clear cart button
  document.getElementById("clear-cart-btn").addEventListener("click", () => {
    cart = [];
    updateCartCount();
    updateCartDropdown();
  });

  // Function to update the cart count badge
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
  }

  // Function to update cart dropdown items
  function updateCartDropdown() {
    const container = document.getElementById("cart-dropdown-items");
    container.innerHTML = ""; // Clear previous items

    if (cart.length === 0) {
      container.innerHTML = "<p class='text-center'>Your cart is empty</p>";
      return;
    }

    cart.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.className = "d-flex align-items-center mb-2";
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover;">
        <div class="ms-2 flex-grow-1">
          <div>${item.name}</div>
          <small>₦${item.price.toLocaleString()} × ${item.quantity}</small>
        </div>
        <div class="fw-bold">₦${(item.price * item.quantity).toLocaleString()}</div>
      `;
      container.appendChild(itemElement);
    });
  }

  // Initialize display
  updateCartCount();
  updateCartDropdown();

