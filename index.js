const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    // const replacedText = searchInput.replace(/ /g, "+");
    // console.log(replacedText);
    fetch(`http://www.omdbapi.com/?apikey=49133b6f&t=${searchInput}`)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);

        });
})




let template = `
    <div class="movie-container">
        <img class="movie-poster" src="${movie.Poster}" alt=""/>
        <div class="movie-details">
            <h2 class="movie-title">${movie.Title}</h2>
            <div class="movie-rating">${movie.imdbRating}</div>
            <div class="movie-year">${movie.Year}</div>
            <div class="add-movie-to-watchlist"> 
                <i></i>
                Watchlist
            </div>
            <div class="movie-plot">${movie.Plot}</div>
        </div>
    </div>
`


