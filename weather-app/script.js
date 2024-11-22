document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const termperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_key = "34ddc6a53e84fe650516b1b3101a0e2e";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error(error); // Log the error for debugging
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;

    const response = await fetch(url);
    console.log("RESPONSE: ", response);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;

    // Update UI
    cityNameDisplay.textContent = name;
    termperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Description: ${weather[0].description}`;

    // Show weather info and hide error message
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    // Show error message and hide weather info
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
