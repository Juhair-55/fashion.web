// LuxAccessories - External JavaScript

// ===== Product Category Filtering =====
document.addEventListener('DOMContentLoaded', function() {

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-bar button');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      productCards.forEach(function(card) {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== Product Modal =====
  const modal = document.getElementById('productModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const closeBtn = document.querySelector('.modal .close-btn');

  productCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('btn-cart')) return; // Don't open modal on Add to Cart
      const name = card.querySelector('h3').textContent;
      const price = card.querySelector('.price').textContent;
      if (modalTitle) modalTitle.textContent = name;
      if (modalPrice) modalPrice.textContent = price;
      if (modal) modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // ===== Add to Cart Alerts =====
  const cartButtons = document.querySelectorAll('.btn-cart');
  cartButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const card = btn.closest('.product-card');
      const name = card.querySelector('h3').textContent;
      alert(name + ' has been added to your cart!');
    });
  });

  // ===== Feedback Form Validation =====
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const category = document.getElementById('category');
      const comments = document.getElementById('comments');
      const rating = document.querySelector('input[name="rating"]:checked');

      // Validation
      var errors = [];

      if (!fullName.value.trim()) {
        errors.push('Please enter your full name.');
      }

      if (!email.value.trim()) {
        errors.push('Please enter your email address.');
      } else if (!isValidEmail(email.value)) {
        errors.push('Please enter a valid email address.');
      }

      if (!category.value) {
        errors.push('Please select a feedback category.');
      }

      if (!rating) {
        errors.push('Please select an overall rating.');
      }

      if (!comments.value.trim()) {
        errors.push('Please enter your comments.');
      } else if (comments.value.trim().length < 10) {
        errors.push('Comments must be at least 10 characters long.');
      }

      if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
      } else {
        alert('Thank you for your feedback, ' + fullName.value + '! We appreciate your input.');
        feedbackForm.reset();
      }
    });
  }

  // ===== Search Functionality =====
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        var query = searchInput.value.trim();
        if (query) {
          alert('Searching for: "' + query + '"');
        }
      }
    });
  }

});

// ===== Utility Functions =====
function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
