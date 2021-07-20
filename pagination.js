let myMovies = document.querySelector('#movies');
let myPrevButton = document.querySelector('#prevBtn');
let myNextButton = document.querySelector('#nextBtn');

let currentPage = 1;
let searchMovieName = 'iron man'; 
let total_page;


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







