window.addEventListener("load", onCall);

async function onCall() {
  const url =
    "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=39cca378a50d16a3d3610584773dfe91&hash=48b94d71a596cb04f42d7e6d57d98182";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const heroes = data.data.results;

    heroes.forEach((hero) => {
      //   for each hero create a new hero card

      const singleCard = document.createElement("div");
      const border = document.createElement("div");
      const heroName = document.createElement("h1");
      const heroImg = document.createElement("img");
      const heroComics = document.createElement("h3");
      const heroSeries = document.createElement("h3");
      const heroStories = document.createElement("h3");
      const heroDescription = document.createElement("p");

      // assign class to all new elements

      singleCard.classList.add("single-card");
      border.classList.add("border");
      heroName.classList.add("hero-name");
      heroName.textContent = hero.name;
      heroImg.classList.add("hero-img");
      heroImg.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
      heroComics.className = "comics hero-info";
      heroComics.innerHTML = `Comics: <span>${hero.comics.available}</span>`;
      heroSeries.className = "series hero-info";
      heroSeries.innerHTML = `Series: <span>${hero.series.available}</span>`;
      heroStories.className = "stories hero-info";
      heroStories.innerHTML = `Stories: <span>${hero.stories.available}</span>`;
      heroDescription.className = "hero-description";
      if (hero.description !== "") {
        heroDescription.innerHTML = `<b>Description:</b> <br>${hero.description}`;
      } else {
        heroDescription.innerHTML = `<b>Description:</b> <br>No description found for this hero`;
      }

      singleCard.appendChild(border);
      border.appendChild(heroName);
      border.appendChild(heroImg);
      border.appendChild(heroComics);
      border.appendChild(heroSeries);
      border.appendChild(heroStories);
      border.appendChild(heroDescription);

      const cardContainer = document.getElementById("card-container");

      cardContainer.appendChild(singleCard);

      // ----- ADDING HOVER EFFECT TO CARD -----------

      border.addEventListener("mouseover", zoomImgIn);
      border.addEventListener("mouseout", zoomImgOut);

      function zoomImgIn() {
        heroComics.style.visibility = "hidden";
        heroSeries.style.visibility = "hidden";
        heroStories.style.visibility = "hidden";
        heroImg.style.minHeight = "400px";
      }

      function zoomImgOut() {
        heroComics.style.visibility = "visible";
        heroSeries.style.visibility = "visible";
        heroStories.style.visibility = "visible";
        heroImg.style.minHeight = "240px";
      }
    });
  } catch (err) {
    console.log(err);
  }
}
