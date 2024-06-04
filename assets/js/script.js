document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "YOUR_API_KEY_HERE";
    const searchForm = document.getElementById("searchForm");
    const queryInput = document.getElementById("query");
    const resultsContainer = document.getElementById("resultsContainer");
    const resultsHeader = document.getElementById("results-header");
    const results = document.getElementById("results");
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Function to fetch weather data
    async function fetchWeather(city) {
        try {
            const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
            const geoData = await geoResponse.json();
            if (!geoData.length) throw new Error("City not found");

            const { lat, lon } = geoData[0];
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();
            return weatherData;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again.");
        }
    }

    // Function to display weather data
    function displayWeather(data) {
        results.innerHTML = "";
        const city = data.city.name;
        const current = data.list[0];
        const forecast = data.list.filter((entry, index) => index % 8 === 0);

        resultsHeader.textContent = `Weather in ${city}`;
        
        const currentWeatherHTML = `
            <div class="result-item">
                <h3>Current Weather</h3>
                <p>Date: ${new Date(current.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: ${current.main.temp} °C</p>
                <p>Humidity: ${current.main.humidity} %</p>
                <p>Wind Speed: ${current.wind.speed} m/s</p>
                <p><img src="https://openweathermap.org/img/wn/${current.weather[0].icon}.png" alt="${current.weather[0].description}"></p>
            </div>
        `;

        const forecastHTML = forecast.map(entry => `
            <div class="result-item">
                <h3>${new Date(entry.dt * 1000).toLocaleDateString()}</h3>
                <p>Temperature: ${entry.main.temp} °C</p>
                <p>Humidity: ${entry.main.humidity} %</p>
                <p>Wind Speed: ${entry.wind.speed} m/s</p>
                <p><img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}.png" alt="${entry.weather[0].description}"></p>
            </div>
        `).join("");

        results.innerHTML = currentWeatherHTML + forecastHTML;
        resultsContainer.classList.remove("hidden");

        updateSearchHistory(city);
    }

    // Function to update search history
    function updateSearchHistory(city) {
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        }
        displaySearchHistory();
    }

    // Function to display search history
    function displaySearchHistory() {
        const historyContainer = document.getElementById("historyContainer");
        const historyList = searchHistory.map(city => `<button class="history-btn">${city}</button>`).join("");
        historyContainer.innerHTML = `<h3></h3>${historyList}`;
        document.querySelectorAll(".history-btn").forEach(btn => btn.addEventListener("click", (e) => {
            fetchWeather(e.target.textContent).then(data => displayWeather(data));
        }));
    }

    // Event listener for form submission
    searchForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const city = queryInput.value.trim();
        if (city) {
            const weatherData = await fetchWeather(city);
            if (weatherData) displayWeather(weatherData);
        }
    });

    displaySearchHistory();
});