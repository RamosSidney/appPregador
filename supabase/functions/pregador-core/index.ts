import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apiKey, content-type',
}

// 🛡️ MEMÓRIA EM CACHE VOLÁTIL PARA FIREWALL DE REQUISIÇÕES (In-Memory IP Tracker)
const cacheControleAcesso = new Map<string, number[]>();

const WINDOW_MS = 60 * 1000;  // Janela de abuso: 1 minuto
const MAX_REQUESTS = 3;       // Limite estrito: Máximo de 3 requisições por minuto por usuário

function verificarBloqueioPorAbuso(chaveIdentificadora: string): boolean {
  const agora = Date.now();
  const historicoChamadas = cacheControleAcesso.get(chaveIdentificadora) || [];
  const chamadasValidas = historicoChamadas.filter(timestamp => agora - timestamp < WINDOW_MS);
  
  if (chamadasValidas.length >= MAX_REQUESTS) {
    return true;
  }

  chamadasValidas.push(agora);
  cacheControleAcesso.set(chaveIdentificadora, chamadasValidas);
  return false;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // 1. Extração de Identificadores de Rede para Segurança
  const ipCliente = req.headers.get("x-forwarded-for") || "IP_DESCONHECIDO";

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const groqApiKey = Deno.env.get('GROQ_API_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // 2. Extração e Validação do Token JWT do Usuário Autenticado
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error("Não autorizado")
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authError || !user) throw new Error("Usuário inválido")

    // 3. APLICAÇÃO DO FIREWALL ANTI-DDOS
    const chaveSeguranca = `${user.id}_${ipCliente}`;
    if (verificarBloqueioPorAbuso(chaveSeguranca)) {
      return new Response(JSON.stringify({ 
        error: '🚨 Alerta de Abuso: Limite de requisições excedido. Aguarde 1 minuto para tentar novamente.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { acao, payload } = await req.json()

    // 4. VALIDAÇÃO DE SALDO DE CRÉDITOS NO BANCO DE DADOS
    const { data: perfil, error: perfilError } = await supabase
      .from('perfis_jovens')
      .select('creditos')
      .eq('id', user.id)
      .single()

    if (perfilError || !perfil || perfil.creditos <= 0) {
      return new Response(JSON.stringify({ error: 'Créditos insuficientes. Adquira mais no painel.' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    let respostaIA = ""
    let systemPrompt = ""
    let userPrompt = ""

    // 5. PROCESSAMENTO SEGURO DA INTELIGÊNCIA ARTIFICIAL (GROQ API)
    if (acao === 'GERAR_SERMAO') {
      const { tema, publicoAlvo, tagVibe } = payload

      const { data: versiculos } = await supabase.rpc('buscar_versiculos_contexto', { busca_texto: tema, limite: 2 })
      const contextoBiblico = versiculos && versiculos.length > 0
        ? versiculos.map((v: any) => `- ${v.livro} ${v.capitulo}:${v.versiculo} -> "${v.texto}"`).join('\n')
        : "- Filipenses 4:6 -> 'Não andeis ansiosos...'"

      systemPrompt = `Você é o 'Cérebro Conectado 2.0', um teólogo especialista em Gen Z/Alpha. Traduza conceitos bíblicos em analogias modernas (Glitches, Algoritmos, Modo Foco, Skins, Feed de Notícias) sem forçar gírias corporativas. Formate estritamente em Markdown contendo: # Título Viral, ## ⚡ O Gancho Cultural, ## 🎲 Quebra-Gelo Célula, ## 📖 O Download Bíblico, ## 🎬 Roteiro Reels/Shorts, ## 🏆 O Desafio Prático da Semana.`
      userPrompt = `Gere um esboço disruptivo.\nTEMA: ${tema}\nVIBE: ${tagVibe}\nPÚBLICO: ${publicoAlvo}\nCONTEXTO BÍBLICO:\n${contextoBiblico}`

    } else if (acao === 'MENTORIA_HISTORICA') {
      const { mentor, pergunta } = payload;

      // 1. Busca trechos das obras públicas salvas na tabela de trilhas ou citações baseadas na dúvida do líder
      // Isso traz do banco de dados o conteúdo real e fiel escrito pelos teólogos
      const { data: trechosObras } = await supabase
        .from('trilhas_treinamento')
        .select('conteudo_texto, titulo')
        .eq('categoria', 'Obras Públicas')
        .ilike('conteudo_texto', `%${pergunta.substring(0, 10)}%`) // Busca rápida por palavra-chave
        .limit(2);

      // Estrutura os fragmentos de livros reais para injetar no cérebro da IA
      const contextoLivrosReais = trechosObras && trechosObras.length > 0
        ? trechosObras.map((o: any) => `[Obra: ${o.titulo}] -> "${o.conteudo_texto}"`).join('\n')
        : "Use seus conhecimentos baseados estritamente na literatura ortodoxa original do autor.";

      // 2. Personas com direcionamento de acervo bibliográfico específico
      const personas: Record<string, string> = {
        'C.S. Lewis': `Você é o avatar teológico de C.S. Lewis. Seu pensamento é moldado pelas obras 'Cristianismo Puro e Simples', 'O Peso da Glória' e 'A Abolição do Homem'. Responda usando apologética imaginativa, lógica afiada, analogias literárias e lidando com o ceticismo de forma intelectual.`,
        'Charles Spurgeon': `Você é o avatar teológico de Charles Spurgeon. Seu pensamento é moldado pelo acervo de sermões do 'Tabernáculo Metropolitano' e pela obra 'Lições aos meus Alunos'. Responda com intensa paixão pastoral, foco na suficiência da graça e encorajamento prático para líderes cansados.`,
        'Dietrich Bonhoeffer': `Você é o avatar teológico de Dietrich Bonhoeffer. Seu pensamento é moldado pelas obras 'Discipulado' e 'Vida em Comunidade'. Responda focando na ética cristã radical, centralidade de Cristo na comunidade e coragem moral.`
      };

      // 3. Prompt do Sistema Blindado contra alucinações
      systemPrompt = `${personas[mentor] || personas['C.S. Lewis']} 
      DIRETRIZ OBRIGATÓRIA: Para formular sua resposta ao líder de adolescentes, você deve se basear prioritariamente nos fragmentos e citações das suas obras reais fornecidos no contexto abaixo. Se usar conhecimento externo do seu treinamento, garanta que ele seja 100% fiel à sua bibliografia histórica oficial. Nunca invente citações que você não escreveu. Limite-se a 3 ou 4 parágrafos diretos e pastorais.`;

      // 4. Prompt do Usuário amarrando a dúvida ao acervo
      userPrompt = `CONTEXTO REAL DO SEU ACERVO BIBLIOGRÁFICO:
      ${contextoLivrosReais}
      
      DÚVIDA DO LÍDER DE ADOLESCENTES ATUAL:
      "${pergunta}"
      
      Formule sua resposta direcionada a este líder. Se aplicável, cite em qual de suas obras ou linhas de pensamento esse conselho se fundamenta.`;
    }

    // DISPARO DO MOTOR DA GROQ (LLAMA 3.1 70B DE GRAÇA)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${groqApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        temperature: 0.7,
        max_tokens: 1500
      })
    })

    const groqData = await groqResponse.json()
    respostaIA = groqData.choices[0].message.content

    // 6. DEBITAR 1 CRÉDITO DO USUÁRIO NO BANCO DE DADOS
    await supabase.from('perfis_jovens').update({ creditos: perfil.creditos - 1 }).eq('id', user.id)

    // SALVAR LOGS CASO SEJA MENTORIA
    if (acao === 'MENTORIA_HISTORICA') {
      await supabase.from('mentoria_historica_chats').insert({
        usuario_id: user.id, mentor_nome: payload.mentor, pergunta_lider: payload.pergunta, resposta_ia: respostaIA
      })
    }

    return new Response(JSON.stringify({ resultado: respostaIA, novosCreditos: perfil.creditos - 1 }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
