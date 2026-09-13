// DINKLI - Pitch Deck Interactions

const slideLinks = document.querySelectorAll('.slide-dot');
const slides = document.querySelectorAll('.deck-slide');
const printButton = document.getElementById('print-deck');

if (printButton) {
  printButton.addEventListener('click', () => window.print());
}

if (slideLinks.length && slides.length) {
  const setActiveSlide = (id) => {
    slideLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveSlide(visible.target.id);
    }
  }, {
    threshold: [0.35, 0.55, 0.75],
    rootMargin: '-15% 0px -35% 0px'
  });

  slides.forEach((slide) => observer.observe(slide));

  document.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) {
      return;
    }

    const activeIndex = Array.from(slideLinks).findIndex((link) => link.classList.contains('active'));
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), slideLinks.length - 1);
    const nextLink = slideLinks[nextIndex];

    if (nextLink && nextIndex !== activeIndex) {
      event.preventDefault();
      document.querySelector(nextLink.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    }
  });
}
