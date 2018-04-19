const DEFAULT_STATE = {
  books: [], // [{ title: "foo", author: "xxx", img: "aaa", read: false }, ...],
  loading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
