import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apiKey, content-type',
}

serve(async (req) => {
  // Trata requisições OPTIONS (CORS Preflight)
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  // Garantir que é uma requisição POST vinda do Gateway de Pagamento
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), { status: 405 })
  }

  try {
    // 1. Inicializar o Supabase Client com a SERVICE_ROLE
    // ATENÇÃO: É obrigatório usar a SERVICE_ROLE aqui para conseguir burlar o RLS e atualizar os créditos e planos de forma segura por trás dos panos.
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 2. Capturar o corpo da requisição enviada pelo Gateway de Pagamento
    const body = await req.json()

    // -------------------------------------------------------------------------
    // MAPEAMENTO DE DADOS (Adaptável de acordo com o seu Gateway - Ex: Asaas, Kiwify)
    // -------------------------------------------------------------------------
    // A maioria dos gateways envia um evento indicando o status do pagamento e os dados do cliente.
    const evento = body.event || body.status; // Ex: 'PAYMENT_RECEIVED' ou 'approved'
    
    // IMPORTANTE: No momento de criar o checkout no gateway, você deve passar o ID do usuário do Supabase dentro dos metadados (metadata ou external_id).
    const usuarioId = body.payment?.metadata?.usuario_id || body.external_id || body.custom_id;
    const gatewayId = body.payment?.id || body.order_id || body.id;
    const metodoPagamento = body.payment?.billingType?.toLowerCase() || body.payment_method || 'pix';
    const valorCentavos = Math.round((body.payment?.value || body.amount || 0) * 100);

    // Se o evento não for de sucesso/aprovado, apenas ignore e retorne 200 para o gateway
    const eventosSucesso = ['PAYMENT_RECEIVED', 'approved', 'payment_intent.succeeded', 'paid'];
    if (!eventosSucesso.includes(evento)) {
      return new Response(JSON.stringify({ message: 'Evento recebido, mas nenhuma ação necessária.' }), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!usuarioId) {
      throw new Error('ID do usuário não encontrado nos metadados do webhook.');
    }

    // -------------------------------------------------------------------------
    // DEFINIÇÃO DA RECOMPENSA / PRODUTO COMPRADO
    // -------------------------------------------------------------------------
    // Define quantos créditos injetar com base no valor pago ou no ID do produto
    let creditosParaInjetar = 100; // Valor padrão (Plano Premium Anual)
    let atualizarPlano = true;

    if (valorCentavos < 5000) {
      // Se pagou menos de R$ 50,00, provavelmente comprou um pacote menor de recarga
      creditosParaInjetar = 30; 
      atualizarPlano = false; // Não renova a assinatura anual, apenas adiciona saldo
    }

    // -------------------------------------------------------------------------
    // PROCESSAMENTO NO BANCO DE DADOS (TRANSAÇÃO ROBUSTA)
    // -------------------------------------------------------------------------
    
    // 1. Verificar se esta transação já foi processada antes (Evita duplicidade de créditos)
    const { data: transacaoExistente } = await supabase
      .from('transacoes_financeiras')
      .select('id')
      .eq('gateway_id', gatewayId)
      .single()

    if (transacaoExistente) {
      return new Response(JSON.stringify({ message: 'Transação já processada anteriormente.' }), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      })
    }

    // 2. Buscar os créditos atuais do usuário para somar
    const { data: perfil, error: erroPerfil } = await supabase
      .from('perfis_jovens')
      .select('creditos')
      .eq('id', usuarioId)
      .single()

    if (erroPerfil || !perfil) throw new Error('Perfil do usuário não encontrado no Supabase.');

    const novoSaldoCreditos = perfil.creditos + creditosParaInjetar;

    // 3. Atualizar o Perfil do Usuário (Créditos e Data de Expiração da Assinatura)
    const dadosAtualizacao: any = {
      creditos: novoSaldoCreditos
    };

    if (atualizarPlano) {
      const dataExpiracao = new Date();
      dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 1); // +1 ano de acesso Premium

      dadosAtualizacao.subscription_status = 'active';
      dadosAtualizacao.tipo_plano = 'PREMIUM_ANUAL';
      dadosAtualizacao.expires_at = dataExpiracao.toISOString();
    }

    const { error: erroUpdatePerfil } = await supabase
      .from('perfis_jovens')
      .update(dadosAtualizacao)
      .eq('id', usuarioId)

    if (erroUpdatePerfil) throw erroUpdatePerfil;

    // 4. Salvar o registro na tabela financeira para fins de auditoria e segurança
    const { error: erroTransacao } = await supabase
      .from('transacoes_financeiras')
      .insert({
        usuario_id: usuarioId,
        gateway_id: gatewayId,
        metodo_pagamento: metodoPagamento,
        status_pagamento: 'approved',
        valor_centavos: valorCentavos,
        creditos_injetados: creditosParaInjetar
      })

    if (erroTransacao) throw erroTransacao;

    // Retorno de sucesso absoluto para o Gateway de pagamento interromper as tentativas de envio
    return new Response(JSON.stringify({ success: true, message: `Créditos injetados com sucesso. Novo saldo: ${novoSaldoCreditos}` }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error: any) {
    // Retorna erro 500 para fazer o gateway tentar reenviar o webhook mais tarde caso caia o servidor
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
