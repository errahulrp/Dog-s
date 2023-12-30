import { apiKey } from '../config.js';

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": apiKey,
});

var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};
let currentPage = 0;

function fetchMoreData() {
  const newURL = `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${currentPage}&limit=3`;
  fetch(newURL, requestOptions)
    .then(res => {
      return res.json();
    })
    .then((data) => {
      console.log(data)
      data.forEach(card => {
        const markup = `
      <div class="">
      <div class="dog-card w-full sm:w-80 h-auto bg-[#ffffff] rounded-2xl items-center mt-4 sm:mt-0">
        <div class="px-4 py-4">
          <img class="w-full h-48 sm:h-auto rounded-md object-cover" src="${card.url}" alt="Dog images">
          <div class="px-2 py-2" id="dogDetails">
            <h2 id="dogName" class="font-semibold">${card.breeds && card.breeds[0] ? card.breeds[0].name : 'Unknown'}</h2>     
            <p><strong>Size:</strong> <span id="dogSize">${card.breeds && card.breeds[0] ? card.breeds[0].weight.metric + 'Kg, ' + card.breeds[0].height.metric + 'Inch' : 'Unknown'}</span></p>
            <p><strong>Lifespan:</strong> <span id="dogLifespan">${card.breeds && card.breeds[0] ? card.breeds[0].life_span : 'Unknown'}</span></p>
            <p><strong>Bred For:</strong> <span id="dogBredFor">${card.breeds && card.breeds[0] ? card.breeds[0].bred_for : 'Unknown'}</span></p>
            <p><strong>Breed Group:</strong> <span id="dogBreedGroup">${card.breeds && card.breeds[0] ? card.breeds[0].breed_group : 'Unknown'}</span></p>
            <p><strong>Temperament:</strong> <span id="dogTemperament">${card.breeds && card.breeds[0] ? card.breeds[0].temperament : 'Unknown'}</span></p>
        </div>
      </div>
    </div>`;
        document.querySelector("#cards").insertAdjacentHTML("beforeend", markup);
      });
     currentPage++;
    }).catch((error) => console.log(error));
}

document.addEventListener("DOMContentLoaded", ()=>{
  const initialURL = "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=3";

  fetchMoreData(initialURL);
  const loadMoreBtn = document.querySelector('#loadMore');
  if(loadMoreBtn){
    loadMoreBtn.addEventListener("click", fetchMoreData)
  }
});