// Data enrichment helper for Academia RPG de Comunicadores (appPregador 2.0)
// Provides rich practical examples, sermon outlines, Gen Z/Alpha metaphors, opening hooks, and communication guides.

export const ENRICHED_MODULE_EXAMPLES = {
  // Gen Alpha
  'ga-mod-1': {
    sermonIllustration: {
      title: "O Experimento da Lanterna e da Bateria",
      story: "Certo dia, um menino ganhou um brinquedo incrível, mas ao tentar ligar no escuro, nada aconteceu. O pai abriu o compartimento e mostrou: 'Ele precisa estar conectado à fonte certa de energia'. Assim como a bateria alimenta o brinquedo, o Espírito Santo alimenta o nosso coração.",
      outline: [
        "1. Sem bateria (sem Deus), ficamos no escuro e travados.",
        "2. Conectados à Fonte (oração e Bíblia), nossa luz brilha.",
        "3. Missão: Iluminar o caminho dos amigos na escola."
      ]
    },
    openingHooks: [
      "⚡ 'Você sabia que seu cérebro toma decisões mais rápido que um clique no Roblox? Mas existe algo que decide antes de tudo...'",
      "🎨 'Imagine se o mundo ficasse sem cor de repente. É exatamente isso que acontece quando a gente esquece de ser grato.'",
      "🚀 'Se você pudesse escolher um superpoder real hoje, qual seria? A Bíblia mostra que nós já temos um ativado!'"
    ],
    genZMetaphors: [
      "🎮 'Servidor Privado': A oração é como um canal exclusivo de comunicação direta com Deus, sem lag e sem cair a conexão.",
      "🔋 'Modo Economia de Bateria': Quando vivemos no automático sem buscar a Deus, ficamos fracos e lentos.",
      "🛡️ 'Shield de Proteção': A Verdade de Deus age como um firewall que bloqueia pensamentos ruins e mentiras."
    ],
    communicationGuide: {
      tone: "Entusiasta, dinâmico e expressivo. Use variações de ritmo.",
      bodyLanguage: "Gestos amplos, nível dos olhos das crianças (agachar-se quando necessário).",
      callToAction: "Desafio da semana: 'Missão do Guardião da Luz' — fazer uma ação de bondade em casa."
    }
  },
  'ga-mod-2': {
    sermonIllustration: {
      title: "O Escudo do Cavaleiro Gamer",
      story: "Um jogador montou uma armadura lendária no jogo, mas esqueceu o capacete. No primeiro ataque, perdeu o jogo. Na vida real, a Armadura de Deus (Efésios 6) nos protege inteiros contra as mentiras do inimigo.",
      outline: [
        "1. Capacete da Salvação: Protege nossos pensamentos.",
        "2. Escudo da Fé: Bloqueia as flechas de dúvida.",
        "3. Espada do Espírito: A Palavra de Deus para vencer o mal."
      ]
    },
    openingHooks: [
      "👾 'Qual é o item mais poderoso que você já conquistou em um jogo? Hoje vou te mostrar um item que funciona no mundo real!'",
      "🛡️ 'Você já tentou jogar sem proteção no chefe final? É impossível. E por que tentamos viver sem a Armadura de Deus?'"
    ],
    genZMetaphors: [
      "⚔️ 'Loot Lendário': A sabedoria bíblica é o melhor equipamento de vida.",
      "📶 'Pings & Alertas': O Espírito Santo nos dá alertas no coração quando algo é perigoso."
    ],
    communicationGuide: {
      tone: "Aventureiro e cativante.",
      bodyLanguage: "Demonstrar movimentos de defesa e conquista de forma lúdica.",
      callToAction: "Oração em dupla para vestir a armadura da fé."
    }
  },

  // Gen Z
  'gz-mod-1': {
    sermonIllustration: {
      title: "A Crise da Tela Espelhada (Validação vs Identidade)",
      story: "Uma jovem passava 4 horas por dia editando fotos para parecer impecável. Em um acampamento sem sinal de celular, ela chorou ao perceber que ninguém ali a julgava. Ela descobriu que o Criador já a havia aprovado na cruz sem filtros.",
      outline: [
        "1. A ditadura do algoritmo: Buscar aprovação humana exaure a alma.",
        "2. A Cruz como espelho real: Você é amado antes de produzir qualquer conteúdo.",
        "3. Vivendo em liberdade: Trocar a busca por likes pela presença de Deus."
      ]
    },
    openingHooks: [
      "📲 'Se o seu tempo de tela falasse sobre quem você realmente é, o que ele diria?'",
      "🔥 'Por que a gente se sente tão cansado mesmo quando passa o dia inteiro parado olhando pro celular?'",
      "💔 'Você já sentiu que está cercado de seguidores, mas totalmente sozinho no seu quarto?'"
    ],
    genZMetaphors: [
      "☁️ 'Cloud Sync': A nossa mente precisa sincronizar com a mente de Cristo diariamente.",
      "⚠️ 'Algoritmo de Feed': O que você alimenta no seu coração é o que a sua vida vai sugerir.",
      "🔄 'Recalculando Rota': O arrependimento bíblico é como um GPS recalculando o caminho certo."
    ],
    communicationGuide: {
      tone: "Autêntico, empático, sem tom moralista ou acusatório.",
      bodyLanguage: "Postura aberta, contato visual direto e sem pedestal.",
      callToAction: "Momento de entrega sincera no altar: desligar o ruído e ouvir o Pai."
    }
  }
};

// Generic Fallback Enrichment Generator for modules that don't have hardcoded custom definitions
export function getEnrichedContentForModule(module, trail) {
  const custom = ENRICHED_MODULE_EXAMPLES[module.id];
  if (custom) return custom;

  // Generate high quality tailored dynamic content based on title, subtitle, and category
  return {
    sermonIllustration: {
      title: `Ilustração Prática: ${module.title.replace(/^Módulo \d+:\s*/, '')}`,
      story: `Imagine uma situação em que uma pessoa tenta resolver um dilema moderno apenas com sabedoria humana. Ela se desgasta, tenta várias estratégias, mas o resultado continua inconsistente. Somente quando ela aplica a base teológica de "${module.title}", alinhando coração e prática, a verdadeira transformação acontece.`,
      outline: [
        `1. O Diagnóstico: Compreender a necessidade real revelada em "${module.subtitle}".`,
        `2. O Princípio Bíblico: Aplicar a verdade de Deus como fundamento inegociável.`,
        `3. A Aplicação no Cotidiano: Transformar o conhecimento em ação prática diária.`
      ]
    },
    openingHooks: [
      `💥 'E se tudo o que você aprendeu sobre este assunto estivesse focado no ângulo errado? Deixe-me mostrar uma perspectiva que muda tudo em 30 segundos.'`,
      `🎯 'Você já reparou como a maior parte das pessoas falha exatamente no ponto onde acha que é mais forte? É sobre isso que vamos falar hoje.'`,
      `🚀 'Qual é a diferença entre um comunicador comum e alguém que realmente transforma vidas ao falar? A resposta está neste princípio...'`
    ],
    genZMetaphors: [
      `🌐 'Update de Sistema': Renovar a mente (Romanos 12:2) é como atualizar a versão do sistema operacional para rodar sem bugs.`,
      `📡 'Sinal HD': Ter clareza na mensagem espiritual é como transmitir em alta definição sem interferências.`,
      `🧩 'Peça de Encaixe Perfect Match': A mensagem correta na hora certa encaixa perfeitamente na necessidade do ouvinte.`
    ],
    communicationGuide: {
      tone: "Convicto, inspirador, com excelente ritmo articulado.",
      bodyLanguage: "Mãos visíveis no campo neutro, pausas dramáticas intencionais antes das conclusões.",
      callToAction: "Pergunte ao público: 'Qual decisão você vai tomar hoje baseado nesta verdade?' e conduza à oração de resposta."
    }
  };
}
