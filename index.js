const searchBtn = document.getElementById("searchBtn");
const filmWrapper = document.getElementById("filmWrapper");

searchBtn.addEventListener("click", async function(e) {
    e.preventDefault();
    const htmlOutput = await getData();

    if (htmlOutput === Error) {
        filmWrapper.innerHTML = `
            <p class="err-message" role="alert">Unable to find what you're looking for. Please try another search.</p>
        `
    }
    else {
        filmWrapper.classList.remove("default-center");
        filmWrapper.innerHTML = htmlOutput;
     }
})

async function getData() {

    // Gets list of movies that matches the search input
    const searchInput = document.getElementById("searchInput").value;
    const searchMovies = await fetch(`http://www.omdbapi.com/?apikey=49133b6f&s=${searchInput}&type=movie`);
    const searchData = await searchMovies.json();
    
    if (!searchData.Search) {
        return Error;
    }

    // Gets specific movie details that are missing from the previous fetch response.    
    //  Same as searchMovies.Search array but, this time not just basic data, the whole details of each movie.

    const searchMoviesDetailed = searchData.Search.map(movie => {
        return fetch(`http://www.omdbapi.com/?apikey=49133b6f&i=${movie.imdbID}&type=movie`)
            .then(response => response.json())
    }) 
    console.log(searchMoviesDetailed); // Displays Promises as an array

    const movies = await Promise.all(searchMoviesDetailed) // Solves the Promises as an array issue and will display the actual data.
    // console.log(movies);

    return await renderMovies(movies);
}

function renderMovies(moviesArr) {
    console.log(moviesArr);
    const htmlOutput = moviesArr.map(movie => {
        return `
            <div class="movie-container">
                <img class="movie-poster" src="${movie.Poster}" alt=""/>
                <div class="movie-details">
                    <div class="flex">
                        <h2 class="movie-title">${movie.Title}</h2>
                        <div class="movie-rating">${movie.imdbRating}</div>
                    </div>
                    <div class="movie-rt-g-w flex">
                        <div class="movie-runtime">${movie.Runtime}</div>
                        <div class="movie-genre">${movie.Genre}</div>
                        <div class="add-movie-to-watchlist"> 
                            <i class="fa-solid fa-circle-plus"></i>
                            Watchlist
                        </div>
                    </div>
                    <div class="movie-plot">${movie.Plot}</div>
                </div>
            </div>
        `
        }).join('');
    console.log(htmlOutput);;

    return htmlOutput;
}