// ACESS KEY //
const accessKey = "Nn1U5FTd-bo214B85610Y-K-aeuoof3tiaCemF8rlbc";

// INPUT //

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".grid");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// FUNCTION //

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("source");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);

    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}

// EVENT LISTNER //

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", (event) => {
  event.preventDefault();
  searchImages();
});
