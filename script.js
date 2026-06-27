// Application State
let cart = [];

// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
  });
}

function updateThemeButton(theme) {
  const toggleIcon = document.querySelector('.toggle-icon');
  const toggleText = document.querySelector('.toggle-text');
  
  if (theme === 'dark') {
    toggleIcon.textContent = '☀️';
    toggleText.textContent = 'Light';
  } else {
    toggleIcon.textContent = '🌙';
    toggleText.textContent = 'Dark';
  }
}

// Product Filtering
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      productCards.forEach((card, index) => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          // Reset animation
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// Cart Functions
function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  showNotification(`${productName} added to cart! 🎉`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Animate cart count
  cartCount.style.animation = 'none';
  cartCount.offsetHeight;
  cartCount.style.animation = 'heartBeat 0.3s ease';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">🛒 Your cart is empty</p>';
    cartTotal.textContent = '$0.00';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p style="color: var(--text-secondary);">Quantity: ${item.quantity}</p>
        </div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <button class="remove-item" onclick="removeFromCart(${index})" title="Remove item">✕</button>
      </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
}

function toggleCart() {
  const modal = document.getElementById('cartModal');
  modal.classList.toggle('show');
}

function checkout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty! 🛒');
    return;
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  showNotification(`Thank you for your purchase! Total: $${total.toFixed(2)} 🎉`);
  cart = [];
  updateCartDisplay();
  toggleCart();
}

// Wishlist Functions
function toggleWishlist(button) {
  button.classList.toggle('active');
  
  if (button.classList.contains('active')) {
    button.textContent = '♥';
    showNotification('Added to wishlist! 💝');
  } else {
    button.textContent = '♡';
    showNotification('Removed from wishlist');
  }
}

// Notification System
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideInRight 0.4s ease reverse';
    setTimeout(() => notification.remove(), 400);
  }, 2500);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('cartModal');
  if (event.target === modal) {
    toggleCart();
  }
}

// Keyboard shortcut for cart
document.addEventListener('keydown', (e) => {
  if (e.key === 'c' && e.ctrlKey) {
    e.preventDefault();
    toggleCart();
  }
});

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFilters();
  updateCartDisplay();
  
  console.log('🚀 TechGear Product Gallery initialized successfully!');
  console.log('💡 Tip: Press Ctrl+C to toggle cart');
});

import { SpeedInsights } from "@vercel/speed-insights/next"


// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
    }
  });
});

// Handle Contact Form Submission
function handleContactSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Show success modal
  const modal = document.getElementById('successModal');
  modal.classList.add('show');
  
  // Reset form
  document.getElementById('contactForm').reset();
  
  // Log submission (in real app, send to server)
  console.log('Contact Form Submitted:', { name, email, subject, message });
  
  return false;
}

// Close Success Modal
function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('show');
}

// Close modals when clicking outside
window.addEventListener('click', (event) => {
  const successModal = document.getElementById('successModal');
  const cartModal = document.getElementById('cartModal');
  
  if (event.target === successModal) {
    closeSuccessModal();
  }
  if (event.target === cartModal) {
    toggleCart();
  }
});

// Newsletter Submission
function handleNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input').value;
  showNotification('Thank you for subscribing! 🎉');
  event.target.reset();
  return false;
}