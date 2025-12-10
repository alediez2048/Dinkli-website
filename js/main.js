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
    waitlistForm.addEventListener('submit', async function(e) {
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
        
        // Show loading state
        messageEl.textContent = 'Submitting...';
        messageEl.classList.add('show');
        messageEl.style.color = 'var(--black)';
        
        // Prepare data for Formspree
        const formData = {
            name: name,
            email: email,
            form_type: 'waitlist',
            timestamp: new Date().toISOString(),
            _subject: 'New Dinkli Waitlist Signup'
        };
        
        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/xldqpalz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Store in localStorage as backup
                const waitlistData = {
                    name: name,
                    email: email,
                    timestamp: new Date().toISOString()
                };
                
                let waitlist = JSON.parse(localStorage.getItem('dinkli_waitlist') || '[]');
                const exists = waitlist.some(entry => entry.email.toLowerCase() === email.toLowerCase());
                
                if (!exists) {
                    waitlist.push(waitlistData);
                    localStorage.setItem('dinkli_waitlist', JSON.stringify(waitlist));
                }
                
                // Show success message
                messageEl.textContent = `Thanks ${name}! You're on the waitlist. We'll notify you when we launch!`;
                messageEl.classList.add('show');
                messageEl.style.color = 'var(--black)';
                waitlistForm.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            messageEl.textContent = 'There was an error. Please try again or contact us directly.';
            messageEl.classList.add('show');
            messageEl.style.color = 'var(--red, #ff0000)';
        }
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
        
        // Create mailto link to direct email to hello@dinkli.com
        const mailtoLink = `mailto:hello@dinkli.com?subject=${encodeURIComponent('Dinkli Contact: ' + subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
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
        
        // Create mailto link to direct email to hello@dinkli.com
        const subject = 'Dinkli Account & Data Deletion Request';
        const body = `Please delete my Dinkli account and all associated data.\n\nAccount Email: ${email}\nReason: ${reason}\n\nI confirm that I want to permanently delete my account, profile, game history, and all associated data.`;
        
        const mailtoLink = `mailto:hello@dinkli.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
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

// Mobile Sticky CTA Observer
const heroSection = document.querySelector('.hero');
const stickyCTA = document.querySelector('.mobile-sticky-cta');

if (heroSection && stickyCTA) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If hero is NOT intersecting (scrolled past), show CTA
      if (!entry.isIntersecting) {
        stickyCTA.classList.add('visible');
      } else {
        stickyCTA.classList.remove('visible');
      }
    });
  }, { threshold: 0 }); // Trigger as soon as hero leaves viewport

  heroObserver.observe(heroSection);
}

// Opening Game Modal
const openingModal = document.getElementById('opening-modal');
const modalClose = document.getElementById('modal-close');
const modalSkip = document.getElementById('modal-skip');
const openingGameForm = document.getElementById('opening-game-form');

let modalShown = false; // Track if modal has been shown in this session

// Show modal when "How It Works" section comes into view
function showModalOnSectionView() {
  const modalDismissed = localStorage.getItem('opening_modal_dismissed');
  
  // Don't show if already dismissed or already shown in this session
  if (modalDismissed || modalShown || !openingModal) {
    return;
  }
  
  openingModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  modalShown = true;
}

// Use IntersectionObserver to detect when "How It Works" section is visible
document.addEventListener('DOMContentLoaded', function() {
  const howItWorksSection = document.getElementById('how-it-works');
  
  if (howItWorksSection && openingModal) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When section enters viewport, show modal
        if (entry.isIntersecting && !modalShown) {
          const modalDismissed = localStorage.getItem('opening_modal_dismissed');
          if (!modalDismissed) {
            // Small delay for better UX
            setTimeout(showModalOnSectionView, 300);
            // Stop observing after showing once
            sectionObserver.unobserve(howItWorksSection);
          }
        }
      });
    }, { 
      threshold: 0.3 // Trigger when 30% of section is visible
    });
    
    sectionObserver.observe(howItWorksSection);
  }
});

// Close modal handlers
function closeModal() {
  if (openingModal) {
    openingModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    localStorage.setItem('opening_modal_dismissed', 'true');
  }
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalSkip) {
  modalSkip.addEventListener('click', closeModal);
}

// Close on overlay click
if (openingModal) {
  openingModal.addEventListener('click', function(e) {
    if (e.target === openingModal) {
      closeModal();
    }
  });
}

// Opening Game Form handling
if (openingGameForm) {
  openingGameForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('opening-name').value.trim();
    const email = document.getElementById('opening-email').value.trim();
    const messageEl = document.getElementById('opening-message');
    
    // Basic validation
    if (!name || !email) {
      messageEl.textContent = 'Please fill in all fields.';
      messageEl.classList.add('show');
      messageEl.style.color = '#ff0000';
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      messageEl.textContent = 'Please enter a valid email address.';
      messageEl.classList.add('show');
      messageEl.style.color = '#ff0000';
      return;
    }
    
    // Show loading state
    messageEl.textContent = 'Submitting...';
    messageEl.classList.add('show');
    messageEl.style.color = 'var(--black)';
    
    // Prepare data for Formspree
    const formData = {
      name: name,
      email: email,
      form_type: 'opening_game',
      event: 'Feb 1st Ceremonial Opening Game',
      timestamp: new Date().toISOString(),
      _subject: 'New Opening Game Signup - Feb 1st'
    };
    
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xldqpalz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Store in localStorage as backup
        const openingGameData = {
          name: name,
          email: email,
          event: 'Feb 1st Ceremonial Opening Game',
          timestamp: new Date().toISOString()
        };
        
        let openingWaitlist = JSON.parse(localStorage.getItem('dinkli_opening_waitlist') || '[]');
        const exists = openingWaitlist.some(entry => entry.email.toLowerCase() === email.toLowerCase());
        
        if (!exists) {
          openingWaitlist.push(openingGameData);
          localStorage.setItem('dinkli_opening_waitlist', JSON.stringify(openingWaitlist));
        }
        
        // Show success message
        messageEl.textContent = `Thanks ${name}! You're signed up for the Feb 1st Ceremonial Opening Game! 🎾`;
        messageEl.classList.add('show');
        messageEl.style.color = 'var(--black)';
        openingGameForm.reset();
        
        // Close modal after 2 seconds
        setTimeout(closeModal, 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      messageEl.textContent = 'There was an error. Please try again or contact us directly.';
      messageEl.classList.add('show');
      messageEl.style.color = '#ff0000';
    }
  });
}

// Countdown Timer
function updateCountdown() {
  const targetDate = new Date(2026, 0, 1, 0, 0, 0, 0); // February 1st, 2026 (month is 0-indexed)
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    // Countdown has ended
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = '00';
    if (hoursEl) hoursEl.textContent = '00';
    if (minutesEl) minutesEl.textContent = '00';
    if (secondsEl) secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Initialize countdown timer
document.addEventListener('DOMContentLoaded', function() {
  const countdownTimer = document.getElementById('countdown-timer');
  if (countdownTimer) {
    updateCountdown(); // Initial call
    setInterval(updateCountdown, 1000); // Update every second
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
