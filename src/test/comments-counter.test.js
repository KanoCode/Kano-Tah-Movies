import commentsCount from "../modules/comments-counter.js";

const data = [
  {
    id: 0,
    comments: "aaaaaaaaaaaa",
  },
  {
    id: 0,
    comments: "aaaaaaaaaaaa",
  },
  {
    id: 0,
    comments: "aaaaaaaaaaaa",
  },
];

test("update comments", () => {
  const item1 = commentsCount(data);
  expect(item1).toBe(3);
});
