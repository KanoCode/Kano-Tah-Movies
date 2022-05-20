const likeCount = (id, likesData) => {
  const item = likesData.find((el) => el.item_id === id);
  let count = 0;
  if (item !== undefined) {
    count = item.likes;
  } else {
    count = 0;
  }
  return count;
};

export default likeCount;
