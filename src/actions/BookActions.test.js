import sinon from 'sinon';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import exampleResponse from './openlibrary-example.json';
import { addBook } from './BookActions';

describe('Test book actions', () => {
  it('should add a book', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=data&format=json')
      .reply(200, exampleResponse);

    const storage = { getItem: () => ({}), setItem() {} };
    const mockStore = sinon.mock(storage);
    mockStore.expects('getItem').once();
    mockStore.expects('setItem').once();

    const dispatch = sinon.spy();
    await addBook('9780980200447', axios, storage)(dispatch);

    sinon.assert.calledWith(dispatch, { type: 'BOOK_LOADING' });
    sinon.assert.calledWith(dispatch, {
      type: 'BOOK_ADDED',
      payload: [{
        authors: ['John Miedema'],
        img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
        isbn: '9780980200447',
        read: false,
        title: 'Slow reading',
      }],
    });
  });
});
