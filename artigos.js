function saveArticleToLocalStorage(article) {
    const storedArticles = JSON.parse(localStorage.getItem("artigos")) || [];
    storedArticles.push(article);
    localStorage.setItem("artigos", JSON.stringify(storedArticles));
}

function loadArticlesFromLocalStorage() {
    const storedArticles = JSON.parse(localStorage.getItem("artigos")) || [];
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "";

    storedArticles.forEach(article => {
        const listItem = document.createElement("li");
        listItem.textContent = `${article.title} - ${article.category}`;
        resultsList.appendChild(listItem);
    });
}

function addArticle(title, category, description) {
    const newArticle = { title, category, description };
    saveArticleToLocalStorage(newArticle);
    loadArticlesFromLocalStorage();
}

document.addEventListener("DOMContentLoaded", loadArticlesFromLocalStorage);
