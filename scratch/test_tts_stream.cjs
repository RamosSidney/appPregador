const https = require('https');

const text = "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.";
const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=pt&client=tw-ob`;

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
  console.log('Status Code:', res.statusCode);
  console.log('Content-Type:', res.headers['content-type']);
}).on('error', err => console.error('Error:', err.message));
