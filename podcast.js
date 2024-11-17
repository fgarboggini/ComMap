let podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];

// Função para salvar os podcasts no Local Storage
function salvarPodcasts() {
    localStorage.setItem('podcasts', JSON.stringify(podcasts));
}

// Função para listar todos os podcasts
function listarPodcasts() {
    const listaPodcasts = document.getElementById('lista-podcasts');
    listaPodcasts.innerHTML = '';
    
    podcasts.forEach((podcast, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${podcast.titulo}</strong> <br>
            Resumo: ${podcast.resumo} <br>
            Link: <a href="${podcast.link}" target="_blank">${podcast.link}</a> <br>
            Duração: ${podcast.duracao} | Público Focal: ${podcast.audiencia} | Idioma: ${podcast.idioma} <br>
            <button onclick="editarPodcast(${index})">Editar</button>
            <button onclick="removerPodcast(${index})">Remover</button>
        `;
        listaPodcasts.appendChild(li);
    });
}

// Função para adicionar um novo podcast
document.getElementById('formulario-podcast').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const resumo = document.getElementById('resumo').value;
    const link = document.getElementById('link').value;
    const duracao = document.getElementById('duracao').value;
    const audiencia = document.getElementById('audiencia').value;
    const idioma = document.getElementById('idioma').value;

    const novoPodcast = { titulo, resumo, link, duracao, audiencia, idioma };
    
    podcasts.push(novoPodcast);
    salvarPodcasts();
    listarPodcasts();
    document.getElementById('formulario-podcast').reset();
});

// Função para editar um podcast
function editarPodcast(index) {
    const podcast = podcasts[index];
    document.getElementById('titulo').value = podcast.titulo;
    document.getElementById('resumo').value = podcast.resumo;
    document.getElementById('link').value = podcast.link;
    document.getElementById('duracao').value = podcast.duracao;
    document.getElementById('audiencia').value = podcast.audiencia;
    document.getElementById('idioma').value = podcast.idioma;

    document.getElementById('formulario-podcast').onsubmit = function updatePodcast(event) {
        event.preventDefault();
        
        podcasts[index] = {
            titulo: document.getElementById('titulo').value,
            resumo: document.getElementById('resumo').value,
            link: document.getElementById('link').value,
            duracao: document.getElementById('duracao').value,
            audiencia: document.getElementById('audiencia').value,
            idioma: document.getElementById('idioma').value,
        };

        salvarPodcasts();
        listarPodcasts();
        document.getElementById('formulario-podcast').reset();
        document.getElementById('formulario-podcast').onsubmit = addPodcast; // Reseta o formulário ao modo "adicionar"
    };
}

// Função para remover um podcast
function removerPodcast(index) {
    if (confirm("Tem certeza que deseja remover este podcast?")) {
        podcasts.splice(index, 1);
        salvarPodcasts();
        listarPodcasts();
    }
}

// Função para buscar podcasts
document.getElementById('formulario-busca').addEventListener('submit', function(event) {
    event.preventDefault();
    const termoBusca = document.getElementById('termo-busca').value.toLowerCase();
    const resultadoBusca = podcasts.filter(podcast => 
        podcast.titulo.toLowerCase().includes(termoBusca) ||
        podcast.audiencia.toLowerCase().includes(termoBusca) ||
        podcast.idioma.toLowerCase().includes(termoBusca)
    );

    exibirResultadoBusca(resultadoBusca);
    document.getElementById('limpar-busca').style.display = resultadoBusca.length ? 'inline-block' : 'none';
});

// Função para exibir os resultados da busca
function exibirResultadoBusca(resultadoBusca) {
    const resultadoDiv = document.getElementById('resultado-busca');
    resultadoDiv.innerHTML = '';
    resultadoBusca.forEach(podcast => {
        const p = document.createElement('p');
        p.innerHTML = `${podcast.titulo} - Público Focal: ${podcast.audiencia} - Idioma: ${podcast.idioma}`;
        resultadoDiv.appendChild(p);
    });
}

// Função para limpar a busca
document.getElementById('limpar-busca').addEventListener('click', function() {
    document.getElementById('resultado-busca').innerHTML = '';
    document.getElementById('termo-busca').value = '';
    document.getElementById('limpar-busca').style.display = 'none';
});

listarPodcasts(); // Inicializa a listagem de podcasts
