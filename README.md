# Vancouver Odia Cultural Association (VOCA) Website

This repository contains the source code for the Vancouver Odia Cultural Association website, a not-for-profit social and cultural organization based in Vancouver, Canada.

## Features

- Static website hosted on GitHub Pages
- Internationalization support (English and Odia)
- Dark/Light theme toggle
- Responsive design for all devices
- Event calendar
- Event gallery with photos and videos
- Social media integration
- Google Forms integration for event registration

## Development Setup

### Prerequisites

- Ruby version 2.7.0 or higher
- Bundler
- Jekyll
- Xcode Command Line Tools

### Setup

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   bundle install --path vendor/bundle
   ```
   
   If you encounter issues with native extensions, try:
   ```bash
   # Install rbenv to manage Ruby versions
   brew install rbenv
   rbenv init
   # Follow instructions to add rbenv to your shell
   
   # Install a newer Ruby version
   rbenv install 3.2.2
   rbenv local 3.2.2
   
   # Install bundler and dependencies
   gem install bundler
   bundle install
   ```
   
4. Start the local development server:
   ```bash
   bundle exec jekyll serve
   ```
5. Open your browser and go to http://localhost:4000

## Content Management

The content of the website can be easily updated by modifying the files in the `_data` directory:
- `events.yml`: Add or modify events
- `gallery.yml`: Update gallery content
- `i18n/`: Update translations for English and Odia

Alternatively, you can modify the JSON files in the `assets/js/i18n/` directory for translations and `assets/js/events.json` for event data.

## Deployment

The website can be deployed to GitHub Pages by:

1. Push changes to the main branch
2. Go to the repository settings
3. Enable GitHub Pages for the main branch

## License

This project is licensed under the MIT License - see the LICENSE file for details.
