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


filmWrapper.addEventListener("click", async function(e) {
        console.log(e);
        if(!e.target.parentElement.dataset.id) 
        {
            console.error("Not a valid click to be added to watchlist");
        }
        else {
            await fetch(`https://www.omdbapi.com/?apikey=49133b6f&i=${e.target.parentElement.dataset.id}&type=movie`)
            .then(response => response.json())
            .then(function(movie) {
                localStorage.setItem(`${movie.imdbID}`, JSON.stringify(movie))
            });
            console.log(localStorage.getItem(`${e.target.parentElement.dataset.id}`));
            e.target.parentElement.innerHTML = `
            <i class="fa-solid fa-check"></i>
            <span class="movie-added">Added</span>
            `
        }
    
})


async function getData() {

    // Gets list of movies that matches the search input
    const searchInput = document.getElementById("searchInput").value;
    const searchMovies = await fetch(`https://www.omdbapi.com/?apikey=49133b6f&s=${searchInput}&type=movie`);
    const searchData = await searchMovies.json();
    
    if (!searchData.Search) {
        return Error;
    }

    // Gets specific movie details that are missing from the previous fetch response.    
    //  Same as searchMovies.Search array but, this time not just basic data, the whole details of each movie.

    const searchMoviesDetailed = searchData.Search.map(movie => {
        return fetch(`https://www.omdbapi.com/?apikey=49133b6f&i=${movie.imdbID}&type=movie`)
            .then(response => response.json())
    }) 
    // console.log(searchMoviesDetailed); // Displays Promises as an array

    const movies = await Promise.all(searchMoviesDetailed) // Solves the Promises as an array issue and will display the actual data.
     console.log(movies);

    return await renderMovies(movies);
}

function renderMovies(moviesArr) {
    // console.log(moviesArr);
    const htmlOutput = moviesArr.map(movie => {
        return `
            <div class="movie-container">
                <img class="movie-poster" src="${movie.Poster}" alt=""/>
                <div class="movie-details">
                    <div class="flex">
                        <h2 class="movie-title">${movie.Title}</h2>
                        <div class="movie-rating">
                            <i class="fa-solid fa-star"></i>
                            <span>${movie.imdbRating}</span>
                        </div>
                    </div>
                    <div class="movie-rt-g-w flex">
                        <div class="movie-runtime">${movie.Runtime}</div>
                        <div class="movie-genre">${movie.Genre}</div>
                        <div data-id="${movie.imdbID}" class="add-movie-to-watchlist"> 
                            <i class="fa-solid fa-circle-plus"></i>
                            <span>Watchlist</span>
                        </div>
                    </div>
                    <div class="movie-plot">${movie.Plot}</div>
                </div>
            </div>
        `
        }).join('');
    // console.log(htmlOutput);;

    return htmlOutput;
}