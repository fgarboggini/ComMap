// Alterna a exibição das seções com base no botão clicado
function toggleSection(section) {
    const addPodcast = document.getElementById('addPodcast');
    const searchPodcast = document.getElementById('searchPodcast');
    const listPodcast = document.getElementById('listPodcast');

    // Ocultar todas as seções inicialmente
    addPodcast.classList.add('hidden');
    searchPodcast.classList.add('hidden');
    listPodcast.classList.add('hidden');

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
function savePodcasts() {
    const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
    localStorage.setItem('podcasts', JSON.stringify(podcasts));
}

// Adiciona novo podcast
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

// Listagem de todos os podcasts
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
            <button onclick="removePodcast(${index})">Remover</button>
        `;
        listaPodcasts.appendChild(li);
    });
}

// Alterna a visibilidade das opções de busca
function toggleSearchOptions() {
    const searchOptions = document.getElementById('searchOptions');
    searchOptions.classList.toggle('hidden');
}

// Busca por campo específico
function searchByField(field) {
    const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
    const resultadoBusca = podcasts.filter(podcast => podcast[field]);
    exibirResultadoBusca(resultadoBusca);
}

// Exibe resultado de busca
function exibirResultadoBusca(resultadoBusca) {
    const resultadoDiv = document.getElementById('resultado-busca');
    resultadoDiv.innerHTML = '';
    resultadoBusca.forEach(podcast => {
        const p = document.createElement('p');
        p.classList.add('podcast-item');
        p.innerHTML = `
            <strong>${podcast.titulo}</strong><br>
            Público Focal: ${podcast.audiencia}<br>
            <button onclick="window.open('${podcast.link}', '_blank')">Ir para Podcast</button>
        `;
        resultadoDiv.appendChild(p);
    });
}

listPodcasts();



