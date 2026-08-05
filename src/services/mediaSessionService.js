// Media Session Service for OS Lock Screen Controls (iOS & Android Screen Lock Media Widget)

class MediaSessionService {
  constructor() {
    this.currentMetadata = null;
  }

  updateMetadata({ title, artist = 'Nova Versão Internacional, Edição Gen Z', album = 'appPregador 2.0 — Bíblia Sagrada', artworkUrl = '/icon-512.png' }) {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

    try {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: title || 'Bíblia Sagrada NVI',
        artist: artist || 'Nova Versão Internacional, Edição Gen Z',
        album: album || 'appPregador 2.0',
        artwork: [
          { src: artworkUrl || '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' }
        ]
      });
    } catch (e) {
      console.warn("[MediaSession] Erro ao atualizar metadados:", e);
    }
  }

  setPlaybackState(state) { // 'playing' | 'paused' | 'none'
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.playbackState = state;
    } catch (e) {}
  }

  setPositionState({ duration = 100, playbackRate = 1.0, position = 0 }) {
    if (typeof window === 'undefined' || !('mediaSession' in navigator) || !navigator.mediaSession.setPositionState) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: Math.max(1, duration),
        playbackRate: Math.max(0.5, playbackRate),
        position: Math.min(duration, Math.max(0, position))
      });
    } catch (e) {}
  }

  setupActionHandlers({ onPlay, onPause, onPrevious, onNext }) {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

    const actionHandlers = [
      ['play', onPlay],
      ['pause', onPause],
      ['previoustrack', onPrevious],
      ['nexttrack', onNext]
    ];

    for (const [action, handler] of actionHandlers) {
      try {
        if (handler) {
          navigator.mediaSession.setActionHandler(action, () => {
            handler();
          });
        } else {
          navigator.mediaSession.setActionHandler(action, null);
        }
      } catch (e) {}
    }
  }
}

export const mediaSessionService = new MediaSessionService();
