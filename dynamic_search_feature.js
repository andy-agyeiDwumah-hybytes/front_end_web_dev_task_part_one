import APIKEY from "./secretFile.js";

$(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    // Remove white leading or trailing white space
    const word = $("#searchInput").val().trim();
    resetForm();
    // Show loading message while fetching data
    $("#results").html("<p class='loading-paragraph'>Loading...</p>");
    getWordDefinitions(word);
  });
});

function resetForm() {
  $("#form")[0].reset();
  // Focus back on search input when form has been submitted
  $("#searchInput").focus();
}

function getWordDefinitions(word) {
  $.ajax({
    url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
      "X-RapidAPI-Key": APIKEY,
    },
    success: function (data) {
      displayWordResults(data);
    },
    error: function () {
      displayError();
    },
  });
}

function displayError() {
  const errorMessage =
    "Oops! Something went wrong. Please check your API key, " +
    "ensure the word exists, or try again later in case of a network issue.";
  $("#results").html(`<p class="error">${errorMessage}</p>`);
}

function displayWordResults(data) {
  // Returns an array of definitions and partOfSpeech
  const definitionsArr = data?.definitions;
  const userWord = data.word;
  let definitions = "";
  // Check if definitions array exists within data
  if (definitionsArr) {
    definitionsArr.map(result => {
      let partOfSpeech = result?.["partOfSpeech"]
        ? `<h3 class="capitalise">${result["partOfSpeech"]}</h3>`
        : "";
      let definition = result?.["definition"]
        ? `<p class="capitalise">${result["definition"]}</p>`
        : "";

      definitions += `<li>${partOfSpeech}${definition}</li>`;
    });

    $("#results").html(`
            <h2>Results for <span class="capitalise">"${userWord}"</span>:</h2>
            <ul>${definitions}</ul>
        `);
  } else {
    $("results").html(`<p>No word definitions available for ${userWord}</p>`);
  }
}
