import { api,idApp } from "./likes-api";

export const postUrl = `${api+idApp+'/comments'}`

export const getCommentsURL = `${api+idApp+'/comments?item_id=item'}`

const getComments = async (id) => {
  const fetchComments = await fetch(`${getCommentsURL}${id}`);
  const resp = await fetchComments.json();
  return resp;
};

export { getComments };
