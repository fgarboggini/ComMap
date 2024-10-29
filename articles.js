const apiKey = 'AIzaSyAWTU0OV_6hyFmyLVkAv6TGYFU2S37IjcE';
const articlesSheetId = 'ARTICLES_SHEET_ID'; // Substitua pelo ID da planilha de artigos
const range = 'Sheet1!B3:L31';

async function fetchDataFromSheet() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${articlesSheetId}/values/${range}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.values || [];
    } catch (error) {
        console.error("Erro ao buscar dados da planilha:", error);
        return [];
    }
}

async function searchArticles() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const data = await fetchDataFromSheet();

    const headers = data[0];
    const rows = data.slice(1);

    const filteredData = rows.filter(row => row.some(cell => cell && cell.toLowerCase().includes(query)));
    displayResults(headers, filteredData);
}

function displayResults(headers, data) {
    const resultsBody = document.getElementById("resultsBody");
    resultsBody.innerHTML = "";

    const headerRow = document.createElement("tr");
    headers.forEach(header => {
        const headerCell = document.createElement("th");
        headerCell.textContent = header;
        headerRow.appendChild(headerCell);
    });
    resultsBody.appendChild(headerRow);

    data.forEach(row => {
        const rowElement = document.createElement("tr");
        row.forEach(cell => {
            const cellElement = document.createElement("td");
            cellElement.textContent = cell || "N/A";
            rowElement.appendChild(cellElement);
        });
        resultsBody.appendChild(rowElement);
    });
}

document.getElementById("addArticleForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Funcionalidade de adição será integrada em breve!");
    document.getElementById("addArticleForm").reset();
});
