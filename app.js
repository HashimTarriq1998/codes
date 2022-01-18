const addMovieModal = document.getElementById('add-modal')
const showMovieModalBtn = document.querySelector('header button')
const showbackDrop = document.getElementById('backdrop')
const cancelBtn = document.querySelector('.btn--passive')
const addBtn = cancelBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
 

const movies = [];

const updateUI = () =>{
    if(movies.length === 0){
        entryTextSection.style.display = 'block'
    }else{
        entryTextSection.style.display = 'none'
    }
}

const deleteMovieHandler = (movieID) =>{
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id === movieID){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
}

const renderNewMovieElements = (id, title, imageurl, rating) =>{
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageurl}" alt="${title}"/>
        </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5</p>
    </div>
    `
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement)
}

const clrInput = () =>{
    for(const clInp of userInputs){
    clInp.value = '';
    }
}

const togglebackdrop = () =>{
   showbackDrop.classList.toggle('visible')
}

const toggleMovieModal = () =>{
    addMovieModal.classList.toggle('visible')
    togglebackdrop();
}

const cancelModalHandler = () =>{
    toggleMovieModal();   
}

const backdropClickHandler = () =>{
    toggleMovieModal();
}

const addMovieHandler = () =>{
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
){
    alert("please enter a valid value");
    return;
}
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue,
    }

    movies.push(newMovie)
    toggleMovieModal();
    renderNewMovieElements(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    clrInput();
    updateUI();
    console.log(movies)
}

showMovieModalBtn.addEventListener('click', toggleMovieModal);
showbackDrop.addEventListener('click', backdropClickHandler)
cancelBtn.addEventListener('click', cancelModalHandler)
addBtn.addEventListener('click', addMovieHandler)
