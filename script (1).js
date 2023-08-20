// Replace with your API key and API endpoint
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

async function fetchWeatherData(city) {
    const response = await fetch(`${apiUrl}/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

async function fetchForecastData(city) {
    const response = await fetch(`${apiUrl}/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data.list;
}

function displayCurrentWeather(weatherData) {
    const currentTempElement = document.getElementById('current-temp');
    const currentDescriptionElement = document.getElementById('current-description');

    currentTempElement.textContent = weatherData.main.temp;
    currentDescriptionElement.textContent = weatherData.weather[0].description;
}

function displayForecast(forecastData) {
    const forecastList = document.getElementById('forecast-list');

    forecastList.innerHTML = '';

    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        const temp = item.main.temp.toFixed(1);

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${day}, ${time}</span>
            <span>${temp}°C</span>
        `;

        forecastList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const city = 'YourCityName'; // Replace with the desired city name
    const currentWeather = await fetchWeatherData(city);
    const forecastData = await fetchForecastData(city);

    displayCurrentWeather(currentWeather);
    displayForecast(forecastData);
});
