//tt3896198
const myInput = document.querySelector('#myInput');
const myBtn = document.querySelector('#myBtn');
let myMovies = document.querySelector('#movies');
let myPrevButton = document.querySelector('#prevBtn');
let myNextButton = document.querySelector('#nextBtn');

let currentPage = 1;
let searchMovieName = 'iron man';
let total_page;

getGenre();
getMoviesPerPage(searchMovieName, currentPage);

function getMoviesPerPage(search,page){
    /**
     * bali paginated na pala nirereturn ni omdb api so need mo nalang ipasa ung page na parameters sa url para makuha ung next page na data galing sa omdb api.
     * hindi pa paginated yung iba mong page. mo nalang siguro d2.
     */
	const movieURL = `https://www.omdbapi.com/?apikey=510257b1&s=${search}&page=${page}`;

	fetch(movieURL)
		.then(res => res.json())
		.then(data => {
            total_page = Math.ceil(data.totalResults / 10); // to get the last page number
            currentPage = page; // to update the current page number
            myMovies.innerHTML = ''; // to refresh the display
            updateBtn(page);
            // displaying new data from omdb api site
            for(movie of data.Search){
                myMovies.innerHTML +=  `
                    <div class="col-md-2 p-3 m-3 text-dark bg-light" id="thumbnail">
                        <h3 class="h5">${movie.Title}</h3>
                        <img src="${movie.Poster}"/>
                        <p>Year: ${movie.Year}</p>
                        <p>Type: ${movie.Type}</p>
                        <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-success">movie details</a>
                    </div>
                `
            }
		});
}
// add and minus lng sa current page
myPrevButton.onclick = () => {
    getMoviesPerPage(searchMovieName, currentPage - 1);
}

myNextButton.onclick = () => {
    getMoviesPerPage(searchMovieName, currentPage + 1);
}

//preventing bug sa pag get and sa ui/ux na din.
myPrevButton.classList.add('disabled');
function updateBtn(page){
    console.log(currentPage,page,total_page);
    if(page == 1){
        myPrevButton.classList.add('disabled');
    }
    else if(page == total_page){
        myNextButton.classList.add('disabled');
    }
    else{
        myPrevButton.classList.remove('disabled');
        myNextButton.classList.remove('disabled');
    }
}

//search MOVIE API
myInput.addEventListener('keyup', function(e){
  e.preventDefault();
     let searchInput = myInput.value;
		if (e.keyCode === 13) {

			console.log("you press enter");
		}
      getMoviesPerPage(searchInput);
});
myBtn.addEventListener('click', function(e) {
      let searchInput = myInput.value;
      getMoviesPerPage(searchInput);
});

// GENRE BUTTON
function getGenre() {
const navlink = document.querySelectorAll('.nav-link');

    navlink.forEach(nav => {
    	nav.addEventListener('click', function(e) {
    				let genreclick = nav.innerHTML;
              getMoviesPerPage(genreclick, currentPage);
    			  })
        })
}

function movieSelected(id) {
	sessionStorage.setItem('movieId', id);
	window.location = 'view.html';
	return false;
};

function getMovie() {
	let movieId = sessionStorage.getItem('movieId');
	fetch('https://www.omdbapi.com/?apikey=510257b1&i=' + movieId)
		.then(res => res.json())
			.then(data => {
				let movieDetails = data;
				console.log(movieDetails);
				let output = '';
				output += `
			<div class="container bg-light text-dark text-center" id="thumbnail">
				<div class="row" id="thumbnail">
					<div class="col-md-4 m-3">
						<img src="${movieDetails.Poster}"/>
					</div>
					<div class="col-sm-7 m-3">
						<ul class="list-group">
							<h2>Title:${movieDetails.Title}</h2>
							<hr>
							<li class="list-group-item">Details:<p>${movieDetails.Plot}</p></li>
							<li>Genre: ${movieDetails.Genre}</li>
							<li>Release: ${movieDetails.Released}</li>
							<li>Rated: ${movieDetails.Rated}</li>
							<li>imdbRating: ${movieDetails.imdbRating}</li>
							<li>Director: ${movieDetails.Director}</li>
							<li>Writer: ${movieDetails.Writer}</li>
							<li>Actors: ${movieDetails.Actors}</li>
							<li>Production: ${movieDetails.Production}</li>
							<li>Year: ${movieDetails.Year}</li>
						</ul>
					</div>
				</div>

				<div class="container text-center">
					<h3>Plot</h3>
					<hr>
					<div>
					<a href="https://imdb.com/title/${movieDetails.imdbID}" target="_blank" class="btn btn-success">Watch Now</a>
					</div>
					<a href="index.html" class="btn btn-default text-dark">Back to Home</a>
				</div>

			</div>
				`
				document.querySelector('#movieDetails').innerHTML = output;
			})

			.catch(error => {
				console.log('Error:' + error);
			})
 }
