const commentsCount = (commentsData) => {
  const item = commentsData.length;
  let count = 0;
  if (item !== undefined) {
    count = item;
  } else {
    count = 0;
  }
  return count;
};

export default commentsCount;