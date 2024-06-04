document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('q');
    const format = urlParams.get('format');
    
    if (query) {
        fetchResults(query, format);
    }

    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('query').value;
        const format = document.getElementById('format').value;
        fetchResults(query, format);
    });
});

function fetchResults(query, format) {
    let url;
    if (format) {
        url = `https://www.loc.gov/${format}/?q=${encodeURIComponent(query)}&fo=json`;
    } else {
        url = `https://www.loc.gov/search/?q=${encodeURIComponent(query)}&fo=json`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.description ? result.description : 'No description available'}</p>
            <a href="${result.url}" target="_blank">Read More</a>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('query').value;
    var format = document.getElementById('format').value;
    var url = '/search-results.html?q=' + encodeURIComponent(query) + '&format=' + encodeURIComponent(format);
    location.assign(url);
});

function displaySearchHeader(query) {
    const resultsHeader = document.getElementById('results-header');
    resultsHeader.innerHTML = `<h2>Showing results for "${query}"</h2>`;
}

function goBack() {
    location.assign('index.html');
}