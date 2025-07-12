// Global variables
let selectedTable = null;
let cart = [];
let cartTotal = 0;

// Hamburger menu functionality
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.querySelector('.hamburger');
  
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

function closeMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.querySelector('.hamburger');
  
  navMenu.classList.remove('active');
  hamburger.classList.remove('active');
}

// Table selection
function selectTable(tableNumber) {
  selectedTable = tableNumber;
  
  // Update visual selection
  document.querySelectorAll('.table-item').forEach(item => {
    item.classList.remove('selected');
  });
  event.target.classList.add('selected');
  
  // Show table info in menu
  document.getElementById('tableInfo').classList.remove('hidden');
  document.getElementById('currentTableNumber').textContent = tableNumber;
  
  alert(`Table ${tableNumber} selected! You can now add items to your cart.`);
  
  // Scroll to menu
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// Cart functionality
function addToCart(itemName, price) {
  if (!selectedTable) {
    alert('Please select a table first!');
    document.getElementById('tables').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.name === itemName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: itemName,
      price: price,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  alert(`${itemName} added to cart!`);
}

function updateCartDisplay() {
  const cartBadge = document.getElementById('cartBadge');
  const cartItems = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  
  // Update badge
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
  
  // Update cart items
  cartItems.innerHTML = '';
  cartTotal = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;
    
    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          $${item.price.toFixed(2)} x ${item.quantity}
        </div>
        <div>
          <button onclick="removeFromCart(${index})" style="background: #ff6b35; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Remove</button>
        </div>
      </div>
    `;
  });
  
  cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('active');
}

function closeCart() {
document.getElementById('cartSidebar').classList.remove('active');

}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const orderSummary = cart.map(item => 
    `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');
  
  alert(`Order confirmed for Table ${selectedTable}!\n\nOrder Summary:\n${orderSummary}\n\nTotal: $${cartTotal.toFixed(2)}\n\nPayment processed successfully! Your order will be served shortly.`);
  
  // Clear cart
  cart = [];
  updateCartDisplay();
  closeCart();
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.querySelector('.hamburger');
  const cartSidebar = document.getElementById('cartSidebar');
  
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
    closeMenu();
  }
  
  if (!cartSidebar.contains(event.target) && !event.target.classList.contains('cart-badge')) {
    // Don't auto-close cart to allow easier shopping
  }
});

function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  alert(`Thank you ${name}! We received your message and will get back to you at ${email} soon.`);
  
  // Reset form
  document.querySelector('.contact-form').reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add padding to body for fixed nav
  document.body.style.paddingTop = '70px';
  
  updateCartDisplay();
});

document.addEventListener('DOMContentLoaded', function () {
  document.body.style.paddingTop = '70px';
  updateCartDisplay();
});
