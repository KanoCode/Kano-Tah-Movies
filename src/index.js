import "./style.css";
import "./modules/dependencies.js";
import { popupDisplay } from "./modules/popup.js";

const activatePopup = document.querySelector("section > button");
const popup = document.querySelector(".popup");
let id = Math.floor(Math.random() * 10);

activatePopup.addEventListener("click", async (e) => {
  popup.classList.add("active");
  id = e.target.id;
  const fetchMovies = `https://api.tvmaze.com/shows/${3}`;
  let fetchShows = await fetch(fetchMovies);
  let data = await fetchShows.json();
  popupDisplay(data);
});
