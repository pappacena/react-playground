import React, { Component } from 'react';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import allReducers from './reducers';

import BookEditor from './components/BookEditor';
import BookList from './components/BookList';
import './App.scss';

// Setup redux
const logger = createLogger();
let middlewares = [thunk, (process.env.NODE_ENV !== 'production' && logger)];
middlewares = middlewares.filter(x => x);
const store = createStore(
  allReducers,
  applyMiddleware.apply(this, middlewares),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Personal books</h1>
          <BookEditor onAddBook={isbn => console.log(isbn)} />
          <BookList />
        </div>
      </Provider>
    );
  }
}

export default App;
