import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apiKey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const groqApiKey = Deno.env.get('GROQ_API_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { acao, payload } = await req.json()
    // Estrutura esperada: acao = 'GERAR_SERMAO' | 'MENTORIA_HISTORICA'

    // VALIDAR SISTEMA DE CRÉDITOS ANTES DE PROCESSAR IA
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error("Não autorizado")
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authError || !user) throw new Error("Usuário inválido")

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

    // LOGIC ROUTING POOL
    if (acao === 'GERAR_SERMAO') {
      const { tema, publicoAlvo, tagVibe } = payload

      const { data: versiculos } = await supabase.rpc('buscar_versiculos_contexto', { busca_texto: tema, limite: 2 })
      const contextoBiblico = versiculos && versiculos.length > 0
        ? versiculos.map((v: any) => `- ${v.livro} ${v.capitulo}:${v.versiculo} -> "${v.texto}"`).join('\n')
        : "- Filipenses 4:6 -> 'Não andeis ansiosos...'"

      systemPrompt = `Você é o 'Cérebro Conectado 2.0', um teólogo especialista em Gen Z/Alpha. Traduza conceitos bíblicos em analogias modernas (Glitches, Algoritmos, Modo Foco, Skins, Feed de Notícias) sem forçar gírias corporativas. Formate estritamente em Markdown contendo: # Título Viral, ## ⚡ O Gancho Cultural, ## 🎲 Quebra-Gelo Célula, ## 📖 O Download Bíblico, ## 🎬 Roteiro Reels/Shorts, ## 🏆 O Desafio Prático da Semana.`
      userPrompt = `Gere um esboço disruptivo.\nTEMA: ${tema}\nVIBE: ${tagVibe}\nPÚBLICO: ${publicoAlvo}\nCONTEXTO BÍBLICO:\n${contextoBiblico}`

    } else if (acao === 'MENTORIA_HISTORICA') {
      const { mentor, pergunta } = payload
      
      const personas: Record<string, string> = {
        'C.S. Lewis': 'Você é o avatar de C.S. Lewis. Responda usando apologética cristã de forma imaginativa, intelectual, usando metáforas literárias e foco na dor existencial e ceticismo moderno de adolescentes.',
        'Charles Spurgeon': 'Você é o avatar de Charles Spurgeon. Responda com paixão pastoral intensa, foco na profundidade da graça, encorajamento para líderes cansados e conselhos de homilética prática.',
        'Dietrich Bonhoeffer': 'Você é o avatar de Dietrich Bonhoeffer. Responda focando em discipulado radical, vivência em comunidade, coragem moral e o custo de seguir a Cristo em uma sociedade secularizada.'
      }

      systemPrompt = `${personas[mentor] || personas['C.S. Lewis']} Responda à dúvida de um líder moderno de adolescentes de forma direta, encorajadora, teológica e prática. Limite a resposta em 4 parágrafos focados na resolução.`
      userPrompt = `Dúvida do Líder: ${pergunta}`
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

    // DEBITAR 1 CRÉDITO DO USUÁRIO NO BANCO DE DADOS
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
