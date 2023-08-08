// Defining an empty object which I'm naming 'movieApp' and leaving it empty
const movieApp = {}

// MVP: Querying the TheMovieDB API and getting movies with the selected genre. Strech goal: update the title with the genre selected by the user.

// We are going to work on a function to make the API call:
// Defining a function I called 'getMovies' and including properties and methods inside of it, as described below:
movieApp.getMovies = (query) => {
    // Storing the API key inside the object under a property I'm naming 'key'
    movieApp.key = '934a7248ea85c3cd5c22c19d73d5c4c8';
    // Storing the API URL under a property I'm naming 'url'. Here we also need to creat one of those url object, because we are using search params (to call the api one of the search params is the api key, and later on we also want to user the genre search param), and we're creating this object by using the URL constructor when we type 'new URL' and then the link to the api and endpoint we want. 
    movieApp.url = new URL('https://api.themoviedb.org/3/discover/movie');
    //We are gonna set the value of 'search' by creating new URLSearchParams, which takes one argument, this argument is the object that contains our queries:
    movieApp.url.search = new URLSearchParams({
        // 'api_key' is the query parameter to inform the API keyword when calling the API (this query paramenter is found in the API documentation)
        api_key: movieApp.key,
        // 'with_genres' is the query parameter to query by genre (this query paramenter is found in the API documentation)
        with_genres: query
    });

    // fetching the API - instead of informing the whole URL, I'm just informing the property where the API URL is stored, which is 'movieApp.url
    fetch(movieApp.url)
            // using the .then() method to get the API response, and then using the .json() method on this object to parse/translate the response body and convert it into a JSON object
            .then(response => response.json())
            // using the .then() method to pass the response that was converted into JSON to its callback function (I named this callback function 'displayMovies' and defined what she does below AND outsite of the scope of .getMovies)
            .then(data => {
                movieApp.displayMovies(data.results)
            }) 
}

// Now we're gonna work on showing/displaying the movies of the selected genre on the browser/screen:

// Defining a function I called 'displayMovies' and adding it to the movieApp object
movieApp.displayMovies = (arrayOfMovies) => {
    // selecting/targeting the div with id 'movies' and assigning it to a variable I named 'moviesContainer' 
    const moviesContainer = document.querySelector('#movies');
    // adding an empty string to 'moviesContainer', and doing so by using the .innerHTML method. The goal of this is to clear the container to accept and load each selection of genre
    moviesContainer.innerHTML = '';
    // using the forEach method to go over each item of the array of movies
    arrayOfMovies.forEach(movieItem => {
        console.log(movieItem)
        // creating a 'div' element inside of 'moviesContainer' and assigning it to a variable I named 'movie'
        const movie = document.createElement('div');
        // adding to the movie a class with the name 'movie' (by using the .classList.add property)
        movie.classList.add('movie');
        // now creating a 'h4' element and assigning it to a variable I named 'title'
        const title = document.createElement('h4');
        // targeting the text content of the 'title' and adding a content to this title (by using the .innerText property). This content will correspond to the title property of each item of the movie array (this title property can be seen on the console)
        title.innerText = movieItem.title;
        // creating a 'p' element and assigning it to a variable I'm naming 'score'
        const score = document.createElement('p');
        // targeting the text content of the 'score' and assigning to it the value "Score:" followed by the value inside the vote_average property of each movieItem (this 'vote_average' property is found on the console)
        score.innerText = `Score: ${movieItem.vote_average}`;
        // creating an image element and assigning it to a variable I named 'image'
        const date = document.createElement('p');
        date.innerText = `Release date: ${movieItem.release_date}`;
        const image = document.createElement('img');
        // every img element needs to have a src to actually shows the image( src=""), and here I'm assigning the URL to the img src. The url format is found in the API documentation and the poster_path is a property of the movieItem object, which is can find on the console.
        image.src = `https://image.tmdb.org/t/p/w300/${movieItem.poster_path}`;
        // image.date = movieItem.release_date;
        image.alt = movieItem.title;

        // collect all elements together (movie src and alt inside the movie object) under the 'movie' div
        movie.appendChild(score);
        movie.appendChild(date);
        movie.appendChild(title);
        movie.appendChild(image);

        // append the 'movie' div as a child to the 'moviesContainer' div
        moviesContainer.appendChild(movie);
    });
}

// Now we're gonna make the app "know" which genre the user selected/every time the user changes to another option/genre of the form:

// listen for a change in the select and when it changes, make a new api call to get the new movies (sccording to the genre the user selected)
movieApp.attachEventListeners = () => {
    // we target the element with an id of '#genre' (wich in thsi case is the <select> element of the form) and assign it to a variable we named 'selectElement'
    const selectElement = document.querySelector('#genre');
    // we add the event listener to the selectElement element, of the type 'change' and every time it changes we defined a function
    selectElement.addEventListener('change', function () {
        console.log(this.value)
        // the function will make a new API call to get the new movies of the genre selected (this.value)
        movieApp.getMovies(this.value)
        // the function will also call the .updateTitle method to our movieApp object. The .udateTitle method is a function we defined outside of the scope of .attachEventListeners
        movieApp.updateTitle() /* this is part of the code for the strech goal */
    });
}

// Strech goal: 
// Now We're going to create a function to update the title according to the genre selected by the user. We named this functions .updateTitle
movieApp.updateTitle = () => {
    // we target the div with and id of '#genre' and assign it to a variable we named 'selectElement'
    const selectElement = document.querySelector('#genre');
    // we then target the text content of the selectedOptions with and index of zero (selectedOptions is a property that can be seen in the console) and assigned it to a variable we names 'selectedOptionText'
    const selectedOptionText = selectElement.selectedOptions[0].textContent;
    // we then target the element with an id of "chosen-genre" and assign to it a value that correspond to our selectedOptionText variable
    document.querySelector('#chosen-genre').innerText = selectedOptionText;
}

// Because we're using namespacing we need to create the .init function here
movieApp.init = () => {
    // We're calling the event listener here because it's a set up behaviour, as the select is on the page from the very beginning, because our select already exists on page load)
    movieApp.attachEventListeners();
    movieApp.getMovies('28');
}

// After creating the .init function, we need to call it.
movieApp.init()