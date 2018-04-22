const DEFAULT_STATE = {
  books: [
    {
      isbn: '9780980200447',
      title: 'test 1',
      authors: ['john doe', 'antony foo'],
      img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
      read: false,
    },
    {
      isbn: 'xxx0447',
      title: 'test 2',
      authors: ['john jhn', 'antony atnt'],
      img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
      read: false,
    },
  ], // [{ isbn: 'xxx', title: "foo", authors: ["xxx", ...], img: "aaa", read: false }, ...],
  loading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
