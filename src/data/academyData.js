// Data registry for Academia RPG de Comunicadores (appPregador 2.0)

export const ACADEMY_TRAILS = [
  {
    id: 'gen-alpha',
    title: 'Trilha 1: Gen Alpha',
    subtitle: 'Comunicação, Discipulado e Mentoria para Crianças de 0 a 12 Anos',
    category: 'Gerações & Cultura',
    badge: '👶 Insígnia Alpha Visionary',
    icon: 'Baby',
    color: 'from-cyan-500 to-blue-600',
    modules: [
      {
        id: 'ga-mod-1',
        title: 'Módulo 1: Conhecendo a Gen Alpha',
        subtitle: 'Comportamento, consumo visual e linguagem na infância hiperdigital',
        xp: 50,
        contextoPratico: `
          <h3>📱 A Primeira Geração 100% Digital</h3>
          <p>A Geração Alpha (nascidos a partir de 2010) é a primeira a viver totalmente imersa em telas sensíveis ao toque, inteligência artificial e plataformas imersivas como Roblox e Minecraft. O tempo de atenção deles é altamente visual, ágil e estimulado por gamificação.</p>
          <p><strong>Bases Teológicas & Psicológicas:</strong> "Instrui a criança no caminho em que deve andar..." (Provérbios 22:6). Crianças da Gen Alpha não aprendem por monólogos expositivos secos; elas aprendem por experiência narrativa e aprendizado prático (Learning by Doing).</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Púlpito Infantil & Conteúdo</h3>
          <ul>
            <li><strong>Ganchos Visuais Rápidos:</strong> Comece lições com elementos reais (objetos do dia a dia, ilusões de ótica ou metáforas visuais).</li>
            <li><strong>Linguagem Gamificada:</strong> Use conceitos como 'missões', 'conquistas' e 'poderes da fé' em vez de vocabulário arcaico.</li>
            <li><strong>Micro-histórias:</strong> Mantenha histórias bíblicas divididas em blocos curtos de 3 a 5 minutos.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual é a principal característica comportamental da Geração Alpha no consumo de informação?",
            options: [
              "Preferência por leituras longas sem ilustrações",
              "Consumo altamente visual, ágil e estimulado por experiências interativas",
              "Desinteresse total por tecnologia e robótica",
              "Facilidade com monólogos teológicos estáticos de 50 minutos"
            ],
            correctIndex: 1,
            explanation: "A Gen Alpha nasceu na era dos dispositivos touch e ambientes imersivos, respondendo melhor a estímulos visuais e dinâmicos."
          },
          {
            question: "Segundo Provérbios 22:6 aplicado à pedagogia infantil moderna, como a criança deve ser ensinada?",
            options: [
              "Com punições severas e sem espaço para perguntas",
              "Considerando seu contexto, linguagem e experiência de vida",
              "Apenas memorizando versículos sem entender a aplicação",
              "Isolando-a completamente de qualquer interação comunitária"
            ],
            correctIndex: 1,
            explanation: "Instruir no caminho significa comunicar a Verdade bíblica na linguagem que faz sentido no universo de desenvolvimento da criança."
          },
          {
            question: "Qual plataforma é um exemplo clássico de ambiente imersivo frequentado pela Gen Alpha?",
            options: [
              "Orkut",
              "Roblox",
              "Teletexto",
              "Enciclopédia Barsa"
            ],
            correctIndex: 1,
            explanation: "Plataformas como Roblox e Minecraft são espaços centrais onde a Gen Alpha se conecta, joga e cria comunidades."
          },
          {
            question: "Para prender a atenção da Gen Alpha nos primeiros minutos de um ensino, qual recurso é mais eficaz?",
            options: [
              "Fazer uma introdução teórica de 15 minutos sem mudar o tom de voz",
              "Apresentar um elemento visual concreto ou objeto que desperte curiosidade",
              "Pedir que fiquem em silêncio absoluto sem dar explicação",
              "Ler uma lista extensa de nomes genealógicos"
            ],
            correctIndex: 1,
            explanation: "Um gancho visual imediato desperta o sistema de atenção da criança e gera engajamento no tema bíblico."
          },
          {
            question: "O conceito de 'Learning by Doing' (aprender fazendo) se manifesta no ministério infantil através de:",
            options: [
              "Atividades práticas, dinâmicas interativas e resolução de desafios em grupo",
              "Testes escritos individuais sem discussão",
              "Copiar textos da lousa em silêncio por horas",
              "Assistir a palestras sem nenhuma participação"
            ],
            correctIndex: 0,
            explanation: "A retenção de aprendizado na infância dobra quando as crianças participam ativamente da execução da lição."
          },
          {
            question: "Como transformar a comunicação teológica para crianças sem diluir o Evangelho?",
            options: [
              "Removendo a mensagem da cruz completamente",
              "Utilizando metáforas claras, linguagem acessível e aplicações do cotidiano infantil",
              "Usando apenas termos em latim e grego",
              "Substituindo a Bíblia por gibis seculares sem princípios cristãos"
            ],
            correctIndex: 1,
            explanation: "Comunicar com clareza não significa comprometer a Verdade, mas torna-la compreensível à capacidade cognitiva da faixa etária."
          },
          {
            question: "Qual é a duração ideal recomendada para cada bloco narrativo com a Gen Alpha?",
            options: [
              "30 a 45 minutos contínuos",
              "3 a 5 minutos dinâmicos intercalados com interação",
              "2 horas diretas",
              "Apenas 5 segundos"
            ],
            correctIndex: 1,
            explanation: "Intercalar blocos narrativos de 3 a 5 minutos com perguntas ou dinâmicas renova o foco de atenção infantil."
          },
          {
            question: "A Gen Alpha valoriza ambientes de aprendizado que oferecem:",
            options: [
              "Feedback rápido, conquistas visíveis e incentivo positivo",
              "Críticas constantes e ambiente autoritário",
              "Competição desleal e punição pública",
              "Passividade e isolamento"
            ],
            correctIndex: 0,
            explanation: "Elementos gamificados como conquistas e feedback positivo estimulam o sentimento de progresso e engajamento."
          },
          {
            question: "Na neurociência do aprendizado infantil, metáforas visuais funcionam porque:",
            options: [
              "Conectam conceitos abstratos (como a Graça) a objetos concretos conhecidos",
              "Cusam confusão mental deliberada",
              "Substituem o pensamento crítico pela memorização robótica",
              "Desestimulam o cérebro"
            ],
            correctIndex: 0,
            explanation: "O cérebro infantil constrói sinapses relacionando o desconhecido (espiritual) com o conhecido (material)."
          },
          {
            question: "Qual deve ser o papel dos pais e líderes no discipulado da Gen Alpha?",
            options: [
              "Delegar 100% da responsabilidade para vídeos no YouTube",
              "Serem mentores intencionais, presentes na jornada digital e física das crianças",
              "Proibir qualquer uso de tecnologia sem dar orientação",
              "Ignorar as perguntas morais e filosóficas feitas pelas crianças"
            ],
            correctIndex: 1,
            explanation: "Mentoria intencional combina limites saudáveis no ambiente digital com presença marcante no mundo real."
          }
        ]
      },
      {
        id: 'ga-mod-2',
        title: 'Módulo 2: Conectando com a Gen Alpha',
        subtitle: 'Pontes de comunicação através de histórias interativas e jogos',
        xp: 50,
        contextoPratico: `
          <h3>🎮 Storytelling Interativo & Métodos Narrativos</h3>
          <p>Para conectar com a Gen Alpha, o comunicador precisa dominar a arte do Storytelling Transmídia. Jesus usou parábolas usando sementes, redes de pesca e moedas – elementos cotidianos do século I. Hoje, nossas parábolas usam elementos do universo digital e do cotidiano moderno.</p>
          <p><strong>Cultura de Empatia:</strong> Em vez de rotular os jogos virtuais como inimigos, o líder inteligente utiliza os princípios dos jogos (missões coletivas, superação de desafios e cooperação) para ensinar valores bíblicos.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Púlpito infantil & Células</h3>
          <ul>
            <li><strong>Parábolas Modernas:</strong> Compare a armadura de Deus (Efésios 6) a equipamentos de proteção de heróis virtuais.</li>
            <li><strong>Desafios em Equipe:</strong> Crie 'missões semanais' onde as crianças praticam gentileza ou leitura bíblica em família.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Por que Jesus utilizava parábolas com elementos do cotidiano ao ensinar?",
            options: [
              "Porque não conhecia outros assuntos",
              "Para criar pontes culturais e tornar verdades espirituais acessíveis a todos",
              "Para dificultar o entendimento das multidões",
              "Para passar o tempo sem ensinar nada profundo"
            ],
            correctIndex: 1,
            explanation: "Jesus conectava realidades tangíveis (sementes, peixes) a mistérios do Reino para gerar revelação."
          },
          {
            question: "O que é o Storytelling Transmídia aplicado ao ensino infantil?",
            options: [
              "Usar diferentes formatos (vídeos, teatro, jogos e música) para contar a mesma Verdade bíblica",
              "Assistir televisão sem nenhuma reflexão bíblica",
              "Falar sobre a Bíblia apenas em livros sem ilustrações",
              "Proibir qualquer mídia nas aulas"
            ],
            correctIndex: 0,
            explanation: "Diversificar mídias e formatos enriquece a assimilação da mensagem em múltiplos canais sensoriais."
          },
          {
            question: "Ao abordar o tema da 'Armadura de Deus' (Efésios 6) para a Gen Alpha, qual analogia é muito eficaz?",
            options: [
              "Comparar aos escudos e itens de proteção de heróis e jogos que eles conhecem",
              "Dizer que a armadura era apenas metáfora militar romana ultrapassada",
              "Evitar o tema para não assustar as crianças",
              "Usar termos bélicos complexos do século I sem explicação"
            ],
            correctIndex: 0,
            explanation: "Relacionar com avatares e equipamentos conhecidos facilita o entendimento do combate espiritual no dia a dia."
          },
          {
            question: "Como incentivar a leitura bíblica diária na infância usando gamificação positiva?",
            options: [
              "Ameaçando com punições graves",
              "Criando planos de leitura com metas diárias, selos de conquista e incentivos comunitários",
              "Forçando a criança a ler 10 capítulos por dia de uma vez",
              "Pagando em dinheiro vivo para cada capítulo lido"
            ],
            correctIndex: 1,
            explanation: "Metas alcançáveis e celebrações comunitárias constroem o hábito com prazer e constância."
          },
          {
            question: "Qual atitude o comunicador DEVE EVITAR ao falar sobre tecnologia com crianças?",
            options: [
              "Demonizar toda a tecnologia sem ensinar discernimento espiritual",
              "Orientar sobre segurança online e limites de tempo",
              "Ensinar como usar mídias para espalhar o amor de Cristo",
              "Incentivar o diálogo aberto com os pais"
            ],
            correctIndex: 0,
            explanation: "Demonizar a tecnologia afasta as crianças. O correto é ensinar princípios bíblicos de sabedoria e discernimento."
          },
          {
            question: "Em uma dinâmica de célula infantil, o trabalho em equipe reforça qual princípio do Reino?",
            options: [
              "O corpo de Cristo e a cooperação mútua (1 Coríntios 12)",
              "A busca pela fama individual acima dos outros",
              "O egoísmo e o isolamento",
              "A competição destrutiva"
            ],
            correctIndex: 0,
            explanation: "Jogos e missões coletivas mostram na prática que cada membro tem uma função essencial na comunidade."
          },
          {
            question: "O que torna uma história inspiradora para uma criança da Gen Alpha?",
            options: [
              "Um protagonista com quem ela se identifique enfrentando desafios e vencendo pela fé em Deus",
              "Uma narrativa sem conflito algum",
              "Um discurso moralista sem personagens",
              "Histórias longas sem clímax"
            ],
            correctIndex: 0,
            explanation: "Identificação com o personagem e superação baseada na fé geram impacto emocional e memorização."
          },
          {
            question: "O uso de perguntas abertas durante o ensino infantil serve para:",
            options: [
              "Estimular o pensamento crítico, a participação e a verbalização da fé",
              "Testar quem sabe mais para envergonhar os outros",
              "Perder tempo de aula",
              "Confundir as crianças"
            ],
            correctIndex: 0,
            explanation: "Perguntas abertas provocam a reflexão pessoal e ajudam a criança a expressar o que compreendeu sobre Deus."
          },
          {
            question: "Como o líder pode transformar versículos bíblicos em desafios práticos da semana?",
            options: [
              "Desafiando as crianças a praticarem atos de amor e generosidade com amigos e família",
              "Exigindo que decorem a Bíblia inteira sem praticar",
              "Proibindo de conversar com colegas na escola",
              "Substituindo ações por apenas pensamentos isolados"
            ],
            correctIndex: 0,
            explanation: "A fé se torna viva quando a palavra decorada se transforma em atitude de amor no cotidiano."
          },
          {
            question: "Qual é o efeito do feedback encorajador no aprendizado infantil?",
            options: [
              "Aumenta a confiança espiritual e fortalece o desejo de aprender mais de Deus",
              "Causa soberba incontrolável",
              "Faz a criança desistir das aulas",
              "Não gera efeito algum"
            ],
            correctIndex: 0,
            explanation: "Palavras de incentivo e validação edificam a identidade da criança como filho amado de Deus."
          }
        ]
      },
      {
        id: 'ga-mod-3',
        title: 'Módulo 3: Liderando a Gen Alpha',
        subtitle: 'Discipulado infantil e mentoria na era hiperdigital',
        xp: 50,
        contextoPratico: `
          <h3>🛡️ Formação de Caráter & Raízes Espirituais</h3>
          <p>Discipular a Gen Alpha é fundamentá-los em verdades inabaláveis sobre sua identidade em Deus antes que o algoritmo das redes tente definir quem eles são. Na era da inteligência artificial, a inteligência espiritual e emocional torna-se o maior diferencial.</p>
          <p><strong>Parceria com as Famílias:</strong> A igreja local atua como catalisadora, mas o discipulado mais poderoso acontece no lar através do altar familiar renovado.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação Prática no Ministério</h3>
          <ul>
            <li><strong>Ferramentas de Apoio aos Pais:</strong> Crie guias rápidos no WhatsApp com perguntas para os pais conversarem com os filhos no carro ou no jantar.</li>
            <li><strong>Rituais de Passagem:</strong> Celebre marcos espirituais (batismo, primeira Bíblia, transição para o grupo de adolescentes).</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual é a maior ameaça à identidade das crianças na era hiperdigital?",
            options: [
              "Falta de brinquedos físicos",
              "Tendência dos algoritmos e cultura secular em definir seu valor por métricas externas",
              "Excesso de aulas de matemática na escola",
              "Acesso a livros de história bíblica"
            ],
            correctIndex: 1,
            explanation: "A aprovação virtual e métricas digitais tentam roubar a verdade de que a identidade vem de ser filho de Deus."
          },
          {
            question: "Onde deve ocorrer o ambiente primário de discipulado espiritual da criança?",
            options: [
              "Apenas nas aulas de 1 hora no domingo",
              "No lar, em parceria intencional entre família e igreja local",
              "Nas redes sociais sem supervisão",
              "Em acampamentos anuais uma vez por ano"
            ],
            correctIndex: 1,
            explanation: "Deuteronômio 6 ensina que a transmissão da fé deve acontecer no dia a dia da vida familiar."
          },
          {
            question: "Como a igreja pode equipar os pais para o discipulado diário?",
            options: [
              "Oferecendo recursos simples, devocionais práticos e roteiros de diálogo familiar",
              "Culpando os pais por não saberem teologia profunda",
              "Exigindo que os pais virem teólogos profissionais",
              "Ignorando a família e focando apenas na criança"
            ],
            correctIndex: 0,
            explanation: "Ferramentas práticas e acessíveis encorajam os pais a liderarem momentos devocionais leves e profundos em casa."
          },
          {
            question: "O que são 'Rituais de Passagem' no ministério infantil e qual sua relevância?",
            options: [
              "Festas seculares sem significado teológico",
              "Celebrações intencionais que marcam transições espirituais importantes fortalecendo a maturidade",
              "Provas eliminatórias que reprovam crianças",
              "Rituais arcaicos sem utilidade"
            ],
            correctIndex: 1,
            explanation: "Marcar transições (ex: receber a primeira Bíblia de estudos) gera senso de propósito e pertencimento espiritual."
          },
          {
            question: "Qual é o papel da inteligência emocional no discipulado da Gen Alpha?",
            options: [
              "Ajudar a criança a nomear emoções e levá-las a Deus em oração",
              "Ensinar a reprimir qualquer sentimento de tristeza",
              "Ignorar os sentimentos e focar apenas em regras rituais",
              "Dizer que sentir ansiedade é sinal de falta de salvação"
            ],
            correctIndex: 0,
            explanation: "Ensinar a entregar medos e emoções a Deus constrói resiliência espiritual e saúde mental desde a infância."
          },
          {
            question: "Como agir quando uma criança faz perguntas difíceis sobre fé ou sofrimento?",
            options: [
              "Repreender a criança por ter dúvidas",
              "Ouvir com empatia, responder de forma honesta na linguagem dela e pesquisar juntos na Bíblia",
              "Mudar de assunto rapidamente",
              "Dar uma resposta evasiva ou inventar histórias falsas"
            ],
            correctIndex: 1,
            explanation: "A acolhida sincera a dúvidas constrói uma fé firme que resistirá a questionamentos na juventude."
          },
          {
            question: "A cultura do Reino de Deus combate a mentalidade egoísta estimulando:",
            options: [
              "A generosidade, o serviço ao próximo e a compaixão",
              "O acúmulo individual de bens e seguidores",
              "A indiferença ao sofrimento alheio",
              "A busca por fama a qualquer custo"
            ],
            correctIndex: 0,
            explanation: "Jesus ensinou que o maior no Reino é aquele que serve a todos com alegria."
          },
          {
            question: "Por que a mentoria de líderes jovens para crianças mais novas é tão impactante?",
            options: [
              "Porque crianças se espelham em jovens referência que vivem a fé de maneira autêntica",
              "Porque economiza orçamento da igreja",
              "Porque os adultos não querem ensinar",
              "Não gera impacto algum"
            ],
            correctIndex: 0,
            explanation: "Exemplos próximos de idade servem como modelos tangíveis de que é possível ser jovem e seguir a Jesus com alegria."
          },
          {
            question: "Qual a importância de cultivar momentos de silêncio e oração contemplativa com a Gen Alpha?",
            options: [
              "Desacelerar o excesso de estímulos digitais e ensinar a ouvir a voz de Deus no secreto",
              "Fazer as crianças dormirem durante o culto",
              "Evitar que conversem na igreja",
              "Nenhuma importância"
            ],
            correctIndex: 0,
            explanation: "Aprender a desacelerar no secreto cultiva a intimidade com o Espírito Santo em um mundo barulhento."
          },
          {
            question: "Qual o objetivo final do discipulado da Gen Alpha?",
            options: [
              "Formar discípulos convictos de sua identidade em Cristo, aptos a transformar sua geração",
              "Manter as crianças ocupadas no prédio da igreja",
              "Criar cópias exatas de tradições sem entendimento",
              "Preparar atores para peças de teatro"
            ],
            correctIndex: 0,
            explanation: "O propósito supremo é gerar fé genuína, caráter cristão e paixão pelo Reino de Deus."
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual é a combinação fundamental para uma comunicação transformadora com a Geração Alpha?",
        options: [
          "Linguagem arcaica e regras rígidas sem explicação",
          "Storytelling visual, ganchos ágeis, verdades bíblicas profundas e parceria com o lar",
          "Substituir a Bíblia por jogos seculares sem valores cristãos",
          "Isolar as crianças da tecnologia e da sociedade"
        ],
        correctIndex: 1,
        explanation: "Conectar clareza pedagógica com fidelidade às Escrituras e presença familiar é a chave do impacto na Gen Alpha."
      },
      {
        question: "O discipulado infantil eficaz na era hiperdigital prioriza:",
        options: [
          "Construir raízes profundas de identidade em Cristo antes das pressões externas",
          "Apenas acumular curtidas nas redes do ministério",
          "Forçar memorização mecânica sem compreensão de vida",
          "Ignorar as perguntas e dúvidas das crianças"
        ],
        correctIndex: 0,
        explanation: "Raízes fortes de identidade em Deus protegem a criança contra a aprovação superficial dos algoritmos."
      },
      {
        question: "Ao usar elementos de jogos e missões na igreja, o líder busca transmitir qual princípio bíblico?",
        options: [
          "Competição egoísta",
          "Cooperação, propósito no corpo de Cristo e alegria no serviço de Deus",
          "Superficialidade moral",
          "Materialismo"
        ],
        correctIndex: 1,
        explanation: "A gamificação bíblica canaliza o interesse da criança para o trabalho em equipe e viver o Evangelho na prática."
      },
      {
        question: "Em Deuteronômio 6, a instrução divina sobre ensinar os filhos enfatiza:",
        options: [
          "O ensino contínuo e natural no cotidiano da vida em família",
          "Delegar a fé para terceiros",
          "Falar de Deus apenas um dia no ano",
          "Proibir o diálogo em casa"
        ],
        correctIndex: 0,
        explanation: "Falar do Senhor ao se levantar, ao caminhar e ao se deitar integra a fé a cada instante do dia a dia."
      },
      {
        question: "Qual o maior testemunho de um líder para a Gen Alpha?",
        options: [
          "Autenticidade, amor paciente e coerência entre o discurso e a vida real",
          "Demonstração de autoritarismo rígido",
          "Uso de gírias ultrapassadas para parecer jovem",
          "Perfeccionismo inalcançável"
        ],
        correctIndex: 0,
        explanation: "As crianças detectam a insinceridade rapidamente. A autenticidade amorosa do líder gera confiança duradoura."
      }
    ]
  },
  {
    id: 'gen-z',
    title: 'Trilha 2: Gen Z',
    subtitle: 'Autenticidade, Desconstrução e Evangelismo para a Juventude Conectada',
    category: 'Gerações & Cultura',
    badge: '⚡ Insígnia Disruptive Leader',
    icon: 'Zap',
    color: 'from-purple-600 to-indigo-600',
    modules: [
      {
        id: 'gz-mod-1',
        title: 'Módulo 1: Conhecendo a Gen Z',
        subtitle: 'Cultura do cancelamento, busca por autenticidade e pós-verdade',
        xp: 50,
        contextoPratico: `
          <h3>🔥 A Geração do Radar Anti-Fake</h3>
          <p>A Geração Z (nascidos entre 1995 e 2010) possui um radar apuradíssimo contra hipocrisia e discursos ensaiados. Eles vivem em um mundo marcado por pós-verdade, ansiedade por perfomance e medo constante do pertencimento superficial (FOMO).</p>
          <p><strong>Bases Bíblicas:</strong> "Amo a verdade no íntimo..." (Salmo 51:6). A Gen Z não quer ver líderes perfeitos que fingem não ter lutas; eles querem ver líderes vulneráveis que encontram a graça de Deus em meio às imperfeições.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Púlpito & Redes</h3>
          <ul>
            <li><strong>Transparência no Palco:</strong> Compartilhe suas próprias falhas e o processo de restauração divina em vez de se colocar como super-herói.</li>
            <li><strong>Espaço para Dúvidas:</strong> Crie um ambiente onde dúvidas teológicas sejam acolhidas sem julgamento ou condenação.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual é a postura que a Geração Z mais rejeita em um pregador ou líder?",
            options: [
              "Falta de erudição em grego",
              "Hipocrisia, discurso ensaiado e pose de perfeição inalcançável",
              "Uso de roupas simples no palco",
              "Pregadores que citam versículos bíblicos"
            ],
            correctIndex: 1,
            explanation: "A Gen Z tem aversão à falsidade. A vulnerabilidade autêntica gera conexão profunda."
          },
          {
            question: "O termo 'FOMO' (Fear of Missing Out) se refere a qual sentimento comum na Gen Z?",
            options: [
              "Medo de ficar de fora ou perder experiências valiosas postadas por outros",
              "Medo de falar em público",
              "Vontade de morar no exterior",
              "Fobia de tecnologia"
            ],
            correctIndex: 0,
            explanation: "A comparação contínua nas redes gera ansiedade pelo receio de estar perdendo momentos marcantes."
          },
          {
            question: "Como o pregador deve abordar a questão das dúvidas teológicas com a Gen Z?",
            options: [
              "Condenando quem faz perguntas difíceis",
              "Acolhendo as dúvidas com empatia e guiando com respostas fundamentadas na Bíblia",
              "Ignorando as perguntas e mudando o tema",
              "Expulsando a pessoa do grupo"
            ],
            correctIndex: 1,
            explanation: "Dúvidas honestas quando bem acolhidas se transformam em convicções de fé inabaláveis."
          },
          {
            question: "O conceito de 'pós-verdade' na cultura contemporânea defende que:",
            options: [
              "A verdade absoluta não existe e os sentimentos pessoais valem mais que os fatos",
              "A Bíblia é aceita por todos sem questionamento",
              "A ciência substituiu todas as religiões",
              "Todas as pessoas concordam nos mesmos valores"
            ],
            correctIndex: 0,
            explanation: "Na pós-verdade, a emoção individual tenta se sobrepor à verdade objetiva da Palavra de Deus."
          },
          {
            question: "Qual versículo reforça a busca por verdade sincera no íntimo do comunicador?",
            options: [
              "Salmo 51:6",
              "Apocalipse 22:21",
              "Gênesis 1:1",
              "Levítico 1:1"
            ],
            correctIndex: 0,
            explanation: "Deus deseja a verdade no íntimo (Salmo 51:6), rejeitando aparências religiosas vazias."
          },
          {
            question: "Na comunicação com a Gen Z, contar testemunhos de fracassos superados pela Graça produz:",
            options: [
              "Perda de autoridade do pregador",
              "Identificação, esperança real e quebra de barreiras religiosas",
              "Rejeição imediata dos ouvintes",
              "Confusão teológica"
            ],
            correctIndex: 1,
            explanation: "Ver o agir de Deus na fraqueza do líder inspira o ouvinte a buscar a mesma graça."
          },
          {
            question: "A cultura do cancelamento nas redes sociais gera qual efeito psicológico nos jovens?",
            options: [
              "Sensação de paz inabalável",
              "Medo excessivo de errar, ansiedade e hipervigilância social",
              "Aumento da empatia comunitária",
              "Desejo de viver sem internet"
            ],
            correctIndex: 1,
            explanation: "O medo de ser linchado virtualmente faz com que os jovens mascarem suas verdadeiras opiniões."
          },
          {
            question: "Como o Evangelho de Jesus responde ao medo de rejeição da Gen Z?",
            options: [
              "Oferecendo aceitação incondicional e pertencimento na família de Deus através da Cruz",
              "Exigindo perfeição antes da aceitação",
              "Prometendo fama nas redes sociais",
              "Isolando o jovem da sociedade"
            ],
            correctIndex: 0,
            explanation: "Em Cristo somos totalmente conhecidos e profundamente amados sem precisar performar."
          },
          {
            question: "Qual o formato de conteúdo digital que mais atrai a Gen Z nas redes sociais?",
            options: [
              "Textos acadêmicos em formato PDF",
              "Vídeos curtos, dinâmicos, diretos ao ponto e com storytelling autêntico",
              "Áudios de 2 horas sem edições",
              "Imagens estáticas com muito texto"
            ],
            correctIndex: 1,
            explanation: "Conteúdos ágeis e autênticos ganham relevância no fluxo acelerado das redes."
          },
          {
            question: "O papel do pregador ao falar para a Gen Z é ser:",
            options: [
              "Um juiz distante que apenas aponta falhas",
              "Um guia autêntico que caminha junto e aponta para a luz de Cristo",
              "Um influenciador em busca de aplausos próprios",
              "Um crítico de cinema e tecnologia"
            ],
            correctIndex: 1,
            explanation: "O comunicador do Reino atua como ponte, conduzindo a juventude a um encontro pessoal com Jesus."
          }
        ]
      },
      {
        id: 'gz-mod-2',
        title: 'Módulo 2: Conectando com a Gen Z',
        subtitle: 'Pontes culturais sem perder a essência inegociável do Evangelho',
        xp: 50,
        contextoPratico: `
          <h3>🌐 O Método de Paulo em Atenas (Atos 17)</h3>
          <p>Quando o apóstolo Paulo pregou no Areópago de Atenas, ele não começou condenando os poetas e filósofos locais. Ele citou a cultura deles ("Como também alguns dos vossos poetas disseram...") para criar uma ponte e apresentar o Deus Desconhecido.</p>
          <p><strong>A Arte da Contextualização:</strong> Contextualizar não é negociar a doutrina; é vestir a mensagem eterna com as roupas culturais da época para que seja compreendida com clareza.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação Prática no Evangelismo</h3>
          <ul>
            <li><strong>Análise de Tendências:</strong> Use músicas, filmes ou séries em alta para iniciar diálogos sobre os anseios da alma.</li>
            <li><strong>Raciocínio Apologético Leve:</strong> Responda às objeções morais e intelectuais com mansidão e respeito (1 Pedro 3:15).</li>
          </ul>
        `,
        quiz: [
          {
            question: "O que o apóstolo Paulo fez no Areópago em Atos 17 ao se comunicar com os gregos?",
            options: [
              "Ofendeu a cultura local logo na introdução",
              "Usou referências da literatura e cultura deles para criar uma ponte com o Evangelho",
              "Recusou-se a falar em público",
              "Exigiu que todos se tornassem cidadãos romanos antes de crer"
            ],
            correctIndex: 1,
            explanation: "Paulo usou elementos culturais locais para introduzir a verdade da ressurreição em Cristo."
          },
          {
            question: "Qual a diferença entre contextualizar a mensagem e comprometer a doutrina?",
            options: [
              "Não há diferença",
              "Contextualizar altera a forma e a linguagem; comprometer altera a essência inegociável da Palavra",
              "Contextualizar significa mudar os 10 Mandamentos",
              "Comprometer significa traduzir a Bíblia para o português"
            ],
            correctIndex: 1,
            explanation: "A forma muda conforme a época, mas a verdade bíblica permanece imutável eternamente."
          },
          {
            question: "Em 1 Pedro 3:15, qual a atitude recomendada ao defender a razão da nossa esperança?",
            options: [
              "Gritar com arrogância até vencer o debate",
              "Com mansidão, respeito e boa consciência",
              "Evitar qualquer conversa sobre fé",
              "Usar sarcasmo e deboche"
            ],
            correctIndex: 1,
            explanation: "A verdadeira apologética combina clareza bíblica com a doçura e o respeito de Cristo."
          },
          {
            question: "Como utilizar uma série ou filme popular na pregação para a Gen Z?",
            options: [
              "Como um gancho cultural para discutir os conflitos humanos e mostrar a resposta em Deus",
              "Para substituir a leitura da Bíblia",
              "Para promover o filme e esquecer o Evangelho",
              "Para dizer que assistir filmes é pecado imperdoável"
            ],
            correctIndex: 0,
            explanation: "Narrativas culturais revelam anseios da humanidade que só encontram plenitude em Jesus."
          },
          {
            question: "Qual a busca central da Gen Z ao procurar uma comunidade de fé?",
            options: [
              "Rituais vazios e burocráticos",
              "Relacionamentos autênticos, propósito real e pertencimento sem julgamentos",
              "Prédios luxuosos e ostentação",
              "Políticas partidárias extremistas"
            ],
            correctIndex: 1,
            explanation: "A Gen Z busca conexões verdadeiras e causas de impacto genuíno que transformem vidas."
          },
          {
            question: "Ao abordar temas morais polêmicos com jovens, qual abordagem reflete o caráter de Jesus?",
            options: [
              "Verdade com graça (João 1:14), apresentando o padrão de Deus com amor restaurador",
              "Apenas condenação sem esperança de mudança",
              "Relativizar o pecado e fingir que Deus não se importa",
              "Atacar pessoalmente quem discorda"
            ],
            correctIndex: 0,
            explanation: "Jesus veio cheio de graça e de verdade; um sem o outro distorce a mensagem da Cruz."
          },
          {
            question: "O uso de gírias e elementos da internet na pregação deve ser feito:",
            options: [
              "De forma natural e moderada, evitando parecer forçado ou ridículo",
              "Em 100% das frases para tentar parecer jovem a qualquer custo",
              "Proibido em qualquer circunstância",
              "Apenas para ridicularizar os jovens"
            ],
            correctIndex: 0,
            explanation: "O excesso ou uso forçado de gírias soa inautêntico. A naturalidade e o respeito funcionam melhor."
          },
          {
            question: "O que significa o termo 'Apologética Cultural'?",
            options: [
              "Pedir desculpas à cultura por ser cristão",
              "Demonstrar a coerência e beleza do cristianismo dialogando com as expressões da cultura",
              "Atacar a arte e a música secular com violência",
              "Copiar tudo o que o mundo faz sem filtro"
            ],
            correctIndex: 1,
            explanation: "Apologética cultural dialoga com a arte e o pensamento contemporâneo apontando a verdade bíblica."
          },
          {
            question: "A Gen Z responde melhor a um estilo de liderança que é:",
            options: [
              "Centralizador e autoritário",
              "Relacional, acessível e focado em encorajar o desenvolvimento dos outros",
              "Ausente e indiferente",
              "Manipulador por culpa"
            ],
            correctIndex: 1,
            explanation: "Líderes mentores que capacitam e ouvem conquistam a lealdade e o respeito da juventude."
          },
          {
            question: "Qual o fruto de uma pregação que une fundamentação bíblica rigorosa com comunicação contextualizada?",
            options: [
              "Jovens firmes na Palavra e capacitados a impactar suas faculdades e empregos",
              "Superficialidade espiritual",
              "Abandono da fé",
              "Divisão da igreja"
            ],
            correctIndex: 0,
            explanation: "A união de verdade teológica com clareza comunicativa forma cristãos maduros e influentes."
          }
        ]
      },
      {
        id: 'gz-mod-3',
        title: 'Módulo 3: Liderando a Gen Z',
        subtitle: 'Criando novos líderes de impacto, discipulado e engajamento orgânico',
        xp: 50,
        contextoPratico: `
          <h3>🚀 De Consumidores a Construtores do Reino</h3>
          <p>Muitos jovens abandonam a igreja porque foram tratados como meros espectadores em um auditório. A Gen Z quer protagonismo. Eles querem colocar a mão na massa, liderar células, produzir artes, servir a comunidade e sentir que são parte de uma missão maior que eles mesmos.</p>
          <p><strong>Princípio da Delegação com Cobertura:</strong> Dar responsabilidade real com acompanhamento de mentoria gera amadurecimento acelerado.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação na Liderança de Jovens</h3>
          <ul>
            <li><strong>Equipes de Ação:</strong> Crie projetos sociais e de mídias liderados 100% por jovens da Gen Z com suporte de mentores adultos.</li>
            <li><strong>Cultura de Feedback:</strong> Realize conversas de alinhamento com escuta ativa antes de apontar correções.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual a razão principal que faz muitos jovens da Gen Z se afastarem da igreja?",
            options: [
              "Falta de bancos estofados",
              "Sentirem que são apenas espectadores e não possuem espaço real para servir e liderar",
              "Porque as pregações duram mais de 10 minutos",
              "Por causa das luzes do palco"
            ],
            correctIndex: 1,
            explanation: "A ausência de propósito e protagonismo na comunidade desengaja o jovem rapidamente."
          },
          {
            question: "O que é a mentalidade de 'Construtor do Reino' em oposição à de 'Consumidor'?",
            options: [
              "O construtor usa seus dons ativamente para servir a Deus e ao próximo; o consumidor apenas assiste e exige serviços",
              "O construtor constrói prédios físicos para a igreja",
              "Não há diferença entre os dois conceitos",
              "O consumidor é o líder principal"
            ],
            correctIndex: 0,
            explanation: "Ativar os jovens como construtores do Reino gera responsabilidade e amadurecimento espiritual."
          },
          {
            question: "Como delegar tarefas com responsabilidade real para um jovem líder?",
            options: [
              "Passar a tarefa e desaparecer sem dar suporte",
              "Confiar o projeto, dar autoridade para tomar decisões e oferecer mentoria constante",
              "Fazer tudo você mesmo porque acha que o jovem vai errar",
              "Criticar publicamente qualquer falha do jovem"
            ],
            correctIndex: 1,
            explanation: "Delegação saudável envolve encorajamento, autoridade real e supervisão amorosa."
          },
          {
            question: "Qual a importância da mentoria individual (1 a 1) no discipulado de jovens?",
            options: [
              "Permite tratar questões pessoais profundas com confidencialidade e cuidado específico",
              "É uma perda de tempo frente a reuniões grandes",
              "Serve apenas para aplicar disciplinas e punições",
              "Substitui a necessidade da leitura da Bíblia"
            ],
            correctIndex: 0,
            explanation: "No 1 a 1, o jovem encontra espaço para vulnerabilidade e mentoria customizada para sua jornada."
          },
          {
            question: "Em uma reunião de alinhamento com jovens, a 'Escuta Ativa' significa:",
            options: [
              "Ouvir atentamente sem interromper, buscando compreender o ponto de vista do jovem antes de responder",
              "Falar o tempo todo sem deixar ninguém opinar",
              "Fingir que está ouvindo enquanto mexe no celular",
              "Concordar com erros graves sem dar orientação bíblica"
            ],
            correctIndex: 0,
            explanation: "Escutar ativamente valida os sentimentos do liderado e constrói pontes de confiança mútua."
          },
          {
            question: "Projetos de impacto social liderados por jovens geram qual benefício para o testemunho da igreja?",
            options: [
              "Demonstram a fé em ação (Tiago 2:18), atraindo outros jovens pelo amor prático",
              "Gera vaidade e orgulho secular",
              "Diminui os dízimos da igreja",
              "Nenhum benefício"
            ],
            correctIndex: 0,
            explanation: "O amor praticado em ações sociais torna o Evangelho tangível para a sociedade."
          },
          {
            question: "Como lidar com os erros de um jovem líder que está aprendendo a servir?",
            options: [
              "Usar o erro como oportunidade pedagógica de aprendizado, graça e encorajamento",
              "Removê-lo permanentemente da liderança na primeira falha",
              "Expor o erro nas redes sociais da igreja",
              "Fingir que o erro não aconteceu e ignorar a correção"
            ],
            correctIndex: 0,
            explanation: "Erros fazem parte do processo de crescimento. A liderança cristã restaura e ensina com paciência."
          },
          {
            question: "Qual a função dos grupos de pequenos encontros (Células/PGs) na liderança da Gen Z?",
            options: [
              "Criar laços profundos de amizade, oração mútua e ambiente seguro para crescimento",
              "Apenas contar presença para relatórios estatísticos",
              "Substituir o culto de celebração comunitária",
              "Promover fofoca e competição"
            ],
            correctIndex: 0,
            explanation: "Pequenos grupos são o coração do discipulado relacional e do cuidado mútuo na igreja."
          },
          {
            question: "Para engajar a Gen Z na evangelização de seus amigos, a liderança deve motivá-los através de:",
            options: [
              "Testemunho pessoal autêntico, convites para ambientes acolhedores e amor sincero",
              "Pressão psicológica e culpa",
              "Recompensas financeiras por novo membro",
              "Debates agressivos na escola"
            ],
            correctIndex: 0,
            explanation: "O testemunho de vida alinhado com um coração acolhedor atrai amigos para Cristo naturalmente."
          },
          {
            question: "O objetivo supremo de formar novos líderes na Gen Z é:",
            options: [
              "Multiplicar o Reino de Deus e garantir a continuidade da missão da igreja com paixão e unção",
              "Manter o líder sênior famoso",
              "Preencher cargos administrativos",
              "Ganhar prêmios de liderança"
            ],
            correctIndex: 0,
            explanation: "A Grande Comissão (Mateus 28) é sobre fazer discípulos que façam outros discípulos para a glória de Deus."
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual é a essência do relacionamento e liderança com a Geração Z?",
        options: [
          "Autenticidade transparente, verdade fundamentada na Bíblia, acolhimento e protagonismo prático",
          "Regras rígidas sem explicação e autoritarismo frio",
          "Relativização total da doutrina bíblica para agradar opiniões seculares",
          "Distanciamento emocional do líder"
        ],
        correctIndex: 0,
        explanation: "A Gen Z responde com lealdade a líderes autênticos que vivem o que pregam com amor e verdade."
      },
      {
        question: "Quando Paulo citou os poetas gregos em Atenas (Atos 17), ele exemplificou qual prática da comunicação?",
        options: [
          "Contextualização cultural inteligente sem negociação do Evangelho",
          "Abandono da fé cristã",
          "Apostasia e sincretismo religioso",
          "Medo de pregar sobre a ressurreição"
        ],
        correctIndex: 0,
        explanation: "Usar pontes culturais permite que a Verdade inalterável da Bíblia faça sentido no mundo do ouvinte."
      },
      {
        question: "Ao lidar com dúvidas morais e intelectuais da juventude, qual atitude reflete a Apologética de 1 Pedro 3:15?",
        options: [
          "Defender a fé com mansidão, respeito e embasamento bíblico profundo",
          "Atacar a inteligência de quem pergunta",
          "Fugir de conversas sobre ciência e fé",
          "Impor a fé à força"
        ],
        correctIndex: 0,
        explanation: "Respeito e clareza teológica andam de mãos dadas ao responder às dúvidas mais difíceis."
      },
      {
        question: "Transformar jovens de 'consumidores' em 'construtores' do Reino exige:",
        options: [
          "Oferecer responsabilidade real, mentoria individual e oportunidade de servir com seus dons",
          "Manter os jovens apenas assistindo do banco",
          "Citar apenas críticas sobre a juventude atual",
          "Proibir os jovens de participarem das decisões"
        ],
        correctIndex: 0,
        explanation: "Empoderar os jovens com cobertura espiritual gera maturidade e engajamento orgânico duradouro."
      },
      {
        question: "Qual o impacto de uma liderança vulnerável que compartilha a graça de Deus em suas fraquezas?",
        options: [
          "Gera conexão real, quebra o orgulho religioso e aponta a glória exclusivamente para Cristo",
          "Faz o líder perder a salvação",
          "Destrói o respeito dos liderados",
          "Provoca o encerramento das atividades do ministério"
        ],
        correctIndex: 0,
        explanation: "O poder de Deus se aperfeiçoa na fraqueza (2 Coríntios 12:9), inspirando outros a confiarem na mesma Graça."
      }
    ]
  },
  {
    id: 'jesus-life',
    title: 'Trilha 3: Conhecendo Jesus',
    subtitle: 'O Homem, a Mensagem, os Princípios e o Modelo Perfeito de Comunicação',
    category: 'Fundamentos Bíblicos',
    badge: '👑 Insígnia Kingdom Disciple',
    icon: 'Crown',
    color: 'from-amber-500 to-orange-600',
    modules: [
      {
        id: 'jl-mod-1',
        title: 'Módulo 1: A Vida de Jesus',
        subtitle: 'O contexto histórico, social e a revolução cultural de Cristo',
        xp: 50,
        contextoPratico: `
          <h3>📜 O Maior Revolucionário da História</h3>
          <p>Jesus Cristo nasceu em uma província oprimida do Império Romano, em uma sociedade dividida por rituais religiosamente elitistas e opressão política. Sua mensagem não foi um tratado teórico distante, mas uma imersão direta na dor humana.</p>
          <p><strong>A Comunicação Encarnacional:</strong> "E o Verbo se fez carne e habitou entre nós..." (João 1:14). Jesus não pregou do alto de uma torre de marfim; Ele pisou na poeira das estradas, comeu com pecadores e valorizou os marginalizados.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação para o Preletor</h3>
          <ul>
            <li><strong>Presença e Proximidade:</strong> O bom comunicador se conecta com a realidade concreta das pessoas antes de tentar ensinar princípios altos.</li>
            <li><strong>Romper com o Elitismo:</strong> Use linguagem simples que o homem simples e o doutor consigam compreender com igual impacto.</li>
          </ul>
        `,
        quiz: [
          {
            question: "O que significa a expressão 'Teologia da Encarnação' baseada em João 1:14?",
            options: [
              "Deus se tornando ser humano em Jesus para habitar e se relacionar diretamente com a humanidade",
              "Uma teoria filosófica grega sem valor bíblico",
              "Apenas uma metáfora poética",
              "A busca pela imortalidade física no mundo terrestre"
            ],
            correctIndex: 0,
            explanation: "Em Cristo, o Verbo eterno assumiu a condição humana para nos aproximar do Pai."
          },
          {
            question: "Qual era a atitude de Jesus em relação aos marginalizados sociais de sua época (leprosos, publicanos e mulheres)?",
            options: [
              "Acolhia, curava e restaurava a dignidade de cada um com amor e verdade",
              "Evitava qualquer contato com eles",
              "Exigia dinheiro antes de conversar",
              "Concordava com a opressão religiosa dos fariseus"
            ],
            correctIndex: 0,
            explanation: "Jesus quebrou barreiras de exclusão, demonstrando a inclusão e o amor do Reino de Deus."
          },
          {
            question: "Como era o estilo de linguagem utilizado por Jesus em suas pregações públicas?",
            options: [
              "Simples, profunda, repleta de parábolas cotidianas e recursos visuais",
              "Recheada de termos em latim militar romano",
              "Monótona e sem nenhuma variação de tom",
              "Destinada apenas a teólogos graduados"
            ],
            correctIndex: 0,
            explanation: "Jesus usava histórias da vida diária para transmitir os segredos mais profundos do universo."
          },
          {
            question: "Qual região geográfica foi o centro do ministério Galileu de Jesus?",
            options: [
              "Norte de Israel (Cafarnaum, Mar da Galileia)",
              "Roma",
              "Atenas",
              "Babilônia"
            ],
            correctIndex: 0,
            explanation: "A Galileia dos gentios foi o cenário principal onde Jesus realizou a maioria de seus milagres e ensinamentos."
          },
          {
            question: "Por que os líderes religiosos (fariseus e saduceus) se opunham tanto a Jesus?",
            options: [
              "Porque Jesus expunha a hipocrisia deles e ensinava que a Graça de Deus é gratuita",
              "Porque Jesus apoiava o exército romano",
              "Porque Jesus não conhecia as Escrituras",
              "Por razões puramente comerciais"
            ],
            correctIndex: 0,
            explanation: "O ensino de Jesus ameaçava o monopolio de poder e o religiosismo rígido dos fariseus."
          },
          {
            question: "A vida de Jesus ensina que a verdadeira autoridade espiritual nasce de:",
            options: [
              "Um estilo de vida de serviço humilde e obediência total ao Pai",
              "Títulos acadêmicos pomposos",
              "Uso de força física e coerção",
              "Acúmulo de riquezas pessoais"
            ],
            correctIndex: 0,
            explanation: "Jesus ensinava com autoridade porque sua vida refletia perfeitamente a vontade do Pai."
          },
          {
            question: "Qual foi o primeiro milagre registrado de Jesus segundo o Evangelho de João?",
            options: [
              "A transformação de água em vinho nas Bodas de Caná (João 2)",
              "A multiplicação dos pães",
              "A ressurreição de Lázaro",
              "Caminhar sobre as águas"
            ],
            correctIndex: 0,
            explanation: "Em Caná da Galileia, Jesus manifestou sua glória ao abençoar uma celebração de casamento familiar."
          },
          {
            question: "Ao se comunicar com a mulher samaritana (João 4), Jesus superou quais barreiras culturais?",
            options: [
              "Preconceito de gênero, rivalidades étnicas e religiosas entre judeus e samaritanos",
              "Barreiras linguísticas do idioma espanhol",
              "Conflitos de fuso horário",
              "Nenhuma barreira"
            ],
            correctIndex: 0,
            explanation: "Jesus atravessou barreiras sociais e raciais para oferecer a água da vida a uma alma sedenta."
          },
          {
            question: "O que o sermão do Monte (Mateus 5-7) representa no ensino de Jesus?",
            options: [
              "O manifesto do Reino de Deus e a ética da transformação interior do coração",
              "Um conjunto de leis civis do Império Romano",
              "Um poema sobre a natureza",
              "Uma lista de punições físicas"
            ],
            correctIndex: 0,
            explanation: "No Sermão do Monte, Jesus revela o padrão moral e gracioso da vida no Reino."
          },
          {
            question: "Qual o significado da morte de Jesus na cruz segundo as Escrituras?",
            options: [
              "O sacrifício supremo e substitutivo que perdoa nossos pecados e nos reconcilia com Deus",
              "Uma tragédia acidental sem propósito espiritual",
              "Uma derrota política de um líder rebelde",
              "Um mito antigo sem relevância hoje"
            ],
            correctIndex: 0,
            explanation: "A Cruz é a maior demonstração do amor de Deus, garantindo nossa salvação e vida eterna."
          }
        ]
      },
      {
        id: 'jl-mod-2',
        title: 'Módulo 2: Princípios de Jesus',
        subtitle: 'Graça, serviço, autoridade, compaixão e amor ao próximo',
        xp: 50,
        contextoPratico: `
          <h3>❤️ A Liderança de Toalha na Bacia</h3>
          <p>Na última ceia, Jesus surpreendeu os discípulos ao realizar a tarefa do menor dos servos: lavar os pés dos apóstolos (João 13). Ele redefiniu a grandeza. No Reino de Deus, o topo da pirâmide é a base, e o maior é aquele que serve.</p>
          <p><strong>A Lógica da Graça:</strong> O Evangelho contrapõe a justiça do merecimento humano com o favor imerecido de Deus que alcança o pecador arrependido.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação na Vida do Líder</h3>
          <ul>
            <li><strong>Liderança Servidora:</strong> Sirva sua equipe antes de fazer exigências; a liderança de Jesus é pelo exemplo.</li>
            <li><strong>Cultura da Graça:</strong> Crie um ambiente onde pessoas quebradas encontrem restauração em vez de julgamento frio.</li>
          </ul>
        `,
        quiz: [
          {
            question: "O que Jesus demonstrou ao lavar os pés dos discípulos em João 13?",
            options: [
              "A essência da liderança servidora e da humildade no Reino de Deus",
              "Um ritual higiênico sem sentido espiritual",
              "Que o líder não deve tomar decisões",
              "Sua fraqueza diante dos discípulos"
            ],
            correctIndex: 0,
            explanation: "Ao lavar os pés dos discípulos, Jesus deu o exemplo supremo de amor e serviço prático."
          },
          {
            question: "Qual é a definição teológica de 'Graça' no ensino bíblico?",
            options: [
              "O favor imerecido de Deus concedido gratuitamente ao ser humano pela fé em Cristo",
              "Uma recompensa que conquistamos por boas obras e esforço próprio",
              "Um prêmio reservado apenas para pessoas perfeitas",
              "A capacidade de fazer piadas no palco"
            ],
            correctIndex: 0,
            explanation: "A Graça é o presente imerecido de Deus que nos salva e nos transforma sem méritos nossos."
          },
          {
            question: "Segundo Jesus em Marcos 12:30-31, quais são os dois maiores mandamentos da Lei?",
            options: [
              "Amar a Deus sobre todas as coisas e ao próximo como a si mesmo",
              "Acumular riquezas e defender o próprio orgulho",
              "Ir ao templo todos os dias e julgar os pecadores",
              "Jejuar sem parar e não conversar com não cristãos"
            ],
            correctIndex: 0,
            explanation: "Toda a Lei e os Profetas se cumprem no amor sincero a Deus e ao próximo."
          },
          {
            question: "A parábola do Bom Samaritano (Lucas 10) ensina que nosso 'próximo' é:",
            options: [
              "Qualquer pessoa que necessite de ajuda e compaixão, independente de raça ou religião",
              "Apenas os membros da nossa mesma igreja",
              "Apenas nossos parentes de sangue",
              "Pessoas que pensam exatamente igual a nós"
            ],
            correctIndex: 0,
            explanation: "O amor do Reino ultrapassa fronteiras sociais e étnicas para socorrer quem precisa."
          },
          {
            question: "Como Jesus reagiu diante da multidão faminta em Mateus 14:14?",
            options: [
              "Moveu-se de íntima compaixão por eles e curou seus enfermos antes de alimentá-los",
              "Mandou que fossem embora sem comer",
              "Cobrou ingressos para o sermão",
              "Critica a falta de planejamento deles"
            ],
            correctIndex: 0,
            explanation: "A compaixão visceral de Jesus o levava a suprir tanto a fome espiritual quanto a física."
          },
          {
            question: "Em Mateus 18:21-22, Jesus ensina a Pedro que devemos perdoar:",
            options: [
              "Setenta vezes sete (sempre e sem limites de coração)",
              "Apenas 3 vezes",
              "Apenas se a pessoa pagar uma multa",
              "Nunca perdoar quem nos ofendeu"
            ],
            correctIndex: 0,
            explanation: "O perdão no Reino é ilimitado porque fomos perdoados de uma dívida impagável na Cruz."
          },
          {
            question: "Qual o princípio sobre o uso dos recursos e riquezas ensinado por Jesus em Mateus 6:21?",
            options: [
              "'Onde estiver o teu tesouro, aí estará também o teu coração'",
              "O dinheiro é o bem supremo que dá valor ao ser humano",
              "Devemos buscar acúmulo financeiro como sinal único de salvação",
              "Deus proíbe o trabalho produtivo"
            ],
            correctIndex: 0,
            explanation: "Nossa relação com o dinheiro revela onde realmente depositamos nossa confiança e amor."
          },
          {
            question: "Como Jesus lidou com a mulher pega em adultério em João 8?",
            options: [
              "Ofereceu perdão e restauração ('Nem eu te condeno; vai e não peques mais')",
              "Autorizou o apedrejamento público",
              "Exigiu uma fiança financeira",
              "Condenou-a ao inferno imediatamente"
            ],
            correctIndex: 0,
            explanation: "Jesus protegeu a mulher da condenação dos hipócritas e a chamou a uma nova vida sem pecado."
          },
          {
            question: "O princípio da Oração do Pai Nosso (Mateus 6) nos ensina a orar buscando primeiramente:",
            options: [
              "A santificação do nome de Deus e a vinda do Seu Reino",
              "Nossos desejos egoístas e fama rápida",
              "A destruição física dos nossos inimigos",
              "Riquezas materiais sem limites"
            ],
            correctIndex: 0,
            explanation: "A oração ensinada por Jesus alinha nossa vontade à soberania e ao Reino do Pai."
          },
          {
            question: "Qual o impacto da mensagem da Ressurreição de Jesus para a vida do crente?",
            options: [
              "A vitória definitiva sobre a morte, o pecado e a garantia da nossa esperança eterna",
              "Apenas um símbolo de renovação da primavera",
              "Uma lenda sem efeito prático",
              "O fim de toda a missão da igreja"
            ],
            correctIndex: 0,
            explanation: "Se Cristo ressuscitou, nossa fé é vitoriosa e a morte perdeu seu aguilhão (1 Coríntios 15)."
          }
        ]
      },
      {
        id: 'jl-mod-3',
        title: 'Módulo 3: Conectados com Jesus',
        subtitle: 'Construindo intimidade diária, devocional e identidade inabalável em Cristo',
        xp: 50,
        contextoPratico: `
          <h3>🌿 A Videira e os Ramos (João 15)</h3>
          <p>"Permanecei em mim, e eu permanecerei em vós; como o ramo de si mesmo não pode dar fruto... assim também vós não podeis dar fruto se não permanecerdes em mim" (João 15:4). Todo o ativismo na igreja sem intimidade no secreto resulta em esgotamento (Burnout) e frutos artificiais.</p>
          <p><strong>A Vida no Secreto:</strong> O ministério público é apenas o transbordar da vida secreta de oração e meditação na Palavra.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação na Rotina Espiritual</h3>
          <ul>
            <li><strong>Habito do Secreto:</strong> Reserve um horário inegociável todos os dias para desligar o celular e buscar a face de Deus.</li>
            <li><strong>Frutos de Permanência:</strong> Avalie seu ministério não por aplausos digitais, mas pelo Fruto do Espírito na sua vida cotidiana.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Em João 15, qual a condição fundamental para que o discípulo dê frutos espirituais verdadeiros?",
            options: [
              "Estar conectado e permanecer em Jesus como o ramo está na videira",
              "Trabalhar 20 horas por dia sem parar para orar",
              "Ser famoso nas redes sociais",
              "Conhecer todas as línguas humanas"
            ],
            correctIndex: 0,
            explanation: "Sem a seiva da presença de Jesus (permanecer dEle), não é possível produzir frutos do Reino."
          },
          {
            question: "O que Jesus ensinou sobre a oração no 'Quarto Secreto' em Mateus 6:6?",
            options: [
              "Orar ao Pai em segredo, longe de exibições religiosas para ser recompensado publicamente por Ele",
              "Orar apenas em praça pública para impressionar os outros",
              "Usar palavras repetitivas sem fé no coração",
              "Evitar a oração individual"
            ],
            correctIndex: 0,
            explanation: "A verdadeira intimidade com Deus se cultiva no secreto, sem busca por aplausos humanos."
          },
          {
            question: "Qual é o sintoma principal do ativismo religioso sem intimidade com Cristo?",
            options: [
              "Esgotamento emocional e espiritual (Burnout) e perda da alegria de servir",
              "Aumento da unção e da paz interior",
              "Crescimento saudável da comunidade",
              "Perfeição moral absoluta"
            ],
            correctIndex: 0,
            explanation: "Fazer coisas PARA Deus sem ESTAR COM Deus secará a alma do líder rapidamente."
          },
          {
            question: "Segundo Gálatas 2:20, qual o novo fundamento da identidade do cristão?",
            options: [
              "'Já não sou eu quem vive, mas Cristo vive em mim'",
              "O número de seguidores nas mídias sociais",
              "O saldo bancário e bens materiais",
              "A aprovação de chefes e amigos"
            ],
            correctIndex: 0,
            explanation: "Nossa velha natureza foi crucificada com Cristo; nossa nova vida é impulsionada por Sua presença."
          },
          {
            question: "Como meditar na Palavra de Deus (Salmo 1) de maneira transformadora?",
            options: [
              "Lendo com reflexão diária, oração e aplicando os princípios ao próprio caráter",
              "Lendo o mais rápido possível para cumprir metas sem entender",
              "Usando a Bíblia apenas como amuleto aberto na estante",
              "Criticando o texto bíblico sem fé"
            ],
            correctIndex: 0,
            explanation: "Meditar envolve ruminar a Verdade, permitindo que ela molde nossos pensamentos e ações diárias."
          },
          {
            question: "O Espírito Santo atua na vida do crente conectado com Jesus como:",
            options: [
              "Consolador, Guia da verdade, Santificador e Doador de poder para testemunhar",
              "Uma energia impessoal sem vontade",
              "Um fiscal que busca apenas punir falhas",
              "Um mito antigo"
            ],
            correctIndex: 0,
            explanation: "O Espírito Santo habita no cristão, conduzindo-o à semelhança de Jesus Cristo."
          },
          {
            question: "Qual a importância do jejum bíblico na jornada de intimidade com Deus?",
            options: [
              "Submeter os desejos da carne e afinar os ouvidos espirituais para a voz do Senhor",
              "Fazer greve de fome para obrigar Deus a fazer nossa vontade",
              "Emagrecer por motivos estéticos",
              "Impressionar a liderança da igreja"
            ],
            correctIndex: 0,
            explanation: "O jejum humilha nossa alma e nos torna mais sensíveis à presença e direção do Espírito."
          },
          {
            question: "Como vencer as distrações digitais para manter um tempo devocional de qualidade?",
            options: [
              "Definindo horários fixos, silenciando notificações e criando um ambiente de foco em Deus",
              "Deixando o celular apitando ao lado da Bíblia",
              "Orando apenas enquanto assiste a vídeos curtos",
              "Desistindo de ter um tempo devocional"
            ],
            correctIndex: 0,
            explanation: "Proteger o tempo com Deus requer disciplina intencional contra o excesso de mídias."
          },
          {
            question: "O Fruto do Espírito (Gálatas 5:22-23) se manifesta através de:",
            options: [
              "Amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio",
              "Riquezas automáticas e fama",
              "Capacidade de discutir teologia com raiva",
              "Isolamento do mundo"
            ],
            correctIndex: 0,
            explanation: "O Fruto do Espírito é a evidência visível do caráter de Cristo sendo moldado no crente."
          },
          {
            question: "Qual a promessa de Jesus para aqueles que perseveram em Seu amor até o fim (Mateus 28:20)?",
            options: [
              "'E eis que estou convosco todos os dias, até à consumação do século'",
              "Que nunca enfrentarão nenhuma tribulação na Terra",
              "Que se tornarão reis terrenos imediatamente",
              "Que não precisarão mais da Bíblia"
            ],
            correctIndex: 0,
            explanation: "A presença contínua de Jesus é nossa maior garantia e consolo em todas as estações da vida."
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual o centro revolucionário da mensagem e da vida de Jesus Cristo?",
        options: [
          "A revelação do amor do Pai, a salvação pela Graça na Cruz e o estabelecimento do Reino de Deus",
          "A criação de um novo partido político em Roma",
          "O estabelecimento de rituais religiosos vazios e excludentes",
          "A busca pelo sucesso financeiro pessoal"
        ],
        correctIndex: 0,
        explanation: "Jesus veio revelar o Pai, dar sua vida em resgate por muitos e inaugurar o Reino de amor e justiça."
      },
      {
        question: "A liderança servidora exemplificada por Jesus ao lavar os pés dos discípulos ensina que:",
        options: [
          "No Reino de Deus, a verdadeira autoridade se expressa através da humildade e do serviço ao próximo",
          "Líderes não devem trabalhar",
          "O poder deve ser usado para dominar os outros",
          "Servir é sinal de inferioridade"
        ],
        correctIndex: 0,
        explanation: "A grandeza no Reino de Deus é mensurada pela disposição em amar e servir os outros."
      },
      {
        question: "O princípio da permanência na Videira (João 15) exige que o comunicador cristão:",
        options: [
          "Priorize a intimidade no secreto com Cristo antes de qualquer atividade ministerial pública",
          "Foque apenas no número de curtidas digitais",
          "Abandone a oração e foque apenas em oratória",
          "Evite ler a Bíblia diariamente"
        ],
        correctIndex: 0,
        explanation: "Sem a seiva da presença de Jesus, a pregação se torna estéril e sem poder de transformação real."
      },
      {
        question: "Como o amor de Jesus pelos marginalizados deve moldar a atuação da igreja hoje?",
        options: [
          "Acolhendo com compaixão, restaurando dignidades e oferecendo a água da vida a todos sem preconceito",
          "Mantendo a igreja de portas fechadas para quem comete erros",
          "Julgando as pessoas pela aparência externa",
          "Cobrando taxas para entrada nos cultos"
        ],
        correctIndex: 0,
        explanation: "A igreja é um hospital de almas onde a graça de Cristo acolhe e transforma o pecador."
      },
      {
        question: "Qual é o convite final de Jesus a cada um de Seus seguidores?",
        options: [
          "'Vem e segue-me', tomando a cada dia a sua cruz e vivendo para a glória do Pai",
          "Permanecer na zona de conforto sem desafios",
          "Buscar fama e aplausos pessoais",
          "Viver uma fé individualista e isolada"
        ],
        correctIndex: 0,
        explanation: "Seguir a Jesus é uma jornada diária de entrega, transformação de caráter e missão de amor."
      }
    ]
  },
  {
    id: 'cultural-connection',
    title: 'Trilha 4: Conexão Cultural',
    subtitle: 'Ansiedade, Dopamina nas Redes, Identidade Digital e Posicionamento no Mundo Woke',
    category: 'Cultura & Sociedade',
    badge: '🧠 Insígnia Cultural Apologist',
    icon: 'Brain',
    color: 'from-pink-500 to-rose-600',
    modules: [
      {
        id: 'cc-mod-1',
        title: 'Módulo 1: Ansiedade & Dopamina nas Redes',
        subtitle: 'A neurociência dos feeds, o vício em notificações e o descanso bíblico',
        xp: 50,
        contextoPratico: `
          <h3>📲 O Sequestro do Sistema de Recompensa</h3>
          <p>Os algoritmos das redes sociais foram desenhados por neurocientistas para explorar o circuito de dopamina do cérebro humano através de recompensas variáveis (curtidas, comentários e notificações). Isso gera um estado constante de hiperestímulo e ansiedade (FOMO).</p>
          <p><strong>O Sabbath Bíblico:</strong> "Descansa no SENHOR e espera nele..." (Salmo 37:7). Deus instituiu o descanso (Sabbath) não como punição, mas como libertação da tirania da produtividade e hiperconexão compulsiva.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Púlpito & Saúde Mental</h3>
          <ul>
            <li><strong>Desintoxicação Digital:</strong> Promova desafios de 'Jejum de Telas' na juventude da igreja.</li>
            <li><strong>Teologia da Desaceleração:</strong> Ensole que o valor do crente está em QUEM ELE É em Deus, e não na sua performance online.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Como as redes sociais exploram o cérebro humano para gerar vício?",
            options: [
              "Através de disparos imprevisíveis de dopamina gerados por notificações e curtidas",
              "Emitindo ondas sonoras imperceptíveis",
              "Forçando a leitura de livros físicos",
              "Reduzindo a velocidade da internet à noite"
            ],
            correctIndex: 0,
            explanation: "A recompensa variável (não saber quando virá uma curtida) vicia o sistema dopaminérgico."
          },
          {
            question: "Qual o significado profundo do princípio bíblico do 'Sabbath' (Descanso)?",
            options: [
              "Um mandamento de amor para libertar o ser humano da escravidão da produtividade e hiperconexão",
              "Uma regra arcaica para impedir o progresso econômico",
              "Ficar sem comer por 7 dias seguidos",
              "Dormir 24 horas sem orar"
            ],
            correctIndex: 0,
            explanation: "O descanso do Senhor restaura nossas energias e reafirma que Deus é o sustentador da nossa vida."
          },
          {
            question: "O excesso de tempo em telas e mídias sociais está diretamente correlacionado a:",
            options: [
              "Aumento dos índices de ansiedade, depressão e solidão na juventude",
              "Aumento da memória fotográfica",
              "Paz interior inabalável",
              "Melhoria automática da visão"
            ],
            correctIndex: 0,
            explanation: "A hiperconexão virtual sem filtro reduz o contato real e eleva os níveis de ansiedade e comparação."
          },
          {
            question: "O que é o 'Jejum Digital' recomendado para a saúde espiritual do jovem?",
            options: [
              "Desconectar-se intencionalmente de redes e telas por um período para focar em Deus e relacionamentos reais",
              "Quebrar o celular e nunca mais usar tecnologia",
              "Excluir apenas o aplicativo da Bíblia",
              "Usar a internet apenas durante a madrugada"
            ],
            correctIndex: 0,
            explanation: "O jejum digital abre espaço mental e espiritual para ouvir a voz de Deus sem ruídos digitais."
          },
          {
            question: "Segundo Filippenses 4:6-7, como enfrentar a ansiedade que paralisa a mente?",
            options: [
              "Apresentando nossos pedidos a Deus pela oração, súplica e ações de graças para receber a paz que excede o entendimento",
              "Reclamando nas redes sociais contra todos",
              "Guardando a ansiedade em segredo sem orar",
              "Tomando decisões impulsivas sem orientação"
            ],
            correctIndex: 0,
            explanation: "A oração com gratidão entrega nossas preocupações nos cuidados do Deus que guarda o coração."
          },
          {
            question: "Qual a diferença entre a 'Paz do Mundo' e a 'Paz de Cristo' (João 14:27)?",
            options: [
              "A paz de Cristo é profunda e independente das circunstâncias externas; a paz do mundo depende da ausência de problemas",
              "Não há diferença",
              "A paz do mundo dura para sempre",
              "A paz de Cristo é apenas para o futuro no céu"
            ],
            correctIndex: 0,
            explanation: "A paz de Jesus guarda nossas emoções mesmo no meio das tempestades da vida."
          },
          {
            question: "A prática da 'Atenção Plena' na Bíblia (contemplação) se resume a:",
            options: [
              "Fixar a mente nas coisas do alto (Colossenses 3:2) e na beleza do Senhor",
              "Esvaziar a mente de qualquer pensamento",
              "Pensar em problemas sem parar",
              "Ruminar ofensas do passado"
            ],
            correctIndex: 0,
            explanation: "Direcionar nossos pensamentos para a Palavra e a grandeza de Deus renova a mente."
          },
          {
            question: "Como o algoritmo das mídias sociais trata conteúdos que geram raiva e polêmica?",
            options: [
              "Amplifica a entrega porque indignação gera mais tempo de tela e comentários",
              "Bloqueia imediatamente qualquer conteúdo de raiva",
              "Apaga a conta de quem postou",
              "Transforma a raiva em mensagens de paz"
            ],
            correctIndex: 0,
            explanation: "A arquitetura das redes lucra com o engajamento alimentado pela polarização e raiva."
          },
          {
            question: "O cristão deve reagir às provocações nas redes sociais através de:",
            options: [
              "Domínio próprio, respondendo com graça ou optando por não entrar em debates estéreis (Provérbios 15:1)",
              "Aumentar o tom de agressividade para vencer a discussão",
              "Criar perfis falsos para atacar os outros",
              "Linchar virtualmente quem pensa diferente"
            ],
            correctIndex: 0,
            explanation: "A resposta branda desvia o furor e reflete o Fruto do Espírito em ambientes virtuais."
          },
          {
            question: "Qual o remédio bíblico para o hábito nocivo da comparação contínua nas mídias?",
            options: [
              "Cultivar a gratidão a Deus pelo que temos e encontrar contentamento na nossa identidade em Cristo",
              "Tentar ostentar mais do que os outros",
              "Criticar em segredo a vida alheia",
              "Deixar de seguir todos os amigos"
            ],
            correctIndex: 0,
            explanation: "A gratidão cura a inveja e o contentamento nos traz paz com a história que Deus escreveu para nós."
          }
        ]
      },
      {
        id: 'cc-mod-2',
        title: 'Módulo 2: Identidade Digital',
        subtitle: 'Glitches de autoimagem, aprovação virtual e autenticidade cristã',
        xp: 50,
        contextoPratico: `
          <h3>🪞 O Espelho Distorcido das Redes</h3>
          <p>Filtros estéticos, edições de foto e vidas 'perfeitas' no Instagram criam uma ilusão inalcançável. Muitos jovens desenvolvem dismorfia corporal e baixa autoestimava por tentarem corresponder a padrões virtuais irrealistas.</p>
          <p><strong>A Imagem de Deus:</strong> "Criou Deus o homem à sua imagem..." (Gênesis 1:27). Nossa dignidade e beleza nascem do fato de sermos a Imago Dei (Imagem de Deus), e não de filtros digitais.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Ensino</h3>
          <ul>
            <li><strong>Desconstrução de Padrões Falsos:</strong> Ensine que o valor humano não se mede por estética digital nem aprovação de seguidores.</li>
            <li><strong>Vulnerabilidade com Propósito:</strong> Encoraje postagens que transmitam a vida real, a fé genuína e o amor prático.</li>
          </ul>
        `,
        quiz: [
          {
            question: "O conceito teológico 'Imago Dei' significa que o ser humano foi criado:",
            options: [
              "À imagem e semelhança de Deus, possuindo dignidade intrínseca e valor sagrado",
              "Para ser adorado nas redes sociais",
              "Como um acidente biológico sem propósito",
              "Para copiar os padrões de beleza do mundo"
            ],
            correctIndex: 0,
            explanation: "Nosso valor não depende de aprovação humana, pois fomos feitos à imagem do Criador."
          },
          {
            question: "Como o uso excessivo de filtros digitais altera a percepção da própria autoimagem no jovem?",
            options: [
              "Pode gerar rejeição do próprio rosto real e crises de ansiedade estética",
              "Aumenta a gratidão a Deus pelo corpo real",
              "Não causa nenhum efeito na mente",
              "Melhora o rendimento escolar automaticamente"
            ],
            correctIndex: 0,
            explanation: "A busca por uma perfeição artificial cria insatisfação constante com a realidade física."
          },
          {
            question: "Qual o perigo espiritual da busca obsessiva por 'Curtidas' e aprovação virtual?",
            options: [
              "Substituir o desejo de agradar a Deus pela escravidão do aplauso dos homens (Gálatas 1:10)",
              "Ganhar muitos prêmios na igreja",
              "Tornar-se teólogo mais rápido",
              "Aprender grego antigo"
            ],
            correctIndex: 0,
            explanation: "Buscar a glória dos homens rouba a liberdade de viver para a glória exclusiva de Deus."
          },
          {
            question: "Como o cristão deve usar seu perfil nas mídias sociais?",
            options: [
              "Como um canal para abençoar, edificar, espalhar a verdade e o amor de Cristo",
              "Como uma vitrine para ostentação e vaidade egoísta",
              "Como uma arma de ataque contra quem discorda",
              "Para espalhar fofocas e notícias falsas"
            ],
            correctIndex: 0,
            explanation: "Nossas mídias são extensões do nosso testemunho; devemos usá-las para a glória de Deus."
          },
          {
            question: "Segundo Salmo 139:14, qual a declaração do salmista sobre sua criação?",
            options: [
              "'Graças te dou, visto que por modo assustadamente maravilhoso me me fizeste'",
              "'Sou um erro da natureza'",
              "'Deveria ter nascido com outra aparência'",
              "'Minha vida não tem valor algum'"
            ],
            correctIndex: 0,
            explanation: "Reconhecer o cuidado de Deus em nosso design combate a baixa autoestima e a rejeição."
          },
          {
            question: "O que é a 'Autenticidade Cristã' no ambiente digital?",
            options: [
              "Ser coerente entre o que se posta na internet e o que se vive no mundo real",
              "Postar versículos bíblicos de manhã e viver no pecado deliberado à noite",
              "Fingir uma vida perfeita que não existe",
              "Atacar outras pessoas para parecer mais justo"
            ],
            correctIndex: 0,
            explanation: "A integridade cristã exige que o nosso 'eu' online seja um reflexo fiel do nosso 'eu' real em Deus."
          },
          {
            question: "Como combater a cultura do exibicionismo e da vaidade nas redes?",
            options: [
              "Praticando a simplicidade, a modéstia e direcionando a atenção das pessoas para Jesus",
              "Excluindo a internet de todo o planeta",
              "Competindo para ver quem ostenta mais",
              "Julgando os outros publicamente"
            ],
            correctIndex: 0,
            explanation: "Apontar para Cristo reduz nosso orgulho egoísta e promove o verdadeiro propósito do testemunho."
          },
          {
            question: "A armadilha da 'Identidade de Avatar' ocorre quando o jovem:",
            options: [
              "Cria uma persona virtual perfeita para esconder suas dores e inseguranças reais",
              "Joga videogame uma hora por semana com amigos",
              "Usa foto de perfil com a família",
              "Lê a Bíblia no aplicativo móvel"
            ],
            correctIndex: 0,
            explanation: "Viver atrás de uma máscara virtual impede o jovem de receber cura e acolhimento comunitário real."
          },
          {
            question: "Qual o ensino bíblico em 1 Samuel 16:7 sobre o julgamento pela aparência externa?",
            options: [
              "'O homem vê o exterior, porém o SENHOR vê o coração'",
              "Deus valoriza apenas pessoas com roupas caras",
              "A beleza física é a única evidência de bênção",
              "O coração humano não tem importância para Deus"
            ],
            correctIndex: 0,
            explanation: "Deus sonda o interior do ser humano, onde reside a verdadeira beleza de um coração consagrado."
          },
          {
            question: "Qual o resultado de fundamentar a identidade única e exclusivamente em Cristo?",
            options: [
              "Libertação da ansiedade de aprovação e paz inabalável sobre quem se é",
              "Aumento da inveja e da arrogância",
              "Perda total de amigos",
              "Incapacidade de usar tecnologia"
            ],
            correctIndex: 0,
            explanation: "Saber que se é amado pelo Pai gera segurança emocional imune às oscilações da opinião pública."
          }
        ]
      },
      {
        id: 'cc-mod-3',
        title: 'Módulo 3: Cultura Woke, O Cristão e a Política',
        subtitle: 'Posicionamento firme com tom de graça sem cair em polarizações destrutivas',
        xp: 50,
        contextoPratico: `
          <h3>⚖️ Sal e Luz em Tempos Polarizados</h3>
          <p>A cultura contemporânea impõe debates ideológicos intensos sobre justiça social, identidade de gênero e política partidária. O cristão é chamado para ser Sal e Luz (Mateus 5:13-14) – o que exige não a omissão cobarde, nem a agressividade carnal, mas a Verdade dita em Amor.</p>
          <p><strong>A Cidadania do Reino:</strong> Nossa pátria principal está nos céus (Filipenses 3:20). O Reino de Deus transcende agendas partidárias humanas.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Púlpito & Posicionamento Público</h3>
          <ul>
            <li><strong>Fidelidade Bíblica Acima de Ideologias:</strong> Avalie causas e ideias pela régua das Escrituras, e não por paixões partidárias.</li>
            <li><strong>Graça no Diálogo:</strong> Defenda a fé sem tratar opositores como inimigos a serem destruídos, mas como pessoas a serem ganhas para Cristo.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual deve ser a postura do comunicador cristão diante de ideologias seculares contemporâneas?",
            options: [
              "Examinar tudo pela régua inegociável da Bíblia (1 Tessalonicenses 5:21), retendo o que é bom e rejeitando o mal",
              "Aceitar 100% de qualquer pauta moderna sem questionar",
              "Ignorar a sociedade e viver isolado em uma caverna",
              "Usar violência física contra quem pensa diferente"
            ],
            correctIndex: 0,
            explanation: "O discernimento espiritual avalia ideologias à luz da verdade revelada nas Escrituras."
          },
          {
            question: "Em Filipenses 3:20, qual é a declaração bíblica sobre nossa cidadania primária?",
            options: [
              "Nossa pátria está nos céus, de onde aguardamos o Salvador Jesus Cristo",
              "Nossa cidadania pertence a um partido político terrestre",
              "Não somos cidadãos de lugar nenhum",
              "Nossa pátria depende da quantidade de impostos pagos"
            ],
            correctIndex: 0,
            explanation: "Somos embaixadores do Reino de Deus na Terra; nossa lealdade suprema é a Jesus Cristo."
          },
          {
            question: "O que significa dizer a 'Verdade em Amor' (Efésios 4:15) nos debates públicos?",
            options: [
              "Manter a firmeza dos princípios bíblicos sem usar agressividade, sarcasmo ou ódio pessoal",
              "Ficar em silêncio por medo de incomodar",
              "Ofender as pessoas para provar que a Bíblia está certa",
              "Mudar a Bíblia para agradar aos ouvintes"
            ],
            correctIndex: 0,
            explanation: "Falar a verdade sem amor é dureza religiosa; falar 'amor' sem verdade é engano. Precisamos dos dois."
          },
          {
            question: "Qual o papel do crente como 'Sal da Terra' e 'Luz do Mundo' (Mateus 5:13-14)?",
            options: [
              "Preservar os valores morais da sociedade e iluminar as trevas com o amor e a justiça do Evangelho",
              "Julgar e condenar a todos com arrogância",
              "Esconder sua fé para não ser notado",
              "Buscar cargos de poder para enriquecer"
            ],
            correctIndex: 0,
            explanation: "O sal previne a podridão moral e a luz dissipa a cegueira espiritual ao nosso redor."
          },
          {
            question: "Como o cristão deve se relacionar com as autoridades governamentais segundo Romanos 13?",
            options: [
              "Orar por elas, respeitar as leis justas e exercer cidadania consciente sem idolatria nem rebelião injustificada",
              "Adorar políticos como se fossem salvadores",
              "Promover a anarquia e desordem social",
              "Ignorar qualquer lei do país"
            ],
            correctIndex: 0,
            explanation: "Deus estabeleceu ordens sociais para a paz. Devemos orar pelos governantes e buscar o bem comum."
          },
          {
            question: "Quando uma lei humana entra em contradição direta com os mandamentos de Deus, qual a orientação bíblica (Atos 5:29)?",
            options: [
              "'Antes importa obedecer a Deus do que aos homens'",
              "Obedecer aos homens e abandonar a Bíblia",
              "Inventar uma nova religião",
              "Desistir de ser cristão"
            ],
            correctIndex: 0,
            explanation: "Nossa fidelidade a Deus é suprema e inegociável quando o Estado tenta violar a consciência bíblica."
          },
          {
            question: "Qual a armadilha de transformar a igreja em um comício político-partidário?",
            options: [
              "Dividir o corpo de Cristo por paixões humanas e afastar pessoas do verdadeiro Evangelho da Salvação",
              "Garantir a salvação automática de todos os membros",
              "Aumentar a unção do Espírito Santo",
              "Converter mais pecadores"
            ],
            correctIndex: 0,
            explanation: "A igreja existe para proclamar o Evangelho eterno, não para servir de palanque para ideologias temporais."
          },
          {
            question: "A verdadeira justiça social no conceito bíblico se manifesta através de:",
            options: [
              "Defesa dos oprimidos, cuidado com órfãos e viúvas, honestidade e amor prático sem opressão",
              "Inveja de classes e violência verbal",
              "Isolamento dos pobres",
              "Rituais sem compaixão"
            ],
            correctIndex: 0,
            explanation: "Miqueias 6:8 ensina: 'praticar a justiça, amar a misericórdia e andar humildemente com o teu Deus'."
          },
          {
            question: "Como lidar com irmãos na fé que possuem opiniões políticas divergentes em temas secundários?",
            options: [
              "Preservar a unidade no essencial, a liberdade no secundário e a caridade em tudo",
              "Expulsá-los da comunidade de fé imediatamente",
              "Ofendê-los nos grupos de mensagens da igreja",
              "Fazer campanhas de boicote pessoal"
            ],
            correctIndex: 0,
            explanation: "A comunhão do Corpo de Cristo é fundada em Jesus e não na concordância política secundária."
          },
          {
            question: "Qual o destino e esperança final do cristão em relação à história humana?",
            options: [
              "O retorno glorioso de Jesus, a renovação de todas as coisas e o estabelecimento definitivo do Reino de Justiça",
              "O domínio de um império político humano perfeito na Terra",
              "A destruição total sem esperança",
              "A evolução tecnológica sem Deus"
            ],
            correctIndex: 0,
            explanation: "Nossa esperança suprema não está em governos humanos, mas no Rei dos reis que voltará."
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual o posicionamento equilibrado do comunicador cristão na cultura contemporânea?",
        options: [
          "Firmeza bíblica nas verdades inegociáveis, dita com graça, discernimento espiritual e amor redentor",
          "Agressividade raivosa e ataques pessoais nas redes",
          "Omissão covarde por medo da crítica cultural",
          "Conformismo total com os padrões do mundo secular"
        ],
        correctIndex: 0,
        explanation: "Falar a Verdade em Amor reflete a plenitude de Cristo sem cair nem no relativismo nem no ódio."
      },
      {
        question: "Como combater a ansiedade causada pelo vício em mídias sociais e algoritmos?",
        options: [
          "Praticando o descanso no Senhor (Sabbath), jejum digital intencional e fixando a mente no secreto",
          "Aumentando o tempo de uso do celular",
          "Comparando-se mais com os outros nas redes",
          "Postando mais para obter curtidas"
        ],
        correctIndex: 0,
        explanation: "Desacelerar no secreto com Deus restaura a saúde emocional e espiritual contra os estímulos incessantes."
      },
      {
        question: "A identidade do cristão é fundamentada:",
        options: [
          "No fato inabalável de ser criado à Imagem de Deus (Imago Dei) e remido na Cruz em Cristo",
          "No número de seguidores e curtidas nas redes sociais",
          "Na quantidade de bens materiais ostentados",
          "Na aprovação de partidos políticos humanos"
        ],
        correctIndex: 0,
        explanation: "Saber que se é amado e aceito pelo Criador liberta o ser humano da necessidade de aprovação virtual."
      },
      {
        question: "Em debates ideológicos e políticos, o que deve prevalecer na conduta do pregador?",
        options: [
          "A fidelidade às Escrituras e a defesa da unidade do Corpo de Cristo acima de paixões humanas",
          "O interesse em ganhar discussões a qualquer custo moral",
          "O ataque desrespeitoso à imagem de quem discorda",
          "A transformação da pregação em palanque eleitoral"
        ],
        correctIndex: 0,
        explanation: "O Evangelho é a única mensagem capaz de unir pessoas de todas as tribos e nações sob o senhorio de Jesus."
      },
      {
        question: "Qual é o fruto de uma liderança que é verdadeiramente Sal e Luz na sociedade?",
        options: [
          "Transformação social real, edificação dos quebrantados e glória ao Nome de Deus",
          "Fama pessoal egoísta",
          "Divisão e ódio comunitário",
          "Superficialidade espiritual"
        ],
        correctIndex: 0,
        explanation: "Boas obras feitas por amor a Cristo levam as pessoas a glorificarem ao Pai que está nos céus."
      }
    ]
  },
  {
    id: 'church-history',
    title: 'Trilha 5: História da Igreja',
    subtitle: 'Da Igreja Primitiva aos Avivamentos e os Desafios do Século XXI',
    category: 'História & Herança',
    badge: '🏛️ Insígnia History Guardian',
    icon: 'Landmark',
    color: 'from-amber-600 to-yellow-600',
    modules: [
      {
        id: 'hi-mod-1',
        title: 'Módulo 1: A Igreja Primitiva',
        subtitle: 'Atos dos Apóstolos, perseguição imperial e expansão missionária',
        xp: 50,
        contextoPratico: `
          <h3>🔥 O Fogo de Pentecostes e o Sangue dos Mártires</h3>
          <p>A Igreja não nasceu em catedrais luxuosas, mas em um Cenáculo através do derramamento do Espírito Santo (Atos 2). Sob severa perseguição do Império Romano, a fé cristã não foi extinta; pelo contrário, quanto mais os cristãos eram perseguidos, mais a mensagem de Cristo se espalhava.</p>
          <p><strong>Comunidade Radicamente Amorosa:</strong> "Perseveravam na doutrina dos apóstolos, na comunhão, no partir do pão e nas orações" (Atos 2:42). O amor prático dos primeiros cristãos constrangia os pagãos.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação para a Igreja Atual</h3>
          <ul>
            <li><strong>Voltar ao Essencial:</strong> Doutrina sadia, comunhão sincera, oração fervorosa e generosidade com os necessitados.</li>
            <li><strong>Resiliência na Tribulação:</strong> As crises culturais são oportunidades para a luz da igreja brilhar mais forte.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual evento marca o nascimento da Igreja Cristã segundo o livro de Atos dos Apóstolos?",
            options: [
              "O derramamento do Espírito Santo no dia de Pentecostes (Atos 2)",
              "A coroação do imperador Constantino",
              "A escrita da primeira Bíblia impressa",
              "A construção da Basílica de São Pedro"
            ],
            correctIndex: 0,
            explanation: "Pentecostes capacitou a igreja inicial com poder para testemunhar de Jesus a todas as nações."
          },
          {
            question: "Quais eram os quatro pilares da vida comunitária da Igreja Primitiva (Atos 2:42)?",
            options: [
              "Doutrina dos apóstolos, comunhão, partir do pão e orações",
              "Arrecadação de impostos, festas seculares, esportes e política",
              "Construção de prédios, estudos em latim, cobrança de ingressos e isolamento",
              "Jejum de água, silêncio absoluto, punições e julgamentos"
            ],
            correctIndex: 0,
            explanation: "Esses quatro pilares sustentavam a saúde espiritual e o crescimento orgânico da igreja inicial."
          },
          {
            question: "Como o historiador Tertuliano descreveu o impacto da perseguição romana sobre os cristãos?",
            options: [
              "'O sangue dos mártires é a semente da Igreja'",
              "'A perseguição destruiu a fé cristã para sempre'",
              "'Os cristãos fugiram e abandonaram o Evangelho'",
              "'O Império Romano venceu a mensagem da cruz'"
            ],
            correctIndex: 0,
            explanation: "O testemunho corajoso dos mártires inspirava multidões a se converterem ao Senhor Jesus."
          },
          {
            question: "Quem foi o primeiro mártir cristão registrado no livro de Atos (Atos 7)?",
            options: [
              "Estêvão",
              "Pedro",
              "Paulo",
              "João"
            ],
            correctIndex: 0,
            explanation: "Estêvão pregou com ousadia e, ao ser apedrejado, orou perdoando seus executores à imagem de Jesus."
          },
          {
            question: "Qual o papel do Apóstolo Paulo na expansão do cristianismo primitivo?",
            options: [
              "Ser o apóstolo dos gentios, realizando viagens missionárias e escrevendo epístolas doutrinárias",
              "Defender o Império Romano contra os cristãos",
              "Proibir o ensino da fé fora de Jerusalém",
              "Destruir as comunidades de fé na Grécia"
            ],
            correctIndex: 0,
            explanation: "Paulo plantou igrejas por todo o mundo greco-romano e sistematizou ensinos fundamentais da fé."
          },
          {
            question: "O Edito de Milão (ano 313 d.C.) assinado pelo imperador Constantino resultou em:",
            options: [
              "Fim da perseguição oficial aos cristãos e liberdade de culto no Império Romano",
              "Abertura de uma guerra contra todos os cristãos",
              "A obrigatoriedade de que todos fossem ateus",
              "A destruição de todas as Bíblias existentes"
            ],
            correctIndex: 0,
            explanation: "Constantino concedeu tolerância religiosa aos cristãos, encerrando séculos de martírios cruéis."
          },
          {
            question: "Qual a principal característica do amor prático dos cristãos durante as grandes pestes do mundo antigo?",
            options: [
              "Cuidavam dos doentes e abandonados (mesmo os pagãos), arriscando as próprias vidas por compaixão",
              "Fugiam das cidades e deixavam todos morrerem",
              "Vendiam remédios falsos por preços altos",
              "Culpavam os doentes e os apedrejavam"
            ],
            correctIndex: 0,
            explanation: "A compaixão em tempos de crise epidêmica impactou o mundo antigo e converteu milhares ao Evangelho."
          },
          {
            question: "O Concílio de Nicéia (ano 325 d.C.) foi convocado para reafirmar qual doutrina central da fé?",
            options: [
              "A divindade de Jesus Cristo, afirmando que Ele é verdadeiro Deus e consubstancial ao Pai",
              "A obrigatoriedade da celebração do Natal em dezembro",
              "O uso de roupas romanas nos cultos",
              "A proibição do casamento para todos os cidadãos"
            ],
            correctIndex: 0,
            explanation: "Nicéia combateu a heresia de Ário, afirmando a plena divindade do Filho eterna com o Pai."
          },
          {
            question: "Como as reuniões nas casas ('igrejas nos lares') favoreciam a igreja primitiva?",
            options: [
              "Facilitavam o discipulado próximo, a comunhão íntima e a proteção contra a perseguição",
              "Impediam a entrada de novos conversos",
              "Eram reuniões secretas para planejar revoltas políticas",
              "Substituíam a necessidade de oração"
            ],
            correctIndex: 0,
            explanation: "Nos lares, os cristãos compartilhavam refeições, ensinavam as Escrituras e cuidavam uns dos outros."
          },
          {
            question: "O que a perseverança da Igreja Primitiva ensina aos líderes contemporâneos?",
            options: [
              "Que o poder da igreja não depende de aprovação estatal ou estrutura física, mas da presença viva do Espírito",
              "Que devemos buscar alianças políticas a qualquer custo",
              "Que a igreja deve fechar as portas diante de críticas",
              "Que a fé é uma tradição passageira"
            ],
            correctIndex: 0,
            explanation: "O Espírito Santo impulsiona o crescimento da igreja autêntica em qualquer época ou cenário."
          }
        ]
      },
      {
        id: 'hi-mod-2',
        title: 'Módulo 2: Reformadores e Grandes Avivamentos',
        subtitle: 'Lutero, os 5 Solas e os movimentos de renovação espiritual',
        xp: 50,
        contextoPratico: `
          <h3>🔨 As 95 Teses de Lutero e o Resgate da Palavra</h3>
          <p>Em 31 de Outubro de 1517, Martinho Lutero fixou as 95 Teses na porta da Igreja de Wittenberg, desencadeando a Reforma Protestante. Contra a venda de indulgências e o desvio doutrinário, os reformadores proclamaram o regresso às Escrituras sagradas.</p>
          <p><strong>Os 5 Solas da Reforma:</strong> Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria. A salvação pertence ao Senhor do início ao fim.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação na Pregação Bíblica</h3>
          <ul>
            <li><strong>Centralidade da Escritura:</strong> Suas pregações devem ser expositivas e fundamentadas na Bíblia (Sola Scriptura).</li>
            <li><strong>Toda Glória a Deus:</strong> Elimine qualquer busca de autoexaltação do pregador (Soli Deo Gloria).</li>
          </ul>
        `,
        quiz: [
          {
            question: "Quem foi o monge alemão que deu início à Reforma Protestante em 1517?",
            options: [
              "Martinho Lutero",
              "João Calvino",
              "John Wesley",
              "C.S. Lewis"
            ],
            correctIndex: 0,
            explanation: "Lutero desafiou abusos doutrinários e reacendeu a mensagem da justificativa pela fé."
          },
          {
            question: "O pilar 'Sola Scriptura' defende que:",
            options: [
              "A Bíblia é a única regra de fé e prática divinamente inspirada e suprema para o cristão",
              "A tradição humana vale mais do que a Bíblia",
              "Devemos ler apenas livros filosóficos",
              "Qualquer pessoa pode inventar novas doutrinas diariamente"
            ],
            correctIndex: 0,
            explanation: "Toda doutrina e conduta do crente deve ser examinada e submetida à autoridade das Escrituras."
          },
          {
            question: "O pilar 'Sola Fide' e 'Sola Gratia' afirma que a salvação do pecador ocorre por:",
            options: [
              "Graça mediante a fé em Jesus Cristo, sem mérito de obras humanas",
              "Pagamento de valores financeiros à igreja",
              "Acúmulo de rituais e sacrifícios físicos",
              "Esforço intelectual individual"
            ],
            correctIndex: 0,
            explanation: "Efésios 2:8-9 ensina que a salvação é um dom gratuito de Deus recebido mediante a fé."
          },
          {
            question: "O que o pilar 'Soli Deo Gloria' declara sobre o propósito de todas as coisas?",
            options: [
              "A glória pertence exclusivamente a Deus em todas as áreas da vida",
              "O homem deve buscar glória e aplausos para si mesmo",
              "Os pregadores devem ser adorados como santos na Terra",
              "Deus compartilha sua glória com ídolos"
            ],
            correctIndex: 0,
            explanation: "Tudo o que criamos e vivemos deve ser direcionado para exaltar o Nome do Senhor."
          },
          {
            question: "Qual foi a contribuição fundamental de William Tyndale e Martinho Lutero para o povo comum?",
            options: [
              "Traduziram a Bíblia para as línguas vernáculas (alemão e inglês), permitindo que todos lessem a Palavra",
              "Proibiram a leitura da Bíblia pelo povo",
              "Destruíram cópias antigas dos evangelhos",
              "Escreveram apenas em latim erudito"
            ],
            correctIndex: 0,
            explanation: "Traduzir as Escrituras para o idioma do povo democratizou o acesso à Verdade de Deus."
          },
          {
            question: "O 'Primeiro Grande Avivamento' no século XVIII teve como expoentes pregadores como:",
            options: [
              "Jonathan Edwards e George Whitefield",
              "Nero e Domiciano",
              "René Descartes e Voltaire",
              "Karl Marx e Friedrich Nietzsche"
            ],
            correctIndex: 0,
            explanation: "Edwards e Whitefield pregaram o arrependimento fervoroso, resultando na conversão de milhares na Inglaterra e EUA."
          },
          {
            question: "John Wesley, fundador do Movimento Metodista, enfatizou fortemente qual aspecto da vida cristã?",
            options: [
              "A santificação prática, o amor aos pobres e a evangelização ao ar livre",
              "O isolamento em mosteiros distantes",
              "O acúmulo de propriedades de luxo",
              "O fim dos estudos bíblicos"
            ],
            correctIndex: 0,
            explanation: "Wesley uniu paixão evangelística com compromisso de transformação social e santidade."
          },
          {
            question: "O Avivamento da Rua Azusa (1906 em Los Angeles) liderado por William J. Seymour foi o marco do:",
            options: [
              "Movimento Pentecostal Moderno, com ênfase no batismo no Espírito Santo e dons espirituais",
              "Fim das reuniões de oração no mundo",
              "Movimento Iluminista secular",
              "Surgimento da teologia da prosperidade extrema"
            ],
            correctIndex: 0,
            explanation: "Na Rua Azusa, pessoas de todas as raças buscaram a unção do Espírito, espalhando o pentecostes pelo mundo."
          },
          {
            question: "Qual o traço comum presente em todos os verdadeiros avivamentos da história da Igreja?",
            options: [
              "Oração fervorosa, profundo quebrantamento por pecados, regresso à Bíblia e transformação de vidas",
              "Aumento do orgulho religioso e festas seculares",
              "Busca por entretenimento vazio sem arrependimento",
              "Foco em arrecadação financeira"
            ],
            correctIndex: 0,
            explanation: "Avivamento genuíno começa com choro pelo pecado e resulta em fome pela Palavra e amor pelas almas."
          },
          {
            question: "O legado da Reforma Protestante para a comunicação do Evangelho nos ensina a:",
            options: [
              "Pregar a Bíblia com clareza, fidelidade doutrinária e centralidade na pessoa de Jesus Cristo",
              "Substituir a pregação por discursos motivacionais sem a Bíblia",
              "Ignorar os erros do passado sem aprender com eles",
              "Buscar a aprovação do mundo secular"
            ],
            correctIndex: 0,
            explanation: "Pregar a Palavra pura no poder do Espírito é o compromisso inegociável da igreja reformada e avivada."
          }
        ]
      },
      {
        id: 'hi-mod-3',
        title: 'Módulo 3: A Igreja no Século XXI',
        subtitle: 'Desafios contemporâneos, redes digitais e o futuro da comunidade de fé',
        xp: 50,
        contextoPratico: `
          <h3>🌍 A Missão Global em um Mundo sem Fronteiras</h3>
          <p>No século XXI, o cristianismo vive seu maior deslocamento geográfico: o centro da fé protestante e avivada mudou do Ocidente para o Sul Global (América Latina, África e Ásia). Enfrentamos a cultura pós-cristã e o desafio de ser igreja tanto no mundo físico quanto nas redes digitais.</p>
          <p><strong>Fidelidade sem Isolamento:</strong> Ser uma comunidade terapêutica, missionária e fundamentada na Bíblia em meio ao caos pós-moderno.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação Estratégica na Liderança</h3>
          <ul>
            <li><strong>Igreja Híbrida Inteligente:</strong> Use o ambiente online como 'porta de entrada' para conectar pessoas à comunhão presencial profunda.</li>
            <li><strong>Mentalidade Missionária Local:</strong> Enxergue seu bairro, faculdade e empresa como campo de missões transculturais.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual o fenômeno geográfico do crescimento do cristianismo no século XXI?",
            options: [
              "O forte crescimento e vigor espiritual no Sul Global (América Latina, África e Ásia)",
              "O fim completo do cristianismo em todo o planeta",
              "A migração do centro da fé para a Antártida",
              "O abandono da fé em todos os países em desenvolvimento"
            ],
            correctIndex: 0,
            explanation: "Deus tem levantado a igreja do Sul Global como força missionária apaixonada para as nações."
          },
          {
            question: "O que é uma 'Cultura Pós-Cristã' que caracteriza parte do mundo ocidental hoje?",
            options: [
              "Uma sociedade que abandonou suas raízes judaico-cristãs e encara a fé com ceticismo ou indiferença",
              "Uma sociedade onde todos são teólogos diplomados",
              "Um país onde a Bíblia é a única lei civil",
              "Uma era sem tecnologia"
            ],
            correctIndex: 0,
            explanation: "Na cultura pós-cristã, o comunicador precisa explicar os conceitos bíblicos desde o fundamento."
          },
          {
            question: "Como a igreja deve utilizar os meios virtuais e mídias sociais no século XXI?",
            options: [
              "Como ferramentas de alcance e pontes para conduzir as pessoas à comunhão presencial e ao discipulado",
              "Para substituir totalmente o abraço e a comunhão comunitária presencial",
              "Para vender promessas de milagres por PIX",
              "Devemos proibir os membros de usar a internet"
            ],
            correctIndex: 0,
            explanation: "O ambiente digital é a praça pública moderna (Areópago) para atrair pessoas para a vida real em Cristo."
          },
          {
            question: "O risco do 'Consumismo Religioso' na igreja pós-moderna se manifesta quando o crente:",
            options: [
              "Procura uma igreja como se fosse um cliente buscando entretenimento e benefícios sem compromisso nem serviço",
              "Decide ler a Bíblia todos os dias",
              "Oferta com alegria para missões",
              "Serve aos pobres da comunidade"
            ],
            correctIndex: 0,
            explanation: "A igreja não é um shopping center de bênçãos; é um exército de servos do Rei Jesus."
          },
          {
            question: "O conceito de 'Igreja Terapêutica e Acolhedora' enfatiza:",
            options: [
              "Acolher os quebrantados com a graça de Cristo e oferecer cura para os traumas da alma fundamentada na Bíblia",
              "Eliminar o ensino sobre o pecado e o arrependimento",
              "Cobrar por consultas pastorais no púlpito",
              "Apenas realizar shows de entretenimento secular"
            ],
            correctIndex: 0,
            explanation: "Em um mundo ferido pela solidão, a igreja deve ser refúgio de cura, verdade e amor restaurador."
          },
          {
            question: "Qual deve ser a missão prioritária da igreja local segundo a Grande Comissão (Mateus 28:19)?",
            options: [
              "Fazer discípulos de todas as nações, batizando e ensinando a obedecer a Jesus",
              "Construir os maiores prédios da cidade para ter fama",
              "Competir com outras denominações por membros",
              "Acumular patrimônio financeiro sem investir em almas"
            ],
            correctIndex: 0,
            explanation: "Fazer discípulos maduros é o objetivo central de todo esforço e estratégia da igreja."
          },
          {
            question: "O conceito de 'Missão Integral' aborda o compromisso da igreja com:",
            options: [
              "A proclamação do Evangelho da Salvação aliado à ação social de amor ao próximo",
              "Apenas a distribuição de alimentos sem falar de Jesus",
              "Apenas a pregação verbal sem ajudar quem passa fome",
              "A busca por poder político partidário"
            ],
            correctIndex: 0,
            explanation: "O Evangelho cuida do ser humano por inteiro: alma, mente, corpo e relacionamentos."
          },
          {
            question: "Como manter a relevância cultural sem perder a fidelidade bíblica no século XXI?",
            options: [
              "Inovando nos métodos e linguagens, mas mantendo a mensagem da Cruz imutável e inegociável",
              "Mudando a doutrina conforme as opiniões das redes sociais",
              "Abandonando a Bíblia e lendo apenas notícias seculares",
              "Copiar rituais medievais sem explicação"
            ],
            correctIndex: 0,
            explanation: "Métodos se adaptam aos tempos; a mensagem divina permanece a mesma ontem, hoje e para sempre."
          },
          {
            question: "O ecumenismo saudável na cooperação de igrejas protestantes se baseia em:",
            options: [
              "União na pessoa de Jesus Cristo e na essência do Evangelho para servir a comunidade e evangelizar",
              "Negociar a divindade de Jesus por diplomacia",
              "Criar uma única religião mundial sem Bíblia",
              "Discutir quem é o dono da verdade em redes de rádio"
            ],
            correctIndex: 0,
            explanation: "Igrejas fiéis à Bíblia podem cooperar no amor prático e na proclamação de Cristo ao mundo."
          },
          {
            question: "Qual a promessa reconfortante de Jesus sobre o futuro da Sua Igreja (Mateus 16:18)?",
            options: [
              "'Edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela'",
              "Que a igreja desaparecerá completamente no século XXI",
              "Que o mal vencerá os santos na Terra",
              "Que o destino da igreja depende de governos terrenos"
            ],
            correctIndex: 0,
            explanation: "A igreja de Jesus é invencível e triunfará gloriosa na consumação dos séculos!"
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual a grande lição da História da Igreja desde o século I até hoje?",
        options: [
          "O Espírito Santo preserva e multiplica a verdadeira Igreja quando ela é fiel às Escrituras e apaixonada por Jesus",
          "A igreja só prospera quando tem aliança com impérios políticos fortes",
          "A perseguição destruiu o cristianismo nos primeiros séculos",
          "As doutrinas bíblicas devem mudar conforme a moda cultural de cada década"
        ],
        correctIndex: 0,
        explanation: "A presença invencível do Espírito Santo garante o triunfo da igreja de Cristo através de todas as eras."
      },
      {
        question: "Os 5 Solas da Reforma Protestante reacenderam o entendimento de que:",
        options: [
          "A salvação é exclusivamente pela Graça mediante a Fé em Cristo, revelada na Bíblia para a Glória única de Deus",
          "O ser humano compra sua salvação por obras e doações",
          "A tradição de homens está acima da Palavra de Deus",
          "Todos os caminhos levam a Deus sem necessidade da Cruz"
        ],
        correctIndex: 0,
        explanation: "Os 5 Solas resumem o coração do Evangelho resgatado pelos reformadores."
      },
      {
        question: "O que caracterizou todos os grandes avivamentos históricos (como Azusa, Metodismo e Grande Despertamento)?",
        options: [
          "Oração fervorosa, quebrantamento por pecados, fome pela Bíblia, capacitação do Espírito e paixão evangelística",
          "Superficialidade espiritual e entretenimento secular",
          "Busca por fama pessoal dos prelechores",
          "Brigas dogmáticas sem amor"
        ],
        correctIndex: 0,
        explanation: "Avivamento de verdade gera arrependimento, santidade prática e amor fervoroso pelas almas."
      },
      {
        question: "No século XXI, o uso das mídias digitais pela igreja deve visar prioritariamente:",
        options: [
          "Construir pontes para alcançar os afastados e conduzi-los à comunhão e ao discipulado presencial em Cristo",
          "Gerar lucros financeiros para os líderes",
          "Promover debates coléricos nas redes sociais",
          "Substituir o contato humano e o abraço fraterno"
        ],
        correctIndex: 0,
        explanation: "A tecnologia é um meio poderoso para proclamar a Verdade e atrair almas para a família de Deus."
      },
      {
        question: "Qual o compromisso supremo da liderança cristã de todas as gerações?",
        options: [
          "Perseverar na sã doutrina, viver em amor prático e fazer discípulos de todas as nações até que Cristo volte",
          "Acumular poder político e riqueza material",
          "Agradar às opiniões do mundo secular",
          "Manter tradições humanas vazias de significado"
        ],
        correctIndex: 0,
        explanation: "Cumprir a Grande Comissão em fidelidade à Palavra é o legado imortal da igreja de Jesus."
      }
    ]
  },
  {
    id: 'kingdom-of-god',
    title: 'Trilha 6: Reino de Deus',
    subtitle: 'A Mensagem Central de Cristo, Propósito e Manifestação Prática na Sociedade',
    category: 'Teologia Aplicada',
    badge: '⚔️ Insígnia Kingdom Warrior',
    icon: 'Sword',
    color: 'from-amber-500 to-red-600',
    modules: [
      {
        id: 'rg-mod-1',
        title: 'Módulo 1: A Mensagem Central do Evangelho',
        subtitle: 'O que é e como se manifesta o Reino de Deus ("Já e Ainda Não")',
        xp: 50,
        contextoPratico: `
          <h3>👑 O Governo de Deus na Terra</h3>
          <p>O tema central das pregações de Jesus não foi a igreja em si, nem finanças, mas o Reino de Deus ("Arrependei-vos, porque é chegado o Reino dos Céus" - Mateus 4:17). O Reino é a soberania e o governo redentor de Deus invadindo a realidade humana.</p>
          <p><strong>A Tensão Teológica: "Já e Ainda Não":</strong> O Reino já foi inaugurado na primeira vinda de Cristo, mas sua consumação total acontecerá na Sua volta gloriosa.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Ensino do Púlpito</h3>
          <ul>
            <li><strong>Visão de Reino:</strong> Ensnar os membros que o Evangelho não é apenas uma passagem para o céu no futuro, mas o governo de Deus hoje no seu coração e atitudes.</li>
            <li><strong>Esperança Viva:</strong> Viva com a alegria do Reino inaugurado e com a bendita esperança do Reino consumado.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual foi o tema central e prioritário de todas as pregações de Jesus nos Evangelhos?",
            options: [
              "O Reino de Deus (Mateus 4:17)",
              "Reformas políticas no Império Romano",
              "Técnicas de oratória grega",
              "Acúmulo de propriedades na Galileia"
            ],
            correctIndex: 0,
            explanation: "Jesus veio anunciar a chegada da autoridade e do governo redentor do Pai sobre os homens."
          },
          {
            question: "O conceito teológico do Reino de Deus como 'Já e Ainda Não' significa que:",
            options: [
              "O Reino já está presente espiritualmente e atuante hoje, mas sua plenitude final ocorrerá na volta de Jesus",
              "O Reino é uma ilusão que nunca acontecerá",
              "O Reino começou e terminou no século I",
              "O Reino depende do resultado de eleições terrestres"
            ],
            correctIndex: 0,
            explanation: "Já desfrutamos das bênçãos do Reino em Cristo, mas aguardamos a perfeição dos novos céus e nova terra."
          },
          {
            question: "Em Romanos 14:17, o apóstolo Paulo define o Reino de Deus não por comida ou bebida, mas por:",
            options: [
              "Justiça, paz e alegria no Espírito Santo",
              "Ritos religiosos externos e julgamentos",
              "Fama e aplausos nas mídias sociais",
              "Acúmulo de moedas de ouro"
            ],
            correctIndex: 0,
            explanation: "A essência da vida no Reino é a transformação interior movida pelo Espírito Santo."
          },
          {
            question: "Como o Reino de Deus subverte os valores do mundo secular (a 'Cultura do Avesso')?",
            options: [
              "No Reino, o maior é o que serve, os humildes são exaltados e o amor perdoa os inimigos",
              "No Reino, os ricos e poderosos dominam sobre os fracos",
              "No Reino, a vingança é o dever supremo",
              "No Reino, a aparência vale mais do que a verdade"
            ],
            correctIndex: 0,
            explanation: "As bem-aventuranças (Mateus 5) mostram a lógica de amor e serviço que transforma a sociedade."
          },
          {
            question: "Na parábola do Grão de Mostarda (Mateus 13:31-32), Jesus ensina que o Reino de Deus:",
            options: [
              "Começa pequeno e imperceptível, mas cresce até se tornar uma árvore gigante de alcance universal",
              "Cresce rapidamente e depois desaparece para sempre",
              "É uma estrutura militar violenta",
              "Não tem capacidade de expansão"
            ],
            correctIndex: 0,
            explanation: "O Reino avança de forma orgânica e constante, alcançando os confins da Terra."
          },
          {
            question: "O que o arrependimento ('Metanoia') significa ao entrar no Reino de Deus?",
            options: [
              "Uma mudança profunda de mente, rumo e estilo de vida alinhados à vontade de Deus",
              "Apenas um sentimento temporário de culpa sem mudança de atitudes",
              "Uma multa financeira paga à igreja",
              "Decorar leis antigas sem praticá-las"
            ],
            correctIndex: 0,
            explanation: "Arrepender-se é dar uma virada de 180 graus, abandonando o pecado para seguir a Cristo."
          },
          {
            question: "O Rei do Reino de Deus demonstrou Sua autoridade suprema ao:",
            options: [
              "Dar Sua vida na Cruz e ressuscitar ao terceiro dia, vencendo o pecado e a morte",
              "Construir um palácio de ouro em Jerusalém",
              "Usar um exército para matar Seus opositores",
              "Fugir para o Egito e se esconder"
            ],
            correctIndex: 0,
            explanation: "Jesus conquistou a vitória e o senhorio supremo não por armas humanas, mas pelo amor sacrifical."
          },
          {
            question: "Na parábola do Fermento (Mateus 13:33), o impacto do Reino na sociedade é comparado a:",
            options: [
              "Um elemento que leveda e transforma silenciosamente toda a massa de dentro para fora",
              "Uma tempestade destruidora que quebra tudo",
              "Uma ilusão de ótica",
              "Um elemento que se estraga rapidamente"
            ],
            correctIndex: 0,
            explanation: "O Reino transforma a cultura, a família e a sociedade através da presença viva dos crentes."
          },
          {
            question: "Qual o relacionamento entre a Igreja e o Reino de Deus?",
            options: [
              "A igreja é a comunidade dos salvos e a embaixada na Terra que Proclama e Demonstra o Reino de Deus",
              "A igreja e o Reino são exatamente a mesma estrutura física de prédios",
              "O Reino de Deus não precisa da igreja de forma alguma",
              "A igreja comanda o Reino como instituição humana"
            ],
            correctIndex: 0,
            explanation: "A igreja é o instrumento e o povo chamado para manifestar o Reino às nações."
          },
          {
            question: "Qual a oração do crente apaixonado pelo Reino de Deus em relação ao cotidiano?",
            options: [
              "'Venha o teu Reino, faça-se a tua vontade, assim na terra como no céu' (Mateus 6:10)",
              "'Faça-se a minha vontade pessoal acima de tudo'",
              "'Que Deus destrua meus concorrentes no trabalho'",
              "'Que eu fique rico sem trabalhar'"
            ],
            correctIndex: 0,
            explanation: "Desejar a vinda do Reino é submeter nossas escolhas e a sociedade ao senhorio do Pai."
          }
        ]
      },
      {
        id: 'rg-mod-2',
        title: 'Módulo 2: Valia e Propósito no Reino',
        subtitle: 'Saindo da mentalidade de consumidor para construtor de legado',
        xp: 50,
        contextoPratico: `
          <h3>🛠️ Vocação Divina e Sacerdócio de Todos os Crentes</h3>
          <p>Na visão do Reino de Deus, não existe divisão entre o 'sagrado' e o 'secular'. Todo trabalho honesto (seja na engenharia, na medicina, na arte ou no lar) é uma vocação divina para glorificar a Deus e servir ao próximo. Todos somos sacerdotes do Deus Altíssimo (1 Pedro 2:9).</p>
          <p><strong>Desatar os Dons:</strong> Cada cristão recebeu talentos únicos do Espírito Santo para edificação mútua.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Trabalho & Ministério</h3>
          <ul>
            <li><strong>Ministério no Mercado de Trabalho:</strong> Ensine sua comunidade que seu local de trabalho é seu campo missionário principal.</li>
            <li><strong>Excelência e Ética:</strong> Faça todas as tarefas como se fossem diretamente para o Senhor Jesus (Colossenses 3:23).</li>
          </ul>
        `,
        quiz: [
          {
            question: "O que a doutrina bíblica do 'Sacerdócio Universal de Todos os Crentes' (1 Pedro 2:9) ensina?",
            options: [
              "Que todo cristão remido é um sacerdote chamado para adorar, servir e testemunhar de Deus em todas as áreas da vida",
              "Que apenas pastores ordenados têm acesso direto a Deus",
              "Que ninguém precisa ler a Bíblia",
              "Que devemos viver dentro de mosteiros isolados"
            ],
            correctIndex: 0,
            explanation: "Em Cristo, todos temos livre acesso a Deus e a missão sagrada de representar Seu Reino no mundo."
          },
          {
            question: "Como o Reino de Deus enxerga a divisão entre trabalhos 'Sagrados' (na igreja) e 'Seculares' (no mercado)?",
            options: [
              "Não há divisão; todo trabalho honesto feito com fé e excelência glorifica a Deus e serve ao próximo",
              "O trabalho no mercado é pecado e deve ser evitado",
              "Apenas o trabalho do pastor tem valor para Deus",
              "Trabalhar na igreja vale 10 vezes mais salvação"
            ],
            correctIndex: 0,
            explanation: "O cristão glorifica a Deus na fábrica, no escritório ou no palco da igreja quando faz para o Senhor."
          },
          {
            question: "Em Colossenses 3:23, qual a instrução sobre a postura do cristão em suas tarefas e profissão?",
            options: [
              "'Tudo quanto fizerdes, fazei-o de todo o coração, como para o Senhor e não para homens'",
              "Fazer o mínimo possível apenas para receber o salário",
              "Reclamar do chefe todos os dias nas redes sociais",
              "Trapacear para subir na carreira a qualquer custo"
            ],
            correctIndex: 0,
            explanation: "Fazer tudo como para o Senhor transforma nosso trabalho diário em um ato contínuo de adoração."
          },
          {
            question: "A parábola dos Talentos (Mateus 25:14-30) ensina sobre a responsabilidade de:",
            options: [
              "Multiplicar os dons, recursos e oportunidades que Deus nos confiou para a expansão do Seu Reino",
              "Esconder os talentos com medo de errar",
              "Invejar os dons dados a outros irmãos",
              "Cobrar juros abusivos da família"
            ],
            correctIndex: 0,
            explanation: "Somos mordomos dos recursos de Deus e prestaremos contas de como usamos nossos talentos para Sua glória."
          },
          {
            question: "Como identificar seu propósito de vida e vocação no Reino de Deus?",
            options: [
              "Na interseção entre suas paixões dadas por Deus, seus dons e as necessidades de servir ao próximo",
              "Escolhendo a profissão que dá mais fama fácil",
              "Copiando exatamente a vida de outra pessoa",
              "Esperando uma revelação sem nunca trabalhar ou estudar"
            ],
            correctIndex: 0,
            explanation: "O propósito se manifesta quando usamos nossos dons com paixão para abençoar vidas ao nosso redor."
          },
          {
            question: "O conceito de 'Mordomia Cristã' aborda o cuidado e a administração responsável de:",
            options: [
              "Tempo, talentos, finanças, corpo e criação de Deus",
              "Apenas o dinheiro do dízimo",
              "Apenas o prédio físico da igreja",
              "Carros de luxo pessoais"
            ],
            correctIndex: 0,
            explanation: "Tudo o que temos pertence ao Senhor; somos administradores sábios de Sua graciosa criação."
          },
          {
            question: "Como um cristão pode ser um 'Evangelista no Mercado de Trabalho' sem ser inconveniente?",
            options: [
              "Pela excelência profissional, ética inabalável, amor sincero aos colegas e testemunho de vida consistente",
              "Deixando de trabalhar para pregar aos gritos no meio do escritório",
              "Impondo o desligamento de colegas de outras crenças",
              "Usar o horário de serviço para assistir vídeos sem trabalhar"
            ],
            correctIndex: 0,
            explanation: "A excelência no trabalho abre portas para que as pessoas queiram conhecer a razão da nossa esperança."
          },
          {
            question: "O fruto de uma vida que encontrou seu propósito no Reino é:",
            options: [
              "Alegria profunda, senso de utilidade e legado eterno de bênçãos para outros",
              "Arrogância e desprezo pelos mais simples",
              "Rivalidade com os colegas de ministério",
              "Acúmulo de prêmios seculares sem fé"
            ],
            correctIndex: 0,
            explanation: "Viver no propósito do Pai traz uma satisfação que o dinheiro ou o aplauso do mundo não conseguem comprar."
          },
          {
            question: "Qual deve ser a motivação suprema em exercer nossos dons no Corpo de Cristo (1 Coríntios 13)?",
            options: [
              "O Amor genuíno; sem amor, os dons mais impressionantes não têm valor diante de Deus",
              "A busca por projeção pessoal no palco",
              "Superar a concorrência de outras igrejas",
              "Cobrar taxas por cada ministração"
            ],
            correctIndex: 0,
            explanation: "O amor é o caminho sobremodo excelente que dá sentido e poder espiritual ao uso dos dons."
          },
          {
            question: "O que o rei Davi exemplificou ao servir à sua própria geração (Atos 13:36)?",
            options: [
              "Serviu ao propósito de Deus em sua época com fidelidade e depois descansou no Senhor",
              "Construiu monumentos com sua própria imagem",
              "Fugiu das responsabilidades do seu povo",
              "Buscou apenas seu interesse financeiro"
            ],
            correctIndex: 0,
            explanation: "Servir ao propósito de Deus na nossa geração é a maior conquista que um ser humano pode alcançar."
          }
        ]
      },
      {
        id: 'rg-mod-3',
        title: 'Módulo 3: A Manifestação Prática do Reino',
        subtitle: 'Impacto social, justiça, transformação local e vocação transformadora',
        xp: 50,
        contextoPratico: `
          <h3>🌆 O Evangelho com Mãos e Pés</h3>
          <p>O Reino de Deus se manifesta quando famintos são alimentados, injustiçados são defendidos, famílias são restauradas e a verdade é proclamada com poder. O Evangelho não é um conceito abstrato; é a força transformadora que regenera comunidades inteiras.</p>
          <p><strong>A Oração de São Francisco e a Ação Prática:</strong> Levar luz onde há trevas, esperança onde há desespero e amor onde há ódio.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação na Sociedade</h3>
          <ul>
            <li><strong>Projetos de Impacto Comunitário:</strong> Desenvolva ações contínuas de reforço escolar, apoio a dependentes e alfabetização na sua região.</li>
            <li><strong>Fé com Obras:</strong> Tiago 2:17 lembra: "A fé, se não tiver obras, por si só está morta."</li>
          </ul>
        `,
        quiz: [
          {
            question: "Em Tiago 2:17, qual o ensino categórico sobre a relação entre fé e obras sociais?",
            options: [
              "'A fé, se não tiver obras, por si só está morta'",
              "A fé sem obras é perfeita e completa",
              "As obras substituem a necessidade de crer em Jesus",
              "Fé e obras são inimigas mortais"
            ],
            correctIndex: 0,
            explanation: "As boas obras não salvam, mas são a prova visível e o fruto inevitável da salvação verdadeira."
          },
          {
            question: "Em Mateus 25:35-40, Jesus identifica o serviço prestado aos famintos, forasteiros e enfermos como:",
            options: [
              "Um serviço prestado diretamente a Ele próprio ('A mim o fizestes')",
              "Uma perda de recursos e tempo",
              "Um ato que deve ser feito com fotógrafos para postar nas redes",
              "Uma obrigação apenas do governo secular"
            ],
            correctIndex: 0,
            explanation: "Jesus se identifica com os vulneráveis; amar e socorrer o necessitado é amar ao próprio Cristo."
          },
          {
            question: "Qual o impacto de uma igreja local que vive a manifestação prática do Reino em seu bairro?",
            options: [
              "Torna-se respeitada e amada pela comunidade, tornando o Evangelho atraente e visível a todos",
              "Causa divisão e raiva na vizinhança",
              "Perde todos os seus membros",
              "É proibida de funcionar pelas autoridades"
            ],
            correctIndex: 0,
            explanation: "O amor prático que resolve dores reais da comunidade abre portas para a proclamação da Salvação."
          },
          {
            question: "O profeta Isaías (Isaías 58) ensina que o 'Jejum que agrada a Deus' inclui:",
            options: [
              "Soltar as cadeias da injustiça, repartir o pão com o faminto e recolher os desabrigados",
              "Apenas passar fome sem ajudar ninguém",
              "Criticar as pessoas com raiva",
              "Acumular doações sem distribuir"
            ],
            correctIndex: 0,
            explanation: "O verdadeiro jejum purifica o coração e se desdobra em atos concretos de misericórdia e justiça."
          },
          {
            question: "Como o Reino de Deus combate a corrupção e a injustiça nos negócios e na política?",
            options: [
              "Através de cristãos íntegros que recusam subornos, praticam a verdade e defendem a ética insubornável",
              "Concordando com pequenos esquemas por conveniência",
              "Usando a fé para obter vantagens ilegais",
              "Omitindo-se e fingindo que não vê o mal"
            ],
            correctIndex: 0,
            explanation: "O Sal da Terra preserva a honestidade e denuncia a podridão da corrupção pelo exemplo."
          },
          {
            question: "Qual a importância da oração constante pela paz e prosperidade da cidade onde vivemos (Jeremias 29:7)?",
            options: [
              "Porque na paz e bem-estar da cidade, o povo de Deus também terá paz e frutos",
              "Para amaldiçoar os vizinhos que fazem barulho",
              "Para que a cidade seja destruída por um meteoro",
              "Não tem importância alguma"
            ],
            correctIndex: 0,
            explanation: "Somos chamados a ser agentes de bênção e paz no local onde o Senhor nos colocou."
          },
          {
            question: "A manifestação do Reino na área da Educação se expressa através de:",
            options: [
              "Professores e educadores que ensinam com amor, integridade, verdade e incentivo ao potencial dos alunos",
              "Apenas criticar as escolas sem oferecer soluções",
              "Proibir o estudo das ciências e da história",
              "Dificultar o acesso das crianças aos livros"
            ],
            correctIndex: 0,
            explanation: "Educadores cristãos transformam vidas ao transmitirem conhecimento com amor e valores éticos."
          },
          {
            question: "Como a Arte e a Cultura podem manifestar o Reino de Deus?",
            options: [
              "Expressando a beleza, a verdade, a esperança e a redenção de Cristo através da música, teatro e artes visuais",
              "Copiando tudo o que é feio e destrutivo",
              "Proibindo qualquer manifestação artística",
              "Usando a arte apenas para arrecadar recursos na igreja"
            ],
            correctIndex: 0,
            explanation: "A arte inspirada pelo Criador toca as emoções profundas e aponta para a Beleza e Graça de Deus."
          },
          {
            question: "Qual a recompensa prometida por Jesus em Mateus 10:42 para quem der 'um copo de água fria' a um pequenino?",
            options: [
              "De modo nenhum perderá a sua recompensa no Reino dos Céus",
              "Perderá o tempo gasto",
              "Será criticado por ter feito pouco",
              "Receberá uma punição"
            ],
            correctIndex: 0,
            explanation: "Nenhum ato de amor sincero feito em Nome de Jesus, por menor que pareça, é esquecido pelo Pai."
          },
          {
            question: "Qual a visão final de João no Apocalipse 21 sobre a manifestação completa do Reino?",
            options: [
              "Um Novo Céu e uma Nova Terra, onde não haverá mais morte, nem choro, nem dor, e Deus habitará com Seu povo",
              "Um mundo dominado para sempre pelas trevas",
              "A destruição total de todos os seres criados",
              "Uma eternidade entediante nas nuvens sem nada para fazer"
            ],
            correctIndex: 0,
            explanation: "Nossa esperança suprema é a renovação de toda a criação e a habitação perfeita com nosso Deus amado."
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual é a essência do Reino de Deus conforme anunciado por Jesus?",
        options: [
          "O governo soberano e redentor de Deus invadindo a vida humana, trazendo justiça, paz e restauração",
          "Um império político militar para dominar o mundo pela força",
          "Uma religião de ritos vazios para julgar as pessoas",
          "Um clube exclusivo reservado a intelectuais"
        ],
        correctIndex: 0,
        explanation: "O Reino é a demonstração do amor e do senhorio de Cristo que transforma corações e sociedades."
      },
      {
        question: "O princípio da vocação divina ensina que todo cristão é chamado para:",
        options: [
          "Glorificar a Deus e servir ao próximo em sua profissão e cotidiano como um sacerdote do Altíssimo",
          "Abandonar seu emprego e virar pastor em tempo integral",
          "Separar sua vida entre momentos sagrados e atitudes corruptas no trabalho",
          "Trabalhar apenas por dinheiro sem amar as pessoas"
        ],
        correctIndex: 0,
        explanation: "Em qualquer profissão honesta, o crente é sal e luz, exercendo seu sacerdócio sagrado para o Senhor."
      },
      {
        question: "Como a igreja demonstra a fé genuína de acordo com o ensino de Tiago 2?",
        options: [
          "Proclamando a verdade da Palavra acompanhada por obras práticas de amor, compaixão e justiça social",
          "Apenas acumulando conhecimentos teóricos",
          "Desprezando os pobres e necessitados",
          "Julgando os não crentes com raiva"
        ],
        correctIndex: 0,
        explanation: "A fé viva se traduz em ações concretas que refletem o amor sacrifical de Jesus ao mundo."
      },
      {
        question: "O conceito da tensão 'Já e Ainda Não' nos encoraja a:",
        options: [
          "Viver ativamente com as bênçãos e autoridade do Reino hoje, aguardando a vitória final no regresso de Cristo",
          "Desistir da vida de oração",
          "Acreditar que o mal é mais forte que Deus",
          "Esperar passivamente sem agir no mundo"
        ],
        correctIndex: 0,
        explanation: "Trabalhamos com esperança e alegria porque a vitória final já foi garantida na Ressurreição de Jesus."
      },
      {
        question: "Qual o maior legado de um comunicador e líder do Reino de Deus?",
        options: [
          "Ter influenciado vidas a amarem a Jesus, viverem seu propósito e transformarem a sociedade pelo amor",
          "Ter ficado rico e famoso com as pregações",
          "Ter vencido todos os debates nas redes sociais",
          "Ter construído monumentos à sua própria imagem"
        ],
        correctIndex: 0,
        explanation: "O verdadeiro legado é eterno: vidas salvas, discípulos formados e a glória dada somente a Deus."
      }
    ]
  },
  {
    id: 'oratory-and-stage',
    title: 'Trilha 7: Oratória e Palco',
    subtitle: 'Linguagem Corporal, Tom da Graça, Persuasão Sem Manipulação e Esboços Profundos',
    category: 'Comunicação Prática',
    badge: '🎙️ Insígnia Master Preacher',
    icon: 'Mic',
    color: 'from-purple-500 to-pink-600',
    modules: [
      {
        id: 'op-mod-1',
        title: 'Módulo 1: Postura sem Ruídos Físicos',
        subtitle: 'Linguagem corporal, contato visual, domínio de palco e gestualidade',
        xp: 50,
        contextoPratico: `
          <h3>🕺 A Comunicação Não-Verbal no Púlpito</h3>
          <p>Pesquisas em comunicação mostram que mais de 55% do impacto de uma apresentação presencial vem da linguagem corporal, 38% do tom de voz e apenas 7% do texto escrito isolado. Tiques nervosos, andar em zigue-zague ou braços cruzados criam 'ruídos' que desviam o ouvinte do Evangelho.</p>
          <p><strong>Firmeza e Acolhimento:</strong> Pés bem fincados no solo transmitem convicção; mãos abertas acima da cintura transmitem acolhimento e verdade.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação Prática no Palco</h3>
          <ul>
            <li><strong>Ancoragem de Palco:</strong> Mova-se apenas ao mudar de tópico da mensagem. Não ande sem rumo no altar.</li>
            <li><strong>Varredura Visual:</strong> Olhe nos olhos das pessoas dividindo a igreja em 3 blocos (esquerda, centro, direita).</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual é a porcentagem estimada do impacto da comunicação gerada pela linguagem corporal no palco?",
            options: [
              "Mais de 55%",
              "Apenas 5%",
              "100%",
              "0%"
            ],
            correctIndex: 0,
            explanation: "Nossos gestos, postura e expressão facial transmitem a convicção do que estamos pregando antes mesmo das palavras."
          },
          {
            question: "O hábito de andar sem rumo em 'zigue-zague' no palco causa qual efeito na plateia?",
            options: [
              "Cria ruído visual, cansa o público e desvia o foco da mensagem bíblica",
              "Aumenta a unção do sermão",
              "Ajuda as pessoas a memorizarem versículos",
              "Torna a pregação mais profunda"
            ],
            correctIndex: 0,
            explanation: "Movimentos desordenados distraem os ouvintes. O movimento deve ser intencional para enfatizar pontos."
          },
          {
            question: "Como o pregador deve manter o 'Contato Visual' com a congregação?",
            options: [
              "Fazendo uma varredura visual suave, olhando nos olhos de pessoas nas seções esquerda, centro e direita",
              "Olhando fixamente para o teto ou para o chão o tempo todo",
              "Fechando os olhos durante toda a mensagem",
              "Olhando apenas para a liderança na primeira fila"
            ],
            correctIndex: 0,
            explanation: "Olhar nos olhos cria conexão relacional, transmite sinceridade e mantém a congregação atenta."
          },
          {
            question: "Qual a postura correta para os pés e pernas do comunicador no púlpito?",
            options: [
              "Pés ancorados firme no solo, paralelos e alinhados à largura dos ombros",
              "Cruzar as pernas enquanto fala de pé",
              "Ficar nas pontas dos pés o tempo todo",
              "Balançar o corpo de um lado para o outro como um pêndulo"
            ],
            correctIndex: 0,
            explanation: "A base firme transmite segurança e convicção sobre a mensagem proclamada."
          },
          {
            question: "Gestos com os braços e mãos abertas acima da linha da cintura transmitem:",
            options: [
              "Acolhimento, transparência, verdade e convite à comunhão",
              "Agressividade e desejo de briga",
              "Submissão medrosa",
              "Insegurança extrema"
            ],
            correctIndex: 0,
            explanation: "Mãos abertas são o gesto universal de paz, verdade e receptividade amorosa."
          },
          {
            question: "Como o uso correto de microfones evita ruídos acústicos e desconforto nos ouvintes?",
            options: [
              "Manter o microfone a uma distância constante da boca (cerca de 2 a 3 dedos) acompanhando a cabeça",
              "Colar o microfone nos lábios e gritar no volume máximo",
              "Afastar o microfone para a altura da cintura enquanto fala baixo",
              "Bater no microfone para testar se está ligado durante o sermão"
            ],
            correctIndex: 0,
            explanation: "A postura adequada do microfone garante clareza de áudio e evita sustos na congregação."
          },
          {
            question: "O que a expressão facial relaxada e sorridente do pregador transmite na introdução?",
            options: [
              "Alegria de estar ali, amor pela congregação e simpatia inicial",
              "Deboche dos pecados do povo",
              "Falta de reverência com Deus",
              "Medo de pregar"
            ],
            correctIndex: 0,
            explanation: "Um semblante acolhedor quebra barreiras e abre o coração dos ouvintes para receberem a Palavra."
          },
          {
            question: "Como agir em caso de imprevistos no palco (falha de microfone, queda de objeto ou ruído externo)?",
            options: [
              "Manter a calma, responder com naturalidade ou bom humor leve e prosseguir com a mensagem com elegância",
              "Entrar em pânico e abandonar o altar",
              "Gritar com a equipe de som publicamente",
              "Ficar em silêncio emburrado por 10 minutos"
            ],
            correctIndex: 0,
            explanation: "A maturidade do comunicador se revela na capacidade de superar imprevistos com serenidade."
          },
          {
            question: "A utilização de adereços ou objetos visuais durante a pregação deve servir para:",
            options: [
              "Ilustrar de forma marcante a verdade bíblica, sem transformar o púlpito em um circo de distrações",
              "Fazer o pregador parecer um mágico profissional",
              "Perder tempo de culto",
              "Substituir a leitura do texto sagrado"
            ],
            correctIndex: 0,
            explanation: "Objetos de ilustração devem ser pontos de apoio pedagógico para fixar a mensagem no coração."
          },
          {
            question: "Qual o objetivo final de eliminar os ruídos físicos na comunicação de palco?",
            options: [
              "Fazer com que nada distraia o ouvinte de contemplar a beleza e a mensagem de Jesus Cristo",
              "Ganhar prêmios de teatro",
              "Ficar famoso no YouTube",
              "Esconder que não estudou a Bíblia"
            ],
            correctIndex: 0,
            explanation: "O comunicador deve diminuir para que a mensagem de Cristo apareça com clareza máxima."
          }
        ]
      },
      {
        id: 'op-mod-2',
        title: 'Módulo 2: O Tom da Graça no Púlpito',
        subtitle: 'Comunicação persuasiva, modulação vocal e persuasão sem manipulação',
        xp: 50,
        contextoPratico: `
          <h3>🎶 A Sinfonia da Voz no Púlpito</h3>
          <p>Pregar não é gritar durante 40 minutos em um volume ensurdecedor, nem sussurrar em tom monótono. A voz é um instrumento musical. A persuasão bíblica (Atos 18:4) busca convencer a mente e tocar o coração pela verdade do Espírito, diferente da manipulação psicológica que usa culpa e coação emocional.</p>
          <p><strong>A Pausa Estratégica:</strong> O silêncio após uma pergunta profunda permite que o Espírito Santo aplique a verdade ao coração do ouvinte.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação Vocal e Apelo</h3>
          <ul>
            <li><strong>Ritmo e Modulação:</strong> Acelere o ritmo em momentos de clímax narrativo; desacelere e baixe o tom em momentos de reflexão profunda.</li>
            <li><strong>Convite Transparente:</strong> Faça apelos à fé baseados no amor de Deus, e não na coerção ou medo do inferno.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual a diferença entre a 'Persuasão Bíblica' (Atos 18:4) e a 'Manipulação Emocional'?",
            options: [
              "A persuasão bíblica usa a Verdade e a razão guiadas pelo Espírito; a manipulação usa culpa, medo e coação para controlar",
              "Não há diferença",
              "A manipulação é permitida se for para levar pessoas ao batismo",
              "A persuasão bíblica é o uso de hipnose no palco"
            ],
            correctIndex: 0,
            explanation: "Deus não quer decisões forçadas por medo, mas entregas sinceras movidas pela revelação do Seu amor."
          },
          {
            question: "O efeito de pregar em um tom de voz monótono (sem variação) durante todo o sermão é:",
            options: [
              "Provocar tédio e perda do foco nos ouvintes rapidamente",
              "Aumentar a atenção e a unção",
              "Fazer as pessoas memorizarem tudo",
              "Demonstrar santidade elevada"
            ],
            correctIndex: 0,
            explanation: "A modulação vocal é a chave para manter a atenção e transmitir as emoções certas do texto bíblico."
          },
          {
            question: "O uso do 'Silêncio Estratégico' (pausa) após fazer uma pergunta reflexiva serve para:",
            options: [
              "Permitir que os ouvintes processem o pensamento e sintam o impacto da verdade em seus corações",
              "Mostrar que o pregador esqueceu o que ia falar",
              "Fazer o culto durar mais tempo",
              "Testar se o microfone desligou"
            ],
            correctIndex: 0,
            explanation: "A pausa dá espaço para a reflexão pessoal e para a atuação suave do Espírito Santo na consciência."
          },
          {
            question: "Gritar excessivamente durante todo o sermão causa qual problema na comunicação?",
            options: [
              "Fadiga auditiva na congregação, rouquidão no preletor e perda do impacto dos momentos realmente importantes",
              "Demonstra que o pregador tem mais unção que os outros",
              "Faz com que todos se convertam na hora",
              "Garante a salvação de toda a igreja"
            ],
            correctIndex: 0,
            explanation: "Quando tudo é gritado, nada se destaca. A dinâmica entre volumes altos e suaves traz riqueza ao sermão."
          },
          {
            question: "Qual deve ser a intenção do pregador ao fazer o 'Apelo' ou convite final no culto?",
            options: [
              "Oferecer uma oportunidade clara e graciosa para que as pessoas respondam ao toque do Espírito com liberdade",
              "Pressionar psicologicamente até que as pessoas venham à frente por vergonha",
              "Contar o número de convertidos para se gloriar em relatórios",
              "Forçar a decisão com ameaças de maldição"
            ],
            correctIndex: 0,
            explanation: "O apelo no tom da graça convida com amor e respeito à decisão consciente de seguir a Jesus."
          },
          {
            question: "A articulação clara e boa dicção das palavras pelo comunicador evita:",
            options: [
              "Mal-entendidos, murmúrios incompreensíveis e cansaço da plateia para entender o que foi dito",
              "Que as pessoas prestem atenção",
              "O uso da Bíblia",
              "A ação do Espírito Santo"
            ],
            correctIndex: 0,
            explanation: "Falar com clareza fonética permite que a mensagem seja assimilada sem esforço auditivo desnecessário."
          },
          {
            question: "Como o pregador deve usar a 'Velocidade de Fala' (Tempo) na pregação?",
            options: [
              "Variar a velocidade: acelerar nas narrativas de ação e desacelerar nos ensinos conceituais e aplicações",
              "Falar o mais rápido possível do início ao fim",
              "Falar em câmera lenta o tempo todo",
              "Falar rápido apenas para encerrar logo o culto"
            ],
            correctIndex: 0,
            explanation: "A variação de velocidade cria ritmo, mantendo o sermão vivo e dinâmico."
          },
          {
            question: "O tom de 'Vulnerabilidade' na voz ao compartilhar um momento difícil de fé transmite:",
            options: [
              "Sinceridade, humanidade, empatia e consolo da Graça",
              "Desespero e falta de salvação",
              "Desejo de chamar a atenção para si",
              "Falta de estudo teológico"
            ],
            correctIndex: 0,
            explanation: "A vulnerabilidade bem direcionada aproxima os ouvintes, mostrando que a Graça alcança pessoas reais."
          },
          {
            question: "O uso da música de fundo (BGM) durante a ministração final deve ser feito com:",
            options: [
              "Moderação e volume suave, para apoiar o ambiente sem encobrir a voz ou manipular emoções",
              "Volume no máximo para impedir que as pessoas ouçam a mensagem",
              "Músicas agitadas de festa secular",
              "Proibição em 100% dos cultos"
            ],
            correctIndex: 0,
            explanation: "A trilha sonora ambiente deve servir como apoio sutil, jamais como ferramenta de hipnose ou coação."
          },
          {
            question: "Qual o resultado de uma mensagem pregada com o 'Tom da Graça'?",
            options: [
              "Arrependimento sincero, consolo para os aflitos, quebrantamento e esperança renovada em Cristo",
              "Sentimento de condenação sem saída",
              "Orgulho religioso e soberba",
              "Desespero e medo de Deus"
            ],
            correctIndex: 0,
            explanation: "A Palavra pregada na Graça liberta o pecador e o atrai para os braços amorosos do Pai."
          }
        ]
      },
      {
        id: 'op-mod-3',
        title: 'Módulo 3: Liderança Teológica Proativa',
        subtitle: 'Preparação de esboços profundos, exegese e estrutura homilética marcante',
        xp: 50,
        contextoPratico: `
          <h3>📖 A Arquitetura do Sermão Inesquecível</h3>
          <p>Uma boa pregação nasce de horas de estudo no texto bíblico (Exegese), oração fervorosa e uma estrutura clara (Homilética). Um sermão sem estrutura é como uma casa sem vigas de sustentação – pode ter decoração bonita, mas desmorona ao primeiro vento.</p>
          <p><strong>A Regra da Idéia Central:</strong> Se você não consegue resumir seu sermão em uma única frase marcante, seu sermão ainda não está pronto.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação na Elaboração de Esboços</h3>
          <ul>
            <li><strong>Estrutura Homilética em 4 Passos:</strong> Texto Bíblico -> Ideia Central -> 3 Pontos de Desenvolvimento -> Aplicação Prática.</li>
            <li><strong>Ancoragem na Escritura:</strong> Deixe que a Bíblia diga o que ela quer dizer, e não o que você quer forçar o texto a dizer (Evitar Eisegese).</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual a diferença fundamental entre 'Exegese' e 'Eisegese' no estudo bíblico?",
            options: [
              "Exegese extrai o significado original do texto; Eisegese coloca ideias pessoais dentro do texto forçando uma interpretação",
              "Não há diferença entre elas",
              "Eisegese é o estudo do idioma grego e exegese é do hebraico",
              "Exegese é a leitura rápida da Bíblia sem oração"
            ],
            correctIndex: 0,
            explanation: "O bom pregador faz exegese: descobre o que Deus disse no texto bíblico antes de aplicar hoje."
          },
          {
            question: "O que é a 'Idéia Central do Sermão' (Proposição)?",
            options: [
              "Uma frase única, clara e marcante que resume toda a verdade principal que a pregação quer comunicar",
              "O título curto do sermão",
              "Uma lista de 50 versículos soltos",
              "Uma história engraçada contada na introdução"
            ],
            correctIndex: 0,
            explanation: "A Ideia Central é a espinha dorsal do sermão; ela garante clareza e foco do início ao fim."
          },
          {
            question: "Qual a função da 'Introdução' em uma pregação homilética bem estruturada?",
            options: [
              "Conectar com os ouvintes, despertar o interesse no tema e apresentar a pergunta/problema que a Bíblia responderá",
              "Contar piadas por 20 minutos para passar o tempo",
              "Pedir desculpas por não ter preparado o sermão",
              "Ler todos os capítulos da Bíblia de uma vez"
            ],
            correctIndex: 0,
            explanation: "A introdução prepara o solo do coração da plateia para receber a semente do ensino bíblico."
          },
          {
            question: "O 'Desenvolvimento' (Pontos Principais) do sermão deve ser fundamentado em:",
            options: [
              "Argumentos bíblicos sólidos decorrentes diretamente da divisão natural do texto sagrado lido",
              "Notícias de fofoca de celebridades",
              "Opiniões políticas pessoais sem verso bíblico",
              "Historinhas sem nenhuma base teológica"
            ],
            correctIndex: 0,
            explanation: "Os pontos de desenvolvimento explicam, provam e ilustram a Ideia Central a partir das Escrituras."
          },
          {
            question: "A 'Aplicação Prática' em um sermão responde a qual pergunta do ouvinte?",
            options: [
              "'E daí? Como eu vivo essa verdade bíblica na minha vida diária amanhã?'",
              "'Qual é o nome do autor em latim?'",
              "'Quanto tempo falta para terminar o culto?'",
              "'Por que o pregador usa essa cor de camisa?'"
            ],
            correctIndex: 0,
            explanation: "Sem aplicação prática, o sermão se torna apenas aula teórica; a aplicação transforma o saber em agir."
          },
          {
            question: "O que é a 'Pregação Expositiva'?",
            options: [
              "Um estilo de pregação em que o ponto principal e a estrutura do sermão são determinados pelo texto bíblico estudado",
              "Uma pregação sobre exposições de arte secular",
              "Pregar sem abrir a Bíblia",
              "Falar sobre qualquer assunto por 10 minutos"
            ],
            correctIndex: 0,
            explanation: "A pregação expositiva dá voz ao texto sagrado, alimentando a igreja com a inteira Palavra de Deus."
          },
          {
            question: "O uso de 'Ilustrações' (histórias, metáforas e testemunhos) no sermão serve para:",
            options: [
              "Jogar luz sobre a verdade teológica, tornando o conceito abstrato em algo compreensível e memorável",
              "Fazer o pregador chorar no palco",
              "Substituir os versículos da Bíblia",
              "Promover marcas de produtos comerciais"
            ],
            correctIndex: 0,
            explanation: "Uma boa ilustração é como uma janela em uma parede: deixa a luz da verdade entrar na mente do ouvinte."
          },
          {
            question: "Qual o perigo de preparar uma pregação sem oração e dependência do Espírito Santo?",
            options: [
              "Produzir um discurso intelectualmente correto, mas estéril e sem poder de conversão ou cura de almas",
              "Ficar sem voz no palco",
              "Fazer o culto terminar em 2 minutos",
              "Esquecer a Bíblia em casa"
            ],
            correctIndex: 0,
            explanation: "A homilética dá a forma ao sermão, mas o Espírito Santo é o fogo que traz vida e transformação."
          },
          {
            question: "Como deve ser a 'Conclusão' de uma pregação impactante?",
            options: [
              "Um resumo claro da Ideia Central, apelo ao coração e convocação a uma resposta de fé diante de Deus",
              "Introduzir um tema totalmente novo e confuso",
              "Pedir desculpas pelo tempo e sair correndo",
              "Começar a pregação novamente do início"
            ],
            correctIndex: 0,
            explanation: "A conclusão é o momento de decisão: direciona os ouvintes a aplicarem o que Deus falou ao coração."
          },
          {
            question: "Qual o objetivo final da liderança teológica proativa na preparação de mensagens?",
            options: [
              "Alimentar o rebanho de Deus com alimento sólido, formando cristãos maduros, convictos e missionários",
              "Fazer o pregador ser convidado para grandes congressos por vaidade",
              "Vender esboços na internet para enriquecer",
              "Manter o povo ignorante da Bíblia"
            ],
            correctIndex: 0,
            explanation: "O comunicador fiel estuda e se dedica para apresentar a noiva de Cristo madura e irrepreensível."
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual o triângulo fundamental da excelência na pregação bíblica?",
        options: [
          "Fidelidade ao Texto (Exegese), Clareza na Estrutura (Homilética) e Poder do Espírito Santo (Oração)",
          "Fama no YouTube, roupas de grife e iluminação de palco",
          "Uso de gírias seculares, gritos e piadas constantes",
          "Agressividade, autoritarismo e condenação dos ouvintes"
        ],
        correctIndex: 0,
        explanation: "Unir rigor teológico, clareza comunicativa e unção do Espírito garante pregações transformadoras."
      },
      {
        question: "Ao comunicar no palco, o que o pregador deve fazer para evitar ruídos corporais?",
        options: [
          "Manter base firme nos pés, usar gestos abertos intencionais e contato visual relacional com a congregação",
          "Andar em zigue-zague acelerado sem parar",
          "Olhar apenas para o teto ou chão",
          "Gesticular agressivamente com punhos fechados"
        ],
        correctIndex: 0,
        explanation: "Linguagem corporal equilibrada transmite segurança, acolhimento e destaca a Mensagem de Cristo."
      },
      {
        question: "O 'Tom da Graça' na comunicação do Evangelho significa:",
        options: [
          "Persuadir pela Verdade amorosa de Cristo sem recorrer à manipulação, culpa ou intimidação",
          "Relativizar o pecado e fingir que Deus não se importa com a santidade",
          "Gritar em volume máximo durante todo o sermão",
          "Usar a Bíblia apenas para atacar pessoas"
        ],
        correctIndex: 0,
        explanation: "A Graça atrai o pecador ao arrependimento sincero e à esperança de uma nova vida em Deus."
      },
      {
        question: "Por que todo sermão eficaz deve ter uma 'Ideia Central' bem definida?",
        options: [
          "Porque garante clareza, foco e impede que o pregador se perca em assuntos desconexos",
          "Porque torna a pregação mais curta e preguiçosa",
          "Porque substitui a leitura dos versículos bíblicos",
          "Para que ninguém consiga entender a mensagem"
        ],
        correctIndex: 0,
        explanation: "Uma Ideia Central cristalina permite que a congregação grave a verdade principal e a leve para a vida."
      },
      {
        question: "Qual é o fruto Supremo da oratória e comunicação no Reino de Deus?",
        options: [
          "Vidas transformadas, mentes renovadas pela Palavra e Cristo glorificado em tudo",
          "Aplausos e exaltação do ego do comunicador",
          "Acúmulo de seguidores e contratos seculares",
          "Vitória em debates teológicos com raiva"
        ],
        correctIndex: 0,
        explanation: "Toda boa comunicação no Reino diminui o homem para que o Nome de Jesus seja exaltado para sempre."
      }
    ]
  },
  {
    id: 'school-of-holy-spirit',
    title: 'Trilha 8: Escola do Espírito Santo',
    subtitle: 'Ação no AT, Pentecoste no NT, Dons Espirituais e Fruto para Edificação da Igreja',
    category: 'Pneumatologia Aplicada',
    badge: '🕊️ Insígnia Spirit Anointed',
    icon: 'Flame',
    color: 'from-amber-400 to-yellow-500',
    modules: [
      {
        id: 'hs-mod-1',
        title: 'Módulo 1: O Espírito Santo no Antigo Testamento',
        subtitle: 'Ação da Ruach nas origens, capacitação de líderes e promessas proféticas',
        xp: 50,
        contextoPratico: `
          <h3>🌬️ A Ruach Elohim na Criação e na História</h3>
          <p>No Antigo Testamento, a palavra hebraica para Espírito é <em>Ruach</em> (vento, sopro, hálito de vida). Desde Gênesis 1:2 ("E o Espírito de Deus pairava sobre as águas"), Ele é o Agente Criador e Doador da vida. No AT, a unção do Espírito vinha de forma temporária sobre pessoas específicas (reis, profetas e juízes) para missões extraordinárias.</p>
          <p><strong>A Promessa da Nova Aliança:</strong> Profetas como Joel (Joel 2:28) e Ezequiel (Ezequiel 36:26) anunciaram que um dia o Espírito habitaria no coração de TODOS os crentes.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação Teológica</h3>
          <ul>
            <li><strong>Entender a Aliança:</strong> Valorize a bênção da Nova Aliança onde o Espírito habita em você continuamente (1 Coríntios 6:19).</li>
            <li><strong>Dependência da Unção:</strong> Nenhuma força humana substitui a capacitação soberana da Ruach de Deus.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual o significado da palavra hebraica 'Ruach' usada para o Espírito Santo no Antigo Testamento?",
            options: [
              "Sopro, vento, hálito divino de vida",
              "Fogo destruidor sem amor",
              "Uma estátua de pedra",
              "Uma doutrina secreta reservada a reis"
            ],
            correctIndex: 0,
            explanation: "Ruach descreve o hálito criador e sustentador de Deus presente desde o início da criação."
          },
          {
            question: "Como ocorria a atuação do Espírito Santo sobre os crentes no período do Antigo Testamento?",
            options: [
              "Ele vinha pontualmente sobre líderes (reis, profetas e juízes) para missões e capacitações específicas",
              "Ele habitava no coração de todas as pessoas do planeta do mesmo modo",
              "Ele não atuava de forma alguma antes do Novo Testamento",
              "Ele vinha apenas sobre os animais"
            ],
            correctIndex: 0,
            explanation: "No AT, o Espírito vinha sobre escolhidos específicos; na Nova Aliança em Cristo, Ele habita em todos os remidos."
          },
          {
            question: "Em Gênesis 1:2, o que o Espírito Santo fazia no início da criação?",
            options: [
              "Pairava sobre as águas trazendo ordem, vida e beleza onde havia caos",
              "Destruía a criação recém-feita",
              "Fugia da presença de Deus",
              "Ficava adormecido sem ação"
            ],
            correctIndex: 0,
            explanation: "O Espírito de Deus é o agente da criação que traz vida e harmonia ao caos primordial."
          },
          {
            question: "Qual artesão foi capacitado pelo Espírito Santo com sabedoria para construir o Tabernáculo (Êxodo 31)?",
            options: [
              "Bezalel",
              "Sansão",
              "Gideão",
              "Golias"
            ],
            correctIndex: 0,
            explanation: "Deus encheu Bezalel do Espírito de Deus de sabedoria e habilidade artística para obras de arte sagradas."
          },
          {
            question: "A promessa profética de Joel 2:28 apontava para qual grande virada na história da salvação?",
            options: [
              "'Derramarei o meu Espírito sobre toda a carne', alcançando filhos, filhas, jovens e velhos",
              "O fim de todas as profecias e visões para sempre",
              "Apenas os reis de Jerusalém receberiam o Espírito Santo",
              "O Espírito seria concedido apenas a um grupo secreto"
            ],
            correctIndex: 0,
            explanation: "Joel profetizou a democratização do derramamento do Espírito Santo cumprida no Pentecostes."
          },
          {
            question: "O que simbolizava o 'Óleo da Anção' derramado sobre os reis e sacerdotes no AT?",
            options: [
              "A capacitação e consagração pelo Espírito Santo para o exercício da liderança e serviço de Deus",
              "Um mero ritual estético de beleza",
              "Uma punição por faltas cometidas",
              "Um pagamento de impostos"
            ],
            correctIndex: 0,
            explanation: "O óleo simboliza a separação sagrada e o revestimento de poder do Espírito de Deus."
          },
          {
            question: "A profecia de Ezequiel 36:26 promete que o Espírito Santo faria qual transformação no ser humano?",
            options: [
              "Tiraria o coração de pedra e daria um coração de carne sensível a Deus",
              "Transformaria os seres humanos em anjos com asas físicas",
              "Tornaria as pessoas imunes a qualquer doença na Terra",
              "Faria todos falarem apenas um idioma humano"
            ],
            correctIndex: 0,
            explanation: "A habitação do Espírito regenera o interior do ser humano, capacitando-o a amar e obedecer aos mandamentos de Deus."
          },
          {
            question: "Como o Espírito Santo capacitou o juiz Sansão (Juízes 14:6) para livrar Israel?",
            options: [
              "Concedendo-lhe força física sobrenatural extraordinária diante dos inimigos",
              "Ensinando-lhe táticas de diplomacia política",
              "Escrevendo livros de poesia",
              "Construindo muralhas de pedra"
            ],
            correctIndex: 0,
            explanation: "O Espírito vinha sobre Sansão capacitando-o com poder para os desafios militares da época."
          },
          {
            question: "Qual o lamento de Davi no Salmo 51:11 após seu pecado com Bate-Seba?",
            options: [
              "'Não me me me me me me rejeites da tua presença, nem retires de mim o teu Santo Espírito'",
              "'Não me tires as minhas riquezas financeiras'",
              "'Não me me proíbas de lutar em guerras'",
              "'Não te importes com os meus atos'"
            ],
            correctIndex: 0,
            explanation: "Davi temia perder a comunhão e a presença sagrada do Espírito Santo que habitava sobre seu reinado."
          },
          {
            question: "A atuação do Espírito Santo no Antigo Testamento revela que Deus:",
            options: [
              "Sempre esteve ativo na história, preparando o caminho para a plenitude da revelação em Jesus Cristo",
              "Era um Deus distante que não se importava com os homens",
              "Mudava de opinião a cada século",
              "Atuava apenas de forma violenta"
            ],
            correctIndex: 0,
            explanation: "A Ruach de Deus conduz a história da salvação com amor, poder e propósito eterno."
          }
        ]
      },
      {
        id: 'hs-mod-2',
        title: 'Módulo 2: O Espírito Santo no Novo Testamento',
        subtitle: 'Pentecostes, o Paracleto, Batismo no Espírito e o Guia da Igreja',
        xp: 50,
        contextoPratico: `
          <h3>🔥 O Paracleto Habita em Nós</h3>
          <p>Jesus prometeu aos discípulos que não os deixaria órfãos, mas enviaria o <em>Parakletos</em> (Consolador, Advogado, Ajudador ao nosso lado - João 14:16). Em Atos 2, no Pentecostes, essa promessa se cumpriu com o batismo no Espírito Santo, enchendo a igreja de poder para testemunhar até aos confins da terra (Atos 1:8).</p>
          <p><strong>Ser Cheio do Espírito:</strong> Não é ter mais do Espírito Santo em quantidade, mas permitir que o Espírito Santo tenha mais de NÓS em controle e santidade.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação na Vida Diária</h3>
          <ul>
            <li><strong>Sensibilidade à Voz do Espírito:</strong> Cultive o hábito de pedir a direção do Espírito Santo nas suas decisões diárias.</li>
            <li><strong>Revestimento de Poder:</strong> Busque continuamente o enchemento do Espírito para vencer a carne e testemunhar com ousadia.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual o significado da palavra grega 'Parakletos' usada por Jesus para se referir ao Espírito Santo (João 14:16)?",
            options: [
              "Consolador, Advogado, Ajudador chamado para caminhar ao nosso lado",
              "Juiz severo que busca nos condenar",
              "Um anjo guerreiro de espada",
              "Um conceito filosófico abstrato"
            ],
            correctIndex: 0,
            explanation: "O Paracleto é aquele que caminha conosco, nos consolando, ensinando e fortalecendo a cada passo."
          },
          {
            question: "Em Atos 1:8, qual é o propósito principal do recebimento do Poder do Espírito Santo (Batismo no Espírito)?",
            options: [
              "Serem testemunhas de Jesus em Jerusalém, Judeia, Samaria e até aos confins da Terra",
              "Ganhar fama e aplausos pessoais no templo",
              "Obter superpoderes físicos para benefício egoísta",
              "Ficar isolado sem conversar com os descrentes"
            ],
            correctIndex: 0,
            explanation: "A unção do Espírito é concedida com o fim supremo de nos tornar testemunhas ousadas e amorosas de Cristo."
          },
          {
            question: "O que aconteceu no dia de Pentecostes registrado em Atos 2:1-4?",
            options: [
              "Um som como de vento impetuoso encheu a casa, apareceram línguas como de fogo e todos foram cheios do Espírito Santo",
              "Houve um terremoto que destruiu a cidade de Jerusalém",
              "Os discípulos abandonaram a fé e voltaram para a Galileia",
              "O Templo de Salomão pegou fogo sem motivo"
            ],
            correctIndex: 0,
            explanation: "O Pentecostes marcou a capacitação sobrenatural da igreja com a presença visível do Espírito Santo."
          },
          {
            question: "O ensino de Paulo em Efésios 5:18 ('Não vos embriagueis com vinho... mas enchei-vos do Espírito') instrui a:",
            options: [
              "Buscar o controle e a influência contínua do Espírito Santo sobre todas as áreas da nossa vida",
              "Beber vinho moderadamente apenas em festas",
              "Evitar qualquer tipo de alegria na igreja",
              "Encher-se de raiva e brigas teológicas"
            ],
            correctIndex: 0,
            explanation: "Estar cheio do Espírito é ser guiado e dominado pelo amor, pela paz e pelo caráter de Cristo diariamente."
          },
          {
            question: "Como o Espírito Santo atua no convencimento do mundo segundo João 16:8?",
            options: [
              "Convence o mundo do pecado, da justiça e do juízo",
              "Obriga todas as pessoas a irem à igreja à força",
              "Destrói fisicamente quem não crê",
              "Finge que o pecado não existe"
            ],
            correctIndex: 0,
            explanation: "É o Espírito Santo quem ilumina os olhos da mente humana para que reconheça a necessidade de salvação em Jesus."
          },
          {
            question: "Qual o papel do Espírito Santo na compreensão da Bíblia (Iluminação Espiritual - 1 Coríntios 2:12-14)?",
            options: [
              "Revela o sentido profundo das Escrituras, tornando a Palavra viva e compreensível ao coração do crente",
              "Substitui a necessidade de ler a Bíblia",
              "Cria contradições no texto sagrado",
              "Impede a interpretação coerente"
            ],
            correctIndex: 0,
            explanation: "Sem a iluminação do Espírito, a Bíblia é apenas letra morta; com o Espírito, ela se torna o hálito vivo de Deus."
          },
          {
            question: "O que significa 'Entristecer o Espírito Santo' segundo Efésios 4:30?",
            options: [
              "Praticar o pecado, amargura, ira, gritaria e mentira no ambiente comunitário ou pessoal",
              "Esquecer a data do aniversário da igreja",
              "Usar roupas de cores escuras",
              "Ler livros de história secular"
            ],
            correctIndex: 0,
            explanation: "Pecados de atitude e malícia ferem a comunhão com o Espírito Santo de Deus que habita em nós."
          },
          {
            question: "Qual é a relação entre o Espírito Santo e a Garantia (Penhor) da nossa Salvação (Efésios 1:13-14)?",
            options: [
              "O Espírito é o selo e a garantia divina de que pertencemos a Deus e receberemos a herança eterna",
              "O Espírito é uma dívida que temos que pagar a Deus",
              "O selo é um documento de papel entregue pelo pastor",
              "Não há garantia de salvação para o crente"
            ],
            correctIndex: 0,
            explanation: "Ter o Espírito habitando em nós é a assinatura de Deus de que somos Seus filhos para sempre."
          },
          {
            question: "A habitação do Espírito Santo no crente transforma o corpo humano em (1 Coríntios 6:19):",
            options: [
              "Santuário (Templo) do Espírito Santo que habita em vós",
              "Uma máquina sem alma",
              "Um local sem valor espiritual",
              "Um túmulo fechado"
            ],
            correctIndex: 0,
            explanation: "Nosso corpo é a morada sagrada do Deus Vivo; por isso devemos glorificar a Deus em nossa pureza e vida."
          },
          {
            question: "Como manter a chama do Espírito acesa no dia a dia (1 Tessalonicenses 5:19)?",
            options: [
              "Perseverando em oração, não apagando o Espírito, acolhendo o ensino bíblico e praticando o amor",
              "Discutindo nas redes sociais sobre teologia com raiva",
              "Frequentando a igreja apenas uma vez por ano",
              "Ignorando os alertas de consciência dados pelo Espírito"
            ],
            correctIndex: 0,
            explanation: "Zelar pela comunhão no secreto e pela obediência mantém o fogo do Espírito queimando no coração."
          }
        ]
      },
      {
        id: 'hs-mod-3',
        title: 'Módulo 3: Dons e Frutos Espirituais',
        subtitle: 'Discernimento, maturidade, edificação da igreja e o Fruto do Espírito',
        xp: 50,
        contextoPratico: `
          <h3>🎁 Os Presentes de Deus para o Bem Comum</h3>
          <p>Os dons espirituais (1 Coríntios 12) não são troféus para alimentar a vaidade do crente, nem medalhas de santidade. Eles são ferramentas de serviço concedidas pelo Espírito para a edificação mútua do Corpo de Cristo. Mas o 'caminho sobremodo excelente' é o Amor (1 Coríntios 13), expresso no Fruto do Espírito (Gálatas 5:22-23).</p>
          <p><strong>Dons vs. Fruto:</strong> Os dons mostram o PODER de Deus; o fruto mostra o CARÁTER de Deus na vida do discípulo.</p>
        `,
        insightAplicacao: `
          <h3>💡 Aplicação no Uso dos Dons</h3>
          <ul>
            <li><strong>Edificação Comunitária:</strong> Use seus dons espirituais para servir e curar pessoas, nunca para se exibir.</li>
            <li><strong>Priorize o Caráter:</strong> Mais importante do que fluir em dons extraordinários é manifestar o amor, a paciência e a mansidão do Fruto do Espírito.</li>
          </ul>
        `,
        quiz: [
          {
            question: "Qual é o propósito supremo da concessão dos Dons Espirituais segundo 1 Coríntios 12:7?",
            options: [
              "Visando ao bem comum e à edificação da Igreja de Cristo",
              "Para demonstrar quem é mais santo e espiritual que os outros",
              "Para fazer os pregadores enriquecerem",
              "Para alimentar o orgulho religioso"
            ],
            correctIndex: 0,
            explanation: "Os dons são ferramentas de graça concedidas para servir, encorajar e edificar a comunidade."
          },
          {
            question: "Qual a diferença fundamental entre 'Dons Espirituais' e 'Fruto do Espírito'?",
            options: [
              "Os dons mostram a capacitação e o poder de Deus para o serviço; o fruto mostra o caráter e a maturidade de Cristo no crente",
              "Não há diferença; dons e fruto são exatamente a mesma coisa",
              "Os dons são apenas para pastores e o fruto é apenas para membros",
              "O fruto se ganha em eventos e os dons no batismo em água"
            ],
            correctIndex: 0,
            explanation: "Um crente pode ter dons impressionantes, mas sem o Fruto do Espírito (caráter e amor), ele nada é."
          },
          {
            question: "Os nove aspectos do Fruto do Espírito registrados em Gálatas 5:22-23 começam com:",
            options: [
              "O Amor (que sustenta a alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio)",
              "A soberba e o orgulho",
              "O dom de línguas e profecia",
              "A riqueza financeira"
            ],
            correctIndex: 0,
            explanation: "O Amor é a essência do Fruto do Espírito da qual derivam todas as outras virtudes do caráter cristão."
          },
          {
            question: "Em 1 Coríntios 13, o apóstolo Paulo afirma que ter todos os dons sem AMOR resulta em ser como:",
            options: [
              "O bronze que soa ou o prato que retine (som barulhento e vazio sem valor)",
              "Um santo perfeito",
              "Um grande anjo dos céus",
              "O rei de Jerusalém"
            ],
            correctIndex: 0,
            explanation: "Sem amor, qualquer manifestação espiritual se reduz a barulho egoísta sem valor eterno."
          },
          {
            question: "O Dom de 'Discernimento de Espíritos' (1 Coríntios 12:10) capacita o crente a:",
            options: [
              "Distinguir a verdade do engano, percebendo a origem das motivações e ensinos (se vêm de Deus, da carne ou do maligno)",
              "Ficar criticando a vida alheia por maldade",
              "Ler a mente das pessoas para adivinhar segredos",
              "Amaldiçoar quem pensa diferente"
            ],
            correctIndex: 0,
            explanation: "O discernimento espiritual protege a igreja contra heresias e falsos ensinos."
          },
          {
            question: "Como deve ser a ordem e a reverência no uso dos dons em um culto comunitário (1 Coríntios 14:40)?",
            options: [
              "'Tudo seja feito com decência e ordem', com amor e sem gerar confusão",
              "Com gritaria descontrolada e desordem caótica",
              "Proibindo qualquer manifestação do Espírito",
              "Cobrando ingressos por oração de cura"
            ],
            correctIndex: 0,
            explanation: "Deus não é Deus de confusão, mas de paz. O uso saudável dos dons edifica com paz e ordem."
          },
          {
            question: "O Dom de 'Profecia' no contexto do Novo Testamento (1 Coríntios 14:3) serve para:",
            options: [
              "Edificação, exortação (encorajamento) e consolo das pessoas",
              "Adivinhar números de loteria",
              "Envergonhar pessoas publicamente com acusações",
              "Substituir a Bíblia Sagrada"
            ],
            correctIndex: 0,
            explanation: "A profecia no NT comunica o coração de Deus para encorajar, edificar e consolar a igreja."
          },
          {
            question: "Qual o papel do 'Domínio Próprio' (Temperança) no Fruto do Espírito?",
            options: [
              "A capacidade dada pelo Espírito para controlar os impulsos da carne, emoções e desejos egoístas",
              "Dominar as outras pessoas pela força",
              "Deixar a raiva controlar todas as reações",
              "Viver sem nenhum limite moral"
            ],
            correctIndex: 0,
            explanation: "O domínio próprio nos dá autoridade sobre nossas próprias paixões para vivermos em santidade."
          },
          {
            question: "Como o crente pode buscar e cultivar o crescimento nos dons e no fruto do Espírito?",
            options: [
              "Procurando com zelo o amor, permanecendo na Palavra, orando em todo o tempo e servindo à comunidade",
              "Comprando livros de magia religiosa",
              "Exigindo que Deus lhe dê dons por orgulho",
              "Ficando sem ler a Bíblia por meses"
            ],
            correctIndex: 0,
            explanation: "A busca com humildade, amor e oração faz florescer a vida no Espírito em nós."
          },
          {
            question: "Qual o objetivo final da vida conduzida no poder e no fruto do Espírito Santo?",
            options: [
              "Refletir o caráter de Jesus Cristo, edificar a igreja e trazer salvação e esperança às nações para a glória do Pai",
              "Fazer o crente se sentir superior a todos",
              "Garantir riqueza rápida sem esforço",
              "Substituir a necessidade de Cristo"
            ],
            correctIndex: 0,
            explanation: "O Espírito Santo sempre aponta para Jesus, gerando vida plena e frutífera para o Reino de Deus."
          }
        ]
      }
    ],
    bossFight: [
      {
        question: "Qual a verdade central sobre a pessoa e a obra do Espírito Santo?",
        options: [
          "Ele é a terceira pessoa da Trindade, a Ruach criadora, o Paracleto que habita no crente e capacita a igreja com poder e amor",
          "Ele é apenas uma força impessoal como a gravidade",
          "Ele atua apenas quando a igreja tem iluminação cara no palco",
          "Ele é um mito inventado no século XIX"
        ],
        correctIndex: 0,
        explanation: "O Espírito Santo é Deus habitando em nós, nos consolando, ensinando e guiando em toda a Verdade."
      },
      {
        question: "A promessa de Joel 2:28 cumprida no Pentecostes (Atos 2) representou:",
        options: [
          "O derramamento do Espírito Santo sobre todos os remidos na Nova Aliança sem distinção de raça, idade ou gênero",
          "O fim de todas as manifestações espirituais",
          "A limitação da salvação apenas para os judeus de Jerusalém",
          "O cancelamento do Evangelho de Cristo"
        ],
        correctIndex: 0,
        explanation: "Em Cristo, todos os que crêem são selados com o Espírito Santo da promessa."
      },
      {
        question: "Qual a diferença essencial entre Dons Espirituais e o Fruto do Espírito?",
        options: [
          "Dons são ferramentas de poder para o serviço; o Fruto é o desenvolvimento do caráter e amor de Jesus no crente",
          "Dons valem mais do que o amor",
          "O fruto só existe no Antigo Testamento",
          "Não há diferença alguma"
        ],
        correctIndex: 0,
        explanation: "Usar os dons com poder e manifestar o Fruto com amor garante uma liderança cristã madura e abençoadora."
      },
      {
        question: "O ensino de 1 Coríntios 13 estabelece que o exercício dos dons sem AMOR resulta em:",
        options: [
          "Barulho vazio e esterilidade espiritual diante de Deus",
          "O topo da perfeição teológica",
          "Salvação automática de milhares de ouvintes",
          "Um prêmio especial nos céus"
        ],
        correctIndex: 0,
        explanation: "O amor é o alicerce indispensável de todo serviço e manifestação espiritual no Reino."
      },
      {
        question: "Como o líder capacitado pela Escola do Espírito Santo deve conduzir seu ministério?",
        options: [
          "Em dependência contínua da oração no secreto, fidelidade às Escrituras, humildade de servo e amor restaurador",
          "Confiando no próprio talento humano sem orar",
          "Usando manipulação e coação de medo",
          "Buscando aplausos e fama pessoal"
        ],
        correctIndex: 0,
        explanation: "Caminhar no Espírito é viver para glorificar a Jesus, servindo às pessoas com compaixão e unção."
      }
    ]
  }
];
