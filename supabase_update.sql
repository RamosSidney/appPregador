-- =========================================================================
-- UPDATE: ALTERAÇÕES NA TABELA PERFIS_JOVENS (Segurança, B2B e LGPD)
-- =========================================================================
alter table public.perfis_jovens 
add column if not exists aceitou_termos_lgpd boolean default false not null,
add column if not exists anonimizado boolean default false not null,
add column if not exists data_consentimento timestamp with time zone default timezone('utc'::text, now()) not null,
add column if not exists subscription_status text default 'free_trial' not null, -- 'active', 'past_due', 'canceled'
add column if not exists expires_at timestamp with time zone, -- Data limite da assinatura anual
add column if not exists lider_master_id uuid references auth.users(id) on delete set null; -- Para o modelo Multi-Licenças B2B

-- =========================================================================
-- UPDATE: ALTERAÇÕES NA TABELA SERMOES_SALVOS E MENTORIA
-- =========================================================================
alter table public.sermoes_salvos 
add column if not exists tipo_assistente_ia text default 'cultura_pop' not null; -- 'pop', 'textual', 'expositivo', 'quebra_gelo'

-- =========================================================================
-- NOVA TABELA: CONTROLE FINANCEIRO E TRANSAÇÕES (PIX / CARTÃO)
-- =========================================================================
create table if not exists public.transacoes_financeiras (
    id bigint generated always as identity primary key,
    usuario_id uuid references public.perfis_jovens(id) on delete cascade not null,
    gateway_id text unique not null, -- ID do pagamento gerado no Asaas, Kiwify ou Stripe
    metodo_pagamento text not null,  -- 'pix', 'credit_card'
    status_pagamento text not null,  -- 'approved', 'pending', 'refunded'
    valor_centavos integer not null, -- Preço pago (R$ 197,00 = 19700)
    creditos_injetados integer not null, -- Quantidade de raios adicionados na transação
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativar RLS na nova tabela financeira
alter table public.transacoes_financeiras enable row level security;

create policy "Usuários vêem apenas suas próprias transações"
    on public.transacoes_financeiras for select
    to authenticated
    using (auth.uid() = usuario_id);
