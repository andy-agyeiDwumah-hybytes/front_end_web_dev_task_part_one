// Import APIKEY
import APIKEY from "../../secretFile.js";

// URL and options
const url = "https://wordsapiv1.p.rapidapi.com/words/?random=true";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": APIKEY,
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  },
};

async function fetchRandomQuote(url, options, timeout = 5000) {
  try {
    // Create a timeout Promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );
    // If the fetch takes too long, time out. Else, fetch data as usual
    const response = await Promise.race([fetch(url, options), timeoutPromise]);
    // Check if response is valid
    if (!response.ok) {
      throw new Error("Error fetching the data.");
    }
    // Parse the JSON responses
    return response.json();
  } catch (e) {
    console.log("Error", e.message);
    return null;
  }
}

const updateUI = data => {
  const h2 = document.getElementById("word");
  const paragraph = document.getElementById("definition");

  if (!data) {
    // No data
    h2.textContent = "Error";
    paragraph.textContent = "Could not fetch a random word. Please try again.";
    return;
  }

  console.log(data);
  let word = data["word"] || "";
  let partOfSpeechExists = data?.results?.[0]?.["partOfSpeech"];
  let partOfSpeech = partOfSpeechExists
    ? `<span class="partOfSpeech">(${partOfSpeechExists})</span>`
    : "";
  let definition = data?.results?.[0]?.["definition"] || "";

  h2.innerHTML = `${word} ${partOfSpeech}`;
  paragraph.textContent = definition;
};

(async () => {
  const data = await fetchRandomQuote(url, options);
  updateUI(data);
})();
