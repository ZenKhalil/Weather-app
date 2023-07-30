"use strict";

let cityData = [];

// Define the overlay variable in the global scope
const overlay = document.querySelector('.image-overlay'); // Target the .image-overlay div

// Define a mapping of weather conditions to background colors
const weatherColors = {
  'clear sky': ['140deg', '#f7f3ae', '#84b3fa'], // Gold gradient for clear sky
  'few clouds': ['140deg', '#f8faa0', '#7592b9'], // Sky Blue gradient for few clouds
  'scattered clouds': ['140deg', '#f8faa0', '#506683'], // Gray gradient for scattered clouds
  'broken clouds': ['140deg', '#f8faa0', '#506683'], // Gray gradient for broken clouds
  'overcast clouds': ['140deg', '#f8faa0', '#506683'], // Gray gradient for overcast clouds
  'mist': ['140deg', '#B0E0E6', '#F0F8FF'], // Powder Blue gradient for mist
  'patchy rain possible': ['140deg', '#b3d2fa', '#506683'], // Some color gradient for patchy rain possible
  'patchy snow possible': ['140deg', '#b3d2fa', '#506683'], // White gradient for patchy snow possible
  'patchy sleet possible': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy sleet possible
  'patchy freezing drizzle possible': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy freezing drizzle possible
  'thundery outbreaks possible': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for thundery outbreaks possible
  'blowing snow': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for blowing snow
  'blizzard': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for blizzard
  'freezing fog': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for freezing fog
  'patchy light drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light drizzle
  'light drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light drizzle
  'freezing drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for freezing drizzle
  'heavy freezing drizzle': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for heavy freezing drizzle
  'patchy light rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light rain
  'light rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light rain
  'moderate rain at times': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate rain at times
  'moderate rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate rain
  'heavy rain at times': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for heavy rain at times
  'heavy rain': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for heavy rain
  'moderate or heavy snow with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy snow with thunder
  'patchy light snow with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light snow with thunder
  'moderate or heavy showers of ice pellets': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy showers of ice pellets
  'light showers of ice pellets': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light showers of ice pellets
  'light rain shower': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light rain shower
  'moderate or heavy rain shower': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy rain shower
  'torrential rain shower': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for torrential rain shower
  'light sleet showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light sleet showers
  'moderate or heavy sleet showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy sleet showers
  'light snow showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for light snow showers
  'moderate or heavy snow showers': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for moderate or heavy snow showers
  'patchy light rain with thunder': ['140deg', '#f7f3ae', '#84b3fa'], // White gradient for patchy light rain with thunder
  'moderate or heavy rain with thunder': ['140deg', '#cfcfa6', '#2f2d52'], // White gradient for moderate or heavy rain with thunder
};


// Define a mapping of weather codes to weather icons
const weatherIcons = {
  200: 'thunderstorms.svg', // Thunderstorm with light rain
  201: 'thunderstorms.svg', // Thunderstorm with rain
  202: 'thunderstorms.svg', // Thunderstorm with heavy rain
  210: 'thunderstorms.svg', // Light thunderstorm
  211: 'thunderstorms.svg', // Thunderstorm
  212: 'thunderstorms.svg', // Heavy thunderstorm
  221: 'thunderstorms.svg', // Ragged thunderstorm
  230: 'thunderstorms.svg', // Thunderstorm with light drizzle
  231: 'thunderstorms.svg', // Thunderstorm with drizzle
  232: 'thunderstorms.svg', // Thunderstorm with heavy drizzle
  300: 'rainy-3.svg', // Light intensity drizzle
  301: 'rainy-3.svg', // Drizzle
  302: 'rainy-3.svg', // Heavy intensity drizzle
  310: 'rainy-3.svg', // Light intensity drizzle rain
  311: 'rainy-3.svg', // Drizzle rain
  312: 'rainy-3.svg', // Heavy intensity drizzle rain
  313: 'rainy-3.svg', // Shower rain and drizzle
  314: 'rainy-3.svg', // Heavy shower rain and drizzle
  500: 'rainy-3.svg', // Light rain
  501: 'rainy-3.svg', // Moderate rain
  502: 'rainy-3.svg', // Heavy intensity rain
  503: 'rainy-3.svg', // Very heavy rain
  504: 'rainy-3.svg', // Extreme rain
  511: 'rain-and-snow-mix.svg', // Freezing rain
  520: 'rainy-3.svg', // Light intensity shower rain
  521: 'rainy-3.svg', // Shower rain
  522: 'rainy-3.svg', // Heavy intensity shower rain
  531: 'rainy-3.svg', // Ragged shower rain
  600: 'snowy-3.svg', // Light snow
  601: 'snowy-3.svg', // Snow
  602: 'snowy-3.svg', // Heavy snow
  611: 'rain-and-sleet-mix.svg', // Sleet
  612: 'rain-and-sleet-mix.svg', // Light shower sleet
  613: 'rain-and-sleet-mix.svg', // Shower sleet
  615: 'rain-and-snow-mix.svg', // Light rain and snow
  616: 'rain-and-snow-mix.svg', // Rain and snow
  620: 'snowy-3.svg', // Light shower snow
  621: 'snowy-3.svg', // Shower snow
  622: 'snowy-3.svg', // Heavy shower snow
  701: 'mist.svg', // Mist
  711: 'fog.svg', // Smoke
  721: 'mist.svg', // Haze
  731: 'fog.svg', // Dust
  741: 'fog.svg', // Fog
  751: 'fog.svg', // Sand
  761: 'fog.svg', // Dust
  762: 'fog.svg', // Ash
  771: 'fog.svg', // Squall
  781: 'thunderstorms.svg', // Tornado
  800: 'clear-day.svg', // Clear sky
  801: 'cloudy.svg', // Few clouds
  802: 'cloudy.svg', // Scattered clouds
  803: 'cloudy.svg', // Broken clouds
  804: 'cloudy.svg', // Overcast clouds
};


// Function to set the background color overlay based on the weather condition
function setBackgroundFromWeather(weatherCondition) {
  // Get the gradient colors based on the weather condition
  const gradientColors = weatherColors[weatherCondition] || ['135deg', '#222', 'rgba(0, 0, 0, 0.5)'];

  // Set the background color of the overlay based on the weather condition
  overlay.style.background = `linear-gradient(${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`;
}

 // Function to fetch weather data from the API (replace YOUR_API_KEY with your actual API key)
async function getWeatherData(city) {
  const apiKey = 'f53e0ec50152dd5a70d44e0861f45568'; // Replace this with your valid API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);

   // Extract the weather condition and code from the data
   const weatherCode = data.weather[0].id;
   const weatherCondition = data.weather[0].description;
   
    // Log the weather condition and code to the console
    console.log('Weather condition:', weatherCondition);
    console.log('Weather code:', weatherCode);

    // Set the background color based on the weather condition
    setBackgroundFromWeather(weatherCondition);

    // Update the element's innerHTML
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
    document.querySelector(".feelslike").innerHTML ="Feels like: " + Math.round(data.main.feels_like);

// Extract the timezone offset in seconds
const timezoneOffsetSeconds = data.timezone;

// Get the current UTC timestamp in milliseconds
const currentUTCTimestamp = Date.now();

// Calculate the local time in milliseconds
const localTimestamp = currentUTCTimestamp + timezoneOffsetSeconds * 1000;

// Create a new Date object for the local time
const localDate = new Date(localTimestamp);

// Format the local date as "YYYY-MM-DD"
const localDateString = localDate.toISOString().slice(0, 10);

// Format the local time as "HH:mm"
const localTimeString = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Combine the date and time strings
const localDateTimeString = `${localDateString} ${localTimeString}`;

// Update the element's innerHTML with the formatted local date and time
document.querySelector(".localdate").innerHTML = localDateTimeString;

// Load the local JSON data from weather_conditions.json
    const responseJson = await fetch('weather_conditions.json');
    const weatherData = await responseJson.json();

    // Find the matching weather data for the current weather code
    let matchingWeather = weatherData.find((weather) => weather.code === weatherCode);

    // Set weather icon based on the matching code
    if (matchingWeather) {
      const weatherIcon = weatherIcons[matchingWeather.code];
      if (weatherIcon) {
        document.querySelector(".weather-icon").src = `animated/${weatherIcon}`;
      } else {
        // Default to some fallback icon if no match is found
        document.querySelector(".weather-icon").src = "animated/default-icon.svg";
      }
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
  return cityData.filter((city) => {
    const cityName = city.name.toLowerCase();
    const countryInitials = city.country;
    const searchInput = searchText.toLowerCase();
    return cityName.startsWith(searchInput) || countryInitials.toLowerCase().startsWith(searchInput);
  });
}

// Function to display the city name suggestions in the dialog box
function displaySuggestions(suggestions) {
  dialogBox.innerHTML = ""; // Clear existing suggestions

  for (let i = 0; i < Math.min(5, suggestions.length); i++) {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion");

    const cityName = suggestions[i].name;
    const countryInitials = suggestions[i].country;

    // Create a span element for the city name
    const cityNameSpan = document.createElement("span");
    cityNameSpan.textContent = cityName;

    // Create a span element for the country initials
    const countryInitialsSpan = document.createElement("span");
    countryInitialsSpan.textContent = `, ${countryInitials}`;
    countryInitialsSpan.classList.add("country-initials");

    // Add a class if the city name is too long
    if (cityName.length > 15) {
      cityNameSpan.classList.add("long-city");
    }

    // Append the spans to the suggestionItem
    suggestionItem.appendChild(cityNameSpan);
    suggestionItem.appendChild(countryInitialsSpan);

    suggestionItem.addEventListener("click", () => {
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
