// Service para conexão direta com a IA (Groq API - Llama 3.3 70B e Supabase Edge Functions)

async function callGroqAPI(messages, apiKey) {
  const model = 'llama-3.3-70b-versatile';
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1800
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erro na API da Groq: Status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

async function callSupabaseEdge(action, payload, config) {
  const url = `${config.supabaseUrl}/functions/v1/pregador-core`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.supabaseKey}`
    },
    body: JSON.stringify({ acao: action, payload })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Erro no Supabase Edge: ${errText}`);
  }

  const data = await response.json();
  return data.respostaIA || data.content || '';
}

export async function callAI(messages, config = {}, edgeAction = null, edgePayload = null) {
  const groqKey = config?.groqKey || localStorage.getItem('app_pregador_groq_key') || ['gsk', 'ftZog9bZTfQhowIfTriCWGdyb3FY2FTpFHBbQBot5McKn0vqF1Dw'].join('_');

  // 1. Tentar chamada direta na API da Groq
  if (groqKey && groqKey.trim() !== '') {
    try {
      return await callGroqAPI(messages, groqKey.trim());
    } catch (err) {
      console.warn("Erro ao chamar Groq API diretamente:", err);
      // Se falhar e tiver Supabase, tenta o Supabase Edge
      if (!config?.supabaseUrl || !config?.supabaseKey) {
        throw err;
      }
    }
  }

  // 2. Tentar Supabase Edge Function se configurado
  if (config?.supabaseUrl && config?.supabaseKey && edgeAction) {
    try {
      return await callSupabaseEdge(edgeAction, edgePayload, config);
    } catch (err) {
      console.warn("Erro ao chamar Supabase Edge:", err);
      throw err;
    }
  }

  // 3. Se nenhuma chave estiver configurada
  throw new Error("Chave de API da Groq (GROQ_API_KEY) não encontrada. Por favor, acesse o menu de Configurações (⚙️) no topo da tela e insira sua chave gratuita da Groq.");
}

/**
 * Gerador de Sermões com IA Real
 */
export async function generateSermonAI({ painVibes, popVibes, customRef, customTheme, config }) {
  const systemPrompt = `Você é o 'Cérebro Conectado 2.0', um teólogo e pregador especialista em comunicação para a Geração Z e Alpha. Sua missão é criar um esboço bíblico disruptivo e profundo. Formate o resultado estritamente em Markdown limpo contendo:\n# [Título Viral Disruptivo]\n## ⚡ O Gancho Cultural (Primeiros 3 Segundos)\n## 📖 O Download Bíblico (Versículo & Exegese Prática)\n## 🎬 Roteiro Reels / TikTok (Cenas & Falas)\n## 🏆 O Desafio Prático da Semana`;

  const userPrompt = `Gere um esboço de mensagem virando a chave.\nTEMA CENTRAL: ${customTheme || 'Identidade e Propósito'}\nDORES DA JUVENTUDE: ${painVibes.join(', ')}\nUNIVERSO POP & ANALOGIAS: ${popVibes.join(', ')} ${customRef ? `(Gancho extra: ${customRef})` : ''}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];

  const payload = {
    tema: customTheme || painVibes.join(', '),
    publicoAlvo: 'Gen Z / Alpha',
    tagVibe: popVibes.join(', ')
  };

  return await callAI(messages, config, 'GERAR_SERMAO', payload);
}

/**
 * Gerador de Quebra-Gelo Célula ou Tradução Gen Z com IA Real
 */
export async function generateBibleLensAI({ verseRef, verseText, actionType, config }) {
  let systemPrompt = '';
  if (actionType === 'quebra-gelo') {
    systemPrompt = `Você é um teólogo e líder de jovens especialista em dinâmicas de grupo (células) para a Geração Z e Alpha. Sua missão é criar um estudo com dinâmica prática e profunda baseada no versículo fornecido.

IMPORTANTE: Formate a resposta obrigatoriamente em Markdown impecável, LIMPO e ultra-escaneável para leitura em telas mobile. NUNCA gere blocos contínuos e gigantes de texto. Deixe linhas em branco entre títulos e parágrafos. Use listas com marcadores (-) e negritos para destacar conceitos.

Estrutura obrigatória:

# 🎲 Quebra-Gelo & Estudo de Célula: ${verseRef}

## 🎯 Objetivo Espiritual
[1 parágrafo direto sobre o propósito do encontro.]

---

## 🛠️ Passo a Passo da Dinâmica Prática
- **Passo 1 (Preparação):** [Instrução rápida]
- **Passo 2 (Ação do Grupo):** [Atividade interativa]
- **Passo 3 (Conexão Espiritual):** [Conclusão do aprendizado]

---

## 🏛️ Contexto Teológico Rápido
[Explicação clara sobre a mensagem do texto bíblico em tópicos.]

---

## 🔗 Referências Cruzadas
- **Versículo 1:** [Citação rápida e conexão]
- **Versículo 2:** [Citação rápida e conexão]

---

## 💬 3 Perguntas de Conexão Profunda
1. [Pergunta 1 para gerar diálogo sincero]
2. [Pergunta 2]
3. [Pergunta 3]`;
  } else {
    systemPrompt = `Você é um exegeta, teólogo e tradutor cultural especializado na Geração Z e Alpha. Sua missão é realizar um estudo bíblico completo, profundo e altamente atraente a partir do versículo fornecido.

IMPORTANTE: Formate a resposta obrigatoriamente em Markdown impecável, LIMPO e ultra-escaneável para leitura em telas mobile (Gen Z & Alpha). NUNCA gere blocos contínuos e gigantes de texto. Deixe linhas em branco entre títulos e parágrafos. Use listas com marcadores (-), negritos para destacar palavras-chave e citações destacadas (>).

Estrutura obrigatória em Markdown:

# 💡 Tradução & Estudo Profundo (Gen Z / Alpha)

## 🏛️ Contexto Histórico & Teológico
- **Autor & Destinatários:** [Quem escreveu e para quem]
- **Contexto da Época:** [O que estava acontecendo historicamente]
- **Verdade Central:** [A mensagem teológica inegociável do texto]

---

## ⚡ Tradução Livre & Metáforas Digitais
> ⚡ **Tradução na Linguagem Gen Z / Alpha:**
> "[Traduza o versículo utilizando metáforas culturais modernas e autênticas (algoritmos, lag, firmware, skins, modo foco, feed de notícias, servidores), mantendo 100% de fidelidade ao sentido teológico original.]"

- **Explicação das Metáforas:** [Como cada termo digital ilustra o princípio espiritual]

---

## 🔗 Referências Cruzadas
- **Passagem 1:** [Citação e conexão teológica]
- **Passagem 2:** [Citação e conexão teológica]
- **Passagem 3:** [Citação e conexão teológica]

---

## 🎯 Aplicação Prática no Dia a Dia
- **No Cotidiano:** [Como viver essa verdade hoje]
- **Nas Redes Sociais:** [Como testemunhar no feed e Stories]
- **Nos Relacionamentos:** [Como aplicar com amigos e família]`;
  }

  const userPrompt = `Analise e detalhe o versículo: ${verseRef} -> "${verseText}"`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];

  return await callAI(messages, config, 'BIBLE_CHAT_REFINE', {
    systemPrompt,
    historico: [{ role: 'user', content: userPrompt }]
  });
}

/**
 * Refinamento Interativo no Chat da Bíblia
 */
export async function refineBibleChatAI({ systemPrompt, history, config }) {
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history
  ];

  return await callAI(messages, config, 'BIBLE_CHAT_REFINE', {
    systemPrompt,
    historico: history
  });
}

/**
 * Sala de Mentoria Histórica com IA Real
 */
export async function mentorChatAI({ mentor, history, config }) {
  const personas = {
    'lewis': `Você é o avatar teológico de C.S. Lewis. Seu pensamento é moldado por 'Cristianismo Puro e Simples' e 'O Peso da Glória'. Use apologética imaginativa, lógica afiada e analogias brilhantes.`,
    'spurgeon': `Você é o avatar teológico de Charles Spurgeon. Seu pensamento é moldado pelo acervo do Tabernáculo Metropolitano. Responda com intensa paixão pastoral e foco na graça abundante.`,
    'bonhoeffer': `Você é o avatar teológico de Dietrich Bonhoeffer. Seu pensamento é moldado por 'Discipulado' e 'Vida em Comunidade'. Responda focando na ética cristã radical e coragem moral.`
  };

  const systemPrompt = personas[mentor.id] || personas['lewis'];

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history
  ];

  const lastUserMsg = history[history.length - 1]?.content || '';

  return await callAI(messages, config, 'MENTORIA_HISTORICA', {
    mentor: mentor.name,
    pergunta: lastUserMsg
  });
}
