import axios from 'axios';

const getBooks = ($storage = window.localStorage) => {
  if (!$storage) {
    return {};
  }
  const data = $storage.getItem('books');
  if (!data) {
    return {};
  }
  return JSON.parse(data);
};

const setBooks = (books, $storage = window.localStorage) => {
  if (!$storage) {
    return;
  }
  $storage.setItem('books', JSON.stringify(books));
};


export const addBook = (isbn, $axios = axios, $storage = window.localStorage) => (
  async (dispatch) => {
    dispatch({
      type: 'BOOK_LOADING',
    });
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;

    try {
      const resp = await $axios.get(url);
      const data = resp.data[`ISBN:${isbn}`];
      const books = getBooks($storage);
      books[isbn] = {
        isbn,
        authors: data.authors.map(i => i.name),
        title: data.title,
        img: data.cover.medium,
        read: false,
      };
      setBooks(books, $storage);

      dispatch({
        type: 'BOOK_ADDED',
        payload: Object.values(books),
      });
    } catch (e) {
      dispatch({
        type: 'BOOK_ADD_ERROR',
        payload: 'Error adding book',
      });
    }
  }
);

export const refreshBooks = ($storage) => {
  const books = getBooks($storage);
  return {
    type: 'BOOKS_REFRESHED',
    payload: Object.values(books),
  };
};

export const changeReadState = (isbn, read = true, $storage = window.localStorage) => {
  const books = getBooks($storage);
  books[isbn].read = read;
  setBooks(books, $storage);
  return {
    type: 'BOOK_READ_STATE_CHANGED',
    payload: Object.values(books),
  };
};

export const removeBook = (isbn, $storage = window.localStorage) => {
  const books = getBooks($storage);
  delete books[isbn];
  setBooks(books, $storage);
  return {
    type: 'BOOK_REMOVED',
    payload: Object.values(books),
  };
};
