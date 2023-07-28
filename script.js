"use strict";

let cityData = [];

// Define the overlay variable in the global scope
const overlay = document.querySelector('.image-overlay'); // Target the .image-overlay div

// Define a mapping of weather conditions to background colors
const weatherColors = {
  'Sunny': ['140deg', '#f7f3ae', '#84b3fa'], // Gold gradient for sunny
  'Partly cloudy': ['140deg', '#f8faa0', '#7592b9'], // Sky Blue gradient for partly cloudy
  'Overcast': ['140deg', '#f8faa0', '#506683'], // Gray gradient for overcast
  'Mist': ['140deg', '#B0E0E6', '#F0F8FF'], // Powder Blue gradient for mist
  'Patchy rain possible': ['140deg', '#b3d2fa', '#506683'], // Some color gradient for patchy rain possible
  'Patchy snow possible': ['140deg', '#b3d2fa', '#506683'], // White gradient for patchy snow possible
  'Patchy sleet possible': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy sleet possible
  'Patchy freezing drizzle possible': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy freezing drizzle possible
  'Thundery outbreaks possible': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for thundery outbreaks possible
  'Blowing snow': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for blowing snow
  'Blizzard': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for blizzard
  'Fog': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for fog
  'Freezing fog': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for freezing fog
  'Patchy light drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light drizzle
  'Light drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light drizzle
  'Freezing drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for freezing drizzle
  'Heavy freezing drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for heavy freezing drizzle
  'Patchy light rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light rain
  'Light rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light rain
  'Moderate rain at times': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate rain at times
  'Moderate rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate rain
  'Heavy rain at times': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for heavy rain at times
  'Heavy rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for heavy rain
  'Moderate or heavy snow with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy snow with thunder
  'Patchy light snow with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light snow with thunder
  'Moderate or heavy showers of ice pellets': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy showers of ice pellets
  'Light showers of ice pellets': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light showers of ice pellets
  'Light rain shower': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light rain shower
  'Moderate or heavy rain shower': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy rain shower
  'Torrential rain shower': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for torrential rain shower
  'Light sleet showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light sleet showers
  'Moderate or heavy sleet showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy sleet showers
  'Light snow showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light snow showers
  'Moderate or heavy snow showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy snow showers
  'Light showers of ice pellets': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light showers of ice pellets
  'Moderate or heavy showers of ice pellets': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy showers of ice pellets
  'Patchy light rain with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light rain with thunder
  'Moderate or heavy rain with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy rain with thunder
  'Patchy light snow with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light snow with thunder
  'Moderate or heavy snow with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy snow with thunder
};


// Define a mapping of weather codes to weather icons
const weatherIcons = {
  1000: 'clear-day.svg',
  1003: 'cloudy.svg',
  1006: 'cloudy.svg',
  1009: 'cloudy.svg',
  1030: 'mist.svg',
  1063: 'rainy-3.svg',
  1066: 'snowy-3.svg',
  1069: 'rain-and-snow-mix.svg',
  1072: 'rain-and-sleet-mix.svg',
  1087: 'thunderstorms.svg',
  1114: 'wind.svg',
  1117: 'wind.svg',
  1135: 'fog.svg',
  1147: 'fog.svg',
  1150: 'rainy-3.svg',
  1153: 'rainy-3.svg',
  1168: 'rainy-3.svg',
  1171: 'rain-and-sleet-mix.svg',
  1180: 'rainy-3.svg',
  1183: 'rainy-3.svg',
  1186: 'rainy-3.svg',
  1189: 'rainy-3.svg',
  1192: 'rainy-3.svg',
  1195: 'rainy-3.svg',
  1198: 'rain-and-sleet-mix.svg',
  1201: 'rain-and-sleet-mix.svg',
  1204: 'rain-and-snow-mix.svg',
  1207: 'rain-and-snow-mix.svg',
  1210: 'snowy-3.svg',
  1213: 'snowy-3.svg',
  1216: 'snowy-3.svg',
  1219: 'snowy-3.svg',
  1222: 'snowy-3.svg',
  1225: 'snowy-3.svg',
  1237: 'hail.svg',
  1240: 'rainy-3.svg',
  1243: 'rainy-3.svg',
  1246: 'rainy-3.svg',
  1249: 'rain-and-snow-mix.svg',
  1252: 'rain-and-snow-mix.svg',
  1255: 'snowy-3.svg',
  1258: 'snowy-3.svg',
  1261: 'hail.svg',
  1264: 'hail.svg',
  1273: 'thunderstorms.svg',
  1276: 'thunderstorms.svg',
  1279: 'thunderstorms.svg',
  1282: 'thunderstorms.svg',
};

// Function to set the background color overlay based on the weather condition
function setBackgroundFromWeather(weatherCondition) {
  // Get the gradient colors based on the weather condition
  const gradientColors = weatherColors[weatherCondition] || ['135deg', '#222', 'rgba(0, 0, 0, 0.5)'];

  // Set the background color of the overlay based on the weather condition
  overlay.style.background = `linear-gradient(${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`;
}

// Function to fetch weather data from your Express server
async function getWeatherData(city) {
  try {
    const response = await fetch(`http://localhost:5500/weather?city=${city}`);
    const data = await response.json();

    console.log(data);

    // Extract the weather condition and code from the data
    const weatherCondition = data.current.condition.text;
    const weatherCode = data.current.condition.code;

    // Log the weather condition and code to the console
    console.log('Weather condition:', weatherCondition);
    console.log('Weather code:', weatherCode);

    // Set the background color based on the weather condition
    setBackgroundFromWeather(weatherCondition);

    // Update the element's innerHTML
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.current.wind_kph) + " km/h";
    document.querySelector(".feelslike").innerHTML ="Feels like: " + Math.round(data.current.feelslike_c);
    document.querySelector(".localdate").innerHTML = data.location.localtime;

    // Load the local JSON data from weather_conditions.json
    const responseJson = await fetch('weather_conditions.json');
    const weatherData = await responseJson.json();

    // Find the matching code for the current weather condition
    let code;
    for (const weather of weatherData) {
      if (weather.day === weatherCondition || weather.night === weatherCondition) {
        code = weather.code;
        break;
      }
    }

    // Set weather icon based on the matching code
    const weatherIcon = weatherIcons[code];
    if (weatherIcon) {
      document.querySelector(".weather-icon").src = `animated/${weatherIcon}`;
    } else {
      // Default to some fallback icon if no match is found
      document.querySelector(".weather-icon").src = "animated/default-icon.svg";
    }
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
  }
}

// Call the function to fetch weather data for a specific city (initially Paris)
getWeatherData('Copenhagen'); // Replace 'Paris' with the desired city name


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const suggestionList = document.querySelector(".suggestion-list");
const dialogBox = document.querySelector(".dialog-box");

// Load the cities.json data
fetch("cities.json")
  .then((response) => response.json())
  .then((data) => {
    cityData = data;
  })
  .catch((error) => console.error("Failed to load cities.json:", error));

// Function to filter the cities based on the search input
function filterCities(searchText) {
  return cityData.filter((city) =>
    city.name.toLowerCase().startsWith(searchText.toLowerCase())
  );
}

// Function to display the city name suggestions in the dialog box
function displaySuggestions(suggestions) {
  dialogBox.innerHTML = ""; // Clear existing suggestions

  for (let i = 0; i < Math.min(5, suggestions.length); i++) {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion");
    suggestionItem.textContent = suggestions[i].name;

    // Add a class if the city name is too long
    if (suggestions[i].name.length > 15) {
      suggestionItem.classList.add("long-city");
    }

    suggestionItem.addEventListener("click", () => {
      const cityName = suggestions[i].name;
      searchBox.value = cityName;
      dialogBox.innerHTML = ""; // Clear the suggestions after selection
      dialogBox.style.display = "none"; // Hide the dialog box after selection
      getWeatherData(cityName); // Fetch weather data for the selected city

      // Clear the search input after selection
      searchBox.value = "";
    });

    dialogBox.appendChild(suggestionItem);
  }
}


// Event listener for clicking the search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city.trim() !== "") {
    getWeatherData(city);
    suggestionList.innerHTML = ""; // Clear suggestions after search
  }
});

// Event listener for clicking the search button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city.trim() !== "") {
    getWeatherData(city);
    dialogBox.innerHTML = ""; // Clear suggestions after search
  }
});

// Event listener for typing in the search input
searchBox.addEventListener("input", () => {
  const searchText = searchBox.value.trim();
  if (searchText !== "") {
    const filteredCities = filterCities(searchText);
    displaySuggestions(filteredCities);
    dialogBox.style.display = "block"; // Show the dialog box
  } else {
    dialogBox.style.display = "none"; // Hide the dialog box if search box is empty
  }
});

// Event listener for pressing Enter in the search input
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const city = searchBox.value;
    if (city.trim() !== "") {
      getWeatherData(city);
      dialogBox.innerHTML = ""; // Clear suggestions after search
    }
  }
});

// Event listener for clicking anywhere on the document
document.addEventListener("click", (event) => {
  // Check if the click target is inside the dialog box
  if (!dialogBox.contains(event.target)) {
    // If the click is outside the dialog box, hide the dialog box
    dialogBox.style.display = "none";
  }
});
