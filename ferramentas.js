function saveToolToLocalStorage(tool) {
    const storedTools = JSON.parse(localStorage.getItem("ferramentas")) || [];
    storedTools.push(tool);
    localStorage.setItem("ferramentas", JSON.stringify(storedTools));
}

function loadToolsFromLocalStorage() {
    const storedTools = JSON.parse(localStorage.getItem("ferramentas")) || [];
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "";

    storedTools.forEach(tool => {
        const listItem = document.createElement("li");
        listItem.textContent = `${tool.name} - ${tool.description}`;
        resultsList.appendChild(listItem);
    });
}

function addTool(name, description) {
    const newTool = { name, description };
    saveToolToLocalStorage(newTool);
    loadToolsFromLocalStorage();
}

document.addEventListener("DOMContentLoaded", loadToolsFromLocalStorage);
