import pg from 'pg';

const connectionString = 'postgresql://postgres:apppregador2026@db.ugdwufgqynflywqmfmus.supabase.co:5432/postgres';

const VERSICULOS_MOCK = [
  { testamento: 'NT', livro: 'João', capitulo: 3, versiculo: 16, texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { testamento: 'NT', livro: 'Filipenses', capitulo: 4, versiculo: 6, texto: 'Não andeis ansiosos por coisa alguma; antes em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ações de graças.' },
  { testamento: 'AT', livro: 'Josué', capitulo: 1, versiculo: 9, texto: 'Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore, nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar.' }
];

// Helper to generate a dummy 384-dimensional vector
function generateDummyVector() {
  const vec = [];
  for (let i = 0; i < 384; i++) {
    // Generate small float values
    vec.push((Math.random() * 2 - 1) * 0.05);
  }
  // Normalize vector
  const len = Math.sqrt(vec.reduce((sum, v) => sum + v*v, 0));
  return vec.map(v => v / len);
}

async function executarIngestao() {
  console.log("🚀 Conectando ao Banco de Dados Postgres diretamente...");
  const client = new pg.Client({ connectionString });
  await client.connect();

  console.log(`🚀 Iniciando processamento de ${VERSICULOS_MOCK.length} versículos...`);

  // Clear existing bible entries to prevent duplicates
  await client.query('TRUNCATE TABLE public.biblia_nativa CASCADE');

  for (const item of VERSICULOS_MOCK) {
    try {
      // 1. Gera o vetor de 384 dimensões
      const embeddingArray = generateDummyVector();

      // Converte o array para string formatada de vetor Postgres '[x, y, z]'
      const embeddingString = `[${embeddingArray.join(',')}]`;

      // 2. Insere os dados tratados no banco
      await client.query(
        'INSERT INTO public.biblia_nativa (testamento, livro, capitulo, versiculo, texto, embedding) VALUES ($1, $2, $3, $4, $5, $6)',
        [item.testamento, item.livro, item.capitulo, item.versiculo, item.texto, embeddingString]
      );

      console.log(`✅ Salvo com sucesso: ${item.livro} ${item.capitulo}:${item.versiculo}`);

    } catch (err) {
      console.error(`❌ Falha ao processar o versículo ${item.livro}:`, err.message);
    }
  }

  await client.end();
  console.log("🏁 Ingestão concluída com sucesso!");
}

executarIngestao();
