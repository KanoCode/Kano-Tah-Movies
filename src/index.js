import "./style.css";
import "./modules/dependencies.js";
import {
  makeComment,
  updateCommentData,
  getCommentsURL,
  popupDisplay,
} from "./modules/popup.js";

const postCommentsURL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZDoYhdgdvLY58qjF0mAV/comments/";
const activatePopup = document.querySelector("section > button");
const popup = document.querySelector(".popup");
let id = Math.floor(Math.random() * 10);

activatePopup.addEventListener("click", async (e) => {
  popup.classList.add("active");
  id = e.target.id;
  const fetchMovies = `https://api.tvmaze.com/shows/${3}`;
  let fetchShows = await fetch(fetchMovies);
  let data = await fetchShows.json();
  const { addCommentDiv, movieImgDiv } = await popupDisplay(data);

  const closeBtn = movieImgDiv.childNodes[2];

  closeBtn.addEventListener("click", () => {
    popup.classList.toggle("active");
    popup.innerHTML = "";
  });

  // consume involvement api
  updateCommentData(getCommentsURL, id);

  const myForm = addCommentDiv.childNodes[3];
  myForm.addEventListener("submit", async (e) => {
    const username = myForm.childNodes[1].value;
    const comment = myForm.childNodes[3].value;

    e.preventDefault();
    if (username !== "" && comment !== "") {
      const data = {
        item_id: `item${id}`,
        username,
        comment,
      };
      fetch(postCommentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    const [name, commentInpt] = [
      e.target.childNodes[1],
      e.target.childNodes[3],
    ];
    let comments = e.target.offsetParent.childNodes[2];
console.log(comments)
    name.value = "";
    commentInpt.value = "";

    updateCommentData(getCommentsURL, id);
  });
});

// fetch(
//   "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/w0pGLDupYGWYTGto2cBr/likes",
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       item_id: "item16",
//     }),
//   }
// ).then(response => console.log(response.json()))

// console.log(document.querySelector(".comment-body"))

// .then((data) => console.log(data));
