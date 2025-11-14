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
        
        // Show success message (in a real app, this would send to a backend)
        alert('Thank you for your message! We\'ll get back to you within 24-48 hours.');
        contactForm.reset();
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

