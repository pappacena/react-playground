// Books format:
// [{ isbn: 'xxx', title: "foo", authors: ["xxx", ...], img: "aaa", read: false }, ...],
const DEFAULT_STATE = {
  books: [],
  loading: false,
  errorMessage: null,
};

const sortBooks = books => books.sort((a, b) => a.read > b.read);

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'BOOK_LOADING':
      return { ...state, loading: true };
    case 'BOOK_ADDED':
    case 'BOOKS_REFRESHED':
    case 'BOOK_READ_STATE_CHANGED':
    case 'BOOK_REMOVED':
      return { ...state, loading: false, books: sortBooks(action.payload) };
    case 'BOOK_ADD_ERROR':
      return { ...state, errorMessage: action.payload, loading: false };
    default:
      return state;
  }
};
