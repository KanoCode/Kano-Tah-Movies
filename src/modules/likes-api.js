/* eslint-disable camelcase */

const idApp = 'XO9kralet7R8kFJiCTyG';
const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
export const container = document.querySelector('.row-container');

const PostLikes = async (item_id) => {
  await fetch(`${api}${idApp}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id,
    }),
  });
};

const getLikes = async () => {
  const response = await fetch(`${api}${idApp}/likes`);
  const data = await response.json();
  return data;
};

export { getLikes, PostLikes };
