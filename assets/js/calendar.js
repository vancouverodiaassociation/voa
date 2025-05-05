document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  
  // Return if there's no calendar element on the page
  if (!calendarEl) return;
  
  // Initialize FullCalendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },
    themeSystem: 'standard',
    eventClick: function(info) {
      // Redirect to the event page when an event is clicked
      window.location.href = info.event.url;
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: true
    },
    events: function(fetchInfo, successCallback, failureCallback) {
      // Fetch events from the data file
      fetch('/assets/js/events.json')
        .then(response => response.json())
        .then(data => {
          successCallback(data);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          failureCallback(error);
        });
    }
  });
  
  // Render the calendar
  calendar.render();
  
  // Update calendar when theme changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class' && mutation.target === document.body) {
        calendar.updateSize();
      }
    });
  });
  
  observer.observe(document.body, { attributes: true });
});
