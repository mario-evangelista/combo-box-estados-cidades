# Selecionar Estado e Cidade com API do IBGE

Este projeto permite selecionar um estado brasileiro e, em seguida, carregar as cidades correspondentes usando a API do IBGE. Além disso, é possível pesquisar cidades pelo nome e limpar o formulário.

## Funcionalidades

- **Seleção de Estado**: Escolha um estado brasileiro a partir de uma lista carregada dinamicamente.
- **Carregamento de Cidades**: Ao selecionar um estado, as cidades correspondentes são carregadas automaticamente.
- **Pesquisa de Cidades**: Filtre as cidades pelo nome digitando no campo de pesquisa.
- **Limpar Formulário**: Um botão permite limpar todos os campos e redefinir o formulário.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página.
- **CSS (Bootstrap)**: Estilização da interface.
- **JavaScript**: Lógica para carregar estados, cidades e filtrar resultados.
- **API do IBGE**: Dados de estados e cidades do Brasil.

## Como Usar

1. **Selecione um Estado**:
   - Escolha um estado na lista suspensa de estados.
   - As cidades correspondentes serão carregadas automaticamente.

2. **Pesquise Cidades**:
   - Digite o nome de uma cidade no campo de pesquisa.
   - A lista de cidades será filtrada em tempo real.

3. **Limpar Formulário**:
   - Clique no botão "Limpar Formulário" para redefinir todos os campos.

## Como Configurar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/mario-evangelista/combo-box-estados-cidades.git
   ```

2. **Abra o projeto**:
   - Navegue até a pasta do projeto:
     ```bash
     cd combo-box-estados-cidades
     ```

3. **Abra o arquivo `index.html`**:
   - Abra o arquivo `index.html` em um navegador para visualizar o projeto.

## Estrutura do Projeto

```
combo-box-estados-cidades/
│
├── index.html          # Página principal do projeto
├── app.js              # Lógica JavaScript para carregar estados, cidades e filtrar
├── README.md           # Documentação do projeto
└── styles.css          # Estilos personalizados (opcional)
```

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

### Exemplo de Uso

1. **Selecione o estado "São Paulo"**.
2. **Digite "São" no campo de pesquisa**.
3. **A lista de cidades será filtrada para exibir apenas cidades que começam com "São"**.
4. **Clique em "Limpar Formulário" para redefinir todos os campos**.
