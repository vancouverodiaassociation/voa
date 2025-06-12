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
        download: false,
        adaptiveHeight: true
      });
    }
  });

  // Event Details Modal Functionality
  const eventDetailsModal = document.getElementById('event-details-modal');
  
  if (!eventDetailsModal) {
    console.warn('Event details modal HTML element not found. Modal functionality will not work.');
  } else {
    const modalCloseBtn = eventDetailsModal.querySelector('.modal-close-btn');
    const modalEventTitle = eventDetailsModal.querySelector('#modal-event-title');
    const modalEventDate = eventDetailsModal.querySelector('#modal-event-date');
    const modalEventLocation = eventDetailsModal.querySelector('#modal-event-location');
    const modalEventDescription = eventDetailsModal.querySelector('#modal-event-description');
    const modalEventImage = eventDetailsModal.querySelector('.modal-event-image');

    if (!modalCloseBtn || !modalEventTitle || !modalEventDate || !modalEventLocation || !modalEventDescription || !modalEventImage) {
      console.warn('One or more elements within the event details modal are missing. Modal may not function correctly.');
    }

    // Select all anchor tags with class 'btn' inside elements with class 'event-card'
    const eventDetailButtons = document.querySelectorAll('.event-card a.btn'); 

    if (eventDetailButtons.length === 0) {
      console.warn('No event detail buttons found. Modal triggers will not be set up.');
    }

    eventDetailButtons.forEach(button => {
      // Check if the href attribute exists and contains '/events/' as a basic filter
      // This helps ensure we are targeting the correct "Details" links
      if (button.getAttribute('href') && button.getAttribute('href').includes('/events/')) {
        button.addEventListener('click', function(e) {
          e.preventDefault(); // Prevent default link navigation

          const card = this.closest('.event-card');
          if (!card) {
            console.warn('Could not find parent .event-card for a clicked detail button.');
            return;
          }

          const title = card.querySelector('.event-title') ? card.querySelector('.event-title').textContent.trim() : 'Event Title Not Found';
          const date = card.querySelector('.event-date') ? card.querySelector('.event-date').textContent.trim() : 'Date Not Found';
          const locationElement = card.querySelector('.event-location span');
          const location = locationElement ? locationElement.textContent.trim() : 'Location Not Found';
          const descriptionElement = card.querySelector('.event-description');
          const description = descriptionElement ? descriptionElement.innerHTML : '<p>Description not available.</p>'; // Use innerHTML to keep formatting
          const imageElement = card.querySelector('.event-image img');

          if (modalEventTitle) modalEventTitle.textContent = title;
          if (modalEventDate) modalEventDate.textContent = date;
          if (modalEventLocation) modalEventLocation.textContent = location;
          if (modalEventDescription) modalEventDescription.innerHTML = description;
          
          if (modalEventImage && imageElement && imageElement.src) {
            modalEventImage.src = imageElement.src;
            modalEventImage.alt = title; // Set alt text for accessibility
            modalEventImage.style.display = 'block';
          } else if (modalEventImage) {
            modalEventImage.style.display = 'none'; // Hide if no image
          }

          eventDetailsModal.style.display = 'block';
          document.body.classList.add('modal-open');
        });
      }
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function() {
        eventDetailsModal.style.display = 'none';
        document.body.classList.remove('modal-open');
      });
    }

    window.addEventListener('click', function(event) {
      if (event.target == eventDetailsModal) {
        eventDetailsModal.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    });
  }
});
