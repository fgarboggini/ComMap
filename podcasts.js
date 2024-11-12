// Função para alternar a exibição do formulário de adicionar podcast
function toggleAddForm() {
    const addFormSection = document.getElementById("addFormSection");
    addFormSection.classList.toggle("hidden");
}

// Função para salvar o novo podcast no Local Storage
function addPodcast() {
    const podcast = {
        title: document.getElementById("title").value.trim(),
        summary: document.getElementById("summary").value.trim(),
        link: document.getElementById("link").value.trim(),
        duration: document.getElementById("duration").value.trim(),
        otherLinks: document.getElementById("otherLinks").value.trim(),
        audience: document.getElementById("audience").value.trim(),
        language: document.getElementById("language").value.trim(),
        community: document.getElementById("community").value.trim(),
        location: document.getElementById("location").value.trim()
    };

    let storedPodcasts = JSON.parse(localStorage.getItem("podcasts")) || [];
    storedPodcasts.push(podcast);
    localStorage.setItem("podcasts", JSON.stringify(storedPodcasts));

    document.getElementById("addPodcastForm").reset();
    alert("Podcast cadastrado com sucesso!");
}

