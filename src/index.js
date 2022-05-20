import './style.css';
import './modules/dependencies.js';
import { popupDisplay, makeComment } from './modules/popup.js';
import { getComments } from './modules/updateComments.js';

const activatePopup = document.querySelector('section > button');
const popup = document.querySelector('.popup');
let id = Math.floor(Math.random() * 10);

activatePopup.addEventListener('click', async (e) => {
  popup.classList.add('active');
  id = e.target.id;
  const fetchMovies = `https://api.tvmaze.com/shows/${3}`;
  const fetchShows = await fetch(fetchMovies);
  const data = await fetchShows.json();
  popupDisplay(data);
  const commentsArr = await getComments();
  commentsArr.forEach((comment) => {
    makeComment(comment);
  });
import getData from './modules/fetch-api.js';

window.addEventListener('load', () => {
  getData();
});
