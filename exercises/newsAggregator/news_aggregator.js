import APIKEY from "../../secretFile.js";

const countryCode = "US";  // Can edit
const limitHeadlines = 20;

$(function () {
    $("header > h1").html(`Latest News Headlines/Top Stories (${countryCode})`);
    getNewsTopHeadlines();
});

function getNewsTopHeadlines() {
  $.ajax({
    url: `https://real-time-news-data.p.rapidapi.com/top-headlines?limit=${limitHeadlines}&country=${countryCode}&lang=en`,
    method: "GET",
    headers: {
      "x-rapidapi-key": APIKEY,
      "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
    },
    success: function (data) {
      displayNewsTopHeadlines(data);
    },
    error: function () {
      displayError();
    },
    timeout: 10000,
  });
}

function displayNewsTopHeadlines(data) {
  // Returns an object with data array
  const resultsData = data?.data;
  const $ul = $("#results > ul");
  // Check if keys exist
  if (resultsData && resultsData.length > 0) {
    resultsData.forEach(newsItem => {
      const title = newsItem?.["title"]
        ? `<h2><strong>${newsItem["title"]}</strong></h2>`
        : "";
      const link = newsItem?.["link"]
        ? `<p><a href="${newsItem["link"]}" target="_blank">See article</a></p>`
        : "";
      const photoUrl = newsItem?.["photo_url"] ? newsItem["photo_url"] : "";
      const sourceName = newsItem?.["source_name"]
        ? `<p class="source-name">${newsItem["source_name"]}</p>`
        : "";

      const $linkSourceNameContainer = $("<div>").addClass("linkSourceNameContainer");

      $linkSourceNameContainer.append(link, sourceName);
      const $photoContainerDiv = $("<div>")
        .addClass("photo-container")
        .append(title, $linkSourceNameContainer);
      
      // Dynamically set the background image of each news item
      $photoContainerDiv[0].style.setProperty(
        "--background-image",
        `url('${photoUrl}')`
      );
        $ul.append($("<li>").append($photoContainerDiv));
    });

    $("p.loading-paragraph").hide();
  } else {
    $("p.loading-paragraph").html("No data available");
  }
}

function displayError() {
  $("p.loading-paragraph").html(
    "An error occurred while fetching the news. Please try again."
  );
}

// Endpoint: Top Headlines
// results.data[]
    // results.data["title"]
    // results.data["link"]
    // results.data["photo_url"]
    // results.data["source_name"]