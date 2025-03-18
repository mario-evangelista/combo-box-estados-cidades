// app.js

// URL da API do IBGE para obter os estados
const URL_ESTADOS =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

// URL da API do IBGE para obter as cidades de um estado específico
const URL_CIDADES =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios";

// Variável global para armazenar a lista completa de cidades
let todasCidades = [];

// Função para carregar os estados na página
async function carregarEstados() {
  try {
    const response = await fetch(URL_ESTADOS);
    const estados = await response.json();
    estados.sort((a, b) => a.nome.localeCompare(b.nome));
    const selectEstados = document.getElementById("estados");
    estados.forEach((estado) => {
      const option = document.createElement("option");
      option.value = estado.sigla;
      option.textContent = estado.nome;
      selectEstados.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar estados:", error);
  }
}

// Função para carregar as cidades de um estado selecionado
async function carregarCidades() {
  const selectEstados = document.getElementById("estados");
  const selectCidades = document.getElementById("cidades");
  const inputPesquisa = document.getElementById("pesquisaCidade");
  const uf = selectEstados.value;

  if (uf) {
    try {
      const response = await fetch(URL_CIDADES.replace("{UF}", uf));
      todasCidades = await response.json();
      todasCidades.sort((a, b) => a.nome.localeCompare(b.nome));

      // Limpa o select de cidades e adiciona as novas opções
      selectCidades.innerHTML = "";
      todasCidades.forEach((cidade) => {
        const option = document.createElement("option");
        option.value = cidade.nome;
        option.textContent = cidade.nome;
        selectCidades.appendChild(option);
      });

      // Habilita o campo de pesquisa e o select de cidades
      inputPesquisa.disabled = false;
      selectCidades.disabled = false;
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
    }
  } else {
    // Desabilita o campo de pesquisa e o select de cidades
    inputPesquisa.disabled = true;
    selectCidades.disabled = true;
    selectCidades.innerHTML = '<option value="">Selecione uma cidade</option>';
  }
}

// Função para filtrar as cidades com base no texto digitado
function filtrarCidades() {
  const inputPesquisa = document.getElementById("pesquisaCidade");
  const termoPesquisa = inputPesquisa.value.toLowerCase();
  const selectCidades = document.getElementById("cidades");

  // Filtra as cidades que correspondem ao termo de pesquisa
  const cidadesFiltradas = todasCidades.filter((cidade) =>
    cidade.nome.toLowerCase().includes(termoPesquisa)
  );

  // Limpa o select de cidades e adiciona as cidades filtradas
  selectCidades.innerHTML = "";
  cidadesFiltradas.forEach((cidade) => {
    const option = document.createElement("option");
    option.value = cidade.nome;
    option.textContent = cidade.nome;
    selectCidades.appendChild(option);
  });
}

// Função para limpar o formulário
function limparFormulario() {
  const selectEstados = document.getElementById("estados");
  const selectCidades = document.getElementById("cidades");
  const inputPesquisa = document.getElementById("pesquisaCidade");

  // Reseta os valores dos selects e do campo de pesquisa
  selectEstados.value = "";
  selectCidades.innerHTML = '<option value="">Selecione uma cidade</option>';
  inputPesquisa.value = "";

  // Desabilita o campo de pesquisa e o select de cidades
  inputPesquisa.disabled = true;
  selectCidades.disabled = true;

  // Limpa a lista de cidades carregadas
  todasCidades = [];
}

// Quando a página é carregada, chama a função para carregar os estados
document.addEventListener("DOMContentLoaded", carregarEstados);
