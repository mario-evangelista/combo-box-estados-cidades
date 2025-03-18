// app.js

// URL da API do IBGE para obter a lista de estados brasileiros
const URL_ESTADOS =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

// URL da API do IBGE para obter as cidades de um estado específico.
// O placeholder {UF} será substituído pela sigla do estado selecionado.
const URL_CIDADES =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios";

// Variável global para armazenar a lista completa de cidades carregadas.
// Essa lista é usada para filtrar as cidades com base no texto digitado no campo de pesquisa.
let todasCidades = [];

/**
 * Função para carregar a lista de estados brasileiros na página.
 * - Faz uma requisição à API do IBGE para obter os estados.
 * - Ordena os estados por nome.
 * - Preenche o <select> de estados com as opções obtidas.
 */
async function carregarEstados() {
  try {
    // Faz uma requisição GET para a API do IBGE
    const response = await fetch(URL_ESTADOS);

    // Converte a resposta para JSON
    const estados = await response.json();

    // Ordena os estados por nome (ordem alfabética)
    estados.sort((a, b) => a.nome.localeCompare(b.nome));

    // Seleciona o elemento <select> de estados no HTML
    const selectEstados = document.getElementById("estados");

    // Itera sobre a lista de estados e cria uma opção para cada um
    estados.forEach((estado) => {
      const option = document.createElement("option");
      option.value = estado.sigla; // Usa a sigla do estado como valor
      option.textContent = estado.nome; // Usa o nome do estado como texto
      selectEstados.appendChild(option); // Adiciona a opção ao <select>
    });
  } catch (error) {
    // Exibe um erro no console caso ocorra algum problema na requisição
    console.error("Erro ao carregar estados:", error);
  }
}

/**
 * Função para carregar as cidades de um estado selecionado.
 * - Faz uma requisição à API do IBGE para obter as cidades do estado.
 * - Armazena a lista de cidades na variável global `todasCidades`.
 * - Preenche o <select> de cidades com as opções obtidas.
 * - Habilita o campo de pesquisa e o <select> de cidades.
 */
async function carregarCidades() {
  // Seleciona os elementos do DOM
  const selectEstados = document.getElementById("estados");
  const selectCidades = document.getElementById("cidades");
  const inputPesquisa = document.getElementById("pesquisaCidade");

  // Obtém a sigla do estado selecionado
  const uf = selectEstados.value;

  // Verifica se um estado foi selecionado
  if (uf) {
    try {
      // Faz uma requisição GET para a API do IBGE, substituindo {UF} pela sigla do estado
      const response = await fetch(URL_CIDADES.replace("{UF}", uf));

      // Converte a resposta para JSON
      todasCidades = await response.json();

      // Ordena as cidades por nome (ordem alfabética)
      todasCidades.sort((a, b) => a.nome.localeCompare(b.nome));

      // Limpa o <select> de cidades antes de adicionar as novas opções
      selectCidades.innerHTML = "";

      // Itera sobre a lista de cidades e cria uma opção para cada uma
      todasCidades.forEach((cidade) => {
        const option = document.createElement("option");
        option.value = cidade.nome; // Usa o nome da cidade como valor
        option.textContent = cidade.nome; // Usa o nome da cidade como texto
        selectCidades.appendChild(option); // Adiciona a opção ao <select>
      });

      // Habilita o campo de pesquisa e o <select> de cidades
      inputPesquisa.disabled = false;
      selectCidades.disabled = false;
    } catch (error) {
      // Exibe um erro no console caso ocorra algum problema na requisição
      console.error("Erro ao carregar cidades:", error);
    }
  } else {
    // Se nenhum estado foi selecionado, desabilita o campo de pesquisa e o <select> de cidades
    inputPesquisa.disabled = true;
    selectCidades.disabled = true;
    selectCidades.innerHTML = '<option value="">Selecione uma cidade</option>';
  }
}

/**
 * Função para filtrar as cidades com base no texto digitado no campo de pesquisa.
 * - Filtra a lista de cidades armazenada na variável global `todasCidades`.
 * - Atualiza o <select> de cidades para exibir apenas as cidades que correspondem ao termo de pesquisa.
 */
function filtrarCidades() {
  // Seleciona os elementos do DOM
  const inputPesquisa = document.getElementById("pesquisaCidade");
  const selectCidades = document.getElementById("cidades");

  // Obtém o termo de pesquisa e converte para minúsculas (para busca case-insensitive)
  const termoPesquisa = inputPesquisa.value.toLowerCase();

  // Filtra a lista de cidades, mantendo apenas as que incluem o termo de pesquisa
  const cidadesFiltradas = todasCidades.filter((cidade) =>
    cidade.nome.toLowerCase().includes(termoPesquisa)
  );

  // Limpa o <select> de cidades antes de adicionar as novas opções filtradas
  selectCidades.innerHTML = "";

  // Itera sobre a lista de cidades filtradas e cria uma opção para cada uma
  cidadesFiltradas.forEach((cidade) => {
    const option = document.createElement("option");
    option.value = cidade.nome; // Usa o nome da cidade como valor
    option.textContent = cidade.nome; // Usa o nome da cidade como texto
    selectCidades.appendChild(option); // Adiciona a opção ao <select>
  });
}

/**
 * Função para limpar o formulário.
 * - Reseta o valor do <select> de estados.
 * - Limpa o <select> de cidades e redefine para o estado inicial.
 * - Limpa o campo de pesquisa.
 * - Desabilita o campo de pesquisa e o <select> de cidades.
 * - Limpa a lista de cidades carregadas.
 */
function limparFormulario() {
  // Seleciona os elementos do DOM
  const selectEstados = document.getElementById("estados");
  const selectCidades = document.getElementById("cidades");
  const inputPesquisa = document.getElementById("pesquisaCidade");

  // Reseta o valor do <select> de estados
  selectEstados.value = "";

  // Limpa o <select> de cidades e redefine para o estado inicial
  selectCidades.innerHTML = '<option value="">Selecione uma cidade</option>';

  // Limpa o valor do campo de pesquisa
  inputPesquisa.value = "";

  // Desabilita o campo de pesquisa e o <select> de cidades
  inputPesquisa.disabled = true;
  selectCidades.disabled = true;

  // Limpa a lista de cidades carregadas
  todasCidades = [];
}

// Quando a página é carregada, chama a função para carregar os estados
document.addEventListener("DOMContentLoaded", carregarEstados);
