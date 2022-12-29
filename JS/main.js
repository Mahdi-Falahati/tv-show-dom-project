// event listener for after loaded page fetching to api
document.addEventListener("DOMContentLoaded", async () => {
    // get data from api
    const promiseOfSomeData = await fetch("https://api.tvmaze.com/shows/82/episodes")
        .then((response) => response.json())
        .then((data) => data);

    showData(promiseOfSomeData);
});

const showData = (response) => {
    // get tag with class cards
    const cards = document.querySelector(".cards");
    // show respone in page 
    response.forEach((movie) => {
        // show fetched data
        const card = `
<section class="card">
    <div class="card__content">
    <h1 class="card__name">${movie.name}</h1>
        <img class="card__img" src="${movie.image.medium}" alt="${movie.name}" title="${movie.name}">
        <section class="card__info">
            <div class="card__inf-seri">
                <span>S${movie.season <= 9 ? (movie.season = `0${movie.season}`) : (movie.season = movie.season)}</span>
                /
                <span>E${movie.season <= 9 ? (movie.season = `0${movie.season}`) : (movie.season = movie.season)}</span>
            </div>
            <div class="card__inf-imdb">
                <span>IMDB ${movie.rating.average}</span>
            </div>
        </section>
        <details class="card__summary">
            <summary>Summary...</summary>
            ${movie.summary}
        </details>
    </div>
    <hr>
    <div class="card__airdate"> Airdate ${movie.airdate}</div>
    <a href="${movie.url}" class="card__link" target="_blank">
            Play Move..
        </a>
</section>
    `;
        // added card as html to page 
        cards.innerHTML+=card
    });
}

