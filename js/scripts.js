// Função para alternar entre seções de pesquisa e adicionar artigo
function toggleSection(section) {
    const searchSection = document.getElementById('searchSection');
    const addSection = document.getElementById('addSection');
    const articleListSection = document.getElementById('articleListSection');

    if (section === 'search') {
        searchSection.classList.remove('hidden');
        addSection.classList.add('hidden');
        articleListSection.classList.add('hidden');
    } else if (section === 'add') {
        addSection.classList.remove('hidden');
        searchSection.classList.add('hidden');
        articleListSection.classList.add('hidden');
    }
}

// Função para adicionar artigo ao armazenamento local
// Exemplo de verificação após o armazenamento
document.getElementById("addArticleForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const article = { /* todos os campos aqui */ };
    
    let storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    storedArticles.push(article);
    localStorage.setItem("articles", JSON.stringify(storedArticles));
    document.getElementById("addArticleForm").reset();
    alert("Artigo adicionado com sucesso!");

    // Verifique no console após armazenar
    console.log("Armazenamento:", localStorage.getItem("articles"));
});

// Adicionar consistência na tabela em todas as funções de busca
function searchByField(field) {
    const resultsList = document.getElementById("articleResultsList");
    resultsList.innerHTML = "";

    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const filteredArticles = storedArticles.filter(article => article[field] && article[field].trim() !== "");

    if (filteredArticles.length > 0) {
        const table = document.createElement("table");
        table.classList.add("table"); // Adicionar classe CSS específica para estilizar

        // Adicionar conteúdo da tabela
        /* ... código para preencher as colunas ... */

        resultsList.appendChild(table);
    } else {
        const noResultsItem = document.createElement("p");
        noResultsItem.textContent = "Nenhum resultado encontrado para esse campo.";
        resultsList.appendChild(noResultsItem);
    }
}

// Função para buscar artigos e exibir resultados em três colunas
function searchByField(field) {
    const resultsList = document.getElementById("articleResultsList");
    resultsList.innerHTML = "";

    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    const filteredArticles = storedArticles.filter(article => article[field] && article[field].trim() !== "");

    if (filteredArticles.length > 0) {
        const table = document.createElement("table");
        const tableHeader = `
            <tr>
                <th>Título</th>
                <th>${getFieldDisplayName(field)}</th>
                <th>Ação</th>
            </tr>`;
        table.innerHTML = tableHeader;

        filteredArticles.forEach(article => {
            const row = document.createElement("tr");

            // Coluna do Título (para agora, uso a natureza da intervenção como título de exemplo)
            const titleCell = document.createElement("td");
            titleCell.textContent = article.natureza || "Sem Título"; // Ajuste de acordo com campo que contém o título
            row.appendChild(titleCell);

            // Coluna do campo pesquisado
            const fieldCell = document.createElement("td");
            fieldCell.textContent = article[field];
            row.appendChild(fieldCell);

            // Coluna do botão de link
            const actionCell = document.createElement("td");
            if (article.materialDidatico) {
                const linkButton = document.createElement("button");
                linkButton.textContent = "Ir para o Artigo";
                linkButton.classList.add("link-button");
                linkButton.onclick = () => window.open(article.materialDidatico, "_blank");
                actionCell.appendChild(linkButton);
            } else {
                actionCell.textContent = "Link indisponível";
            }
            row.appendChild(actionCell);

            table.appendChild(row);
        });

        resultsList.appendChild(table);
    } else {
        const noResultsItem = document.createElement("p");
        noResultsItem.textContent = "Nenhum resultado encontrado para esse campo.";
        resultsList.appendChild(noResultsItem);
    }
}

// Função auxiliar para obter o nome de exibição do campo
function getFieldDisplayName(field) {
    const fieldNames = {
        favela: "Favela",
        baseComunitaria: "Base Comunitária",
        natureza: "Natureza da Intervenção",
        projetoEnvolvido: "Projeto Envolvido",
        openstreetmap: "OpenStreetMap",
        localIntervencao: "Local da Intervenção",
        feicoesMapeadas: "Feições Mapeadas",
        tecnologiasCartograficas: "Tecnologias Cartográficas",
        mapasDigitaisAnalógicos: "Mapas Digitais/Analógicos",
        metodosApropriacao: "Métodos de Apropriação",
        materialDidatico: "Material Didático",
        avaliacaoFerramentas: "Avaliação das Ferramentas",
        impactoComunitario: "Impacto Comunitário",
        impactosEfetivos: "Impactos Efetivos",
        desafiosProblemas: "Desafios e Problemas"
    };
    return fieldNames[field] || field;
}

// Função para exibir todos os artigos armazenados
function displayStoredArticles() {
    const articleList = document.getElementById("articleList");
    articleList.innerHTML = "";

    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];

    if (storedArticles.length > 0) {
        storedArticles.forEach(article => {
            const listItem = document.createElement("li");
            listItem.textContent = `Favela: ${article.favela}, Base Comunitária: ${article.baseComunitaria}`;
            articleList.appendChild(listItem);
        });
    } else {
        const noArticlesItem = document.createElement("p");
        noArticlesItem.textContent = "Nenhum artigo armazenado.";
        articleList.appendChild(noArticlesItem);
    }
}

// Exibir lista de artigos ao carregar a página
document.addEventListener("DOMContentLoaded", displayStoredArticles);
