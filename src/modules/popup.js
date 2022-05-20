// gets popup data and displays
import commentsCount from "./comments-counter.js";
import { getComments, getCommentsURL } from "./updateComments.js";
import { postUrl } from "./updateComments.js";

export const makeComment = (obj) => {
  const commentContainer = document.querySelector(".comment-body");
  const container = document.createElement("div");
  const date = document.createElement("h3");
  date.innerText = `${obj.creation_date} ${obj.username} : `;
  const description = document.createElement("p");
  description.innerText = `${obj.comment}`;
  container.append(date, description);
  commentContainer.append(container);
};

export const popupDisplay = async (movieData, id) => {
  const popup = document.querySelector(".popup");
  popup.innerHTML = "";
  const numComments = await getComments(id);

  const addCommentDiv = document.createElement("div");
  addCommentDiv.className = "add-comment";
  const commentsDiv = document.createElement("div");
  commentsDiv.className = "comments";
  const movieHeader = document.createElement("div");
  movieHeader.id = "movieHeader";
  console.log(movieData.ended);
  movieHeader.innerHTML = ` <h2> ${movieData.name} </h2> 
  
  <div>
  <span>${
    movieData.ended ? movieData.ended.slice(0, 4) : ""
  }</span><span>.</span><span>${
    movieData.status
  }</span><span>.</span><span> Rating <i class="fa-solid fa-star"></i></span><span>${
    movieData.rating.average
  }</span><span>/10</span>
</div>


  `;

  const statsDiv = document.createElement("div");
  const movieImgDiv = document.createElement("div");
  movieImgDiv.className = "movie-img";
  movieImgDiv.innerHTML = `<img src="${movieData.image.original}" /> <span class="closeBtn "> <i class="fa-solid fa-xmark"></i></span> 
  <div> <span>${movieData.genres[0]}</span><span>${movieData.genres[1]}</span><span>${movieData.genres[2]}</span></div> `;

  statsDiv.className = "stats";
  statsDiv.innerHTML = `<div class="stats">
  <div class="brief-info">
  <div>
    <h3 id="runtime">Runtime : ${movieData.runtime} minutes</h3>
  </div>
  <div class="description">
    <h3>Description</h3>
    ${movieData.summary}
  </div>
</div>
</div>`;

  commentsDiv.innerHTML = `

<!-- Receives data from involvement API -->
<h3 class="commentsNum">Comments (${
    commentsCount(numComments) < 10
      ? `0${commentsCount(numComments)}`
      : commentsCount(numComments)
  })</h3>
<div class="comment-body">

</div>



`;

  addCommentDiv.innerHTML = `
<h3>Add Comment</h3>

        <form>
          <input id="name" type="text" maxlength = "20" placeholder="Your name" />
          <textarea  class="userComment"
          id="user-comment"
          maxlength = "20"
          placeholder="Share your insights"
          ></textarea>
          <button type="submit">Add Comment</button>
        </form>`;

  const closeBtn = movieImgDiv.childNodes[2];

  closeBtn.addEventListener("click", () => {
    popup.classList.toggle("active");
    popup.innerHTML = "";
  });

  const myForm = addCommentDiv.childNodes[3];
  myForm.addEventListener("submit", async (e) => {
    const username = myForm.childNodes[1].value;
    const comment = myForm.childNodes[3].value;
    let data;

    e.preventDefault();
    if (username !== "" && comment !== "") {
      data = {
        item_id: `item${id}`,
        username,
        comment,
      };
      fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        const [name, commentInpt] = [
          e.target.childNodes[1],
          e.target.childNodes[3],
        ];
        const commentH2 = document.querySelector(".commentsNum");
        fetch(`${getCommentsURL}${id}`)
          .then((resp) => resp.json())
          .then((data) => {
            commentH2.innerHTML = `Comments (${
              commentsCount(data) < 10
                ? `0${commentsCount(data)}`
                : commentsCount(data)
            })`;
            const commentBody = document.querySelector(".comment-body");
            commentBody.innerHTML = "";
            data.forEach((obj) => {
              makeComment(obj);
            });
          });
        name.value = "";
        commentInpt.value = "";
      });
    }
  });

  popup.append(movieHeader, movieImgDiv, statsDiv, commentsDiv, addCommentDiv);
};
