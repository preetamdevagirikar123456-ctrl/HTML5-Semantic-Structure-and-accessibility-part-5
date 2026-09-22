// =========================================
// WEATHER DASHBOARD - TASK 4
// STEP 3 - API CONNECTION
// =========================================

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

const weatherMessage = document.getElementById("weatherMessage");
const weatherResult = document.getElementById("weatherResult");

const weatherCity = document.getElementById("weatherCity");
const weatherTime = document.getElementById("weatherTime");
const weatherCondition = document.getElementById("weatherCondition");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

// Fetch weather data for a city
async function getWeather(city) {

    const geocodingURL =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const locationResponse = await fetch(geocodingURL);

    if (!locationResponse.ok) {
        throw new Error("Unable to find the city.");
    }

    const locationData = await locationResponse.json();

    if (!locationData.results || locationData.results.length === 0) {
        throw new Error("City not found. Please enter a valid city name.");
    }

    const location = locationData.results[0];

    const weatherURL =
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`;

    const weatherResponse = await fetch(weatherURL);

    if (!weatherResponse.ok) {
        throw new Error("Unable to retrieve weather data.");
    }

    const weatherData = await weatherResponse.json();

    return {
        city: location.name,
        country: location.country,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,
        time: weatherData.current.time
    };
}

function getWeatherCondition(code) {

    if (code === 0) {
        return "Clear sky";
    }

    if (code === 1 || code === 2 || code === 3) {
        return "Partly cloudy";
    }

    if (code === 45 || code === 48) {
        return "Fog";
    }

    if (code >= 51 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain showers";
    }

    if (code >= 85 && code <= 86) {
        return "Snow showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Unknown";
}

weatherForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        weatherMessage.style.display = "block";
        weatherMessage.textContent = "Please enter a city name.";
        cityInput.focus();
        return;
    }

    const searchButton = weatherForm.querySelector("button[type='submit']");

    searchButton.disabled = true;
    searchButton.textContent = "Loading...";

    weatherMessage.style.display = "block";
    weatherMessage.textContent = "Loading weather data...";

    weatherResult.style.display = "none";

    try {

        const weather = await getWeather(city);

        weatherCity.textContent =
            `${weather.city}, ${weather.country}`;

        weatherTime.textContent =
            `Last updated: ${weather.time.replace("T", " ")}`;

        weatherCondition.textContent =
    getWeatherCondition(weather.weatherCode);

        temperature.textContent =
            `${weather.temperature} °C`;

        humidity.textContent =
            `${weather.humidity} %`;

        windSpeed.textContent =
            `${weather.windSpeed} km/h`;

        weatherMessage.textContent =
            "Weather data loaded successfully.";

        weatherResult.style.display = "block";

    } catch (error) {

        weatherMessage.textContent =
            error.message;

        weatherResult.style.display = "none";

    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search Weather";

    }
});