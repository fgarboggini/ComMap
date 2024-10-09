// Função para alternar entre as seções de pesquisa e adicionar podcast
function toggleSection(section) {
    const searchSection = document.getElementById('searchSection');
    const addSection = document.getElementById('addSection');

    if (section === 'search') {
        searchSection.classList.remove('hidden');
        addSection.classList.add('hidden');
    } else if (section === 'add') {
        addSection.classList.remove('hidden');
        searchSection.classList.add('hidden');
    }
}

// Função para buscar podcasts com base no campo selecionado
function searchByField(field) {
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = ""; // Limpa os resultados anteriores

    const storedPodcasts = JSON.parse(localStorage.getItem("podcasts")) || [];
    
    // Filtrar podcasts que possuem o campo preenchido
    const filteredPodcasts = storedPodcasts.filter(podcast => podcast[field] && podcast[field].trim() !== "");
    
    // Exibir de forma diferenciada se o campo pesquisado for "Título"
    if (field === 'title') {
        filteredPodcasts.forEach(podcast => {
            const listItem = document.createElement("li");
            listItem.textContent = podcast.title;

            // Adicionar botão para abrir o link do podcast
            if (podcast.link) {
                const linkButton = document.createElement("button");
                linkButton.textContent = "Ir para o Podcast";
                linkButton.classList.add("link-button");
                linkButton.onclick = () => window.open(podcast.link, "_blank");
                listItem.appendChild(linkButton);
            }

            resultsList.appendChild(listItem);
        });
    } else if (filteredPodcasts.length > 0) {
        // Criar uma tabela para exibir os resultados com três colunas para outros campos
        const table = document.createElement("table");
        const tableHeader = `
            <tr>
                <th>Título</th>
                <th>${getFieldDisplayName(field)}</th>
                <th>Ação</th>
            </tr>`;
        table.innerHTML = tableHeader;

        filteredPodcasts.forEach(podcast => {
            const row = document.createElement("tr");

            // Coluna do Título
            const titleCell = document.createElement("td");
            titleCell.textContent = podcast.title;
            row.appendChild(titleCell);

            // Coluna do campo pesquisado
            const fieldCell = document.createElement("td");
            fieldCell.textContent = podcast[field];
            row.appendChild(fieldCell);

            // Coluna do botão de link
            const actionCell = document.createElement("td");
            if (podcast.link) {
                const linkButton = document.createElement("button");
                linkButton.textContent = "Ir para o Podcast";
                linkButton.classList.add("link-button");
                linkButton.onclick = () => window.open(podcast.link, "_blank");
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
        title: "Título",
        originalSummary: "Resumo Original",
        portugueseSummary: "Resumo em Português",
        duration: "Duração",
        otherLinks: "Outros Links",
        audience: "Público Alvo",
        language: "Idioma",
        community: "Comunidade Urbana/Favela",
        location: "Local/País",
        name: "Nome do Responsável",
        platform: "Plataforma"
    };
    return fieldNames[field] || field;
}

// Inicialização das seções ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    const searchSection = document.getElementById('searchSection');
    const addSection = document.getElementById('addSection');

    if (searchSection && addSection) {
        searchSection.classList.add('hidden');
        addSection.classList.add('hidden');
    }

    // Event listener para o formulário de adicionar podcast
    const addPodcastForm = document.getElementById("addPodcastForm");
    if (addPodcastForm) {
        addPodcastForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const podcast = {
                title: document.getElementById("title").value.trim(),
                originalSummary: document.getElementById("originalSummary").value.trim(),
                portugueseSummary: document.getElementById("portugueseSummary").value.trim(),
                link: document.getElementById("link").value.trim(),
                duration: document.getElementById("duration").value.trim(),
                otherLinks: document.getElementById("otherLinks").value.trim(),
                audience: document.getElementById("audience").value.trim(),
                language: document.getElementById("language").value.trim(),
                community: document.getElementById("community").value.trim(),
                location: document.getElementById("location").value.trim(),
                name: document.getElementById("name").value.trim(),
                platform: document.getElementById("platform").value.trim()
            };
            let storedPodcasts = JSON.parse(localStorage.getItem("podcasts")) || [];
            storedPodcasts.push(podcast);
            localStorage.setItem("podcasts", JSON.stringify(storedPodcasts));
            addPodcastForm.reset();
            alert("Podcast adicionado com sucesso!");
        });
    }
});
