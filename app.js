const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// selecting elements on the page
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// getting the movies from the api
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}
getMovies(API_URL);

function displayMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img src= " ${IMG_PATH + poster_path}" alt= "${title}" >
        <div class = "movie-info">
          <h3> ${title} </h3>
          <span class = " ${checkRatings(
            vote_average
          )} "> ${vote_average} </span>
        </div>
        <div class = 'overview'>
        <h3>Overview </h3>
        ${overview}
        </div>
    `;
    main.appendChild(movieEl);
  });
}

function checkRatings(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// getting movies based on serach
const hiddenSearch = document.querySelector(".hidden-search");
const span = document.querySelector(".hidden-search span");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchVal = search.value.trim();
  if (searchVal && searchVal !== "") {
    //search
    // show search value to the user
    span.textContent = searchVal;

    hiddenSearch.classList.add("show-search");

    getMovies(SEARCH_API + searchVal);
    search.value = "";
  } else {
    window.location.reload();
    // search an not be empty
  }
});
