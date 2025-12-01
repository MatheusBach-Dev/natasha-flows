// 001 - Aula: Arrays e Objetos - Fundação para Full-Stack
// Exemplos com músicas, filmes e momentos especiais

// === OBJETOS ===
// Representam "coisas" do mundo real com propriedades

const musica = {
  titulo: "Bohemian Rhapsody",
  artista: "Queen",
  duracao: 355, // em segundos
  genero: "Rock",
  favorita: true
};

const minhaNamorada = {
  nome: "Sofia",
  idade: 18,
  cidade: "Belo Horizonte",
  mesesJuntos: 10
};

const filme = {
  nome: "Inception",
  ano: 2010,
  diretor: "Christopher Nolan",
  nota: 8.8,
  assistido: true
};

const encontroEspecial = {
  data: "2024-02-14",
  local: "Cinema",
  atividade: "Assistir filme juntos",
  memoravel: true
};

// === ARRAYS ===
// Listas ordenadas de itens

const InfosSofia = [
  {nome: "Sofia"},
  {idade: 18},
  {mesesJuntos: 10}
];

const playlist = ["Bohemian Rhapsody", "Stairway to Heaven", "Hotel California"];

const filmesAssistidos = [
  { nome: "Inception", nota: 9 }, 
  { nome: "Interstellar", nota: 8.5 },
  { nome: "The Dark Knight", nota: 9.5 },
  { nome: "Avatar", nota: 10}
];

const momentosJuntos = [
  { data: "2024-01-15", atividade: "Primeiro encontro" },
  { data: "2024-02-14", atividade: "Cinema" },
  { data: "2024-03-10", atividade: "Show de música" }
];

// === OPERAÇÕES ESSENCIAIS ===

// 1. Acessar propriedades
console.log("Música favorita:", musica.titulo);
console.log("Primeira música da playlist:", playlist[0]);
console.log("Nome da minha namorada:",minhaNamorada.nome);

// 2. Adicionar itens - SITUAÇÕES REAIS

// Imagine que você está ouvindo música com a Sofia
// e ela fala: "Coloca aquela música Imagine do John Lennon!"
console.log("Playlist antes:", playlist);
playlist.push("Imagine"); // Você adiciona a música que ela pediu
console.log("Playlist depois:", playlist);

// Ou vocês planejaram um novo encontro
momentosJuntos.push({ data: "2024-04-01", atividade: "Jantar especial" });
console.log("Novo momento adicionado:", momentosJuntos[momentosJuntos.length - 1]);
InfosSofia.push({mesesJuntos: 10});
// no array InfosSofia, temos uma posicao para cada informacao sobre a Sofia do 0 ao 4
console.log("Estamos há", minhaNamorada.mesesJuntos, "meses juntos");

// 3. Encontrar itens
const filmeInception = filmesAssistidos.find(filme => filme.nome === "Inception");
console.log("Encontrei:", filmeInception);

const namorada = InfosSofia.find(info => info.nome === "Sofia");
console.log("O nome da minha namorada é", namorada.nome);


// 4. Filtrar itens
const filmesNota9Plus = filmesAssistidos.filter(filme => filme.nota >= 9);
console.log("Filmes nota 9+:", filmesNota9Plus);

const IdadeSofiaPlus = InfosSofia.filter(info => info.idade >= 18);
console.log("A idade da minha namorada é:", IdadeSofiaPlus);  

// 5. Transformar dados
const apenasNomesFilmes = filmesAssistidos.map(filme => filme.nome);
console.log("Só os nomes:", apenasNomesFilmes);

// === POR QUE ISSO É IMPORTANTE? ===
// - Front-end: Manipular dados da API, listas de componentes
// - Back-end: Processar dados do banco, criar APIs
// - Ambos: Lógica de negócio, validações, transformações