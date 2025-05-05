document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use the system preference
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Apply the current theme
  document.body.className = 'theme-' + currentTheme;
  
  // Add click event to the theme toggle button
  themeToggle.addEventListener('click', function() {
    // Toggle between dark and light themes
    const newTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
    
    // Update the class on the body
    document.body.className = 'theme-' + newTheme;
    
    // Save the preference to localStorage
    localStorage.setItem('theme', newTheme);
  });
});
