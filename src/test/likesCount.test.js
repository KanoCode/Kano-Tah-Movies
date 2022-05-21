import likeCount from "../likesCount";

const data = [
  {
    id: 0,
    likes: 33,
  },
];

test("update likes", () => {
  const item1 = likeCount('', data);
  expect(item1).toBe(0);

  const item2 = likeCount(40, data);
  expect(item2).toBe(0);
});
