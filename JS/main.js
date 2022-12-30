// event listener for after loaded page fetching to api
document.addEventListener("DOMContentLoaded", async () => {
    // get data from api
    const promiseOfSomeData = await fetch("https://api.tvmaze.com/shows/82/episodes")
        .then((response) => response.json())
        .then((data) => data);

    showData(promiseOfSomeData);
});
// collection of movies
let Movies = [];

// get tag with class cards
const cards = document.querySelector(".cards");
const showData = (response) => {
    // show respone in page
    Movies = response.map((movie) => {
        const { name, summary, url, airdate, id } = movie;
        let { season, number } = movie;
        // show fetched data
        const card = `
            <section class="card" id="Id${id}">
                <div class="card__content">
                    <section class="card__summary">
                        <span>Summary : </span>
                        ${summary}
                        <a href="${url}" class="card__link" target="_blank">
                            Play Move..
                        </a>
                    </section>
                    <h1 class="card__name">${name}</h1>
                    <img class="card__img" src="${movie.image.medium}" alt="${name}" title="${name}">
                    <section class="card__info">
                        <div class="card__inf-seri">
                            <span>S${season <= 9 ? (season = `0${season}`) : (season = season)}</span>
                            /
                            <span>E${number <= 9 ? (number = `0${number}`) : (number = number)}</span>
                        </div>
                        <div class="card__inf-imdb">
                            <span>IMDB ${movie.rating.average}</span>
                        </div>
                    </section>
                </div>
                <div class="card__airdate"> Airdate ${airdate}</div>
         </section>
        `;
        // added card as html to page
        cards.innerHTML += card;
        return {
            name,
            summary,
            id,
        };
    });
};

//search live
const search = document.querySelector("#search");
search.addEventListener("input", (e) => {
    Movies.forEach((movie) => {
        // check input value of summary and name
        const isVisible = movie.name.toLowerCase().includes(e.target.value.toLowerCase()) || movie.summary.toLowerCase().includes(e.target.value.toLowerCase());
        // add hide  & active class to cards for check cards without equal to summary or name
        if (!isVisible) {
            let id = "#Id" + movie.id;
            const card = document.querySelector(id);
            if (!card.classList.value.includes("hide")) {
                card.classList += " hide";
            } else {
                card.classList.replace("active", "hide");
            }
        } else {
            let id = "#Id" + movie.id;
            const card = document.querySelector(id);
            card.classList.replace("hide", "active");
        }
    });
});
