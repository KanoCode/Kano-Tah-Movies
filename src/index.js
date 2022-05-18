import './style.css';
import './modules/dependencies.js';
import {
  updateMovieData,
  updateCommentData,
  getCommentsURL,
} from './modules/popup.js';
// get image function must run immediately popup has an active class

const activatePopup = document.getElementById('popup-active');
const popup = document.querySelector('.popup');

// button must add active class to popup
activatePopup.addEventListener('click', async () => {
  const closeBtn = await updateMovieData();
  popup.classList.add('active');

  closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
  });
});

// Involvement api

// create a new app
// ZDoYhdgdvLY58qjF0mAV this is my temporal app id

const postCommentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZDoYhdgdvLY58qjF0mAV/comments/';

async function addCommenturl(postCommentsURL, data) {
  const comment = await fetch(postCommentsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = comment.json();
  console.log(response);
  return response;
}

// place holder id
const id = Math.floor(Math.random() * 10);
console.log(id);

const myForm = document.querySelector('form');

myForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('name').value;
  const comment = document.getElementById('user-comment').value;
  const id = Math.floor(Math.random() * 10);
  console.log(id);

  if (username !== '' && comment !== '') {
    const data = {
      item_id: `item${id}`,
      username,
      comment,
    };
    try {
      await addCommenturl(postCommentsURL, data);
    } catch {
      console.log(console.error());
    }

    const [name, commentInpt] = [e.target.childNodes[1], e.target.childNodes[3]];
    name.value = '';
    commentInpt.value = '';
    console.log(id);
    updateCommentData(getCommentsURL, id);
  }
});

// consume involvement api
updateCommentData(getCommentsURL, id);
