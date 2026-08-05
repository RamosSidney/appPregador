const fs = require('fs');
const path = require('path');

// Simple script creating PNG icons using canvas or SVG fallback
const publicDir = path.join(__dirname, '..', 'public');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" fill="#0B0E14"/>
  <circle cx="256" cy="256" r="200" fill="url(#grad)" opacity="0.15"/>
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A855F7"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="bolt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
  </defs>
  <path d="M288 32L112 288h128l-32 192L384 224H256l32-192z" fill="url(#bolt)" stroke="#FFF" stroke-width="8" stroke-linejoin="round"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
console.log('SVG icons generated in public/');
