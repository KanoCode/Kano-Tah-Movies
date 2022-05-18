import "./style.css";
import "./modules/dependencies";

const movieImage = document.querySelector(".movie-img");
const movieDescription = document.querySelector(".description > p");
const movieTitle = document.querySelector("#movieTitle");
const runTime = document.getElementById("runtime");
const rating = document.getElementById("rating");

async function getImage() {
  let fetchImage = await fetch(
    "https://api.tvmaze.com/shows/1/episodesbydate?date=2013-07-01"
  );
  let result = await fetchImage.json();

  console.log(result[0].image.original);

  movieDescription.innerHTML = `${result[0].summary}`;
  movieImage.innerHTML = `<img src="${result[0].image.original}" /> <span> <i class="fa-solid fa-xmark"></i></span> `;
  movieTitle.innerHTML = `${result[0].name} `;
  runTime.innerText = ` Runtime : ${result[0].runtime} minutes`;
  rating.innerText = ` Rating : ${result[0].rating.average}`;
}
getImage();

// window.addEventListener('load',async ()=>{
//     await getImage()
// })

// Involvement api

// create a new app
// ZDoYhdgdvLY58qjF0mAV this is my temporal app id

// fetch url
const url =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZDoYhdgdvLY58qjF0mAV/comments/";

async function addCommenturl(url, data) {
  const comment = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let response = comment.json();
  console.log(response);
  return response;
}

// place holder id
const id = Math.floor(Math.random() * 10);
console.log(id);

const myForm = document.querySelector("form");

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("name").value;
  const comment = document.getElementById("user-comment").value;
  const id = Math.floor(Math.random() * 10);
  console.log(id);

  if (username !== "" && comment !== "") {
    const data = {
      item_id: `item${id}`,
      username,
      comment,
    };

    await addCommenturl(url, data);
    username.value = "";
    comment.value = "";
  }
});

// comment maker DOM

function makeComment (obj){
    const commentContainer = document.querySelector('.comment-body');
// commentContainer.innerHTML =''
    const date = document.createElement('h3');
date.innerText = `${obj.creation_date} ${obj.username} : `
const description = document.createElement('p');
 description.innerText = `${obj.comment} `
 commentContainer.append(date,description)



}

// consume involvement api

async function getComments(endPoint) {
  const getComment = await fetch(endPoint);
  const response = await getComment.json();
  console.log(response);
  // update popup comment title
  const commentTitle = document.querySelector(".comments > h3");
    const commentIdentifier = document.querySelector(".comment-body > h4");
    const summary = document.querySelector(".comment-body > p");
  commentTitle.innerText = `Comments ${response.length < 10? "0"+ response.length: response.length }`;
  response.forEach((obj,id) => {
      makeComment(obj)
   

});
  return response;
}

getComments(
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZDoYhdgdvLY58qjF0mAV/comments?item_id=item1"
);
