import APIKEY from "../../secretFile.js";

$(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    // Remove white leading or trailing white space
    const cityName = $("#searchInput").val().trim();
    // Show loading message while fetching data
    $("#results").html("<p class='loading-paragraph'>Loading...</p>");
    getWeatherData(cityName);
    resetForm();
  });
});

function resetForm() {
  $("#form")[0].reset();
  $("#searchInput").focus();
}

function getWeatherData(cityName) {
  $.ajax({
    url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`,
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      "X-RapidAPI-Key": APIKEY,
    },
    success: function (data) {
      displayWeatherData(data, cityName);
    },
    error: function () {
      displayError();
    },
    timeout: 10000,
  });
}

function displayError() {
  const errorMessage =
    "City not found or there was a problem. Please try again.";

  $("#results").html(`<p class="error">${errorMessage}</p>`);
}

function sortData(locationData, currentData) {
  const noData = "N/A";

  const locationName = locationData?.["name"] || noData;
  const locationCountry = locationData?.["country"] || noData;
  const locationLocalTimeExists = locationData?.["localtime"] || "";
  const localTime = locationLocalTimeExists
    ? locationLocalTimeExists.split(" ")[1]
    : noData;

  const lastUpdatedExists = currentData?.["last_updated"] || "";
  const lastUpdated = lastUpdatedExists
    ? lastUpdatedExists.split(" ")[1]
    : noData;

  const tempCExists = currentData?.["temp_c"] ? currentData["temp_c"] : "";
  const tempC = tempCExists ? Math.round(tempCExists) : noData;
  const tempFExists = currentData?.["temp_f"] ? currentData["temp_f"] : "";
  const tempF = tempFExists ? Math.round(tempFExists) : noData;

  const windMphExists = currentData?.["wind_mph"]
    ? currentData["wind_mph"]
    : "";
  const windMph = windMphExists ? Math.round(windMphExists) : noData;
  const windDirection = currentData?.["wind_dir"] || noData;
  const windKphExists = currentData?.["wind_kph"]
    ? currentData["wind_kph"]
    : "";
  const windKph = windKphExists ? Math.round(windKphExists) : noData;

  const currentCondition = currentData?.["condition"]?.["text"]
    ? currentData["condition"]["text"]
    : noData;

  return [
    locationName,
    locationCountry,
    localTime,
    lastUpdated,
    tempC,
    tempF,
    windMph,
    windDirection,
    windKph,
    currentCondition
  ]
}

function displayWeatherData(data, cityName) {
  // Returns an object with two keys
  const locationData = data?.["location"];
  const currentData = data?.["current"];
  // Check if keys exist
  if (locationData && currentData) {
    const [
      locationName,
      locationCountry,
      localTime,
      lastUpdated,
      tempC,
      tempF,
      windMph,
      windDirection,
      windKph,
      currentCondition
    ] = sortData(locationData, currentData);
  
    $("#results").html(`
            <div id="results-data-container">
            <div id="location-data">
                <h2>${locationName} | ${locationCountry}</h2>
                <p>Local time: ${localTime}</p>
                <p>Last updated: ${lastUpdated}</p>
                <p>${currentCondition}</p>
            </div>
            <div id="temp-wind-data-container">
                <div id="temperature-data">
                    <h3>Temperature <i class="fa-solid fa-temperature-three-quarters"></i></h3>
                    <p>Celsius: ${tempC}<span class="symbol-sup">&#8451;</span></p>
                    <p>Fahrenheit: ${tempF}<span class="symbol-sup">&#8457;</span></p>
                </div>
                <div id="wind-data">
                    <h3>Wind <i class="fa-solid fa-wind"></i></h3>
                    <p>${windMph} <sup class="symbol-sup">MPH</sup></p>
                    <p>${windKph} <sup class="symbol-sup">KPH</sup></p>
                    <p>${windDirection} <sup class="symbol-sup">DIRECTION</sup></p>
                </div>
            </div>
            </div>
                `);
  } else {
    $("results").html(`<p>No weather data available for ${cityName}</p>`);
  }
}

// results.location
// name: London
// country: United Kingdom
// localtime: "2024-11-26 18:31"

// results.current
// last_updated:"2024-11-26 18:30"
// temp_c: 5.4
// temp_f: 41.7
// wind_mph: 3.1
// wind_dir:"SSW"
// wind_kph:5

// results.current.condition
// text: clear