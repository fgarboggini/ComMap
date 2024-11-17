// Alterna a exibição das seções com base no botão clicado
function toggleSection(section) {
    const addPodcast = document.getElementById('addPodcast');
    const searchPodcast = document.getElementById('searchPodcast');
    const listPodcast = document.getElementById('listPodcast');
    const searchResults = document.getElementById('searchResults');

    // Ocultar todas as seções inicialmente
    addPodcast.classList.add('hidden');
    searchPodcast.classList.add('hidden');
    listPodcast.classList.add('hidden');
    searchResults.classList.add('hidden');

    // Mostrar a seção específica com base no parâmetro
    if (section === 'addPodcast') {
        addPodcast.classList.remove('hidden');
    } else if (section === 'searchPodcast') {
        searchPodcast.classList.remove('hidden');
    } else if (section === 'listPodcast') {
        listPodcast.classList.remove('hidden');
        listPodcasts();
    }
}

// Função para salvar podcasts no Local Storage
document.getElementById("formulario-podcast").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const podcast = {
        titulo: document.getElementById('titulo').value,
        resumo: document.getElementById('resumo').value,
        link: document.getElementById('link').value,
        duracao: document.getElementById('duracao').value,
        otherLinks: document.getElementById('otherLinks').value,
        audiencia: document.getElementById('audiencia').value,
        idioma: document.getElementById('idioma').value,
        communityName: document.getElementById('communityName').value,
        guestProjectName: document.getElementById('guestProjectName').value,
        mapsOrGeotech: document.getElementById('mapsOrGeotech').value,
        community: document.getElementById('community').value,
        location: document.getElementById('location').value,
        name: document.getElementById('name').value,
        characteristics: document.getElementById('characteristics').value
    };

    const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
    podcasts.push(podcast);
    localStorage.setItem('podcasts', JSON.stringify(podcasts));
    this.reset();
    listPodcasts();
});

// Funções de busca e listagem
function toggleSearchOptions() {
    document.getElementById('searchOptions').classList.toggle('hidden');
}

function displayFieldOptions(field) {
    const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
    const options = [...new Set(podcasts.map(podcast => podcast[field]))];
    
    const fieldOptions = document.getElementById('fieldOptions');
    fieldOptions.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => searchByField(field, option);
        fieldOptions.appendChild(button);
    });
    fieldOptions.classList.remove('hidden');
}

function searchByField(field, value) {
    const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
    const results = podcasts.filter(podcast => podcast[field] === value);

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    results.forEach(podcast => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${podcast.titulo}</strong><br>
            Público Focal: ${podcast.audiencia}<br>
            Idioma: ${podcast.idioma}<br>
            Local: ${podcast.location}<br>
            <button onclick="window.open('${podcast.link}', '_blank')">Ir para Podcast</button>
        `;
        resultsContainer.appendChild(div);
    });
    document.getElementById('searchResults').classList.remove('hidden');
}

function listAll() {
    const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    podcasts.forEach(podcast => {
        const div = document.createElement('div');
        div.innerHTML = `
            <strong>${podcast.titulo}</strong><br>
            Público Focal: ${podcast.audiencia}<br>
            Idioma: ${podcast.idioma}<br>
            Local: ${podcast.location}<br>
            <button onclick="window.open('${podcast.link}', '_blank')">Ir para Podcast</button>
        `;
        resultsContainer.appendChild(div);
    });
    document.getElementById('searchResults').classList.remove('hidden');
}

// Função para listar todos os podcasts
function listPodcasts() {
    const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
    const listaPodcasts = document.getElementById('lista-podcasts');
    listaPodcasts.innerHTML = '';

    podcasts.forEach((podcast, index) => {
        const li = document.createElement('li');
        li.classList.add('podcast-item');
        li.innerHTML = `
            <strong>${podcast.titulo}</strong><br>
            Resumo: ${podcast.resumo}<br>
            Duração: ${podcast.duracao}<br>
            Público Focal: ${podcast.audiencia}<br>
            Idioma: ${podcast.idioma}<br>
            Local: ${podcast.location}<br>
            <button onclick="window.open('${podcast.link}', '_blank')">Ir para Podcast</button>
        `;
        listaPodcasts.appendChild(li);
    });
}

listPodcasts();

