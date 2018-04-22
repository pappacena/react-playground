import sinon from 'sinon';
import { expect } from 'chai';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import exampleResponse from './openlibrary-example.json';
import { addBook, removeBook, changeReadState } from './BookActions';

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

    mockStore.verify();
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


  it('should remove a book', () => {
    const getItem = sinon.stub();
    getItem.returns(JSON.stringify({
      9780980200447: {
        authors: ['John Miedema'],
        img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
        isbn: '9780980200447',
        read: false,
        title: 'Slow reading',
      },
      xxx: {
        authors: ['Thiago'],
        img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
        isbn: 'xxx',
        read: false,
        title: 'The reading',
      },
    }));
    const storage = {
      getItem,
      setItem() {},
    };

    const mockStore = sinon.mock(storage);

    const action = removeBook('xxx', storage);

    expect(getItem.called).to.equal(true);
    expect(action.type).to.equal('BOOK_REMOVED');
    expect(action.payload.length).to.equal(1);
    expect(action.payload[0].isbn).to.equal('9780980200447');
    expect(action.payload[0].authors.length).to.equal(1);
    expect(action.payload[0].authors[0]).to.equal('John Miedema');
    expect(action.payload[0].title).to.equal('Slow reading');
    expect(action.payload[0].read).to.equal(false);
    mockStore.verify();
  });

  it('should remove a book', () => {
    const getItem = sinon.stub();
    getItem.returns(JSON.stringify({
      9780980200447: {
        authors: ['John Miedema'],
        img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
        isbn: '9780980200447',
        read: false,
        title: 'Slow reading',
      },
      xxx: {
        authors: ['Thiago'],
        img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
        isbn: 'xxx',
        read: false,
        title: 'The reading',
      },
    }));
    const storage = {
      getItem,
      setItem() {},
    };

    const mockStore = sinon.mock(storage);

    const action = removeBook('xxx', storage);

    expect(getItem.called).to.equal(true);
    expect(action.type).to.equal('BOOK_REMOVED');
    expect(action.payload.length).to.equal(1);
    expect(action.payload[0].isbn).to.equal('9780980200447');
    expect(action.payload[0].authors.length).to.equal(1);
    expect(action.payload[0].authors[0]).to.equal('John Miedema');
    expect(action.payload[0].title).to.equal('Slow reading');
    expect(action.payload[0].read).to.equal(false);
    mockStore.verify();
  });

  it('should change a book read state', () => {
    const getItem = sinon.stub();
    getItem.returns(JSON.stringify({
      9780980200447: {
        authors: ['John Miedema'],
        img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
        isbn: '9780980200447',
        read: false,
        title: 'Slow reading',
      },
      xxx: {
        authors: ['Thiago'],
        img: 'https://covers.openlibrary.org/b/id/5546156-M.jpg',
        isbn: 'xxx',
        read: false,
        title: 'The reading',
      },
    }));
    const storage = {
      getItem,
      setItem() {},
    };

    const mockStore = sinon.mock(storage);

    const action = changeReadState('xxx', true, storage);

    expect(getItem.called).to.equal(true);
    expect(action.type).to.equal('BOOK_READ_STATE_CHANGED');
    expect(action.payload.length).to.equal(2);
    expect(action.payload[0].isbn).to.equal('9780980200447');
    expect(action.payload[0].read).to.equal(false);
    expect(action.payload[1].isbn).to.equal('xxx');
    expect(action.payload[1].read).to.equal(true);
    mockStore.verify();
  });
});
