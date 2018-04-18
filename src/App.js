import React, { Component } from 'react';
import BookEditor from './components/BookEditor';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Personal books</h1>
        <BookEditor />
      </div>
    );
  }
}

export default App;
