document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Handle responsive images
  const bannerImages = document.querySelectorAll('.banner-image');
  
  function setImageHeight() {
    bannerImages.forEach(img => {
      const container = img.parentElement;
      if (container) {
        container.style.height = `${container.offsetWidth * 0.4}px`;
      }
    });
  }
  
  if (bannerImages.length > 0) {
    window.addEventListener('resize', setImageHeight);
    setImageHeight();
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Initialize lightGallery for image galleries
  const galleryElements = document.querySelectorAll('.gallery-grid');
  
  galleryElements.forEach(galleryElement => {
    if (typeof lightGallery !== 'undefined') {
      lightGallery(galleryElement, {
        selector: '.gallery-item',
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        download: false
      });
    }
  });
});
