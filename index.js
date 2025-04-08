// Versão: v2 - Deploy para Koyeb
// Projeto: Falcão Peregrino Bot

require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

// 🔌 Criação do servidor web para manter o Koyeb ativo
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('🦅 Falcão Peregrino está ativo!');
});
app.listen(PORT, () => {
  console.log(`🌐 Servidor web ativo na porta ${PORT}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

const TOKEN = process.env.TOKEN;

const DELAY_MIN = 180000; // 3 minutos
const DELAY_MAX = 900000; // 15 minutos

const mensagensNoite = [
  "Hoje foi um dia intenso entre comunidade e sessões individuais. Agora, é tempo de recarregar energias.",
  "O dia foi produtivo e cheio de boas partilhas. Agora chegou o momento de descansar.",
  "Hoje dediquei parte do tempo a aprofundar estudos para trazer mais valor aqui. Até amanhã!",
  "Foi um dia cheio de reflexões importantes. Agora é hora de desligar e recuperar energia.",
  "Mais um dia vivido com intenção. Obrigado a todos os que estiveram por aqui. Até amanhã!",
  "Entre tarefas e apoio a quem mais precisa, o dia passou num instante. Hora de repousar.",
  "Se hoje foi difícil, lembra-te: estás a avançar. Amanhã será diferente.",
  "Com gratidão e propósito, encerro mais um ciclo. Até já, viajante.",
  "Por hoje, terminamos. E que bom é saber que estamos juntos neste caminho",
  "Dia incrível, foi um prazer estar aqui convosco. Até amanhã!"
];

const mensagensAberturaDia = [
  "🌄 Bom dia, exploradores da mente! Que desafios vais abraçar hoje?",
  "🧠 A tua mente é o teu melhor guia. Estás a escutá-la?",
  "💪 Hoje pode ser o dia em que tudo muda. Começa por um pequeno passo.",
  "🌱 Cada manhã traz uma nova hipótese de te superares.",
  "🔍 Já te questionaste hoje: o que posso fazer diferente?",
  "☕ Toma um café, respira fundo e lembra-te: estás mais preparado do que pensas.",
  "🚀 Mesmo os maiores voos começam com um bater de asas. Qual é o teu hoje?",
  "📝 Escreve mentalmente uma intenção para hoje. Depois… age sobre ela.",
  "🤍 Bom dia, mente consciente! Vamos tornar este dia memorável?",
  "🔔 Desperta. Observa. Decide. Hoje, assume o teu comando."
];

const mensagensEstimulo = [
  "🙋 Está tudo a correr bem por aí? Partilha como te sentes hoje.",
  "🗣️ Se te sentires bloqueado, lembra-te: tens uma comunidade inteira contigo.",
  "🧩 O desafio de hoje é: escreve uma frase que te motive. Partilhas?",
  "🔄 Pausa, respira e pergunta-te: estou alinhado com o que realmente quero?",
  "📢 O que aprendeste hoje que vale a pena ser partilhado?",
  "💬 Sabes que podes usar este espaço para te expressar? Desafia-te a abrir.",
  "🎯 Qual é o teu foco agora? Escrevê-lo pode ser o primeiro passo para alcançá-lo.",
  "👣 Lembra-te: até os dias calmos fazem parte do progresso.",
  "🎁 Hoje, oferece a ti mesmo uma palavra de carinho. Qual seria?",
  "🔐 Nem todos os dias são de conquistas. Mas todos os dias são de escolhas."
];

client.once('ready', () => {
  console.log(`🦅 Falcão Peregrino está ativo como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const texto = message.content.toLowerCase();

  if (texto.includes('!falcão')) {
    const delay = Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN + 1)) + DELAY_MIN;
    console.log(`🕒 Delay gerado: ${Math.floor(delay / 60000)} minutos`);
    setTimeout(() => {
      message.reply('🦅 Estou contigo! Chamaste-me?');
    }, delay);
  }

  if (texto === '!diagnostico') {
    message.reply('✅ Estou operacional e atento!');
  }

  if (texto === '!ajuda') {
    message.reply('🛟 Podes escrever a tua dúvida ou situação. Se for urgente, usa expressões como "preciso de ajuda" ou "bloqueado" para alertar o Carlos.');
  }

  const palavrasChave = [
    'alguém disponível',
    'preciso de ajuda',
    'preciso de apoio',
    'falar contigo',
    'urgente',
    'bloqueado',
    'ansioso'
  ];
  const encontrou = palavrasChave.some(p => texto.includes(p));

  if (encontrou) {
    try {
      await message.author.send('✉️ Recebi a tua mensagem. O Carlos foi informado do teu pedido e responderá tão breve quanto possível. Obrigado por confiares.');
    } catch (err) {
      console.error('Erro ao enviar DM:', err);
    }

    const canalAjuda = await client.channels.fetch('1356920540568223834');
    if (canalAjuda) {
      const perfilLink = `https://discord.com/users/${message.author.id}`;
      const msgLink = message.url;
      canalAjuda.send(
        `🔔 Pedido de apoio de **${message.author.username}**:\n> ${message.content}\n\n👉 [Abrir perfil do membro](${perfilLink})\n💬 [Responder diretamente à mensagem](${msgLink})`
      );
    }
  }
});

// Envio de mensagem noturna (encerramento)
setInterval(() => {
  const agora = new Date();
  if (agora.getHours() === 0 && agora.getMinutes() === 0) {
    const canalNoite = client.channels.cache.get('1356929888845828186');
    const msg = mensagensNoite[Math.floor(Math.random() * mensagensNoite.length)];
    if (canalNoite) canalNoite.send(`🦅 ${msg}`);
  }
}, 60000);

// Envio de mensagem de abertura do dia
setInterval(() => {
  const agora = new Date();
  if (agora.getHours() === 6 && agora.getMinutes() === 0) {
    const canais = [
      '1356664649793142854',
      '1358052216608796742'
    ];
    const canal = client.channels.cache.get(canais[Math.floor(Math.random() * canais.length)]);
    const msg = mensagensAberturaDia[Math.floor(Math.random() * mensagensAberturaDia.length)];
    if (canal) canal.send(`🦅 ${msg}`);
  }
}, 60000);

// Estímulos ao longo do dia
const agendamentosEstimulo = [11, 15, 19];
setInterval(() => {
  const agora = new Date();
  const hora = agora.getHours();
  const minuto = agora.getMinutes();
  if (agendamentosEstimulo.includes(hora) && minuto === 0) {
    const canais = [
      '1356664649793142854',
      '1358052216608796742',
      '1358052759635994624',
      '1358053515038420992',
      '1358054024171683880',
      '1358054812559564810'
    ];
    const canal = client.channels.cache.get(canais[Math.floor(Math.random() * canais.length)]);
    const msg = mensagensEstimulo[Math.floor(Math.random() * mensagensEstimulo.length)];
    if (canal) canal.send(`🦅 ${msg}`);
  }
}, 60000);

// Mensagens silenciosas para manter ativo
setInterval(() => {
  const agora = new Date();
  const hora = agora.getHours();
  if (hora >= 1 && hora <= 23) {
    const canal = client.channels.cache.get('1358740582468005939');
    if (canal) canal.send('.');
  }
}, 14400000);

client.login(TOKEN);
