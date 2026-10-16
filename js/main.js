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

// Smooth scroll for in-page anchor links (skips bare "#" and missing targets)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length < 2) return;
        const target = document.getElementById(decodeURIComponent(href.slice(1)));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Lead forms (booking, court host, contact) post to Formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xldqpalz';

document.querySelectorAll('form[data-formspree]').forEach(form => {
    const messageEl = form.querySelector('[data-form-message]');
    const submitBtn = form.querySelector('[type="submit"]');
    const successText = form.dataset.success || 'Thanks! We got your request and will be in touch soon.';

    function showMessage(text, isError) {
        if (!messageEl) return;
        messageEl.textContent = text;
        messageEl.classList.add('show');
        messageEl.classList.toggle('is-error', Boolean(isError));
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (submitBtn) submitBtn.disabled = true;
        showMessage('Sending...', false);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
            form.reset();
            showMessage(successText, false);
        } catch (err) {
            showMessage('Something went wrong sending your request. Please try again, or email us from the contact page.', true);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
});

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
  const animateElements = document.querySelectorAll('.card, .value-prop-card, .step, .feature-card, .pricing-card, .ai-shot, .rating-card, .coach-note');
  animateElements.forEach(el => observer.observe(el));
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const menuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuOverlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside (on overlay background)
    menuOverlay.addEventListener('click', function(e) {
      if (e.target === menuOverlay) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

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
