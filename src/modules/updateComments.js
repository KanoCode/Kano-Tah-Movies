export const getCommentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ZDoYhdgdvLY58qjF0mAV/comments?item_id=item';

const getComments = async () => {
  const fetchComments = await fetch(`${getCommentsURL}1`);
  const resp = await fetchComments.json();
  return resp;
};

export { getComments };
