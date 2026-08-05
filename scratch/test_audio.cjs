const https = require('https');

const urls = [
  'https://ia800201.us.archive.org/12/items/SoftPianoAmbientWorship/SoftPianoAmbient.mp3',
  'https://ia801503.us.archive.org/15/items/relaxing-piano-music-worship-ambient/relaxing-piano-ambient.mp3',
  'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3'
];

urls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(url, '=> Status:', res.statusCode);
  }).on('error', err => console.error(url, '=> Error:', err.message));
});
