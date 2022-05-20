import "./style.css";
import "./modules/dependencies.js";
import { popupDisplay, makeComment } from "./modules/popup.js";
import { getComments } from "./modules/updateComments.js";
import commentsCount from "./modules/comments-counter";
import getData from "./modules/fetch-api.js";

window.addEventListener("load", async () => {
  await getData();
  const popup = document.querySelector(".popup");
  document.querySelectorAll(".comments").forEach((element) => {
    element.addEventListener("click", async (e) => {
      console.log(element.id, popup);
      popup.classList.add("active");
      let id = element.id;
      const fetchMovies = `https://api.tvmaze.com/shows/${id}`;
      const fetchShows = await fetch(fetchMovies);
      const data = await fetchShows.json();
      popupDisplay(data, id);
      const commentsArr = await getComments(id);
      if (commentsCount(commentsArr)) {
        commentsArr.forEach((comment) => {
          makeComment(comment);
        });
      }
    });
  });

  console.log("done");
});
