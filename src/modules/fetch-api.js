import { getLikes, PostLikes } from "./likes-api.js";

import likeCount from "../likesCount.js";

const api = "https://api.tvmaze.com/shows";
export const container = document.querySelector(".row-container");
const counter = document.querySelector("#counter");

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
  for (let i = 0; i < data.length; i += 1) {
    const count = likeCount(data[i].id.toString(), likesData);
    container.innerHTML += ` <div class="movie-container d-flex">
        <div class="image-container ">
          <img id='imageUrl' src="${data[i].image.original}" alt="eternals">
        </div>
        <div class="header-movie">
          <h3 id="header">${data[i].name}</h3>
        </div>
        <div class="interaction d-flex">
          <div>
            <i id="${data[i].id}" class="likes fa-solid fa-heart"><span id="${i}">${count}</span></i>
          </div>
          <div id="${data[i].id}"  class="comments">
            <i class="fa-solid fa-comment"></i>
          </div>
        </div>
      </div>`;
  }
  document.querySelectorAll(".likes").forEach((element) => {
    element.addEventListener("click", (e) => {
      PostLikes(element.id);
      element.classList.add("like");
      const c = e.target.firstChild;
      c.innerHTML = parseInt(c.innerText, 10) + 1;
    });
  });
}

export default getData;
