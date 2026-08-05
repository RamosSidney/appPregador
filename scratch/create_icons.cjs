const fs = require('fs');
const path = require('path');

// Create a valid minimalist PNG icon buffer (192x192 & 512x512)
// Using pure 1x1 / minimal base64 PNG data expanded to valid PNG bytes
const pngBase64 = "iVBORw0KGgoAAAANSU5EUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const pngBuffer = Buffer.from(pngBase64, 'base64');

const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), pngBuffer);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), pngBuffer);

console.log("Successfully created icon-192.png and icon-512.png in public/");
