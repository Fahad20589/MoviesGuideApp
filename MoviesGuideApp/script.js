const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');





//function to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = '';
    movieContainer.classList.remove('noBackground')
    //use destructuring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;



    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
<p><strong>Rating:&#11088;</strong>${imdbRating} </p>`





    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach((element) => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });



    movieElement.appendChild(movieGenreElement);



    movieElement.innerHTML += `<p><strong>Released : </strong>${Released} </p>
<p><strong>Duration : </strong>${Runtime} </p>
<p><strong>Cast : </strong>${Actors} </p>
<p><strong>plot : </strong>${Plot} </p>`



    //creating a div for movie poster



    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src ="${Poster}" />`;



    movieContainer.appendChild(moviePosterElement);



    movieContainer.appendChild(movieElement);
}



//function to handle form submission
const handleFormSubmission = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showError("Fetching Movie Information ...")
        getMovieInfo(movieName);
    } else {
        showError("Enter Movie Name to get Movie information")
    }
}



//function to fetach movie details from omdb API
const getMovieInfo = async (movie) => {



    try {
        const myApiKey = "e786575a";
        const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable to fetch Movie Data.")
        }
        const data = await response.json();
        showMovieData(data);



    } catch (error) {
        showError("No Movie Found!")
    }



}



//function to display Error messaage



const showError = (message) => {
    movieContainer.innerHTML = `<h2>${message} </h2>`
    movieContainer.classList.add('noBackground')



}



//adding event listener to search form
searchForm.addEventListener("submit", (e) => {
    handleFormSubmission(e)
})

