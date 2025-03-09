// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
const app = window.top;
if (app) {
  app.document.addEventListener('DOMContentLoaded', () => {
    // Hide fetch/XHR requests
    const xhr = app.document.querySelector('.command-name-xhr') as HTMLElement;
    if (xhr) xhr.style.display = 'none';
  });
}

// Prevent TypeScript from reading file as legacy script
export { };
