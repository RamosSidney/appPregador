const fs = require('fs');
const path = require('path');
const https = require('https');

const publicAudioDir = path.join(__dirname, '..', 'public', 'audio');
const src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
const dest = path.join(publicAudioDir, 'cinematic-ambient.mp3');

function download(url, destPath) {
  const file = fs.createWriteStream(destPath);
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      return download(res.headers.location, destPath);
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close(() => console.log('Successfully saved cinematic-ambient.mp3'));
    });
  });
}

download(src, dest);
