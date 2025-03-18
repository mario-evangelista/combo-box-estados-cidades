// app.js

// URL da API do IBGE para obter os estados
const URL_ESTADOS =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

// URL da API do IBGE para obter as cidades de um estado específico
const URL_CIDADES =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios";

// Função para carregar os estados na página
async function carregarEstados() {
  try {
    // Faz uma requisição GET para a API do IBGE para obter a lista de estados
    const response = await fetch(URL_ESTADOS);

    // Converte a resposta para JSON
    const estados = await response.json();

    // Ordena os estados por nome
    estados.sort((a, b) => a.nome.localeCompare(b.nome));

    // Seleciona o elemento <select> dos estados
    const selectEstados = document.getElementById("estados");

    // Itera sobre a lista de estados e adiciona cada um como uma opção no <select>
    estados.forEach((estado) => {
      const option = document.createElement("option");
      option.value = estado.sigla; // Usa a sigla do estado como valor
      option.textContent = estado.nome; // Usa o nome do estado como texto
      selectEstados.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar estados:", error);
  }
}

// Função para carregar as cidades de um estado selecionado
async function carregarCidades() {
  // Seleciona o elemento <select> dos estados e das cidades
  const selectEstados = document.getElementById("estados");
  const selectCidades = document.getElementById("cidades");

  // Obtém a sigla do estado selecionado
  const uf = selectEstados.value;

  // Se um estado foi selecionado
  if (uf) {
    try {
      // Faz uma requisição GET para a API do IBGE para obter a lista de cidades do estado selecionado
      const response = await fetch(URL_CIDADES.replace("{UF}", uf));

      // Converte a resposta para JSON
      const cidades = await response.json();

      // Ordena as cidades por nome
      cidades.sort((a, b) => a.nome.localeCompare(b.nome));

      // Limpa as opções anteriores do <select> das cidades
      selectCidades.innerHTML =
        '<option value="">Selecione uma cidade</option>';

      // Itera sobre a lista de cidades e adiciona cada uma como uma opção no <select>
      cidades.forEach((cidade) => {
        const option = document.createElement("option");
        option.value = cidade.nome; // Usa o nome da cidade como valor
        option.textContent = cidade.nome; // Usa o nome da cidade como texto
        selectCidades.appendChild(option);
      });

      // Habilita o <select> das cidades
      selectCidades.disabled = false;
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
    }
  } else {
    // Se nenhum estado foi selecionado, desabilita o <select> das cidades e limpa as opções
    selectCidades.disabled = true;
    selectCidades.innerHTML = '<option value="">Selecione uma cidade</option>';
  }
}

// Função para limpar o formulário
function limparFormulario() {
  const selectEstados = document.getElementById("estados");
  const selectCidades = document.getElementById("cidades");

  // Reseta os valores dos selects
  selectEstados.value = "";
  selectCidades.innerHTML = '<option value="">Selecione uma cidade</option>';

  // Desabilita o select de cidades
  selectCidades.disabled = true;
}

// Quando a página é carregada, chama a função para carregar os estados
document.addEventListener("DOMContentLoaded", carregarEstados);
