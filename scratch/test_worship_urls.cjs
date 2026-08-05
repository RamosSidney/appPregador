const https = require('https');
const fs = require('fs');
const path = require('path');

const testUrls = [
  'https://ia800201.us.archive.org/12/items/SoftPianoAmbientWorship/SoftPianoAmbient.mp3',
  'https://ia801503.us.archive.org/15/items/relaxing-piano-music-worship-ambient/relaxing-piano-ambient.mp3',
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=inspiring-cinematic-ambient-116199.mp3'
];

testUrls.forEach((url, i) => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    console.log(i, '=> Status:', res.statusCode);
  }).on('error', err => console.error(i, '=> Error:', err.message));
});
