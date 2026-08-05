const https = require('https');

const candidateUrls = [
  'https://actions.google.com/sounds/v1/ambiences/rain_heavy_loud.ogg',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://upload.wikimedia.org/wikipedia/commons/4/40/Toccata_and_Fugue_in_D_minor_BWV_565.ogg',
  'https://ia800908.us.archive.org/16/items/cinematic-inspirational-ambient/cinematic-ambient-worship.mp3',
  'https://ia600908.us.archive.org/16/items/cinematic-inspirational-ambient/cinematic-ambient-worship.mp3',
  'https://archive.org/download/worship-piano-instrumental/worship-piano-ambient.mp3',
  'https://archive.org/download/ambient-worship-music/ambient-worship.mp3'
];

candidateUrls.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(res.statusCode, '=>', url);
  }).on('error', err => console.error('ERR:', url, err.message));
});
