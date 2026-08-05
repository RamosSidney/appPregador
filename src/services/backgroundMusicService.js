// Background Music Service: Single Audio Engine (YouTube Cs6LqMckWkg at 25% Volume - ZERO Overlap / ZERO Track Mixing)

export const MUSIC_TRACKS = [
  {
    id: 'youtube_worship',
    name: '🎹 Continuous Worship Ambient Piano',
    desc: 'Trilha Oficial Devocional YouTube (Cs6LqMckWkg)',
    youtubeId: 'Cs6LqMckWkg'
  }
];

class BackgroundMusicService {
  constructor() {
    this.player = null;
    this.isPlaying = false;
    this.isReady = false;
    this.volume = 25; // Fixed 25% volume for background feel
    this.listeners = new Set();

    if (typeof window !== 'undefined') {
      this.loadYouTubeAPI();
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(this.isPlaying); } catch (e) {}
    });
  }

  loadYouTubeAPI() {
    if (typeof window === 'undefined') return;

    let container = document.getElementById('yt-bg-music-player');
    if (!container) {
      container = document.createElement('div');
      container.id = 'yt-bg-music-player';
      container.style.position = 'fixed';
      container.style.bottom = '-9999px';
      container.style.right = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }

    if (window.YT && window.YT.Player) {
      this.initPlayer();
      return;
    }

    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) try { prevReady(); } catch (e) {}
      this.initPlayer();
    };
  }

  initPlayer() {
    if (this.player || typeof window === 'undefined' || !window.YT) return;

    try {
      this.player = new window.YT.Player('yt-bg-music-player', {
        height: '1',
        width: '1',
        videoId: 'Cs6LqMckWkg',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: 'Cs6LqMckWkg',
          modestbranding: 1,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            this.isReady = true;
            try { event.target.setVolume(25); } catch (e) {}
          },
          onStateChange: (event) => {
            if (event.data === 1) {
              this.isPlaying = true;
              this.notify();
            } else if (event.data === 2 || event.data === 0) {
              this.isPlaying = false;
              this.notify();
            }
          }
        }
      });
    } catch (e) {
      console.warn("Falha ao carregar YouTube Player:", e);
    }
  }

  async play() {
    if (this.player && this.isReady && typeof this.player.playVideo === 'function') {
      try {
        this.player.setVolume(25);
        this.player.playVideo();
      } catch (e) {}
    } else {
      setTimeout(() => {
        if (this.player && typeof this.player.playVideo === 'function') {
          try {
            this.player.setVolume(25);
            this.player.playVideo();
          } catch (e) {}
        }
      }, 400);
    }

    this.isPlaying = true;
    this.notify();
  }

  pause() {
    if (this.player && typeof this.player.pauseVideo === 'function') {
      try { this.player.pauseVideo(); } catch (e) {}
    }
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  setVolume(vol) {
    this.volume = 25;
    if (this.player && typeof this.player.setVolume === 'function') {
      try { this.player.setVolume(25); } catch (e) {}
    }
  }
}

export const backgroundMusicService = new BackgroundMusicService();
