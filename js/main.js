// DINKLI - Main JavaScript

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Waitlist form handling
const waitlistForm = document.getElementById('waitlist-form');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('waitlist-name').value.trim();
        const email = document.getElementById('waitlist-email').value.trim();
        const messageEl = document.getElementById('waitlist-message');
        
        // Basic validation
        if (!name || !email) {
            messageEl.textContent = 'Please fill in all fields.';
            messageEl.classList.add('show');
            messageEl.style.color = 'var(--red, #ff0000)';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageEl.textContent = 'Please enter a valid email address.';
            messageEl.classList.add('show');
            messageEl.style.color = 'var(--red, #ff0000)';
            return;
        }
        
        // In a real app, this would send to a backend/email service
        // For now, we'll store in localStorage and show success
        const waitlistData = {
            name: name,
            email: email,
            timestamp: new Date().toISOString()
        };
        
        // Get existing waitlist from localStorage
        let waitlist = JSON.parse(localStorage.getItem('dinkli_waitlist') || '[]');
        
        // Check if email already exists
        const exists = waitlist.some(entry => entry.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            messageEl.textContent = 'You\'re already on the waitlist! We\'ll notify you when we launch.';
            messageEl.classList.add('show');
            messageEl.style.color = 'var(--black)';
            waitlistForm.reset();
            return;
        }
        
        // Add to waitlist
        waitlist.push(waitlistData);
        localStorage.setItem('dinkli_waitlist', JSON.stringify(waitlist));
        
        // Show success message
        messageEl.textContent = `Thanks ${name}! You're #${waitlist.length} on the waitlist. We'll notify you when we launch!`;
        messageEl.classList.add('show');
        messageEl.style.color = 'var(--black)';
        waitlistForm.reset();
        
        // Optional: Send to backend/email service here
        // Example: fetch('/api/waitlist', { method: 'POST', body: JSON.stringify(waitlistData) });
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create mailto link to direct email to alediez2408@gmail.com
        const mailtoLink = `mailto:alediez2408@gmail.com?subject=${encodeURIComponent('Dinkli Contact: ' + subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Optional: Show confirmation or reset
        // contactForm.reset();
    });
}

// Delete Account form handling
const deleteForm = document.getElementById('delete-account-form');
if (deleteForm) {
    deleteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('delete-email').value;
        const reason = document.getElementById('delete-reason').value;
        const confirm = document.getElementById('delete-confirm').checked;
        
        if (!confirm) {
            alert('Please check the confirmation box to proceed.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Create mailto link to direct email to alediez2408@gmail.com
        const subject = 'Dinkli Account & Data Deletion Request';
        const body = `Please delete my Dinkli account and all associated data.\n\nAccount Email: ${email}\nReason: ${reason}\n\nI confirm that I want to permanently delete my account, profile, game history, and all associated data.`;
        
        const mailtoLink = `mailto:alediez2408@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
    });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.card, .value-prop-card, .step, .feature-card, .pricing-card');
  animateElements.forEach(el => observer.observe(el));
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// Google Maps Custom Styling (Optional - requires API key)
// To use: Add your Google Maps API key and uncomment this code
/*
function initCustomMap() {
  const mapContainer = document.querySelector('.map-container');
  if (!mapContainer) return;
  
  // Create map div
  const mapDiv = document.createElement('div');
  mapDiv.id = 'map';
  mapContainer.appendChild(mapDiv);
  mapContainer.classList.add('map-api-active');
  
  // Custom map styles matching neurobrutalism design
  const customMapStyle = [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    },
    {
      featureType: 'water',
      stylers: [{ color: '#00FF00' }, { lightness: 80 }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }, { weight: 2 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#00FF00' }, { weight: 4 }]
    },
    {
      featureType: 'landscape',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    }
  ];
  
  // Initialize map (requires Google Maps API)
  if (typeof google !== 'undefined' && google.maps) {
    const map = new google.maps.Map(mapDiv, {
      center: { lat: 30.3075, lng: -97.7555 }, // Austin, TX
      zoom: 11,
      styles: customMapStyle,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });
    
    // Add marker
    new google.maps.Marker({
      position: { lat: 30.3075, lng: -97.7555 },
      map: map,
      title: 'Dinkli - Austin, Texas'
    });
  }
}

// Uncomment to use custom map (requires Google Maps API key in HTML)
// document.addEventListener('DOMContentLoaded', initCustomMap);
*/