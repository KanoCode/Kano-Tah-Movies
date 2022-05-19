// gets popup data and displays

export const makeComment = (obj) => {
  const commentContainer = document.querySelector(".comment-body");
  const container = document.createElement("div");
  const date = document.createElement("h3");
  date.innerText = `${obj.creation_date} ${obj.username} : `;
  const description = document.createElement("p");
  description.innerText = `${obj.comment} `;
  container.append(date, description);
  commentContainer.append(container);
};

// consume involvement api
export const getCommentsURL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZDoYhdgdvLY58qjF0mAV/comments?item_id=item";
export async function updateCommentData(endPointURL, id) {
  const getComment = await fetch(endPointURL + id);
  const response = await getComment.json();
  // update popup comment title
  const commentTitle = document.querySelector(".comments > h3");
  commentTitle.innerText = `Comments (${
    response.length < 10 ? `0${response.length}` : response.length
  })`;
  // update popup comment details
  response.forEach((obj) => {
    makeComment(obj);
  });
  return response;
}

export const popupDisplay = async (movieData) => {
  const popup = document.querySelector(".popup");
  popup.innerHTML = "";
  const addCommentDiv = document.createElement("div");
  addCommentDiv.className = "add-comment";
  const commentsDiv = document.createElement("div");
  commentsDiv.className = "comments";
  
  console.log(movieData)
  const movieHeader = document.createElement("div");
  movieHeader.id = "movieHeader";
  movieHeader.innerHTML = ` <h2> ${movieData.name} </h2> 
  <div>
  <span>${movieData.ended.slice(0, 4)}</span><span>.</span><span>${
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
<h3>Comments (01)</h3>
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
  popup.append(movieHeader, movieImgDiv, statsDiv, commentsDiv, addCommentDiv);
  const popUpObjects = { addCommentDiv, movieImgDiv };
  return popUpObjects;
};
