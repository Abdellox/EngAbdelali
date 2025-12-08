/**
 * ═══════════════════════════════════════════════════════════════════════
 * © 2025 Abdel Ali - All Rights Reserved
 * This project is part of Abdel Ali's portfolio
 * Unauthorized copying or distribution is prohibited
 * Contact: abdel.ali@example.com
 * ═══════════════════════════════════════════════════════════════════════
 */
// Mock weather data (in real app, use weather API)
const mockWeatherData = {
    'New York': { temp: 22, condition: 'Partly Cloudy', humidity: 65, wind: 12, icon: '⛅' },
    'London': { temp: 15, condition: 'Rainy', humidity: 80, wind: 18, icon: '🌧' },
    'Tokyo': { temp: 28, condition: 'Sunny', humidity: 55, wind: 8, icon: '☀' },
    'Paris': { temp: 18, condition: 'Cloudy', humidity: 70, wind: 10, icon: '☁' },
    'Sydney': { temp: 25, condition: 'Clear', humidity: 60, wind: 15, icon: '🌤' }
};

function searchWeather() {
    const city = document.getElementById('city').value;
    
    if (!city) {
        alert('Please enter a city name!');
        return;
    }
    
    // Simulate API call
    const weather = mockWeatherData[city] || {
        temp: Math.floor(Math.random() * 30) + 10,
        condition: 'Partly Cloudy',
        humidity: Math.floor(Math.random() * 40) + 40,
        wind: Math.floor(Math.random() * 20) + 5,
        icon: '⛅'
    };
    
    displayWeather(city, weather);
}

function displayWeather(city, weather) {
    document.getElementById('cityName').textContent = city;
    document.getElementById('weatherIcon').textContent = weather.icon;
    document.getElementById('temperature').textContent = weather.temp;
    document.getElementById('condition').textContent = weather.condition;
    document.getElementById('humidity').textContent = weather.humidity;
    document.getElementById('wind').textContent = weather.wind;
    
    document.getElementById('weatherDisplay').style.display = 'block';
    document.getElementById('welcomeMessage').style.display = 'none';
    
    // Generate forecast
    generateForecast();
}

function generateForecast() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const icons = ['☀', '⛅', '☁', '🌧', '🌤'];
    const forecast = document.getElementById('forecast');
    
    forecast.innerHTML = days.map((day, i) => {
        const temp = Math.floor(Math.random() * 15) + 15;
        return `
            <div class="forecast-day">
                <div>${day}</div>
                <div style="font-size: 2em">${icons[i]}</div>
                <div>${temp}°C</div>
            </div>
        `;
    }).join('');
}

function getLocation() {
    // Simulate getting location
    document.getElementById('city').value = 'New York';
    searchWeather();
}

document.getElementById('city').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

console.log('Weather App - Built by Abdel Ali');
