const filmWrapper = document.getElementById("filmWrapper");
// localStorage.clear();

filmWrapper.innerHTML = render();

filmWrapper.addEventListener("click", function(e) {
    if(!e.target.parentElement.dataset.id) 
    {
        console.error("Not a valid click to be added to watchlist");
    }
    else {
        removeMovieFromWatchList(e);
    }
})



function render() {
    if(!localStorage) {
        return `
            <p class="watchlist-pretext">Your watchlist is looking a little empty...</p>
            <a href="./index.html" class="watchlist"> 
                <i class="fa-solid fa-circle-plus"></i>
                <span class="add-movies-text">Let's add some movies!</span>
            </a>
        `
    }

    const movies = getAllLocalStorage();
    const htmlOutput = movies.map(movie => {
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
                            <i class="fa-solid fa-circle-minus"></i>
                            <span>Remove</span>
                        </div>
                    </div>
                    <div class="movie-plot">${movie.Plot}</div>
                </div>
            </div>
        `
        }).join('');
    return htmlOutput;
}


function getAllLocalStorage() {
  const items = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));
    items.push(value);
  }
  
  return items;
}

function removeMovieFromWatchList(e) {
    localStorage.removeItem(e.target.parentElement.dataset.id);
    e.target.parentElement.innerHTML = `
        <i class="fa-solid fa-check"></i>
        <span class="movie-added">Removed</span>
    `
    filmWrapper.innerHTML =  render();
}



