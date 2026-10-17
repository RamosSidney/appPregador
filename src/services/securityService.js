/**
 * Security Service — appPregador 2.0
 * Proteção contra XSS (Cross-Site Scripting), Prompt Injection, Rate Limiting de IA e Validação de Dados.
 */

// 1. Controle de Rate Limiting em Memória (Sliding Window por Ação)
const rateLimitBuckets = new Map();

export function checkRateLimit(actionKey = 'ai_call', maxRequestsPerMinute = 8) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const timestamps = rateLimitBuckets.get(actionKey) || [];

  // Filtra apenas requisições dentro do último minuto
  const recentTimestamps = timestamps.filter(ts => now - ts < windowMs);

  if (recentTimestamps.length >= maxRequestsPerMinute) {
    const waitSeconds = Math.ceil((windowMs - (now - recentTimestamps[0])) / 1000);
    throw new Error(`Limite de segurança atingido (${maxRequestsPerMinute} req/min). Aguarde ${waitSeconds}s antes de tentar novamente.`);
  }

  recentTimestamps.push(now);
  rateLimitBuckets.set(actionKey, recentTimestamps);
  return true;
}

// 2. Sanitizador contra Prompt Injection e Jailbreak de LLMs
const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/gi,
  /esqueça\s+(todas\s+as\s+)?(instruções|regras)\s+(anteriores|acima)/gi,
  /system\s*prompt/gi,
  /você\s+agora\s+é\s+dan/gi,
  /<\|im_start\|>|<\|im_end\|>|<\|endoftext\|>/gi,
  /\[system\]|\[inst\]|<<sys>>/gi
];

export function sanitizePromptInput(rawInput, maxLength = 400) {
  if (!rawInput || typeof rawInput !== 'string') return '';

  let sanitized = rawInput.trim().slice(0, maxLength);

  // Neutraliza padrões clássicos de Prompt Injection / Role Hijacking
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[bloqueado]');
  }

  // Remove caracteres de controle invisíveis e tags de fechamento XML usadas para escapar do sandbox
  sanitized = sanitized
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<\/?user_input>/gi, '');

  return sanitized;
}

// 3. Sanitizador HTML Estrito contra XSS (Cross-Site Scripting em Markdown e Lições)
export function sanitizeHtml(dirtyHtml) {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';

  // Em ambiente de navegador, usa DOMParser para remoção segura de nós e atributos perigosos
  if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(dirtyHtml, 'text/html');

      const forbiddenTags = [
        'script', 'iframe', 'object', 'embed', 'form', 'input', 'button',
        'textarea', 'select', 'style', 'link', 'meta', 'base', 'applet', 'svg', 'math'
      ];

      forbiddenTags.forEach(tag => {
        const elements = doc.querySelectorAll(tag);
        elements.forEach(el => el.remove());
      });

      // Varre todos os elementos restantes e remove atributos de eventos (onerror, onclick, etc.) e URLs javascript:/data:
      const allElements = doc.body.querySelectorAll('*');
      allElements.forEach(el => {
        const attrs = Array.from(el.attributes);
        attrs.forEach(attr => {
          const attrName = attr.name.toLowerCase();
          const attrVal = (attr.value || '').toLowerCase().trim();

          if (
            attrName.startsWith('on') ||
            attrName === 'srcdoc' ||
            attrVal.startsWith('javascript:') ||
            attrVal.startsWith('vbscript:') ||
            attrVal.startsWith('data:text/html')
          ) {
            el.removeAttribute(attr.name);
          }
        });

        // Força rel="noopener noreferrer" em links externos
        if (el.tagName.toLowerCase() === 'a') {
          el.setAttribute('rel', 'noopener noreferrer');
          el.setAttribute('target', '_blank');
        }
      });

      return doc.body.innerHTML;
    } catch (e) {
      // Fallback para regex caso DOMParser falhe
    }
  }

  // Fallback Regex (Node.js / SSR / Testes)
  return dirtyHtml
    .replace(/<(script|iframe|object|embed|style|form|svg|math)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|iframe|object|embed|style|form|svg|math)[^>]*\/?>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript\s*:/gi, '');
}

// 4. Validação de Segurança para Importação de Backup JSON (Contra Prototype Pollution & XSS)
export function validateBackupPayload(rawJsonString) {
  if (!rawJsonString || typeof rawJsonString !== 'string') {
    throw new Error('Arquivo vazio ou inválido.');
  }

  if (rawJsonString.length > 5 * 1024 * 1024) {
    throw new Error('Arquivo de backup excede o limite de segurança (5MB).');
  }

  const parsed = JSON.parse(rawJsonString, (key, value) => {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return undefined;
    }
    return value;
  });

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Estrutura JSON inválida.');
  }

  const safeSermons = Array.isArray(parsed.sermons)
    ? parsed.sermons.slice(0, 500).map(s => ({
        id: String(s.id || Date.now()).slice(0, 60),
        title: String(s.title || 'Sermão').slice(0, 150),
        vibe: String(s.vibe || 'GenZ').slice(0, 50),
        content: String(s.content || '').slice(0, 25000),
        createdAt: String(s.createdAt || '').slice(0, 30),
        isFavorite: Boolean(s.isFavorite)
      }))
    : null;

  const safeHighlights = parsed.bibleHighlights && typeof parsed.bibleHighlights === 'object'
    ? Object.fromEntries(
        Object.entries(parsed.bibleHighlights)
          .slice(0, 2000)
          .filter(([k, v]) => typeof k === 'string' && ['green', 'blue', 'yellow', 'pink'].includes(v))
      )
    : null;

  const safeModules = Array.isArray(parsed.completedModules)
    ? parsed.completedModules.slice(0, 100).filter(m => typeof m === 'string' && m.length < 40)
    : null;

  const safeBossFights = Array.isArray(parsed.completedBossFights)
    ? parsed.completedBossFights.slice(0, 50).filter(b => typeof b === 'string' && b.length < 40)
    : null;

  return {
    sermons: safeSermons,
    bibleHighlights: safeHighlights,
    completedModules: safeModules,
    completedBossFights: safeBossFights
  };
}
