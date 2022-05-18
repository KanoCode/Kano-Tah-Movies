const movieImage = document.querySelector('.movie-img');
const movieDescription = document.querySelector('.description > p');
const movieTitle = document.querySelector('#movieTitle');
const runTime = document.getElementById('runtime');
const rating = document.getElementById('rating');

// gets popup data and displays
export const updateMovieData = async () => {
  const fetchImage = await fetch(
    'https://api.tvmaze.com/shows/1/episodesbydate?date=2013-07-01',
  );
  const result = await fetchImage.json();

  console.log(result[0].image.original);

  movieDescription.innerHTML = `${result[0].summary}`;
  movieImage.innerHTML = `<img src="${result[0].image.original}" /> <span> <i class="fa-solid fa-xmark"></i></span> `;
  movieTitle.innerHTML = `${result[0].name} `;
  runTime.innerText = ` Runtime : ${result[0].runtime} minutes`;
  rating.innerText = ` Rating : ${result[0].rating.average}`;
  const closeBtn = document.querySelector('.movie-img > span');
  return closeBtn;
};

export const makeComment = (obj) => {
  const commentContainer = document.querySelector('.comment-body');
  // commentContainer.innerHTML =''
  const date = document.createElement('h3');
  date.innerText = `${obj.creation_date} ${obj.username} : `;
  const description = document.createElement('p');
  description.innerText = `${obj.comment} `;
  commentContainer.append(date, description);
};

// consume involvement api
export const getCommentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZDoYhdgdvLY58qjF0mAV/comments?item_id=item1';
export async function updateCommentData(endPointURL) {
  const getComment = await fetch(endPointURL);
  const response = await getComment.json();
  console.log(response);
  // update popup comment title
  const commentTitle = document.querySelector('.comments > h3');
  commentTitle.innerText = `Comments (${
    response.length < 10 ? `0${response.length}` : response.length
  })`;
  // update popup comment details
  response.forEach((obj) => {
    makeComment(obj);
  });
  return response;
}
