# Vancouver Odia Association Website - Technical Documentation

This document provides a comprehensive technical overview of the Vancouver Odia Association (VOA) website architecture, folder structure, and implementation details to aid in debugging and maintenance.

## Project Overview

The VOA website is a static website with the following key features:
- Internationalization support (English and Odia)
- Dark/Light theme toggle
- Responsive design
- Event calendar integration
- Event gallery functionality
- Social media integration
- Google Forms integration for event registration

## Development Approach

The project uses Jekyll for templating and static site generation, which provides:
- Clean separation of content and presentation
- Reusable components through includes
- Layout templates
- SCSS preprocessing
- Collection management for events and galleries

## Folder Structure

```
/Users/braja.bihari/code/misc/VOA/
├── _config.yml                # Jekyll configuration file
├── _events/                   # Event collection (Jekyll)
├── _galleries/                # Galleries collection (Jekyll)
├── _includes/                 # Reusable HTML components for Jekyll
│   ├── footer.html            # Footer component
│   ├── header.html            # Header component
├── _layouts/                  # Jekyll layout templates
│   └── default.html           # Main layout template
├── _sass/                     # SCSS files for Jekyll
│   ├── base.scss              # Base styles
│   ├── components.scss        # Component styles
│   ├── mixins.scss            # SCSS mixins
│   ├── pages.scss             # Page-specific styles
│   └── variables.scss         # SCSS variables
├── assets/                    # Static assets
│   ├── css/                   # CSS files
│   │   └── main.scss          # Main SCSS file (imports all _sass files)
│   ├── images/                # Image files
│   │   └── logo.png           # Site logo
│   └── js/                    # JavaScript files
│       ├── calendar.js        # Event calendar functionality
│       ├── events.json        # Event data for the calendar
│       ├── i18n/              # Translation files
│       │   ├── en.json        # English translations
│       │   └── or.json        # Odia translations
│       ├── language-switcher.js # Language switching functionality
│       ├── main.js            # Main JavaScript functionality
│       └── theme-switcher.js  # Theme switching functionality
├── about.html                 # About page
├── Gemfile                    # Ruby dependencies for Jekyll
├── Gemfile.lock               # Locked Ruby dependencies
├── index.html                 # Homepage
└── README.md                  # Project documentation
```

## Key Components and Their Functions

### 1. Internationalization (i18n)

The website implements client-side internationalization using JavaScript and JSON translation files.

**Implementation Files:**
- `assets/js/i18n/en.json`: English translations
- `assets/js/i18n/or.json`: Odia translations
- `assets/js/language-switcher.js`: Handles language switching logic

**How It Works:**
1. Translation strings are stored in JSON files with nested keys
2. The language-switcher.js loads the appropriate JSON file based on user selection
3. HTML elements marked with `data-i18n` attributes are updated with translated text
4. Language preference is saved in localStorage for persistence

**Example HTML Usage:**
```html
<h1 data-i18n="home.banner.title">Vancouver Odia Association</h1>
```

**Example JSON Structure:**
```json
{
  "home": {
    "banner": {
      "title": "Vancouver Odia Association"
    }
  }
}
```

### 2. Theme Switching

The website supports dark and light themes controlled via JavaScript.

**Implementation Files:**
- `assets/js/theme-switcher.js`: Handles theme switching logic
- `_sass/variables.scss`: Contains theme color variables
- `_sass/base.scss`: Implements CSS variables for theming

**How It Works:**
1. Theme colors are defined as CSS variables
2. The theme-switcher.js toggles between theme classes on the body element
3. Theme preference is saved in localStorage for persistence
4. Media query is used to detect system preference for initial theme

### 3. Event Calendar

The website includes an event calendar component using FullCalendar.js.

**Implementation Files:**
- `assets/js/calendar.js`: Calendar initialization and configuration
- `assets/js/events.json`: Event data in JSON format

**How It Works:**
1. FullCalendar is initialized with custom settings
2. Events are loaded from the events.json file
3. Clicking on an event redirects to the event detail page
4. Calendar adapts to the current theme

### 4. Responsive Design

The website is fully responsive, adapting to different screen sizes.

**Implementation Files:**
- `_sass/mixins.scss`: Contains responsive mixins
- `_sass/components.scss`: Implements responsive layouts
- `_sass/pages.scss`: Page-specific responsive adjustments

**How It Works:**
1. Media queries are used to adjust layouts for different screen sizes
2. Flexbox and CSS Grid are used for responsive layouts
3. Mobile-first approach is implemented throughout the styles
4. Images are set to be responsive with max-width property

## Development Workflow

1. Edit the Jekyll templates in _layouts/ and _includes/
2. Modify the SCSS files in _sass/
3. Update content in the collection directories (_events/, _galleries/)
4. Run `bundle exec jekyll serve` to start the development server
5. Access the site at http://localhost:4000

## Debugging Common Issues

### Internationalization Issues

- **Problem**: Translations not appearing
  - **Check**: Verify that HTML elements have the correct `data-i18n` attributes
  - **Check**: Ensure translation JSON files have the correct nested structure
  - **Check**: Look for JavaScript console errors related to loading JSON files

- **Problem**: Language not persisting between page loads
  - **Check**: Verify localStorage is working in the browser
  - **Check**: Ensure the language-switcher.js is loaded on all pages

### Theme Switching Issues

- **Problem**: Theme not changing when toggled
  - **Check**: Ensure CSS variables are properly defined in base.scss
  - **Check**: Verify theme-switcher.js is properly loaded
  - **Check**: Look for JavaScript console errors

- **Problem**: Theme not persisting between page loads
  - **Check**: Verify localStorage is working in the browser

### Jekyll Build Issues

- **Problem**: Jekyll build errors
  - **Check**: Ensure Ruby dependencies are installed with `bundle install --path vendor/bundle`
  - **Check**: Verify _config.yml has valid YAML syntax
  - **Check**: Look for syntax errors in Liquid templates

## Deployment

The website is deployed to GitHub Pages:

1. Run `bundle exec jekyll build` to generate the static site
2. The files in the `_site` directory can be deployed to GitHub Pages
3. Configure GitHub Pages to build directly from the main branch for automatic deployment

## Extending the Website

### Adding New Pages

1. Create a new HTML file in the root directory with proper Jekyll front matter
2. Use the appropriate layout (e.g., `layout: default`)
3. Add navigation links in the header.html file

### Adding New Events

1. Create a new file in the `_events` collection
2. Add event data to the assets/js/events.json file for the calendar
3. Ensure the event has the required front matter and content

### Adding New Language

1. Create a new translation file in assets/js/i18n/ (e.g., fr.json)
2. Copy the structure from existing translation files
3. Update the language switcher in the header to include the new language
4. Add the new language code to the languages array in _config.yml

## Build Process

Jekyll processes the site in the following order:

1. Load configuration from _config.yml
2. Load plugins and Ruby extensions
3. Read and convert source files (Markdown, HTML, etc.)
4. Generate the site output in the _site directory

To build the site for production:

```bash
bundle exec jekyll build
```

This command will generate the static site in the `_site` directory with all assets properly processed and optimized.
