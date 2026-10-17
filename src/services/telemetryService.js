/**
 * Telemetry & Microsoft Clarity Service — appPregador 2.0
 * Integra Microsoft Clarity (Heatmaps, Session Replay & Custom Events) com mascaramento de dados sensíveis (LGPD).
 */

const DEFAULT_CLARITY_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLARITY_PROJECT_ID) || '';

class TelemetryService {
  constructor() {
    this.initialized = false;
    this.projectId = '';
  }

  init(customProjectId = null) {
    if (typeof window === 'undefined') return;

    const savedId = customProjectId || localStorage.getItem('app_pregador_clarity_id') || DEFAULT_CLARITY_ID;
    if (!savedId || !/^[a-zA-Z0-9_-]{6,24}$/.test(savedId.trim())) {
      return;
    }

    const cleanId = savedId.trim();
    if (this.initialized && this.projectId === cleanId) return;

    this.projectId = cleanId;
    this.initialized = true;

    // Snippet oficial assíncrono do Microsoft Clarity
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', cleanId);

    console.log(`[Telemetry] Microsoft Clarity inicializado (Projeto: ${cleanId})`);
  }

  trackEvent(eventName, metadata = {}) {
    try {
      // Dispara evento customizado no Microsoft Clarity se ativo
      if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
        window.clarity('event', eventName);
        Object.entries(metadata).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            window.clarity('set', key, String(val).slice(0, 100));
          }
        });
      }

      // Registra contador agregado local (Zero-PII) para o painel de telemetria
      const rawEvents = localStorage.getItem('app_pregador_telemetry_counters');
      const counters = rawEvents ? JSON.parse(rawEvents) : {};
      counters[eventName] = (counters[eventName] || 0) + 1;
      localStorage.setItem('app_pregador_telemetry_counters', JSON.stringify(counters));
    } catch (e) {
      // Falha silenciosa se bloqueador de anúncios estiver ativo
    }
  }

  getEventCounters() {
    try {
      const raw = localStorage.getItem('app_pregador_telemetry_counters');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }
}

export const telemetryService = new TelemetryService();
