document.addEventListener('DOMContentLoaded', () => {
  // Create or find cart count badge in navbar
  const cartLink = document.querySelector('a[href="cart.html"]');
  let cartCountElem = document.getElementById('cart-count');

  if (!cartCountElem) {
    cartCountElem = document.createElement('span');
    cartCountElem.id = 'cart-count';
    cartCountElem.className = 'badge bg-light text-dark ms-1';
    cartLink.appendChild(cartCountElem);
  }

  // Function to update cart count badge
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCountElem.textContent = cart.length;
  }

  updateCartCount();

  // Handle Add to Cart button clicks
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        title: button.dataset.title,
        price: button.dataset.price,
        image: button.dataset.image
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if product already exists in cart (by title), increment qty if yes
      const existingProductIndex = cart.findIndex(item => item.title === product.title);
      if (existingProductIndex > -1) {
        // If you want to handle quantity, you can add qty property
        if (cart[existingProductIndex].qty) {
          cart[existingProductIndex].qty += 1;
        } else {
          cart[existingProductIndex].qty = 2; // first duplicate
        }
      } else {
        product.qty = 1;
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();

      alert(`${product.title} added to cart!`);
    });
  });
});

