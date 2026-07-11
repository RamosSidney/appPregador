-- Habilitar a extensão de busca semântica/vetorial
create extension if not exists vector;

-- 1. PERFIS DE USUÁRIOS (LÍDERES DE ADOLESCENTES)
create table public.perfis_jovens (
    id uuid references auth.users on delete cascade primary key,
    nome_completo text not null,
    username text unique not null,
    avatar_url text,
    creditos integer default 100 not null,
    nivel integer default 1 not null,
    xp integer default 0 not null,
    tipo_plano text default 'PREMIUM_ANUAL' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint creditos_nao_negativos check (creditos >= 0)
);

-- 2. HISTÓRICO E ARMAZENAMENTO DE SERMÕES GENERATIVOS
create table public.sermoes_salvos (
    id bigint generated always as identity primary key,
    usuario_id uuid references public.perfis_jovens(id) on delete cascade not null,
    titulo_viral text not null,
    tema_solicitado text not null,
    referencia_pop text,
    conteudo_markdown text not null,
    favorito boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. BÍBLIA NATIVA INTEGRADA (Linguagem Simplificada para Cópia e Consulta)
create table public.biblia_nativa (
    id bigint generated always as identity primary key,
    testamento text not null, -- 'AT' ou 'NT'
    livro text not null,       -- Ex: 'João'
    capitulo integer not null,
    versiculo integer not null,
    texto text not null,
    embedding vector(384)     -- Permite busca semântica por dores de adolescentes futuramente
);

-- 4. SALA DE MENTORIA HISTÓRICA (Logs de Conversas com Avatares Teológicos)
create table public.mentoria_historica_chats (
    id bigint generated always as identity primary key,
    usuario_id uuid references public.perfis_jovens(id) on delete cascade not null,
    mentor_nome text not null, -- 'C.S. Lewis', 'Spurgeon', 'Bonhoeffer'
    pergunta_lider text not null,
    resposta_ia text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. TRILHAS DE MICROLEARNING (Capacitação e Gamificação)
create table public.trilhas_treinamento (
    id bigint generated always as identity primary key,
    titulo text not null,
    descricao text not null,
    categoria text not null, -- 'Crises Atuais', 'Oratória', 'Dinâmicas'
    conteudo_texto text not null,
    xp_recompensa integer default 50 not null
);

create table public.progresso_treinamento (
    id bigint generated always as identity primary key,
    usuario_id uuid references public.perfis_jovens(id) on delete cascade not null,
    trilha_id bigint references public.trilhas_treinamento(id) on delete cascade not null,
    concluido boolean default true not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(usuario_id, trilha_id)
);

-- FUNÇÃO RPC: Busca Rápida na Bíblia por Correspondência de Texto
create or replace function buscar_versiculos_contexto(busca_texto text, limite integer default 3)
returns table (livro text, capitulo integer, versiculo integer, texto text) 
language plpgsql as $$
begin
    return query
    select v.livro, v.capitulo, v.versiculo, v.texto
    from public.biblia_nativa v
    where v.texto ilike '%' || busca_texto || '%' limit limite;
end;
$$;

-- ATIVAÇÃO DO SECURITY ECOSYSTEM (Row Level Security)
alter table public.perfis_jovens enable row level security;
alter table public.sermoes_salvos enable row level security;
alter table public.mentoria_historica_chats enable row level security;
alter table public.progresso_treinamento enable row level security;

create policy "Self select profile" on public.perfis_jovens for select using (auth.uid() = id);
create policy "Self manage sermoes" on public.sermoes_salvos for all using (auth.uid() = usuario_id);
create policy "Self manage mentoria" on public.mentoria_historica_chats for all using (auth.uid() = usuario_id);
create policy "Self manage progresso" on public.progresso_treinamento for all using (auth.uid() = usuario_id);
create policy "Public read biblia" on public.biblia_nativa for select using (true);
create policy "Public read trilhas" on public.trilhas_treinamento for select using (true);
