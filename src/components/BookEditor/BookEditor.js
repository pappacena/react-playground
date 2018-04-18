import React from 'react';
import './styles.scss';


export default class BookEditor extends React.Component {
  constructor() {
    super();
    this.inputField = null;
    this.addButton = null;
  }

  render() {
    return (
      <div className="">
        <form>
          <input placeholder="ISBN" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}
