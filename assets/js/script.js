document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "cf9f5a4f11d75beadd4a0347b0d11227"; // API key from OpenWeather
    const searchForm = document.getElementById("searchForm"); // Form for city search
    const queryInput = document.getElementById("query"); 
    const resultsContainer = document.getElementById("resultsContainer"); 
    const todayForecast = document.getElementById("todayForecast");
    const fiveDayForecast = document.getElementById("fiveDayForecast");
    const fiveDayForecastHeader = document.getElementById("fiveDayForecastHeader");
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Function to fetch weather data
    async function fetchWeather(city) {
        try {
            console.log(`Fetching geo data for city: ${city}`);
            const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
            const geoData = await geoResponse.json();
            console.log("Geo data:", geoData);

            if (!geoData.length) throw new Error("City not found"); // error message for if city is not found

            const { lat, lon } = geoData[0]; // gets the lon and lat of the city
            console.log(`Fetching weather data for lat: ${lat}, lon: ${lon}`);
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();
            console.log("Weather data:", weatherData);

            return weatherData;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please try again."); // alert for errors
        }
    }

    // function to display weather data
    function displayWeather(data) {
        todayForecast.innerHTML = "";
        fiveDayForecast.innerHTML = "";
        const city = data.city.name;
        const current = data.list[0];
    
        // Function to find the closest forecast entry to a specific hour (12:00 PM) did this to get as close to the high temp for the day
        function getClosestToNoon(entries) {
            return entries.reduce((closest, entry) => {
                const currentHour = new Date(entry.dt * 1000).getHours();
                return Math.abs(currentHour - 12) < Math.abs(new Date(closest.dt * 1000).getHours() - 12) ? entry : closest;
            });
        }
    
        // Gets unique days from the forecast data
        const uniqueDays = [...new Set(data.list.map(entry => new Date(entry.dt * 1000).toDateString()))];
    
        // Gets forecast data for the next 5 days starting from tomorrow
        const forecast = uniqueDays.slice(1, 6).map(day => {
            const dayEntries = data.list.filter(entry => new Date(entry.dt * 1000).toDateString() === day);
            return getClosestToNoon(dayEntries);
        });
    
        const headerHTML = `<div class="results-header">Weather in ${city}</div>`;
    
        const todayWeatherHTML = `
            <div class="forecast-item">
                <h3>Today's Weather</h3>
                <p><img src="https://openweathermap.org/img/wn/${current.weather[0].icon}.png" alt="${current.weather[0].description}"></p>
                <p>Date: ${new Date(current.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: ${current.main.temp} °F</p>
                <p>Humidity: ${current.main.humidity} %</p>
                <p>Wind Speed: ${current.wind.speed} m/s</p>
            </div>
        `;
    
        todayForecast.innerHTML = headerHTML + todayWeatherHTML; // displays today's weather
    
        fiveDayForecastHeader.innerHTML = "5-Day Forecast:"; // sets the header for the 5 day forecast
    
        const forecastHTML = forecast.map(entry => `
            <div class="forecast-item">
                <h3>${new Date(entry.dt * 1000).toLocaleDateString()}</h3>
                <p><img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}.png" alt="${entry.weather[0].description}"></p>
                <p>Temp: ${entry.main.temp} °F</p>
                <p>Humidity: ${entry.main.humidity} %</p>
                <p>Wind Speed: ${entry.wind.speed} m/s</p>
            </div>
        `).join("");
    
        fiveDayForecast.innerHTML = forecastHTML; // displays 5-day forecast 
        resultsContainer.classList.remove("hidden");
    
        updateSearchHistory(city); // calls function to add latest city to history
    }

    // Function to update search history
    function updateSearchHistory(city) {
        if (!searchHistory.includes(city)) {
            searchHistory.push(city); // adds city to search history if not already present
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); // saves to localstorage
        }
        displaySearchHistory(); // displays the updated search history
    }

    // Function to display search history
    function displaySearchHistory() {
        const historyContainer = document.getElementById("historyContainer");
        const historyList = searchHistory.map(city => `<button class="history-btn">${city}</button>`).join("");
        historyContainer.innerHTML = `<h3>Search History</h3>${historyList}`;
        document.querySelectorAll(".history-btn").forEach(btn => btn.addEventListener("click", (e) => {
            fetchWeather(e.target.textContent).then(data => displayWeather(data)); // Fetches and displays weather data when a history button is clicked
        }));
    }

    // Event listener for form submission
    searchForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const city = queryInput.value.trim(); // gets city name from input
        if (city) {
            const weatherData = await fetchWeather(city); //fetches weather data for the city
            if (weatherData) displayWeather(weatherData); // displays if fetched correctly
        }
    });

    displaySearchHistory(); //displays search history on page load
});