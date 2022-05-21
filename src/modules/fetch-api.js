import { getLikes, PostLikes } from './likes-api.js';

import likeCount from '../likesCount.js';

const api = 'https://api.tvmaze.com/shows';
export const container = document.querySelector('.row-container');
const counter = document.querySelector('#counter');

const getItems = async () => {
  const response = await fetch(api);
  const data = await response.json();
  return data.length;
};

getItems().then((res) => {
  counter.innerHTML = ` ${res} movies`;
});

async function getData() {
  const response = await fetch(api);
  const data = await response.json();
  const likesData = await getLikes();
  for (let i = 0; i < 20; i += 1) {
    const count = likeCount(data[i].id.toString(), likesData);
    container.innerHTML += ` <div class="movie-container d-flex">
        <div class="image-container ">
          <img id='imageUrl' src="${data[i].image.original}" alt="eternals">
        </div>
        <div class="header-movie">
          <h3 id="header">${data[i].name}</h3>
        </div>
        <div class="interaction d-flex">
          <div id="${data[i].id}"  class="likes">
            <i class=" fa-solid fa-heart"></i> <span id="${i}">${count}</span>
          </div>
          <div id="${data[i].id}"  class="comments">
            <i class="fa-solid fa-comment"></i>
          </div>
        </div>
      </div>`;
  }
  document.querySelectorAll('.likes').forEach((element) => {
    element.addEventListener('click', () => {
      element.classList.add('like');
      PostLikes(element.id);
      const c = element.childNodes[4];
      c.innerHTML = parseInt(c.innerText, 10) + 1;
    });
  });
}

export default getData;
